

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
  idPersona:           number | null;
  idPersonaHistorica:  number | null;
  informacionPersonal: InformacionPersonal;
  domicilio:           Domicilio;
  caracterizacion:     Caracterizacion;
  registroProduccion:  RegistroProduccion;
  centrosProduccion:   CentrosProduccion[];
  expediente:          Expediente;
  estatusRenapo:       string;
}

export interface Caracterizacion {
  idCaracterizacion:                                number | null;
  indAsociacionCampesinaOrganizacionProductores:    boolean;
  nombreAsociacionCampesinaOrganizacionProductores: null;
  idRegimenPropiedad:                               number | null;
  idEscolaridad:                                    number | null;
  indDiscapacidad:                                  boolean;
  idTipoDiscapacidad:                               number | null;
  indEspaniol:                                      boolean;
  indDeclaratoriaIndigena:                          boolean;
  idTipoDeclaratoriaIndigena:                       number | null;
  nombreLenguaIndigena:                             string;
}

export interface CentrosProduccion {
  idCentroProduccion:      number | null;
  idTipoCentroProduccion:  number | null;
  tipoCentroProduccion:    string;
  nombreCentroProduccion:  string;
  idTipoDocumentoLegal:    number | null;
  tipoDocumentoLegal:      string;
  idEntidadFederativa:     number | null;
  nombreEntidadFederativa: string;
  idMunicipio:             number | null;
  nombreMunicipio:         string;
  idLocalidad:             number | null;
  nombreLocalidad:         string;
  georreferencias:         Georreferencia[];
}

export interface Georreferencia {
  idGeorreferencia:   number | null;
  tipoGeorreferencia: string;
  latitud:            number;
  longitud:           number;
  orden:              number | null;
}

export interface Domicilio {
  idDomicilio:         number | null;
  codigoPostal:        null;
  idEntidadFederativa: number | null;
  idMunicipio:         number | null;
  idLocalidad:         number | null;
  centroIntegrador:    null;
  idTipoAsentamiento:  number | null;
  nombreAsentamiento:  string;
  idTipoDireccion:     number | null;
  idTipoVialidad:      number | null;
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
  idDocumento:               number | null;
  idTipoDocumentoExpediente: number | null;
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
  idEstadoCivil:           number | null;
  idGenero:                number | null;
  idEntidadFederativa:     null;
  idNacionalidad:          number | null;
  idTipoIdentificacion:    number | null;
  numeroIdentificacion:    string | null;
  correoElectronico:       string;
  idTelefono:              number | null;
  numeroTelefono:          string;
  idTelefonoAdicional:     number | null;
  numeroTelefonoAdicional: null;
  nss:                     string| null;
}

export interface RegistroProduccion {
  idRegistroProduccion:        number | null;
  idSectorAgroalimentario:     number | null;
  idCicloAgricola:             number | null;
  idTipoCultivo:                number | null;
  claveUppPsg:                 string;
  idDetalleRegistroProduccion: number | null;
  idCultivo:                   number | null;
  superficieHa:                string;
  totalCabezasHato:            number | null;
  volumenProduccionTon:        string;
  valorProduccion:             string;
  precioCultivoEspecie:        number | null;
  idRegimenHidrico:            number | null;
}
