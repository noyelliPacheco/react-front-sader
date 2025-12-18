
export interface CentroProduccion {
  idCentroProduccion:       number | undefined;
  nombre:                   string ;
  idTipoCentroProduccion:   number | undefined;
  tipoCentroProduccion:     string;
    
  idTipoDocumentoLegal:     number | undefined; 
  idEstado:      number | undefined; 
  idMunicipio:              number | undefined;
  idLocalidad:              number | undefined;
  tipoDocumentoLegal:       string;
  nombreEntidadFederativa:  string,
  nombreMunicipio:          string;
  nombreLocalidad:          string;
  georeferencias?:          GeoReferencia ;
}

export interface GeoReferencia {
  coordenadasCentro: Coordenadas;
  poligono: Coordenadas[];
}

export interface Coordenadas {
  idGeorreferencia?:    number,
  latitud:              string | number;
  longitud:             string | number;
  orden?:                number | null;
  tipoGeorreferencia?:   string;
}