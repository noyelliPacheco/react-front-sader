import type { CentroProduccion, Coordenadas } from "../../../../../interfaces/centroProducccion.interface";

export const DEFAULT_GEO_CENTRO : Coordenadas = {
  id: null as number | null,
  latitud: 0,
  longitud: 0,
  orden: null as number | null,
  tipoGeorreferencia: "",
};

export const DEFAULT_CENTRO_PRODUCCION : CentroProduccion = {
  idCentroProduccion: null,
  idTipoCentroProduccion: null,
  tipoCentroProduccion: "",
  nombre: "",
  idTipoDocumentoLegal: null,
  idEstado: null,
  idMunicipio: null,
  idLocalidad: null,
  tipoDocumentoLegal: "",
  nombreEntidadFederativa: "",
  nombreMunicipio: "",
  nombreLocalidad: "",
  superficieTotal: 0,
  superficieProductiva: 0,
  idRegimenHidrico: null,
  georeferencias: {
    coordenadasCentro: { ...DEFAULT_GEO_CENTRO },
    poligono: [] as Coordenadas[],
  },
};

export const DEFAULT_DOCUMENTOS_IDS = {
  idTipoDocumentoCredencialElector: 1,
  idTipoDocumentoComprobanteDomicilio: 2,
  idTipoDocumentoLegalPropiedad: 3,
  idTipoDocumentoArrendatario: 4,
  idTipoDocumentoFormatoInscripcionPgn: 5,
  idTipoDocumentoPermisoPesca: 6,
  idTipoDocumentoRfc: 7,
  idTipoDocumentoActaConstitutiva: 8,
};
