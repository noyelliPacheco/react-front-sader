import type { Productor } from "./productor.interface";


export const defaultProductorValues: Productor = {
  datos:{
    idPersona: null,
    idPersonaHistorica: null,
    folio: '',
    informacionPersonal: {
      idTipoPersona: null,
      curp: "",
      rfc: "",
      nss: null,
      llaveMx: false,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: new Date(), // o new Date("2000-01-01") si prefieres fijo
    sexo: null,
    idEstadoCivil:null,
    idEntidadNacimiento: null,
    idTipoIdentificacion: null,
    telefonos: [{
    id:null,
    idTipoTelefono: 1,
    numeroTelefono : '',
    
  }, {
    id: null,
    idTipoTelefono: 2,
    numeroTelefono : '',
  },]  ,
    
    correoElectronico: "",
    idNacionalidad: null,
    numeroIdentificacion:""
  }, // basado en Personal :contentReference[oaicite:1]{index=1}

  domicilio: {
    codigoPostal: null,
    idEntidadFederativa: null,
    entidadNombre: '',
    idMunicipio: null,
    municipioNombre: '',
    idLocalidad: null,
    localidadNombre: '',
    //idCentroIntegrador: 0,
    //centroIntegrador: "",
    idTipoAsentamiento:null,
    nombreAsentamiento: "",
    idTipoDireccion: null,
    idTipoVialidad: null,
    nombreVialidad: "",
    noExterior: "",
    noInterior: "",
    latitud: null,
    longitud: null,
  }, // basado en Domicilio :contentReference[oaicite:2]{index=2}

  registroProduccion: {   

  principalesCultivos:[{
    idDetalleRegistroProduccion: null,
    idCultivoEspecie : null,  
    idTipoCultivo : null,
    superficie: null,
    numeroVientresColmenas: null,
    totalCabezasHato: null,
    volumenProduccion: null,
    valorProduccion: null,
    precioCultivoEspecie: null,
    idRegimenHidrico: null,
  }],

    idSectorAgroalimentario: null,
    idCicloAgricola: null,
    claveUpp: "",
    
    
  }, // basado en RegistroDeProduccion :contentReference[oaicite:3]{index=3}

  caracterizacion: {
    perteneceAsociacionCampesina: '',
    //idAsociacion:0,
    asociacionCampesina: '',

    discapacidad: '',
    idTipoDiscapacidad: null,

    declaratoriaIndigena: '',
    idTipoDeclaratoriaIndigena:  null,

    lenguaIndigena:'',

    idRegimenPropiedad: null,
    idNivelEstudios: 0,  
    hablaEspanol: ''
  }, // basado en Caracterizacion :contentReference[oaicite:4]{index=4}

  expediente: {
    idEstadoExpediente: null,
    documentosArreglo: [],
    documentos: {
    idTipoDocumentoCredencialElector: 1,
    idTipoDocumentoComprobanteDomicilio: 2,
    idTipoDocumentoLegalPropiedad: 3,
    idTipoDocumentoArrendatario: 4,
    idTipoDocumentoFormatoInscripcionPgn: 5,
    idTipoDocumentoPermisoPesca: 6,
    idTipoDocumentoRfc: 7,
    idTipoDocumentoActaConstitutiva: 8,
  }
  }, // basado en Expediente :contentReference[oaicite:5]{index=5}

  unidadProduccion: [],
 } ,
 credencialElector:         null,
  comprobanteDomicilio:      null,
  documentoArrendatario:     null,
  documentoLegalPropiedad:   null,
  permisoPesca:              null,
  formatoInscripcionPgn:    null,
  actaConstitutiva:         null,// basado en Productor :contentReference[oaicite:6]{index=6}
};
