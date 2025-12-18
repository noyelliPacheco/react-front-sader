export interface Personal {
  idTipoPersona: number | '';
  curp: string;
  rfc: string;
  llaveMx: boolean;
  nombre: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  fechaNacimiento: Date;

  sexo: number | '';

  idEstadoCivil: number | '';
  idEntidadNacimiento: number | '';
  idTipoIdentificacion: number | '';
  numeroIdentificacion: string;

  telefonoCelular: string;
  telefonos?: [{
    idTelefono: number;
    numeroTelefono : string;
  }, {
    idTelefono: number;
    numeroTelefono : string;
  },]
  numeroTelefono: string;
  idTipoTelefono: number | '';
  correoElectronico: string;
  idNacionalidad: number | '';
}