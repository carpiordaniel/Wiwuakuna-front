import React, { useEffect, useState, useRef } from "react";
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
import { MOVIMIENTOS, SALDOS } from "@/globals/constantes";
import { Button } from "@mui/material";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  section: { margin: 10, padding: 10 },
  subtitle: { fontSize: 14, marginBottom: 6, fontWeight: 'bold' },
  table: { display: "table", width: "auto", marginTop: 5 },
  row: { flexDirection: "row", borderBottom: 1, paddingBottom: 2, marginBottom: 2 },
  headerCell: { fontWeight: "bold", width: "20%" },
  cell: { width: "20%" },
  image: { width: 300, height: 200, marginVertical: 10, alignSelf: "center" },
});

const ReporteInventario = ({ inventario, saldos, imagenBase64 }) => {
  const resumenPorFinca = Object?.values(
    inventario?.reduce((acc, cur) => {
      if (!acc[cur.nfinca]) acc[cur.nfinca] = { nombre: cur.nfinca, total: 0 };
      acc[cur.nfinca].total += cur.valor;
      return acc;
    }, {})
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>WIWUAKUNA - Reporte de Inventario</Text>

        <Text>
          WIWUAKUNA es una plataforma integral para la gestión eficiente de recursos agrícolas y ganaderos.
          Este reporte muestra el resumen de movimientos, saldos y estadísticas del inventario registrados en el sistema.
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Resumen por Hacienda</Text>
          {resumenPorFinca.map((item, i) => (
            <Text key={i}>- {item.nombre}: ${item.total.toFixed(2)}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Gráfico de Saldos por Hacienda</Text>
          <Image src={imagenBase64} style={styles.image} />
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Movimientos de Inventario</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Fecha</Text>
              <Text style={styles.headerCell}>Artículo</Text>
              <Text style={styles.headerCell}>Tipo</Text>
              <Text style={styles.headerCell}>Cantidad</Text>
              <Text style={styles.headerCell}>Responsable</Text>
            </View>
            {inventario.slice(0, 20).map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.fecha}</Text>
                <Text style={styles.cell}>{item.narticulo}</Text>
                <Text style={styles.cell}>{item.ntipo}</Text>
                <Text style={styles.cell}>{item.cantidad}</Text>
                <Text style={styles.cell}>{item.responsable}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Saldos Actuales</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Hacienda</Text>
              <Text style={styles.headerCell}>Artículo</Text>
              <Text style={styles.headerCell}>Saldo</Text>
            </View>
            {saldos.slice(0, 20).map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.nombre}</Text>
                <Text style={styles.cell}>{item.articulo}</Text>
                <Text style={styles.cell}>{item.valor}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={{ marginTop: 20 }}>
          Este documento ha sido generado automáticamente por el sistema WIWUAKUNA como parte de los procesos de
          seguimiento y control de inventario para las diferentes haciendas registradas.
        </Text>
      </Page>
    </Document>
  );
};

export const PDFLink = () => {
  const [inventario, setDataMovimientos] = useState([]);
  const [saldos, setDataSaldos] = useState([]);
  const [imagenBase64, setImagenBase64] = useState("");
  const chartRef = useRef();

  const getAllMovimientos = async () => {
    try {
      const response = await axiosClient.get(MOVIMIENTOS.GET_ALL);
      console.log(response.data);
      setDataMovimientos(response.data);
    } catch (error) { }
  };

  const getAllSaldos = async () => {
    try {
      const response = await axiosClient.get(SALDOS.GET_ALL);
      setDataSaldos(response.data);
    } catch (error) { }
  };

  const generarGrafico = async () => {
    const labels = saldos.map(s => s.nombre);
    const data = saldos.map(s => s.valor);

    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);


    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{ label: "Saldo", data, backgroundColor: "skyblue" }],
      },
      options: { responsive: false, plugins: { legend: { display: false } } }
    });

    setTimeout(async () => {
      const base64 = await html2canvas(canvas).then(c => c.toDataURL("image/png"));
      setImagenBase64(base64);
      document.body.removeChild(canvas);

    }, 500);
  };

  useEffect(() => {
    getAllMovimientos();
    getAllSaldos();
  }, []);

  useEffect(() => {
    if (saldos.length > 0) {
      generarGrafico();
    }
  }, [saldos]);

  return imagenBase64 ? (
    <PDFDownloadLink
      document={<ReporteInventario inventario={inventario} saldos={saldos} imagenBase64={imagenBase64} />}
      fileName="reporte_inventario.pdf"
    >
      {({ loading }) => (loading ? "Generando PDF..." : <Button variant="contained">Descargar Reporte General</Button>)}
    </PDFDownloadLink>
  ) : (
    <p>Generando gráfico...</p>
  );
};

export default ReporteInventario;

