// seccionesForm/informacionExpediente/utils/normalizeDocumento.ts
import type { Documento } from "../../../../../interfaces/expediente.interface";

export const normalizeDocumento = (doc: Partial<Documento>): Documento => {
  return {
    idDocumento: doc.idDocumento ?? null,
    idTipoDocumentoExpediente: doc.idTipoDocumentoExpediente ?? null,
    tipoDocumentoExpediente: doc.tipoDocumentoExpediente ?? "",
    indDocumentoDigital: Boolean(doc.indDocumentoDigital),
    nombreDocumentoDigital: doc.nombreDocumentoDigital ?? "",
    linkDescarga: doc.linkDescarga ?? "",
    file: (doc.file as any) ?? null,
    eliminado: Boolean(doc.eliminado),
  } as Documento;
};
