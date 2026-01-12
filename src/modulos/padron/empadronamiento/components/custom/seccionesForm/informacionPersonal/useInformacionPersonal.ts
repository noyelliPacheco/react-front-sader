import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import type { Productor } from "../../../../interfaces/productor.interface";
import { initTelefonosDefaults } from "./utils/inicializadoresDefault";

export const useInformacionPersonal = () => {
  const { watch, getValues, setValue } = useFormContext<Productor>();

  // Solo para mostrar (readonly)
  const curp = watch("datos.informacionPersonal.curp");

  useEffect(() => {
    initTelefonosDefaults(setValue, getValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    curp,
  };
};
