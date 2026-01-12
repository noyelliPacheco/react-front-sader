// seccionesForm/informacionRegistroProduccion/utils/RHFReactSelect.tsx

import Select from "react-select";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import type { SelectOption } from "./opcionesSelect";

type RHFReactSelectProps<TForm extends FieldValues> = {
  control: Control<TForm>;
  name: Path<TForm>;
  options: SelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
};

export const RHFReactSelect = <TForm extends FieldValues>({
  control,
  name,
  options,
  placeholder = "SELECCIONA",
  isDisabled,
  isLoading,
}: RHFReactSelectProps<TForm>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const raw = field.value;
        const numericValue =
          raw === "" || raw === null || raw === undefined ? undefined : Number(raw);

        const selected = options.find((o) => o.value === numericValue) ?? null;

        return (
          <Select
            inputId={name}
            options={options}
            value={selected}
            onChange={(opt) => field.onChange(opt ? opt.value : null)}
            onBlur={field.onBlur}
            isDisabled={isDisabled}
            isLoading={isLoading}
            placeholder={placeholder}
            isClearable
            menuPortalTarget={document.body}
            styles={{
              control: (base) => ({
                ...base,
                border: 0,
                boxShadow: "none",
                background: "transparent",
                minHeight: "2.25rem",
              }),
              valueContainer: (base) => ({ ...base, paddingLeft: 0 }),
              indicatorsContainer: (base) => ({ ...base, paddingRight: 0 }),
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        );
      }}
    />
  );
};
