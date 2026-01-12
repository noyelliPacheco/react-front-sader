export type SelectOption = { value: number; label: string };

export const toSelectOptions = (items: Array<{ id: number; nombre: string }> | undefined): SelectOption[] =>
  (items ?? []).map((x) => ({ value: x.id, label: x.nombre }));

export const findOptionByValue = (options: SelectOption[], value: number | null | undefined) =>
  value == null ? null : options.find((o) => o.value === value) ?? null;
