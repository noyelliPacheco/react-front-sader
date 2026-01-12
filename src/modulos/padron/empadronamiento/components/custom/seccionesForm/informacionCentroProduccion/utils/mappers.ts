import type { CentroProduccion } from "../../../../../interfaces/centroProducccion.interface";

export const buildCentroWithNames = (
  centro: CentroProduccion,
  entidades: Array<{ id: number; nombre: string }>,
  municipios: Array<{ id: number; nombre: string }>,
  localidades: Array<{ id: number; nombre: string }>
): CentroProduccion => {
  const nombreEstado = entidades.find((e) => e.id === centro.idEstado)?.nombre ?? "";
  const nombreMunicipio = municipios.find((m) => m.id === centro.idMunicipio)?.nombre ?? "";
  const nombreLocalidad = localidades.find((l) => l.id === centro.idLocalidad)?.nombre ?? "";

  return {
    ...centro,
    nombreEntidadFederativa: nombreEstado,
    nombreMunicipio,
    nombreLocalidad,
  };
};
