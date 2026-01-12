import type { CatalogoResponse } from "../../../../../interfaces/response/catalogos.response";

export type CatalogRow = {
  idTipoDocumentoExpediente: number;
  tipoDocumentoExpediente: string;
  clave: string;
};

export const catalogToRows = (catalog: CatalogoResponse | undefined): CatalogRow[] => {
  const rows = catalog?.data ?? [];
  return rows
    .map((r) => ({
      idTipoDocumentoExpediente: Number(r.id),
      tipoDocumentoExpediente: r.nombre ?? "",
      clave: (r as any).clave ?? "",
    }))
    .filter((x) => Number.isFinite(x.idTipoDocumentoExpediente));
};
