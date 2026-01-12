import type { FieldValues, UseFormSetValue } from "react-hook-form";

export type FormPatch = Record<string, unknown>;

type ApplyPatchOptions = {
  shouldValidate?: boolean;
  shouldDirty?: boolean;
  shouldTouch?: boolean;
};

/**
 * Aplica un "patch" (objeto { "ruta.campo": valor }) usando setValue de react-hook-form.
 * Mantiene el mapper desacoplado de RHF.
 */
export const aplicarPatch = <TFormValues extends FieldValues>(
  setValue: UseFormSetValue<TFormValues>,
  patch: FormPatch,
  options?: ApplyPatchOptions
) => {
  const opts: Required<ApplyPatchOptions> = {
    shouldValidate: false,
    shouldDirty: false,
    shouldTouch: false,
    ...(options ?? {}),
  };

  Object.entries(patch).forEach(([path, value]) => {
    setValue(path as any, value as any, opts);
  });
};
