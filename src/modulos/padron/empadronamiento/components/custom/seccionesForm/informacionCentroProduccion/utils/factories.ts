import type { CentroProduccion, Coordenadas, GeoReferencia } from "../../../../../interfaces/centroProducccion.interface";

export const emptyGeoRef: GeoReferencia = {
  coordenadasCentro: {
    id: null,
    latitud: null,
    longitud: null,
    orden: null,
    tipoGeorreferencia: "CENTRO",
  },
  poligono: [],
};

export const createEmptyGeo = (orden: number, tipo: string = "POLIGONO"): Coordenadas => ({
  id: null,
  latitud: null,
  longitud: null,
  orden,
  tipoGeorreferencia: tipo,
});

export const emptyCentro: CentroProduccion = {
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
  georeferencias: emptyGeoRef,
  superficieTotal: null,
  superficieProductiva: null,
  idRegimenHidrico: null,
};
