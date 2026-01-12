export type SelectOption = { value: number; label: string };

export const toSelectOptions = (items: Array<{ id: number; nombre: string }> | undefined): SelectOption[] => {
  return (items ?? []).map((x) => ({ value: x.id, label: x.nombre }));
};

export const findOptionByValue = (options: SelectOption[], value: number | undefined | null) => {
  if (value == null) return null;
  return options.find((o) => o.value === value) ?? null;
};
