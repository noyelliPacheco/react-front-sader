// seccionesForm/informacionExpediente/utils/formDataBuilder.ts
import type { Productor } from "../../../../../interfaces/productor.interface";
import type { Documento } from "../../../../../interfaces/expediente.interface";

export const FIXED_FILE_KEYS = [
  "credencialElector",
  "comprobanteDomicilio",
  "documentoLegalPropiedad",
  "documentoArrendatario",
  "formatoInscripcionPgn",
  "permisoPesca",
  "idTipoDocumentoRfc",
  "actaConstitutiva",
] as const;

export type FixedFileKey = (typeof FIXED_FILE_KEYS)[number];

export const tipoDocumentoToFormKey: Record<number, FixedFileKey> = {
  1: "credencialElector",
  2: "comprobanteDomicilio",
  3: "documentoLegalPropiedad",
  4: "documentoArrendatario",
  5: "formatoInscripcionPgn",
  6: "permisoPesca",
  7: "idTipoDocumentoRfc",
  8: "actaConstitutiva",
};

export const buildExpedienteFormData = (data: Productor) => {
  const formData = new FormData();

  // 1) estructura fija requerida por backend
  FIXED_FILE_KEYS.forEach((k) => formData.set(k, ""));

  // 2) payload JSON sin archivos (file fuera)
  const docs = (data?.datos?.expediente?.documentosArreglo ?? []) as Documento[];

  formData.set(
    "datos",
    JSON.stringify({
      ...data.datos,
      expediente: {
        ...data.datos.expediente,
        documentosArreglo: docs.map((d) => ({
          ...d,
          file: undefined,
        })),
      },
    })
  );

  // 3) archivos (por tipo -> key)
  docs.forEach((doc) => {
    const tipo = Number(doc.idTipoDocumentoExpediente);
    const key = tipoDocumentoToFormKey[tipo];
    if (!key) return;

    if (doc.file instanceof File) {
      formData.set(key, doc.file);
    }
  });

  return formData;
};
