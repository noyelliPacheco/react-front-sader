export interface Expediente {
  idEstadoExpediente?: number | null; // o number | null
  observaciones?:string | undefined;
  documentosArreglo: Documento[];

  documentos: {
    idTipoDocumentoCredencialElector: 1,
    idTipoDocumentoComprobanteDomicilio: 2,
    idTipoDocumentoLegalPropiedad: 3,
    idTipoDocumentoArrendatario: 4,
    idTipoDocumentoFormatoInscripcionPgn: 5,
    idTipoDocumentoPermisoPesca: 6,
    idTipoDocumentoRfc: 7,
    idTipoDocumentoActaConstitutiva: 8,
  }
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