import { toast } from "sonner";
import { useFormContext } from "react-hook-form";

import { useBuscarProductor } from "../../../../hooks/useProductor";
import type { Productor } from "../../../../interfaces/productor.interface";

import { mapearProductor } from "./mappers/mapearProductor";
import { aplicarPatch } from "./utils/aplicarPatch"; // <-- ajusta si tu archivo se llama distinto

type UseVerificarIdentidadParams = {
  onNext: () => void;
  actualizar: () => void;
};

export const useVerificarIdentidad = ({ onNext, actualizar }: UseVerificarIdentidadParams) => {
  const { watch, getValues, setValue } = useFormContext<Productor>();

  const idTipoPersona = watch("datos.informacionPersonal.idTipoPersona");
  const curp = watch("datos.informacionPersonal.curp");

  const { refetch, isFetching } = useBuscarProductor(Number(idTipoPersona), curp, {
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data.message, {
          position: "bottom-center",
        });
        return;
      }

      if (!data?.data) {
        toast.error(
          "No se encontró un productor con la combinación de tipo de persona y CURP ingresada.",
          { position: "bottom-center" }
        );
        return;
      }

      // 1) Mapper -> Patch
      const patch = mapearProductor({
        informacionProductor: data,
        idTipoPersona: idTipoPersona ?? null,
      });

      // 2) Aplica patch al form
      aplicarPatch(setValue, patch, {
        shouldDirty: false,
        shouldValidate: false,
        shouldTouch: false,
      });

      // 3) Si ya hay idPersona, refresca datos externos
      const idPersona = getValues("datos.idPersona");
      if (idPersona != null) {
        actualizar();
      }

      // 4) Siguiente step
      onNext();
    },

    onError: () => {
      toast.error("Error al consultar la información del productor.", {
        position: "bottom-center",
      });
    },
  });

  // Acción del botón "Consultar"
  const buscarProductor = () => {
    const tipo = watch("datos.informacionPersonal.idTipoPersona");
    const curpValue = watch("datos.informacionPersonal.curp");

    if (!tipo || !curpValue) return;
    refetch();
  };

  return {
    idTipoPersona,
    curp,
    isFetching,
    buscarProductor,
  };
};
