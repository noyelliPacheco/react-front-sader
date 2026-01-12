export interface Expediente {
  idEstadoExpediente?: number | null; // o number | null
  observaciones?:string | undefined;
  documentosArreglo: Documento[];

  documentos: {
    idTipoDocumentoCredencialElector: number,
    idTipoDocumentoComprobanteDomicilio: number,
    idTipoDocumentoLegalPropiedad: number,
    idTipoDocumentoArrendatario: number,
    idTipoDocumentoFormatoInscripcionPgn: number,
    idTipoDocumentoPermisoPesca: number,
    idTipoDocumentoRfc: number,
    idTipoDocumentoActaConstitutiva: number,
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