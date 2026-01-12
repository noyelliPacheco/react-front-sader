export const sanitizeDecimalText = (raw: string) => {
  let v = raw ?? "";

  // 1) deja solo dígitos y punto
  v = v.replace(/[^\d.]/g, "");

  // 2) permite solo UN punto
  const parts = v.split(".");
  if (parts.length > 2) {
    v = parts[0] + "." + parts.slice(1).join("");
  }

  // 3) si empieza con ".", lo convertimos a "0."
  if (v.startsWith(".")) v = "0" + v;

  return v;
};

export const decimalOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = sanitizeDecimalText(e.target.value);
};

export const decimalSetValueAs = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export const digitsMaxOnChange = (max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = (e.target.value ?? "").replace(/\D/g, "").slice(0, max);
};

export const digitsSetValueAs = (v: unknown) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
