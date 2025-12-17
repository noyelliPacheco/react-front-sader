import { useQuery } from '@tanstack/react-query'
import { obtenerProductorFisico, obtenerProductorMoral } from '../actions/obtener-productor.actions';
import type { ProductorResponse } from '../interfaces/response/productorFisico.response';
import { useEffect } from 'react';

interface UseBuscarProductorOptions {
  onSuccess?: (response: ProductorResponse) => void;
  onError?: (error: unknown) => void;
}

export const useBuscarProductor = (idTipoPersona:number, curp:string, options?: UseBuscarProductorOptions) => {

    const query = useQuery({
        queryKey: ["productor", idTipoPersona, curp],
        queryFn: () => {
            if (!idTipoPersona) {throw new Error("El tipo de persona es requerido");}
            if (!curp) {throw new Error("La CURP es requerida");}

            if (idTipoPersona === 1) { return obtenerProductorFisico(curp); }

            return obtenerProductorMoral(curp);
        },
        // Para que solo se dispare cuando tú quieras (por ejemplo, al dar clic en "Consultar")
        enabled: false,
        retry: false,        
        
  });
    const { data, isError, error, isSuccess } = query;
    // “onSuccess” versión v5
    useEffect(() => {
        if (!isSuccess || !data) return;
        options?.onSuccess?.(data);
    }, [isSuccess, data, options?.onSuccess]);
    // “onError” versión v5
    useEffect(() => {
        if (!isError) return;
        options?.onError?.(error);
    }, [isError, error, options?.onError]);

    return query;
};