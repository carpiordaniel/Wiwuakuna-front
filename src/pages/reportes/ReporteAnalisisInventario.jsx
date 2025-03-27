import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
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
});

const ReporteAnalisisInventario = ({ movimientos, analisis }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>WIWUAKUNA - Análisis de Movimientos de Inventario</Text>

        <Text>
          Este informe proporciona un análisis detallado de los movimientos de inventario registrados en el sistema WIWUAKUNA.
          La información está desglosada en diferentes vistas que facilitan la interpretación de los datos y la toma de decisiones estratégicas.
        </Text>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Análisis General</Text>
          <Text>- Total de registros: {analisis.totalRegistros}</Text>
          <Text>- Promedio de valor por movimiento: ${analisis.promedioValor.toFixed(2)}</Text>
          <Text>- Movimiento más costoso: {analisis.maxArticulo} (${analisis.maxValor.toFixed(2)})</Text>
          <Text>- Responsable más activo: {analisis.topResponsable} ({analisis.maxResponsableCount} movimientos)</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Top 10 Movimientos por Valor</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Fecha</Text>
              <Text style={styles.headerCell}>Artículo</Text>
              <Text style={styles.headerCell}>Tipo</Text>
              <Text style={styles.headerCell}>Valor</Text>
            </View>
            {analisis.top10.map((item, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{item.fecha}</Text>
                <Text style={styles.cell}>{item.narticulo}</Text>
                <Text style={styles.cell}>{item.ntipo}</Text>
                <Text style={styles.cell}>${item.valor.toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Movimientos por Responsable</Text>
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Responsable</Text>
              <Text style={styles.headerCell}>Cantidad</Text>
              <Text style={styles.headerCell}>Valor Total</Text>
              <Text style={styles.headerCell}>Promedio</Text>
            </View>
            {analisis.responsables.map((r, i) => (
              <View style={styles.row} key={i}>
                <Text style={styles.cell}>{r.nombre}</Text>
                <Text style={styles.cell}>{r.total}</Text>
                <Text style={styles.cell}>${r.valor.toFixed(2)}</Text>
                <Text style={styles.cell}>${(r.valor / r.total).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={{ marginTop: 20 }}>
          Este documento es parte de los procesos de auditoría interna y control del inventario. Se recomienda realizar revisiones
          periódicas para asegurar la trazabilidad y optimización de recursos en cada hacienda del sistema WIWUAKUNA.
        </Text>
      </Page>
    </Document>
  );
};

export const PDFAnalisisLink = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [analisis, setAnalisis] = useState(null);

  const getAllMovimientos = async () => {
    try {
      const response = await axiosClient.get(MOVIMIENTOS.GET_ALL);
      setMovimientos(response.data);
    } catch (error) { }
  };

  const procesarAnalisis = () => {
    if (movimientos.length === 0) return;

    const totalRegistros = movimientos.length;
    const promedioValor = movimientos.reduce((sum, m) => sum + m.valor, 0) / totalRegistros;

    const max = movimientos.reduce((prev, current) => (prev.valor > current.valor ? prev : current));

    const responsables = {};
    movimientos.forEach(m => {
      if (!responsables[m.responsable]) responsables[m.responsable] = { nombre: m.responsable, total: 0, valor: 0 };
      responsables[m.responsable].total++;
      responsables[m.responsable].valor += m.valor;
    });

    const responsablesArray = Object.values(responsables);
    const topResponsable = responsablesArray.reduce((prev, curr) => (prev.total > curr.total ? prev : curr)).nombre;
    const maxResponsableCount = responsables[topResponsable].total;

    const top10 = movimientos.sort((a, b) => b.valor - a.valor).slice(0, 10);

    setAnalisis({
      totalRegistros,
      promedioValor,
      maxArticulo: max.narticulo,
      maxValor: max.valor,
      topResponsable,
      maxResponsableCount,
      top10,
      responsables: responsablesArray
    });
  };

  useEffect(() => {
    getAllMovimientos();
  }, []);

  useEffect(() => {
    if (movimientos.length > 0) {
      procesarAnalisis();
    }
  }, [movimientos]);

  return analisis ? (
    <PDFDownloadLink
      document={<ReporteAnalisisInventario movimientos={movimientos} analisis={analisis} />}
      fileName="reporte_analisis_inventario.pdf"
    >
      {({ loading }) => (loading ? "Generando PDF..." : <Button variant="contained">Descargar Análisis de Movimientos</Button>)}
    </PDFDownloadLink>
  ) : (
    <p>Procesando análisis...</p>
  );
};

export default ReporteAnalisisInventario;