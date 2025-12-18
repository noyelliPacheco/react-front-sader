export interface Domicilio {

  idEntidadFederativa: number | "";
  idMunicipio: number | "";
  idLocalidad: number | "";
  codigoPostal: number | null;
  idTipoAsentamiento : number;
  nombreAsentamiento : string;
  idTipoDireccion : number;
  idTipoVialidad : number;
  nombreVialidad : string;
  noExterior: number | null;
  noInterior: number | null; 
  
  latitud?: string;
  longitud?: string;

  entidadNombre?: string;  
  municipioNombre?: string;  
  localidadNombre?: string;
  
  
  /*idCentroIntegrador : number;
  centroIntegrador? : string; */
}