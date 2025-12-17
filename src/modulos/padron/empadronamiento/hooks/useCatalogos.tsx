import { useQuery } from '@tanstack/react-query'

import { obtenerTipoPersona, obtenerEntidadFederativa, obtenerEstadoCivil,
    obtenerSexo,obtenerTipoIdentificacion,obtenerMunicipio,obtenerLocalidad,
    obtenerCentroIntegrador,
    obtenerTipoVialidad,
    obtenerTipoTelefono,
    obtenerTipoRegimen,
    obtenerTipoDocumentoLegal,
    obtenerTipoAsentamientoHumano,
    obtenerTipoDiscapacidad,
    obtenerSectorAgroalimentario,
    obtenerRegimenHidrico,
    obtenerOrganizacion,
    obtenerNacionalidad,
    obtenerEscolaridad,
    obtenerCultivoEspecie,
    obtenerCicloAgricola,
    obtenerTipoDireccion,
    obtenerTipoCultivo,
    obtenerPoblacionIndigena,
    obtenerDocumentoExpediente
} from '../actions/obtener-catalogos.actions';

export const useCatalogosTipoPersona = () => {

    //Todo: viene lógica

  return useQuery({
    queryKey: ['tipoPersona'],
    queryFn: obtenerTipoPersona,
    staleTime: 1000 * 60 *15,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  
};

export const useCatalogosEntidadFederativa = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['entidadFederativa'],
        queryFn: obtenerEntidadFederativa,
    });  
};

export const useCatalogosEstadoCivil = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['estadoCivil'],
        queryFn: obtenerEstadoCivil,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosSexo = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['sexo'],
        queryFn: obtenerSexo,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoIdentificacion = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['tipoIdentificacion'],
        queryFn: obtenerTipoIdentificacion,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

/*** SECCIÓN DOMICILIO ***/

export const useCatalogosMunicipio = (idEntidad?: number) => {
  return useQuery({
    queryKey: ["catalogos-municipio", idEntidad],
    queryFn: () => obtenerMunicipio(idEntidad as number),
    enabled: !!idEntidad && idEntidad > 0, // solo consulta si hay entidad
  });
};

export const useCatalogosLocalidad = (idMunicipio?: number) => {
  return useQuery({
    queryKey: ["catalogos-localidad", idMunicipio],
    queryFn: () => obtenerLocalidad(idMunicipio as number),
    enabled: !!idMunicipio && idMunicipio > 0, // solo consulta si hay municipio
  });
};

export const useCatalogosTipoVialidad = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['tipoVialidad'],
        queryFn: obtenerTipoVialidad,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoTelefono = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['tipoTelefono'],
        queryFn: obtenerTipoTelefono,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoDireccion = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['tipoDireccion'],
        queryFn: obtenerTipoDireccion,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    }); 
};

export const useCatalogosTipoCultivo = () => {

    //Todo: viene lógica

  return useQuery({
        queryKey: ['cultivos'],
        queryFn: obtenerTipoCultivo,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoRegimen = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['regimen'],
        queryFn: obtenerTipoRegimen,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoDocumentoLegal = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['documentoLegal'],
        queryFn: obtenerTipoDocumentoLegal,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoAsentamientoHumano = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['asentamiento'],
        queryFn: obtenerTipoAsentamientoHumano,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosTipoDiscapacidad = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['discapacidad'],
        queryFn: obtenerTipoDiscapacidad,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosSectorAgroalimentario = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['sectorAgroalimentario'],
        queryFn: obtenerSectorAgroalimentario,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosRegimenHidrico = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['regimenHidrico'],
        queryFn: obtenerRegimenHidrico,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosOrganizacion = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['organizacion'],
        queryFn: obtenerOrganizacion,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};
export const useCatalogosNacionalidad = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['nacionalidad'],
        queryFn: obtenerNacionalidad,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosEscolaridad = () => {
    //Todo: viene lógica
  return useQuery({
        queryKey: ['escolaridad'],
        queryFn: obtenerEscolaridad,
        staleTime: 1000 * 60 *15,
        refetchOnReconnect: false,
        refetchOnMount: false,
    });  
};

export const useCatalogosCultivoEspecie = () => {
    //Todo: viene lógica
  return useQuery({
    queryKey: ['cultivosEspecie'],
    queryFn: obtenerCultivoEspecie,
    staleTime: 1000 * 60 *15,
    refetchOnReconnect: false,
    refetchOnMount: false,
    });  
};

export const useCatalogosCicloAgricola = () => {
    //Todo: viene lógica
  return useQuery({
    queryKey: ['cicloAgricola'],
    queryFn: obtenerCicloAgricola,
    staleTime: 1000 * 60 *15,
    refetchOnReconnect: false,
    refetchOnMount: false,
    });  
};

export const useCatalogosCentroIntegrador = () => {

    //Todo: viene lógica

  return useQuery({
    queryKey: ['centroIntegrador'],
    queryFn: obtenerCentroIntegrador,
    staleTime: 1000 * 60 *15,
    refetchOnReconnect: false,
    refetchOnMount: false,
    });  
};

export const useCatalogosPoblacionIndigena = () => {

    //Todo: viene lógica

  return useQuery({
    queryKey: ['poblacionIndigena'],
    queryFn: obtenerPoblacionIndigena,
    staleTime: 1000 * 60 *15,
    refetchOnReconnect: false,
    refetchOnMount: false,
    });  
};
export const useCatalogosDocumentosExpediente = () => {

    //Todo: viene lógica

  return useQuery({
    queryKey: ['documentoExpediente'],
    queryFn: obtenerDocumentoExpediente,
    staleTime: 1000 * 60 *15,
    refetchOnReconnect: false,
    refetchOnMount: false,
    });  
};

