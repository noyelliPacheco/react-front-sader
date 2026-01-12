
import type { FieldValues, UseFormGetValues, UseFormSetValue } from "react-hook-form";

export const initTelefonosDefaults = <TFormValues extends FieldValues>(
  setValue: UseFormSetValue<TFormValues>,
  getValues: UseFormGetValues<TFormValues>
) => {
  // Regla acordada:
  // telefonos.0.idTipoTelefono = 2
  // telefonos.1.idTipoTelefono = 1

  const t0 = getValues("datos.informacionPersonal.telefonos.0.idTipoTelefono" as any);
  const t1 = getValues("datos.informacionPersonal.telefonos.1.idTipoTelefono" as any);

  // Solo setear si no existe, para no pisar si ya venía del paso anterior / backend
  if (t0 == null || t0 === "" || Number(t0) === 0) {
    setValue("datos.informacionPersonal.telefonos.0.idTipoTelefono" as any, 2 as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }

  if (t1 == null || t1 === "" || Number(t1) === 0) {
    setValue("datos.informacionPersonal.telefonos.1.idTipoTelefono" as any, 1 as any, {
      shouldDirty: false,
      shouldValidate: false,
      shouldTouch: false,
    });
  }
};
