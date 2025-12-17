// src/pdf/AcuseRegistroDocument.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet,} from "@react-pdf/renderer";

type Props = {
  nombreProductor: string;
  curp: string;
  tipoPersona: string;
  folioRegistro: string;
  fechaRegistro: string;
  fechaActualizacion: string;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingHorizontal: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },
  rightText: {
    textAlign: "right",
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  paragraph: {
    marginTop: 3,
    marginBottom: 8,
    lineHeight: 1.2,
    fontSize:11,
    textAlign: "justify",
  },
  bold: {
    fontWeight: "bold",
  },
  list: {
    marginLeft: 12,
    marginBottom: 15,
     marginTop: 15,
  },
  listItem: {
    marginBottom: 4,
  },
  centerBlock: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    textAlign: "center",
  },
  firmaLine: {
    marginTop: 50,
    borderTopWidth: 1,
    borderColor: "#000",
    paddingTop: 4,
    width: "60%",
  },
  footerText: {
    marginTop: 30,
    fontSize: 9,
    lineHeight: 1.3,
    textAlign: "justify",
  },
});

export const AcuseRegistroDocument: React.FC<Props> = (props) => {
  const {
    nombreProductor,
    curp,
    tipoPersona,
    folioRegistro,
    fechaRegistro,
    fechaActualizacion,
  } = props;

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.rightText}>
          Fecha impresión: {fechaActualizacion}
        </Text>

        <Text style={styles.title}>
          Acuse de Registro en el Padrón de Productores de la Secretaría
        </Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>{nombreProductor}</Text> ha sido registrado
          como Productor de la Secretaría, el cual se rige por las Reglas de
          operación vigentes. Este registro se efectuó con la siguiente
          información:
        </Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>
            • <Text style={styles.bold}>Tipo Persona:</Text> {tipoPersona}
          </Text>
          <Text style={styles.listItem}>
            • <Text style={styles.bold}>Folio Registro:</Text> {folioRegistro}
          </Text>
          <Text style={styles.listItem}>
            • <Text style={styles.bold}>Fecha Registro:</Text> {fechaRegistro}
          </Text>
          <Text style={styles.listItem}>
            • <Text style={styles.bold}>Fecha Actualización:</Text>{" "}
            {fechaActualizacion}
          </Text>
          <Text style={styles.listItem}>
            • <Text style={styles.bold}>CURP:</Text> {curp}
          </Text>
          <Text style={styles.listItem}>
            • <Text style={styles.bold}>Nombre:</Text> {nombreProductor}
          </Text>
        </View>

        <Text style={styles.paragraph}>
          El registro no compromete a la Secretaría ni a ninguno de sus Órganos
          Sectorizados al otorgamiento de bienes, apoyos o beneficios de índole
          material, económica o en especie, sino que obra únicamente como
          requisito indispensable para poder solicitar apoyos además de coadyuvar
          a la transparencia y rendición de cuentas, asimismo la Secretaría
          dispondrá de los datos registrados para los fines que se indican y en
          apego a las leyes y normatividad en torno al manejo y confidencialidad
          de la información, pública y privada, aplicables en la materia.
        </Text>

        <Text style={styles.paragraph}>
          Liga de Aviso de Privacidad: https://www.gob.mx/agricultura/acciones-y-programas/proteccion-de-datos-personales-282241
        </Text>

        <View style={styles.centerBlock}>
          <Text>Acepto los términos y condiciones del Aviso de Privacidad</Text>
          <View style={styles.firmaLine}>
            <Text>Nombre y Apellidos del Productor</Text>
          </View>
        </View>
        <Text style={styles.paragraph}>
          El Padrón de Productores de la Secretaría registra la información de los productores del sector rural, y solo podrán ser
          transmitida en aquellos casos previstos en la Ley y/o con el consentimiento del productor.
        </Text>
        <Text style={styles.paragraph}>La Unidad Administrativa responsable del Sistema Informático de dicho padrón es el SIAP, Av. Benjamín Franklin No 146,
          Col. Escandón Segunda Sección, Alcaldía Miguel Hidalgo C.P. 11800, Ciudad de México. Lo anterior se informa en
          cumplimiento de la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados.
        </Text>
        <Text style={styles.paragraph}>La resposabilidad de la veracidad de la información es de los productores que registran sus datos. La protección de los
          datos confidenciales es responsabilidad de la Secretaría. Este documento es de uso exclusivo del productor quedando bajo
          su responsabilidad su resguardo y otorgamiento de consentimiento para su uso por tercersos.
        </Text>
        <View style={styles.centerBlock}>
            <Text>"Este programa es público, ajeno a cualquier partido político.</Text>
            <Text>Queda prohibido el uso para fines distintos a los establecidos en el programa."</Text>
        </View>

        {/* Aquí podrías agregar los textos del pie de página si lo deseas */}
      </Page>
    </Document>
  );
};
