// src/components/AcusePdfButton.tsx
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AcuseRegistroDocument } from "./AcusePdf";

type Props = {
  datos: {
    nombreProductor: string;
    curp: string;
    tipoPersona: string;
    folioRegistro: string;
    fechaRegistro: string;
    fechaActualizacion: string;
  };
};

export const AcusePdfButton: React.FC<Props> = ({ datos }) => {
  return (
    <PDFDownloadLink
      document={<AcuseRegistroDocument {...datos} />}
      fileName={`acuse-registro-${datos.curp || "productor"}.pdf`}
    >
      {({ loading }) => (
        
        <button type="button" className="px-4 py-2 rounded-md text-white text-sm font-semibold bg-gray-400 hover:bg-gray-800 items-center" >
          {loading ? "Generando PDF..." : "Descargar acuse (PDF)"}
        </button>
      )}
    </PDFDownloadLink>
  );
};
