import type { Documento } from "../../../../../interfaces/expediente.interface";
import type { CatalogRow } from "./catalogRows";
import { normalizeDocumento } from "./normalizeDocumento";

export const mergeCatalogWithDocs = (catalogRows: CatalogRow[], docsFromForm: Documento[]) => {
  return catalogRows.map((c) => {
    const existing = docsFromForm?.find(
      (d) => Number(d.idTipoDocumentoExpediente) === c.idTipoDocumentoExpediente
    );

    if (existing) {
      return normalizeDocumento({
        ...existing,
        idTipoDocumentoExpediente: c.idTipoDocumentoExpediente,
        tipoDocumentoExpediente: c.tipoDocumentoExpediente,
      });
    }

    return normalizeDocumento({
      idDocumento: null,
      idTipoDocumentoExpediente: c.idTipoDocumentoExpediente,
      tipoDocumentoExpediente: c.tipoDocumentoExpediente,
      indDocumentoDigital: false,
      nombreDocumentoDigital: "",
      linkDescarga: "",
      file: null,
      eliminado: false,
    });
  });
};

export const hasMissingCatalogTypes = (catalogRows: CatalogRow[], docsFromForm: Documento[]) => {
  return catalogRows.some(
    (c) => !docsFromForm?.some((d) => Number(d.idTipoDocumentoExpediente) === c.idTipoDocumentoExpediente)
  );
};
