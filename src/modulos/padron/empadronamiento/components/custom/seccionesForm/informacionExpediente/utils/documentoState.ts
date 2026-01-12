import type { Documento } from "../../../../../interfaces/expediente.interface";

export const hasDigital = (doc: Documento) => Boolean(doc.indDocumentoDigital);

export const hasFileSelected = (doc: Documento) => Boolean(doc.file);

export const hasFileAlreadyUploaded = (doc: Documento) =>
  Boolean(doc.nombreDocumentoDigital) || Boolean(doc.linkDescarga);

export const isBackendFile = (doc: Documento) =>
  Boolean(doc.idDocumento) && (Boolean(doc.nombreDocumentoDigital) || Boolean(doc.linkDescarga));
