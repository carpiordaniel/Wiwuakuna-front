import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image
} from "@react-pdf/renderer";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import axiosClient from "@/axios/apiClient";
import { REPRODUCCION, ANIMALES } from "@/globals/constantes";
import { Button } from "@mui/material";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  section: { margin: 10, padding: 10 },
  subtitle: { fontSize: 14, marginBottom: 6, fontWeight: 'bold' },
  table: { display: "table", width: "auto", marginTop: 5 },
  row: { flexDirection: "row", borderBottom: 1, paddingBottom: 2, marginBottom: 2 },
  headerCell: { fontWeight: "bold", width: "25%" },
  cell: { width: "25%" },
  image: { width: 300, height: 200, marginVertical: 10, alignSelf: "center" },
});

const ReporteReproduccion = ({ datos, agrupadoSexoEstado, graficos }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>WIWUAKUNA - Reporte de Reproducción Animal</Text>

        <Text>
          Este reporte presenta un análisis detallado de los registros de reproducción de los animales, incluyendo gráficos por responsable
          y un desglose por sexo y estado de los animales registrados.
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Registros de Reproducción</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Animal</Text>
              <Text style={styles.headerCell}>Fecha</Text>
              <Text style={styles.headerCell}>Tipo</Text>
              <Text style={styles.headerCell}>Macho</Text>
              <Text style={styles.headerCell}>Responsable</Text>
            </View>
            {datos.map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.animal}</Text>
                <Text style={styles.cell}>{item.fecha}</Text>
                <Text style={styles.cell}>{item.tipo}</Text>
                <Text style={styles.cell}>{item.macho}</Text>
                <Text style={styles.cell}>{item.responsable}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Agrupación por Sexo y Estado</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Sexo</Text>
              <Text style={styles.headerCell}>Estado</Text>
              <Text style={styles.headerCell}>Cantidad</Text>
            </View>
            {agrupadoSexoEstado.map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.sexo}</Text>
                <Text style={styles.cell}>{item.estado ? 'Activo' : 'Inactivo'}</Text>
                <Text style={styles.cell}>{item.cantidad}</Text>
              </View>
            ))}
          </View>
        </View>

        {graficos.map((graf, i) => (
          <View style={styles.section} key={i}>
            <Text style={styles.subtitle}>{graf.titulo}</Text>
            <Image src={graf.base64} style={styles.image} />
          </View>
        ))}

        <Text style={{ marginTop: 20 }}>
          Este documento ha sido generado automáticamente por el sistema WIWUAKUNA como parte del seguimiento reproductivo animal.
        </Text>
      </Page>
    </Document>
  );
};

export const PDFReproduccionLink = () => {
  const [reproduccion, setReproduccion] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [agrupadoSexoEstado, setAgrupadoSexoEstado] = useState([]);
  const [graficos, setGraficos] = useState([]);

  const cargarDatos = async () => {
    try {
      const reproRes = await axiosClient.get(REPRODUCCION.GET_ALL);
      const animRes = await axiosClient.get(ANIMALES.GET_BY_FILTER);
      setReproduccion(reproRes.data);
      setAnimales(animRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const procesarAgrupacion = () => {
    const resumen = {};
    animales.forEach(a => {
      const clave = `${a.sexo}-${a.estado}`;
      if (!resumen[clave]) resumen[clave] = { sexo: a.sexo, estado: a.estado, cantidad: 0 };
      resumen[clave].cantidad++;
    });
    setAgrupadoSexoEstado(Object.values(resumen));
  };

  const generarGraficos = async () => {
    const tipos = ['bar', 'pie'];
    const titulos = ['Gráfico de Reproducción por Responsable', 'Distribución por Responsable'];
    const imgs = [];

    for (let i = 0; i < tipos.length; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      document.body.appendChild(canvas); // Agregar al DOM temporalmente

      const ctx = canvas.getContext("2d");

      // Limpiar cualquier gráfico previo
      Chart.getChart(ctx)?.destroy();

      // Datos del gráfico
      const resumen = reproduccion.reduce((acc, r) => {
        acc[r.responsable] = (acc[r.responsable] || 0) + 1;
        return acc;
      }, {});
      const labels = Object.keys(resumen);
      const data = Object.values(resumen);

      // Crear el gráfico
      new Chart(ctx, {
        type: tipos[i],
        data: { labels, datasets: [{ label: 'Cantidad', data }] },
        options: { responsive: false, plugins: { legend: { display: true } } }
      });

      await new Promise(res => setTimeout(res, 1000)); // Esperar más para asegurar renderizado

      const img = await html2canvas(canvas).then(c => c.toDataURL("image/png"));
      imgs.push({ titulo: titulos[i], base64: img });

      document.body.removeChild(canvas); // Eliminar canvas del DOM
    }

    setGraficos(imgs);
  };


  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    if (reproduccion.length && animales.length) {
      procesarAgrupacion();
      generarGraficos();
    }
  }, [reproduccion, animales]);

  return graficos.length > 0 ? (
    <PDFDownloadLink
      document={<ReporteReproduccion datos={reproduccion} agrupadoSexoEstado={agrupadoSexoEstado} graficos={graficos} />}
      fileName="reporte_reproduccion.pdf"
    >
      {({ loading }) => (loading ? "Generando PDF..." : <Button variant="outlined">Descargar Reporte Reproducción</Button>)}
    </PDFDownloadLink>
  ) : (
    <p>Generando resumen...</p>
  );
};

export default ReporteReproduccion;