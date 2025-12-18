export interface Domicilio {
  codigoPostal: number | null;
  idEntidadFederativa: number | "";
  entidadNombre?: string;
  idMunicipio: number | "";
  municipioNombre?: string;
  idLocalidad: number | "";
  localidadNombre?: string;
  idCentroIntegrador : number;
  centroIntegrador? : string;

  idTipoAsentamiento : number;
  nombreAsentamiento : string;

  idTipoDireccion : number;
  idTipoVialidad : number;
  nombreVialidad : string;
  noExterior: number | null;
  noInterior: number | null; 
  
  latitud?: string;
  longitud?: string;
}