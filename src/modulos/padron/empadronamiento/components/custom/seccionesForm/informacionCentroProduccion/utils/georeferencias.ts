
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
  if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");

  // "." -> "0."   | "-." -> "-0."
  if (v.startsWith(".")) v = "0" + v;
  if (v.startsWith("-.")) v = "-0" + v.slice(1);

  return v;
};

// devuelve number|null SOLO si es un número completo
export const parseGeoToNumberOrNull = (text: string) => {
  const v = (text ?? "").trim();
  if (v === "" || v === "-" || v === "." || v === "-.") return null;
  if (v.endsWith(".")) return null; // incompleto aún
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

// normaliza display en blur (si es número válido, lo vuelve "string(número)")
export const normalizeGeoDisplay = (text: string) => {
  const n = parseGeoToNumberOrNull(text);
  return n === null ? (text === "-" || text === "." || text === "-." ? "" : text) : String(n);
};
