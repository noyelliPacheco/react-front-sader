export interface Domicilio {

  idEntidadFederativa: number | null;
  idMunicipio: number | null;
  idLocalidad: number | null;
  codigoPostal: number | null;
  idTipoAsentamiento : number | null;
  nombreAsentamiento : string;
  idTipoDireccion : number | null;
  idTipoVialidad : number | null;
  nombreVialidad : string;
  noExterior: string ;
  noInterior: string; 
  
  latitud?: number|null;
  longitud?: number|null;

  entidadNombre?: string;  
  municipioNombre?: string;  
  localidadNombre?: string;
  
  
  /*idCentroIntegrador : number;
  centroIntegrador? : string; */
}