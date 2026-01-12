import Select from "react-select";
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import type { SelectOption } from "./opcionesSelect";
import { cn } from "@/lib/utils";

type RHFReactSelectProps<TForm extends FieldValues> = {
  control: Control<TForm>;
  name: Path<TForm>;
  options: SelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  error?: boolean;
};

export const RHFReactSelect = <TForm extends FieldValues>({
  control,
  name,
  options,
  placeholder = "SELECCIONA",
  isDisabled,
  isLoading,
  error,
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
          <div className={cn("border-b border-gray-300", error && "border-validation-mistake")}>
            <Select
              inputId={name}
              options={options}
              value={selected}
              onChange={(opt) => field.onChange(opt ? opt.value : undefined)}
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
                placeholder: (base) => ({ ...base, color: "#9ca3af" }),
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>
        );
      }}
    />
  );
};
