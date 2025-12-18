export interface Personal {
  idTipoPersona: number | '';
  curp: string;
  rfc: string;
  llaveMx: boolean;
  nombre: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  fechaNacimiento: Date; 

  idEstadoCivil: number | '';
  sexo: number | '';
  idTipoIdentificacion: number | '';
  numeroIdentificacion: string;
  idEntidadNacimiento: number | '';

  correoElectronico: string;

  telefonos?: [{
    idTelefono: number;
    numeroTelefono : string;
  }, {
    idTelefono: number;
    numeroTelefono : string;
  },]  
  idNacionalidad: number | '';
}