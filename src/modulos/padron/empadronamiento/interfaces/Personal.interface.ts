export interface Personal {
  idTipoPersona: number | null;
  curp: string ;
  rfc: string |null;
  llaveMx: boolean |null;
  nombre: string |null;
  apellidoPaterno?: string |null;
  apellidoMaterno?: string |null;
  fechaNacimiento: Date ; 

  idEstadoCivil: number | null;
  sexo: number | null;
  idTipoIdentificacion: number | null;
  numeroIdentificacion: string |null;
  idEntidadNacimiento: number | null;
  nss: string | null;

  correoElectronico: string |null;

  telefonos?: [{
    id: number |null;
    idTipoTelefono: number |null;
    numeroTelefono : string |null;
  }, {
    id: number |null;
    idTipoTelefono: number |null;
    numeroTelefono : string |null;
  },]  
  idNacionalidad: number |null;
}