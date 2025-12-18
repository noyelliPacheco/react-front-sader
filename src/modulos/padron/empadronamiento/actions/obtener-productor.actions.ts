import { xamanApi } from "@/api/xamanApi";
import type { ProductorCreateResponse, ProductorResponse } from "../interfaces/response/productorFisico.response";
import type { Productor } from "../interfaces/productor.interface";

import { dummyCreateProductorResponse, dummyProductorResponse } from "../interfaces/data/derechohabienteFisica";



export  const obtenerProductorFisico = async(curp: string): Promise<ProductorResponse> =>{

    const { data } = await xamanApi.get<ProductorResponse>(`api/v1/padron/consulta/persona/fisica/${curp}`);
    //const data = dummyProductorResponse;
    // const data = {
    //     message: '¡¡Esto salio mal!!',
    //     success: true,
    //     data: [],
    //     code:    500
    // }
    console.log(data);

    return data;
};

export  const obtenerProductorMoral = async(curp: string): Promise<ProductorResponse> =>{

    const { data } = await xamanApi.get<ProductorResponse>(`/v1/padron/consulta/persona/moral/${curp}`);
    console.log('Consulta del productor con persona Moral');
    /*const data = {
        message: '',
        success: true,
        data: [],
        code:    500
    }*/

    return data;
};

export const crearRegistroProductorFisico = async ( formProductor: Productor ): Promise<ProductorCreateResponse> => {
    const { data } = await xamanApi.post<ProductorCreateResponse>("/v1/padron/empadronarProductor/",formProductor);
    //const data = dummyCreateProductorResponse;

    return data;
};

export  const crearRegistroProductorMoral = async(formProductor: Productor): Promise<ProductorCreateResponse> =>{
    const { data } = await xamanApi.post<ProductorCreateResponse>("/v1/padron/empadronarProductor/",formProductor);
    return data;
};