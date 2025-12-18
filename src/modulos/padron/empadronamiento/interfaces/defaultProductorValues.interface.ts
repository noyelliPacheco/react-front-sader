import type { Productor } from "./productor.interface";


export const defaultProductorValues: Productor = {
  idPersona: 0,
  folio: '',
  personal: {
    idTipoPersona: "",
    curp: "",
    rfc: "",
    llaveMx: false,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: new Date(), // o new Date("2000-01-01") si prefieres fijo
    sexo: "",
    idEstadoCivil: "",
    idEntidadNacimiento: "",
    idTipoIdentificacion: "",
    telefonos: [{
    idTelefono: 1,
    numeroTelefono : '',
  }, {
    idTelefono: 2,
    numeroTelefono : '',
  },]  ,
    correoElectronico: "",
    idNacionalidad: "",
    numeroIdentificacion:""
  }, // basado en Personal :contentReference[oaicite:1]{index=1}

  domicilio: {
    codigoPostal: null,
    idEntidadFederativa: "",
    entidadNombre: "",
    idMunicipio: "",
    municipioNombre: "",
    idLocalidad: "",
    localidadNombre: "",
    //idCentroIntegrador: 0,
    //centroIntegrador: "",
    idTipoAsentamiento: 0,
    nombreAsentamiento: "",
    idTipoDireccion: 0,
    idTipoVialidad: 0,
    nombreVialidad: "",
    noExterior: null,
    noInterior: null,
    latitud: "",
    longitud: "",
  }, // basado en Domicilio :contentReference[oaicite:2]{index=2}

  registroDeProduccion: {   

  principalesCultivos:[{
    idCultivoEspecie : 0,  
    idTipoCultivo : 0,
    superficie: "",
    numeroVientresColmenas: "",
    totalCabezasHato: "",
    volumenProduccion: "",
    valorProduccion: "",
    precioCultivoEspecie: 0,
    idRegimenHidrico: 0,
  }],

    idSectorAgroalimentario: 0,
    idCicloAgricola: 0,
    claveUpp: "",
    
  }, // basado en RegistroDeProduccion :contentReference[oaicite:3]{index=3}

  caracterizacion: {
    perteneceAsociacionCampesina: '',
    //idAsociacion:0,
    asociacionCampesina: '',

    discapacidad: '',
    idTipoDiscapacidad: '',

    declaratoriaIndigena: '',
    idTipoDeclaratoriaIndigena:  '',

    lenguaIndigena: 0,

    idRegimenPropiedad: 0,
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

  unidadProduccion: [], // basado en Productor :contentReference[oaicite:6]{index=6}
};
