import type { ProductorCreateResponse, ProductorResponse } from "../response/productorFisico.response";

export const dummyProductorResponse: ProductorResponse = {
  success: true,
  message: "Consulta realizada correctamente.",
  data: {
      curp: "CABJ880209HMNBRL06",
      idPersona: 2147483647,
      idPersonaHistorica: 2147483647,
      informacionPersonal: {
          rfc: "CABJ880209HMN",
          nombre: "JULIO ADRIAN",
          primerApellido: "CABALLERO",
          segundoApellido: "BARAJAS",
          fechaNacimiento: new Date("1988-02-09"),
          idEstadoCivil: 1,
          idGenero: 1,
          idEntidadFederativa: null,
          idNacionalidad: 1,
          idTipoIdentificacion: 1,
          correoElectronico: "test@example.com",
          idTelefono: 1,
          numeroTelefono: "5512345678",
          idTelefonoAdicional: null,
          numeroTelefonoAdicional: null
      },
      domicilio: {
          idDomicilio: 21346903,
          codigoPostal: null,
          idEntidadFederativa: 16,
          idMunicipio: 784,
          idLocalidad: 144254,
          centroIntegrador: null,
          idTipoAsentamiento: 33,
          nombreAsentamiento: "AGUILILLA ",
          idTipoDireccion: null,
          idTipoVialidad: 5,
          nombreVialidad: "JESUS MADRIGAL ",
          numeroExterior: null,
          numeroInterior: null,
          latitud: null,
          longitud: null
      },
      caracterizacion: {
          idCaracterizacion: null,
          indAsociacionCampesinaOrganizacionProductores: false,
          nombreAsociacionCampesinaOrganizacionProductores: null,
          idRegimenPropiedad: null,
          idEscolaridad: 1,
          indDiscapacidad: true,
          idTipoDiscapacidad: 1,
          indEspaniol: false,
          indDeclaratoriaIndigena: true,
          idTipoDeclaratoriaIndigena: 0
      },
      registroProduccion: {
          idRegistroProduccion: 1,
          idSectorAgroalimentario: 1,
          claveUppPsg: "001",
          idDetalleRegistroProduccion: 1,
          idCultivo: 1,
          superficieHa: "10.00",
          totalCabezasHato: null,
          volumenProduccionTon: "1.00",
          valorProduccion: "1.00",
          precioCultivoEspecie: "1000.00",
          idRegimenHidrico: 1
      },
      centrosProduccion: [
          {
              idCentroProduccion: 1,
              idTipoCentroProduccion: 1,
              tipoCentroProduccion: "Predio",
              nombreCentroProduccion: "Predios el palomar",
              idTipoDocumentoLegal: 1,
              tipoDocumentoLegal: "COPIA CERTIFICADA DE LA SENTENCIA DEL TRIBUNAL AGRARIO SIN AUTO QUE LA DECLARE EJECUTORIADA PARA LA DECLARACION DE LOS DERECHOS DE SUCESION Y CORRECCION DE DATOS Y ACUSE DE RECIBO DE LA SOLICITUD DE INSCRIPCION DE LA SENTENCIA DEL RAN",
              idEntidadFederativa: 1,
              nombreEntidadFederativa: "AGUASCALIENTES",
              idMunicipio: 1,
              nombreMunicipio: "AGUASCALIENTES",
              idLocalidad: 1,
              nombreLocalidad: "AGUASCALIENTES",
              georreferencias: [
                  {
                      idGeorreferencia: 1,
                      tipoGeorreferencia: "CENTROIDE",
                      latitud: 10.34234234,
                      longitud: 26.12312321,
                      orden: null
                  }
              ]
          },
          {
              idCentroProduccion: 2,
              idTipoCentroProduccion: 2,
              tipoCentroProduccion: "Granja Acuícola",
              nombreCentroProduccion: "Rancho Rio Grande",
              idTipoDocumentoLegal: 2,
              tipoDocumentoLegal: "COPIA CERTIFICADA DE LA SENTENCIA DEL TRIBUNAL AGRARIO SIN AUTO QUE LA DECLARE EJECUTORIADA PARA LA DECLARACION DE LOS DERECHOS DE SUCESION Y CORRECCION DE DATOS Y ACUSE DE RECIBO DE LA SOLICITUD DE INSCRIPCION DE LA SENTENCIA DEL RAN",
              idEntidadFederativa: 1,
              nombreEntidadFederativa: "AGUASCALIENTES",
              idMunicipio: 1,
              nombreMunicipio: "AGUASCALIENTES",
              idLocalidad: 2,
              nombreLocalidad: "GRANJA ADELITA",
              georreferencias: [
                  {
                      idGeorreferencia: 2,
                      tipoGeorreferencia: "POLIGONO",
                      latitud: 11.34234234,
                      longitud: 22.12312321,
                      orden: 1
                  },
                  {
                      idGeorreferencia: 3,
                      tipoGeorreferencia: "POLIGONO",
                      latitud: 12.34234234,
                      longitud: 23.12312321,
                      orden: 2
                  },
                  {
                      idGeorreferencia: 4,
                      tipoGeorreferencia: "POLIGONO",
                      latitud: 13.34234234,
                      longitud: 24.12312321,
                      orden: 3
                  },
                  {
                      idGeorreferencia: 5,
                      tipoGeorreferencia: "POLIGONO",
                      latitud: 14.34234234,
                      longitud: 25.12312321,
                      orden: 4
                  },
                  {
                      idGeorreferencia: 6,
                      tipoGeorreferencia: "POLIGONO",
                      latitud: 15.34234234,
                      longitud: 26.12312321,
                      orden: 5
                  }
              ]
          }
      ],
      expediente: {
          idExpediente: 1,
          documentos: [
              {
                  idDocumento: 1,
                  idTipoDocumentoExpediente: 1,
                  tipoDocumentoExpediente: "CREDENCIAL DE ELECTOR",
                  indDocumentoDigital: true,
                  nombreDocumentoDigital: "ine_copia.pdf",
                  linkDescarga: "agricultura/padron/expediente_digital/21/47/48/36/47/2147483647/ine_copia.pdf"
              },
              {
                  idDocumento: 2,
                  idTipoDocumentoExpediente: 2,
                  tipoDocumentoExpediente: "COMPROBANTE DOMICILIO CFE",
                  indDocumentoDigital: false,
                  nombreDocumentoDigital: null,
                  linkDescarga: null
              }
          ]
      },
      estatusRenapo: "RCN"
  }
}

export const dummyCreateProductorResponse: ProductorCreateResponse = {
   message: "Productor empadronado exitosamente",
    success: true,
    data: {
        mensaje: "Productor empadronado exitosamente",
        identificador: "00000032",
        accion: "CREADO"
    },
    code: 200,
}