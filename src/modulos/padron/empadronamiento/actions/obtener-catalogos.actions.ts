import { xamanApi } from "@/api/xamanApi";
import type { CatalogoResponse } from "../interfaces/response/catalogos.response";
//import  { DocumentoExpedienteDummy } from "../interfaces/data/catalogo.data";




export  const obtenerTipoPersona = async(): Promise<CatalogoResponse> =>{

    //const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-persona');
    const data = {
        message: '',
        success: true,
        data: [{
            id: 1,
            nombre : 'Persona física',
            clave : 'F',
        },
        {
            id: 2,
            nombre : 'Persona moral',
            clave : 'M',
        }],
        code:    500
    }

    return data;
};

export  const obtenerEntidadFederativa = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/entidad-federativa');
    return data;
};

export  const obtenerEstadoCivil = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/estado-civil');

    return data;
};

export  const obtenerSexo = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/genero');

    return data;
};

export  const obtenerTipoIdentificacion = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-identificacion');
    console.log(data);

    return data;
};
/*** SECCIÓN DOMICILIO ***/

export  const obtenerMunicipio = async(idEntidad:number): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>(`/api/v1/catalogos/municipio?id_nu_entidad_federativa=${idEntidad}`);

    return data;
};

export  const obtenerLocalidad = async(idMunicipio:number): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>(`/api/v1/catalogos/localidad?id_nu_municipio=${idMunicipio}`);

    return data;
};

export  const obtenerTipoVialidad = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-vialidad');

    return data;
};

export  const obtenerTipoTelefono = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-telefono');

    return data;
};

export  const obtenerTipoRegimen = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-regimen');

    return data;
};

export  const obtenerTipoDocumentoLegal = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-documento-legal');

    return data;
};

export  const obtenerTipoAsentamientoHumano = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-asent-humano');

    return data;
};

export  const obtenerTipoDireccion = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-direccion');

    return data;
};

export  const obtenerTipoCultivo = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-cultivo');

    return data;
};

export  const obtenerTipoDiscapacidad = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-discapacidad');

    return data;
};

export  const obtenerSectorAgroalimentario = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/sector-agroalimentario');

    console.log('Sector Agroalimentario');
    console.log(data);

    return data;
};

export  const obtenerRegimenHidrico = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/regimen-hidrico');

    return data;
};

export  const obtenerOrganizacion = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/organizacion');

    return data;
};

export  const obtenerNacionalidad = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/nacionalidad');

    return data;
};

export  const obtenerEscolaridad = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/escolaridad');

    return data;
};

export  const obtenerCultivoEspecie = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/cultivo-especie');

    return data;
};

export  const obtenerCicloAgricola = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/ciclo-agricola');

    return data;
};

export  const obtenerCentroIntegrador = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/entidad-federativa');

    return data;
};

export  const obtenerPoblacionIndigena = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/entidad-federativa');

    return data;
};

export  const obtenerDocumentoExpediente = async(): Promise<CatalogoResponse> =>{
    const { data } = await xamanApi.get<CatalogoResponse>('/api/v1/catalogos/tipo-documento-expediente');
    //const data = DocumentoExpedienteDummy;
    return data;
};