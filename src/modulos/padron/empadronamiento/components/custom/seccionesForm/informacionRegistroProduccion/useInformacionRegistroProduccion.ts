// seccionesForm/informacionRegistroProduccion/useInformacionRegistroProduccion.ts

import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import type { UseQueryResult } from "@tanstack/react-query";

import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../../interfaces/productor.interface";
import { toSelectOptions } from "./utils/opcionesSelect";

type UseInformacionRegistroProduccionParams = {
  catalogos: {
    sectorAlimentario: UseQueryResult<CatalogoResponse, Error>;
    cultivosEspecies: UseQueryResult<CatalogoResponse, Error>;
    tipoCultivo: UseQueryResult<CatalogoResponse, Error>;
    regimenHidrico: UseQueryResult<CatalogoResponse, Error>;
  };
};

export const useInformacionRegistroProduccion = ({ catalogos }: UseInformacionRegistroProduccionParams) => {
  const { control } = useFormContext<Productor>();

  const responseAgroalimentario = catalogos.sectorAlimentario.data;
  const responseCultivoEspecie = catalogos.cultivosEspecies.data;
  const responseTipoCultivo = catalogos.tipoCultivo.data;
  const responseRegimenHidrico = catalogos.regimenHidrico.data;

  const cultivoEspecieOptions = useMemo(
    () => toSelectOptions(responseCultivoEspecie?.data),
    [responseCultivoEspecie]
  );

  return {
    control,
    responseAgroalimentario,
    responseTipoCultivo,
    responseRegimenHidrico,
    cultivoEspecieOptions,
    isCultivoLoading: catalogos.cultivosEspecies.isFetching,
  };
};
