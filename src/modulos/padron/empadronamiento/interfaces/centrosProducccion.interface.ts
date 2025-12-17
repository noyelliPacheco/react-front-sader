export interface CentroProduccion {
  idCentroProduccion:       number | undefined;
  idTipoCentroProduccion:   number | undefined;
  tipoCentroProduccion:     string;
  nombreCentroProduccion:   string ;
  idTipoDocumentoLegal:     number | undefined; 
  idEntidadFederativa:      number | undefined; 
  idMunicipio:              number | undefined;
  idLocalidad:              number | undefined;
  tipoDocumentoLegal:       string;
  nombreEntidadFederativa:  string,
  nombreMunicipio:          string;
  nombreLocalidad:          string;
  georeferencias?:          UbicacionGeografica[] | [];
}

export interface UbicacionGeografica {
  idGeorreferencia :    number,
  latitud:              string | number;
  longitud:             string | number;
  orden:                number | null;
  tipoGeorreferencia:   string;
}