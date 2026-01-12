


export const toUpperTrim = (value: string) => (value || "").toUpperCase().trim();

export const onlyDigitsMax = (value: string, max: number) =>
  (value || "").replace(/\D/g, "").slice(0, max);

export const toNumberOrUndef = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};
