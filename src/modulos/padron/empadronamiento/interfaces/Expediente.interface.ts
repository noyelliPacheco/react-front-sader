export interface Expediente {
  idExpediente?: number | null; // o number | null
  documentos: Documento[];
}

export interface Documento {
  idDocumento?: number | null; // o number | null
  idTipoDocumentoExpediente?: number;
  tipoDocumentoExpediente: string;
  indDocumentoDigital?: boolean | null; // o boolean | null
  nombreDocumentoDigital: string; // si tú lo normalizas a ""
  linkDescarga: string;
  file?: File | null;
  eliminado?: boolean;
}