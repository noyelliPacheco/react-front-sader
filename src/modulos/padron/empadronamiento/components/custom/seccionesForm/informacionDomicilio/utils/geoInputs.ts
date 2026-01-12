export const sanitizeGeoText = (raw: string) => {
  let v = raw ?? "";

  // permite dígitos, punto y guion
  v = v.replace(/[^\d.-]/g, "");

  // solo un '-' y solo al inicio
  const neg = v.startsWith("-");
  v = v.replace(/-/g, "");
  if (neg) v = "-" + v;

  // solo un '.'
  const parts = v.split(".");
  if (parts.length > 2) {
    v = parts[0] + "." + parts.slice(1).join("");
  }

  // arreglos de inicio: "." -> "0." y "-." -> "-0."
  if (v.startsWith(".")) v = "0" + v;
  if (v.startsWith("-.")) v = "-0" + v.slice(1);

  return v;
};

export const geoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  e.target.value = sanitizeGeoText(e.target.value);
};

export const geoSetValueAs = (v: unknown) => {
  // RHF típicamente pasa string aquí
  if (v === "" || v === "-" || v === "." || v === "-.") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export const geoOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  let v = e.target.value;

  if (typeof v !== "string") return;

  // Quita el punto final si existe
  if (v.endsWith(".")) v = v.slice(0, -1);

  // Casos inválidos finales
  if (v === "-" || v === "") {
    e.target.value = "";
    return;
  }

  // Normaliza a número si es posible
  const n = Number(v);
  e.target.value = Number.isFinite(n) ? String(n) : "";
};

export const geoRequired = (label: string) => (v: unknown) => {
  // v ya es number|undefined por geoSetValueAs
  if (v === undefined || v === null || v === "") return `${label} es requerida.`;
  return true;
};
