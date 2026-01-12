export const toUpper = (value: string) => (value ?? "").toUpperCase();

export const toUpperOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.target.value = toUpper(e.target.value);
};

export const toNumberOrUndef = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};
