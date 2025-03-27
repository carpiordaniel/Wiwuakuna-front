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
import { MOVIMIENTOS } from "@/globals/constantes";
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

const ReporteResumenInventario = ({ resumenMes, resumenResponsable, graficos }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>WIWUAKUNA - Resumen Estadístico de Inventario</Text>

        <Text>
          Este reporte presenta un análisis detallado del inventario agrupado por mes, año y responsables, junto a visualizaciones
          en distintos formatos gráficos que permiten observar el comportamiento de los movimientos registrados en el sistema.
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Resumen por Mes y Año</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Mes</Text>
              <Text style={styles.headerCell}>Año</Text>
              <Text style={styles.headerCell}>Total Movimiento</Text>
              <Text style={styles.headerCell}>Total Valor</Text>
            </View>
            {resumenMes.map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.mes}</Text>
                <Text style={styles.cell}>{item.anio}</Text>
                <Text style={styles.cell}>{item.total}</Text>
                <Text style={styles.cell}>${item.valor.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Resumen por Responsable</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Responsable</Text>
              <Text style={styles.headerCell}>Movimientos</Text>
              <Text style={styles.headerCell}>Valor Total</Text>
              <Text style={styles.headerCell}>Promedio</Text>
            </View>
            {resumenResponsable.map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.nombre}</Text>
                <Text style={styles.cell}>{item.total}</Text>
                <Text style={styles.cell}>${item.valor.toFixed(2)}</Text>
                <Text style={styles.cell}>${(item.valor / item.total).toFixed(2)}</Text>
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
          Este documento ha sido generado por el sistema WIWUAKUNA con fines de análisis estadístico y seguimiento de
          la trazabilidad de inventario de cada unidad productiva y responsable.
        </Text>
      </Page>
    </Document>
  );
};

export const PDFResumenLink = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [resumenMes, setResumenMes] = useState([]);
  const [resumenResponsable, setResumenResponsable] = useState([]);
  const [graficos, setGraficos] = useState([]);

  const getAllMovimientos = async () => {
    try {
      const response = await axiosClient.get(MOVIMIENTOS.GET_ALL);
      setMovimientos(response.data);
    } catch (error) { }
  };

  const agruparDatos = () => {
    const resumenMes = {};
    const resumenResp = {};

    movimientos.forEach(mov => {
      const fecha = new Date(mov.fecha);
      const mesNombre = fecha.toLocaleString('es-ES', { month: 'long' });
      const anio = fecha.getFullYear();
      const claveMes = `${mesNombre}-${anio}`;

      if (!resumenMes[claveMes]) resumenMes[claveMes] = { mes: mesNombre, anio, total: 0, valor: 0 };
      resumenMes[claveMes].total++;
      resumenMes[claveMes].valor += mov.valor;

      if (!resumenResp[mov.responsable]) resumenResp[mov.responsable] = { nombre: mov.responsable, total: 0, valor: 0 };
      resumenResp[mov.responsable].total++;
      resumenResp[mov.responsable].valor += mov.valor;
    });

    setResumenMes(Object.values(resumenMes));
    setResumenResponsable(Object.values(resumenResp));
  };

  const generarGraficos = async () => {
    const tipos = ["bar", "pie", "line"];
    const titulos = ["Gráfico de Barras por Responsable", "Gráfico de Pastel por Responsable", "Tendencia de Movimiento"];
    const imgs = [];

    for (let i = 0; i < 3; i++) {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      document.body.appendChild(canvas); // Agregar canvas al DOM

      const ctx = canvas.getContext("2d");

      new Chart(ctx, {
        type: tipos[i],
        data: {
          labels: Object.keys(movimientos.reduce((acc, mov) => {
            if (!acc[mov.responsable]) acc[mov.responsable] = 0;
            acc[mov.responsable] += mov.valor;
            return acc;
          }, {})),
          datasets: [{
            label: "Valor", data: Object.values(movimientos.reduce((acc, mov) => {
              if (!acc[mov.responsable]) acc[mov.responsable] = 0;
              acc[mov.responsable] += mov.valor;
              return acc;
            }, {}))
          }]
        },
        options: { responsive: false, plugins: { legend: { display: i === 0 } } }
      });

      await new Promise(res => setTimeout(res, 1000)); // Esperar más tiempo para asegurar renderizado

      const img = await html2canvas(canvas).then(c => c.toDataURL("image/png"));
      imgs.push({ titulo: titulos[i], base64: img });

      document.body.removeChild(canvas); // Eliminar canvas del DOM
    }

    setGraficos(imgs);
  };


  useEffect(() => {
    getAllMovimientos();
  }, []);

  useEffect(() => {
    if (movimientos.length > 0) {
      agruparDatos();
      generarGraficos();
    }
  }, [movimientos]);

  return graficos.length > 0 ? (
    <PDFDownloadLink
      document={<ReporteResumenInventario resumenMes={resumenMes} resumenResponsable={resumenResponsable} graficos={graficos} />}
      fileName="reporte_resumen_inventario.pdf"
    >
      {({ loading }) => (loading ? "Generando PDF..." : <Button variant="outlined">Descargar Resumen Estadístico</Button>)}
    </PDFDownloadLink>
  ) : (
    <p>Generando resumen...</p>
  );
};

export default ReporteResumenInventario;