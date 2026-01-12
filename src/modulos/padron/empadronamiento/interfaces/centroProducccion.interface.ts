
export interface CentroProduccion {
  idCentroProduccion:       number | null;
  nombre:                   string ;
  idTipoCentroProduccion:   number | null;
  tipoCentroProduccion:     string;
    
  idTipoDocumentoLegal:     number | null; 
  idEstado:                 number | null; 
  idMunicipio:              number | null;
  idLocalidad:              number | null;
  tipoDocumentoLegal:       string;
  nombreEntidadFederativa:  string,
  nombreMunicipio:          string;
  nombreLocalidad:          string;
  georeferencias?:          GeoReferencia ;

  //Todo:Arreglar estos campos
  superficieTotal:          number | null;
  superficieProductiva:     number | null;
  idRegimenHidrico:         number | null;
}

export interface GeoReferencia {
  coordenadasCentro: Coordenadas;
  poligono: Coordenadas[];
}

export interface Coordenadas {
  id?:                    number| null;
  latitud:                number| null;
  longitud:               number| null;
  orden?:                 number| null;
  tipoGeorreferencia?:    string;
}