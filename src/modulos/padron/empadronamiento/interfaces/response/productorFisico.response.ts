

export interface ProductorCreateResponse{
    message: string;
    success: boolean;
    data:    DataCreateProductor;
    code:    number;
}

export interface DataCreateProductor {
  mensaje:                string;
  identificador:          string;
  accion:                 string;
}


export interface ProductorResponse{
  success: boolean;
  message: string;
  data:    Data;
}

export interface Data {
  curp:                string;
  idPersona:           number;
  idPersonaHistorica:  number;
  informacionPersonal: InformacionPersonal;
  domicilio:           Domicilio;
  caracterizacion:     Caracterizacion;
  registroProduccion:  RegistroProduccion;
  centrosProduccion:   CentrosProduccion[];
  expediente:          Expediente;
  estatusRenapo:       string;
}

export interface Caracterizacion {
  idCaracterizacion:                                null;
  indAsociacionCampesinaOrganizacionProductores:    boolean;
  nombreAsociacionCampesinaOrganizacionProductores: null;
  idRegimenPropiedad:                               null;
  idEscolaridad:                                    number;
  indDiscapacidad:                                  boolean;
  idTipoDiscapacidad:                               number;
  indEspaniol:                                      boolean;
  indDeclaratoriaIndigena:                          boolean;
  idTipoDeclaratoriaIndigena:                       number;
}

export interface CentrosProduccion {
  idCentroProduccion:      number;
  idTipoCentroProduccion:  number;
  tipoCentroProduccion:    string;
  nombreCentroProduccion:  string;
  idTipoDocumentoLegal:    number;
  tipoDocumentoLegal:      string;
  idEntidadFederativa:     number;
  nombreEntidadFederativa: string;
  idMunicipio:             number;
  nombreMunicipio:         string;
  idLocalidad:             number;
  nombreLocalidad:         string;
  georreferencias:         Georreferencia[];
}

export interface Georreferencia {
  idGeorreferencia:   number;
  tipoGeorreferencia: string;
  latitud:            number;
  longitud:           number;
  orden:              number | null;
}

export interface Domicilio {
  idDomicilio:         number;
  codigoPostal:        null;
  idEntidadFederativa: number;
  idMunicipio:         number;
  idLocalidad:         number;
  centroIntegrador:    null;
  idTipoAsentamiento:  number;
  nombreAsentamiento:  string;
  idTipoDireccion:     null;
  idTipoVialidad:      number;
  nombreVialidad:      string;
  numeroExterior:      null;
  numeroInterior:      null;
  latitud:             null;
  longitud:            null;
}

export interface Expediente {
  idExpediente: number;
  documentos:   Documento[];
}

export interface Documento {
  idDocumento:               number;
  idTipoDocumentoExpediente: number;
  tipoDocumentoExpediente:   string;
  indDocumentoDigital:       boolean;
  nombreDocumentoDigital:    null | string;
  linkDescarga:              null | string;
}

export interface InformacionPersonal {
  rfc:                     string;
  nombre:                  string;
  primerApellido:          string;
  segundoApellido:         string;
  fechaNacimiento:         Date;
  idEstadoCivil:           number;
  idGenero:                number;
  idEntidadFederativa:     null;
  idNacionalidad:          number;
  idTipoIdentificacion:    number;
  correoElectronico:       string;
  idTelefono:              number;
  numeroTelefono:          string;
  idTelefonoAdicional:     null;
  numeroTelefonoAdicional: null;
}

export interface RegistroProduccion {
  idRegistroProduccion:        number;
  idSectorAgroalimentario:     number;
  claveUppPsg:                 string;
  idDetalleRegistroProduccion: number;
  idCultivo:                   number;
  superficieHa:                string;
  totalCabezasHato:            null;
  volumenProduccionTon:        string;
  valorProduccion:             string;
  precioCultivoEspecie:        string | number | '';
  idRegimenHidrico:            number;
}
