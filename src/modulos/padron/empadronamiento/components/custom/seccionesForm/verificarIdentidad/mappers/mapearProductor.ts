// src/modulos/padron/empadronamiento/components/custom/seccionesForm/verificarIdentidad/mappers/mapProductorToFormPatch.ts

import type { ProductorResponse } from "../../../../../interfaces/response/productorFisico.response";
import type { CentroProduccion, Coordenadas } from "../../../../../interfaces/centroProducccion.interface";
import type { Documento } from "../../../../../interfaces/expediente.interface";
import { DEFAULT_CENTRO_PRODUCCION, DEFAULT_DOCUMENTOS_IDS, DEFAULT_GEO_CENTRO } from "./valoresDefaults";

export type FormPatch = Record<string, unknown>;

export const mapearProductor= (params: { informacionProductor: ProductorResponse; idTipoPersona: number | null | undefined; }): FormPatch => {
  const { informacionProductor, idTipoPersona } = params;

  const productor = informacionProductor.data;
  if (!productor) return {};

  const infoPersonal = productor.informacionPersonal;

  const patch: FormPatch = {
    // ---------- IDENTIDAD / PERSONAL ----------
    "datos.informacionPersonal.idTipoPersona": idTipoPersona ?? null,
    "datos.idPersona": productor.idPersona ?? null,
    "datos.idPersonaHistorica": productor.idPersonaHistorica ?? null,

    "datos.informacionPersonal.curp": productor.curp ?? null,
    "datos.informacionPersonal.rfc": infoPersonal?.rfc ?? null,
    "datos.informacionPersonal.nss": infoPersonal?.nss ?? null,
    "datos.informacionPersonal.nombre": infoPersonal?.nombre ?? null,
    "datos.informacionPersonal.apellidoPaterno": infoPersonal?.primerApellido ?? null,
    "datos.informacionPersonal.apellidoMaterno": infoPersonal?.segundoApellido ?? null,
    "datos.informacionPersonal.fechaNacimiento": infoPersonal?.fechaNacimiento ?? null,
    "datos.informacionPersonal.sexo": infoPersonal?.idGenero ?? null,
    "datos.informacionPersonal.idEstadoCivil": infoPersonal?.idEstadoCivil ?? null,
    "datos.informacionPersonal.idEntidadNacimiento": infoPersonal?.idEntidadFederativa ?? null,
    "datos.informacionPersonal.idTipoIdentificacion": infoPersonal?.idTipoIdentificacion ?? null,
    "datos.informacionPersonal.numeroIdentificacion": infoPersonal?.numeroIdentificacion ?? null,

    // teléfonos (según tu lógica actual)
    "datos.informacionPersonal.telefonos.1.id": infoPersonal?.idTelefonoAdicional,
    "datos.informacionPersonal.telefonos.0.id": infoPersonal?.idTelefono,
    "datos.informacionPersonal.telefonos.1.numeroTelefono": infoPersonal?.numeroTelefonoAdicional ?? null,
    "datos.informacionPersonal.telefonos.0.numeroTelefono": infoPersonal?.numeroTelefono ?? null,
    "datos.informacionPersonal.telefonos.0.idTipoTelefono": 2,
    "datos.informacionPersonal.telefonos.1.idTipoTelefono": 1,

    "datos.informacionPersonal.correoElectronico": infoPersonal?.correoElectronico ?? null,
    "datos.informacionPersonal.idNacionalidad": infoPersonal?.idNacionalidad ?? null,
  };

  // ---------- DOMICILIO ----------
  if (productor.domicilio) {
    const d = productor.domicilio;
    patch["datos.domicilio.codigoPostal"] = d.codigoPostal ?? null;
    patch["datos.domicilio.idEntidadFederativa"] = d.idEntidadFederativa ?? null;
    patch["datos.domicilio.idMunicipio"] = d.idMunicipio ?? null;
    patch["datos.domicilio.idLocalidad"] = d.idLocalidad ?? null;
    patch["datos.domicilio.idTipoAsentamiento"] = d.idTipoAsentamiento ?? null;
    patch["datos.domicilio.nombreAsentamiento"] = d.nombreAsentamiento ?? "";
    patch["datos.domicilio.idTipoDireccion"] = d.idTipoDireccion ?? null;
    patch["datos.domicilio.idTipoVialidad"] = d.idTipoVialidad ?? null;
    patch["datos.domicilio.nombreVialidad"] = d.nombreVialidad ?? "";
    patch["datos.domicilio.noExterior"] = d.numeroExterior ?? "";
    patch["datos.domicilio.noInterior"] = d.numeroInterior ?? "";
    patch["datos.domicilio.latitud"] = d.latitud ?? null;
    patch["datos.domicilio.longitud"] = d.longitud ?? null;
  }

  // ---------- REGISTRO PRODUCCIÓN ----------
  if (productor.registroProduccion) {
    const registro = productor.registroProduccion;

    patch["datos.registroProduccion.principalesCultivos.0.idDetalleRegistroProduccion"] = registro.idDetalleRegistroProduccion ?? null;

    patch["datos.registroProduccion.idCicloAgricola"] = registro.idCicloAgricola;
    patch["datos.registroProduccion.idSectorAgroalimentario"] = registro.idSectorAgroalimentario ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.idCultivoEspecie"] = registro.idCultivo ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.idTipoCultivo"] = registro.idTipoCultivo ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.superficie"] = registro.superficieHa ?? null;
    patch["datos.registroProduccion.claveUpp"] = registro.claveUppPsg ?? "";
    patch["datos.registroProduccion.principalesCultivos.0.numeroVientresColmenas"] = registro.totalCabezasHato ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.totalCabezasHato"] = registro.totalCabezasHato ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.volumenProduccion"] = registro.volumenProduccionTon ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.valorProduccion"] = registro.valorProduccion ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.precioCultivoEspecie"] = registro.precioCultivoEspecie ?? null;
    patch["datos.registroProduccion.principalesCultivos.0.idRegimenHidrico"] = registro.idRegimenHidrico ?? null;

    // centros de producción
    if (productor.centrosProduccion) {
      const centrosForm: CentroProduccion[] = productor.centrosProduccion.map((centro) => {
        const geoCentro = (centro.georreferencias ?? []).find((g) => g.tipoGeorreferencia === "CENTRO");

        const coordenadasCentro = geoCentro
          ? {
              id: geoCentro.idGeorreferencia ?? null,
              latitud: geoCentro.latitud ?? 0,
              longitud: geoCentro.longitud ?? 0,
              orden: geoCentro.orden ?? null,
              tipoGeorreferencia: geoCentro.tipoGeorreferencia ?? "",
            }
          : { ...DEFAULT_GEO_CENTRO };

        const poligono: Coordenadas[] = (centro.georreferencias ?? [])
          .filter((g) => g.tipoGeorreferencia === "POLIGONO")
          .map((g) => ({
            id: g.idGeorreferencia,
            latitud: g.latitud,
            longitud: g.longitud,
            orden: g.orden,
            tipoGeorreferencia: g.tipoGeorreferencia,
          }));

        return {
          ...DEFAULT_CENTRO_PRODUCCION,
          idCentroProduccion: centro.idCentroProduccion ?? null,
          idTipoCentroProduccion: centro.idTipoCentroProduccion ?? null,
          tipoCentroProduccion: centro.tipoCentroProduccion ?? "",
          nombre: centro.nombreCentroProduccion ?? "",
          idTipoDocumentoLegal: centro.idTipoDocumentoLegal ?? null,
          idEstado: centro.idEntidadFederativa ?? null,
          idMunicipio: centro.idMunicipio ?? null,
          idLocalidad: centro.idLocalidad ?? null,
          tipoDocumentoLegal: centro.tipoDocumentoLegal ?? "",
          nombreEntidadFederativa: centro.nombreEntidadFederativa ?? "",
          nombreMunicipio: centro.nombreMunicipio ?? "",
          nombreLocalidad: centro.nombreLocalidad ?? "",
          georeferencias: {
            coordenadasCentro,
            poligono,
          },
        };
      });

      patch["datos.unidadProduccion"] = centrosForm;
    }
  }

  // ---------- CARACTERIZACIÓN ----------
  if (productor.caracterizacion) {
    const c = productor.caracterizacion;

    patch["datos.caracterizacion.perteneceAsociacionCampesina"] =
      String(c.indAsociacionCampesinaOrganizacionProductores) ?? "";

    patch["datos.caracterizacion.asociacionCampesina"] =
      c.nombreAsociacionCampesinaOrganizacionProductores ?? "";

    patch["datos.caracterizacion.discapacidad"] = String(c.indDiscapacidad) ?? "";
    patch["datos.caracterizacion.idTipoDiscapacidad"] = c.idTipoDiscapacidad ?? null;
    patch["datos.caracterizacion.idNivelEstudios"] = c.idEscolaridad ?? null;
    patch["datos.caracterizacion.hablaEspanol"] = String(c.indEspaniol) ?? "";
    patch["datos.caracterizacion.declaratoriaIndigena"] = String(c.indDeclaratoriaIndigena) ?? "";
    patch["datos.caracterizacion.idTipoDeclaratoriaIndigena"] = c.idTipoDeclaratoriaIndigena ?? null;
    patch["datos.caracterizacion.lenguaIndigena"] = c.nombreLenguaIndigena ?? "";
    patch["datos.caracterizacion.idRegimenPropiedad"] = c.idRegimenPropiedad ?? null;
  }

  // ---------- EXPEDIENTE ----------
  if (productor.expediente) {
    const e = productor.expediente;

    patch["datos.expediente.idEstadoExpediente"] = e.idExpediente ?? 1;

    const expedienteForm: Documento[] = (e.documentos ?? []).map((doc) => ({
      idDocumento: doc.idDocumento ?? null,
      idTipoDocumentoExpediente: doc.idTipoDocumentoExpediente ?? undefined,
      tipoDocumentoExpediente: doc.tipoDocumentoExpediente ?? "",
      indDocumentoDigital: doc.indDocumentoDigital ?? undefined,
      nombreDocumentoDigital: doc.nombreDocumentoDigital ?? "",
      linkDescarga: doc.linkDescarga ?? "",
      file: null,
      eliminado: false,
    }));

    patch["datos.expediente.documentos"] = { ...DEFAULT_DOCUMENTOS_IDS };
    patch["datos.expediente.documentosArreglo"] = expedienteForm;
  }

  return patch;
}
