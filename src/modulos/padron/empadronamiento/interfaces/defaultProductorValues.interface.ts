import type { Productor } from "./productor.interface";


export const defaultProductorValues: Productor = {
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
    telefonoCelular: "",
    numeroTelefono: "",
    idTipoTelefono: "",
    correoElectronico: "",
    idNacionalidad: "",
  }, // basado en Personal :contentReference[oaicite:1]{index=1}

  domicilio: {
    codigoPostal: null,
    idEntidad: "",
    entidadNombre: "",
    idMunicipio: "",
    municipioNombre: "",
    idLocalidad: "",
    localidadNombre: "",
    idCentroIntegrador: 0,
    centroIntegrador: "",
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
    idSectorAgroalimentario: 0,
    idCultivosEspecies: "",
    idTipoCultivo: 0,
    superficie: "",
    claveUppPsg: "",
    cantidadVientresColmenas: "",
    cantidadCabezas: "",
    volumenProduccion: "",
    valorProduccion: "",
    precioCultivo: 0,
    precioCultivoEspecie: 0,
    regimenHidrico: 0,
  }, // basado en RegistroDeProduccion :contentReference[oaicite:3]{index=3}

  caracterizacion: {
    tieneAsociacion: "",
    idAsociacion: "",
    tieneDiscapacidad: "",
    idDiscapacidad: "",
    pertenecePoblacionIndigena: "",
    idPoblacionIndigena: "",
    idRegimenPropiedad: "",
    nivelEstudios: "",
    hablaEspañol: "",
  }, // basado en Caracterizacion :contentReference[oaicite:4]{index=4}

  expediente: {
    idExpediente: null,
    documentos: [],
  }, // basado en Expediente :contentReference[oaicite:5]{index=5}

  centroProduccion: [], // basado en Productor :contentReference[oaicite:6]{index=6}
  folio: "",
};
