import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";

import type { UseQueryResult } from "@tanstack/react-query";
import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../../interfaces/productor.interface";

import { toSelectOptions } from "./utils/opcionesSelect";

type UseInformacionDomicilioParams = {
  catalogos: {
    entidadFederativa: UseQueryResult<CatalogoResponse, Error>;
    municipio: UseQueryResult<CatalogoResponse, Error>;
    localidad: UseQueryResult<CatalogoResponse, Error>;
    tipoAsentamiento: UseQueryResult<CatalogoResponse, Error>;
    tipoDireccion: UseQueryResult<CatalogoResponse, Error>;
    tipoVialidad: UseQueryResult<CatalogoResponse, Error>;
  };
};

export const useInformacionDomicilio = ({ catalogos }: UseInformacionDomicilioParams) => {
  const { watch, setValue, control } = useFormContext<Productor>();

  const idEstado = watch("datos.domicilio.idEntidadFederativa");
  const idMunicipio = watch("datos.domicilio.idMunicipio");

  const optionsEstados = useMemo(
    () => toSelectOptions(catalogos.entidadFederativa.data?.data),
    [catalogos.entidadFederativa.data]
  );

  const optionsMunicipios = useMemo(
    () => toSelectOptions(catalogos.municipio.data?.data),
    [catalogos.municipio.data]
  );

  const optionsLocalidades = useMemo(
    () => toSelectOptions(catalogos.localidad.data?.data),
    [catalogos.localidad.data]
  );

  // ✅ Guardas previos para detectar cambios reales
  const prevEstadoRef = useRef<typeof idEstado>(undefined);
  const prevMunicipioRef = useRef<typeof idMunicipio>(undefined);

  // ✅ Cambia Estado => limpia Municipio+Localidad (pero NO al montar)
  useEffect(() => {
    const prev = prevEstadoRef.current;
    prevEstadoRef.current = idEstado;

    // primer render => no limpiar
    if (prev === undefined) return;

    // si no cambió => no hacer nada
    if (prev === idEstado) return;

    setValue("datos.domicilio.idMunicipio", null, { shouldDirty: true, shouldValidate: true });
    setValue("datos.domicilio.idLocalidad", null, { shouldDirty: true, shouldValidate: true });
  }, [idEstado, setValue]);

  // ✅ Cambia Municipio => limpia Localidad (pero NO al montar)
  useEffect(() => {
    const prev = prevMunicipioRef.current;
    prevMunicipioRef.current = idMunicipio;

    if (prev === undefined) return;
    if (prev === idMunicipio) return;

    setValue("datos.domicilio.idLocalidad", null, { shouldDirty: true, shouldValidate: true });
  }, [idMunicipio, setValue]);

  return {
    control,
    optionsEstados,
    optionsMunicipios,
    optionsLocalidades,
    responseAsentamiento: catalogos.tipoAsentamiento.data,
    responseDireccion: catalogos.tipoDireccion.data,
    responseVialidad: catalogos.tipoVialidad.data,
  };
};
