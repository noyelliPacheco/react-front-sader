import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import type { CentroProduccion } from "../../../../interfaces/centroProducccion.interface";
import type { Productor } from "../../../../interfaces/productor.interface";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";

import { useCatalogosLocalidad, useCatalogosMunicipio } from "../../../../hooks/useCatalogos";

import { emptyCentro, emptyGeoRef, createEmptyGeo } from "./utils/factories";
import { toSelectOptions, findOptionByValue, type SelectOption } from "./utils/opcionesSelect";
import { sanitizeGeoText, parseGeoToNumberOrNull, normalizeGeoDisplay } from "./utils/georeferencias";
import { buildCentroWithNames } from "./utils/mappers";
import { upsertAtIndex, removeAtIndex } from "./utils/arrayOps";

type Props = {
  catalogos: {
    tipoDocumentoLegal: UseQueryResult<CatalogoResponse, Error>;
    entidadFederativa: UseQueryResult<CatalogoResponse, Error>;
    tipoCentroProduccion: UseQueryResult<CatalogoResponse, Error>;
  };
};

type GeoDraft = {
  centro: { lat: string; lng: string };
  poligono: Array<{ lat: string; lng: string }>;
};

export const useInformacionCentroProduccion = ({ catalogos }: Props) => {
  const { watch, setValue } = useFormContext<Productor>();

  const centros = watch("datos.unidadProduccion") ?? [];

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [currentCentro, setCurrentCentro] = useState<CentroProduccion>(emptyCentro);

  // === geoDraft (strings para teclear) ===
  const [geoDraft, setGeoDraft] = useState<GeoDraft>({ centro: { lat: "", lng: "" }, poligono: [] });

  const responseDocumentoLegal = catalogos.tipoDocumentoLegal.data;
  const responseTipoCentroProduccion = catalogos.tipoCentroProduccion.data;
  const responseEntidadFederativa = catalogos.entidadFederativa.data;

  const idEstadoCentro = Number(currentCentro?.idEstado || 0);
  const idMunicipioCentro = Number(currentCentro?.idMunicipio || 0);

  const { data: dataMunicipio } = useCatalogosMunicipio(idEstadoCentro);
  const { data: dataLocalidad } = useCatalogosLocalidad(idMunicipioCentro);

  // === options ===
  const optionsTipoCentro = useMemo(
    () => toSelectOptions(responseTipoCentroProduccion?.data),
    [responseTipoCentroProduccion]
  );
  const selectedTipoCentro = findOptionByValue(optionsTipoCentro, currentCentro?.idTipoCentroProduccion);

  const optionsDocLegal = useMemo(() => toSelectOptions(responseDocumentoLegal?.data), [responseDocumentoLegal]);
  const selectedDocLegal = findOptionByValue(optionsDocLegal, currentCentro?.idTipoDocumentoLegal);

  const optionsEntidad = useMemo(
    () => toSelectOptions(responseEntidadFederativa?.data),
    [responseEntidadFederativa]
  );
  const selectedEntidad = findOptionByValue(optionsEntidad, currentCentro?.idEstado);

  const optionsMunicipio = useMemo(() => toSelectOptions(dataMunicipio?.data), [dataMunicipio]);
  const selectedMunicipio = findOptionByValue(optionsMunicipio, currentCentro?.idMunicipio);

  const optionsLocalidad = useMemo(() => toSelectOptions(dataLocalidad?.data), [dataLocalidad]);
  const selectedLocalidad = findOptionByValue(optionsLocalidad, currentCentro?.idLocalidad);

  // === helpers ===
  const syncGeoDraftFromCentro = (centro: CentroProduccion) => {
    const cLat = centro.georeferencias?.coordenadasCentro.latitud;
    const cLng = centro.georeferencias?.coordenadasCentro.longitud;

    const pol = centro.georeferencias?.poligono ?? [];

    setGeoDraft({
      centro: {
        lat: cLat == null ? "" : String(cLat),
        lng: cLng == null ? "" : String(cLng),
      },
      poligono: pol.map((p) => ({
        lat: p.latitud == null ? "" : String(p.latitud),
        lng: p.longitud == null ? "" : String(p.longitud),
      })),
    });
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setCurrentCentro(emptyCentro);
    syncGeoDraftFromCentro(emptyCentro);
    setShowModal(true);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    const centro = { ...centros[index] };
    setCurrentCentro(centro);
    syncGeoDraftFromCentro(centro);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveCentro = () => {
    const entidades = responseEntidadFederativa?.data ?? [];
    const municipios = dataMunicipio?.data ?? [];
    const localidades = dataLocalidad?.data ?? [];

    const centroConNombres = buildCentroWithNames(currentCentro, entidades, municipios, localidades);
    const updated = upsertAtIndex(centros, editingIndex, centroConNombres);

    setValue("datos.unidadProduccion", updated, { shouldDirty: true, shouldValidate: true });
    setShowModal(false);
  };

  const deleteCentro = (index: number) => {
    const updated = removeAtIndex(centros, index);
    setValue("datos.unidadProduccion", updated, { shouldDirty: true, shouldValidate: true });
  };

  // === select handlers con cascada ===
  const onTipoCentroChange = (opt: SelectOption | null) =>
    setCurrentCentro((prev) => ({ ...prev, idTipoCentroProduccion: opt ? Number(opt.value) : null }));

  const onDocLegalChange = (opt: SelectOption | null) =>
    setCurrentCentro((prev) => ({ ...prev, idTipoDocumentoLegal: opt ? Number(opt.value) : null }));

  const onEntidadChange = (opt: SelectOption | null) =>
    setCurrentCentro((prev) => ({
      ...prev,
      idEstado: opt ? Number(opt.value) : null,
      idMunicipio: null,
      idLocalidad: null,
    }));

  const onMunicipioChange = (opt: SelectOption | null) =>
    setCurrentCentro((prev) => ({
      ...prev,
      idMunicipio: opt ? Number(opt.value) : null,
      idLocalidad: null,
    }));

  const onLocalidadChange = (opt: SelectOption | null) =>
    setCurrentCentro((prev) => ({ ...prev, idLocalidad: opt ? Number(opt.value) : null }));

  // === GEO: draft + commit (centro) ===
  const setGeoDraftCentro = (field: "lat" | "lng", text: string) => {
    const v = sanitizeGeoText(text);
    setGeoDraft((prev) => ({ ...prev, centro: { ...prev.centro, [field]: v } }));
  };

  const commitGeoCentro = (field: "lat" | "lng") => {
    setGeoDraft((prev) => {
      const raw = prev.centro[field];
      const normalized = normalizeGeoDisplay(raw);
      const num = parseGeoToNumberOrNull(normalized);

      setCurrentCentro((cPrev) => {
        const base = cPrev ?? emptyCentro;
        const geo = base.georeferencias ?? emptyGeoRef;

        return {
          ...base,
          georeferencias: {
            ...geo,
            coordenadasCentro: {
              ...geo.coordenadasCentro,
              [field === "lat" ? "latitud" : "longitud"]: num,
            },
          },
        };
      });

      return { ...prev, centro: { ...prev.centro, [field]: normalized } };
    });
  };

  // === GEO: polígono add/remove/update ===
  const onAddPolygonPoint = () => {
    setCurrentCentro((prev) => {
      const base = prev ?? emptyCentro;
      const geo = base.georeferencias ?? emptyGeoRef;
      const pol = [...(geo.poligono ?? [])];
      const nextOrden = pol.length + 1;
      return {
        ...base,
        georeferencias: { ...geo, poligono: [...pol, createEmptyGeo(nextOrden, "POLIGONO")] },
      };
    });

    setGeoDraft((prev) => ({ ...prev, poligono: [...prev.poligono, { lat: "", lng: "" }] }));
  };

  const onRemovePolygonPoint = (idx: number) => {
    setCurrentCentro((prev) => {
      const base = prev ?? emptyCentro;
      const geo = base.georeferencias ?? emptyGeoRef;
      const pol = [...(geo.poligono ?? [])].filter((_, i) => i !== idx);
      const reorden = pol.map((p, i) => ({ ...p, orden: i + 1 }));
      return { ...base, georeferencias: { ...geo, poligono: reorden } };
    });

    setGeoDraft((prev) => ({
      ...prev,
      poligono: prev.poligono.filter((_, i) => i !== idx),
    }));
  };

  const setGeoDraftPoligono = (idx: number, field: "lat" | "lng", text: string) => {
    const v = sanitizeGeoText(text);
    setGeoDraft((prev) => {
      const pol = [...prev.poligono];
      pol[idx] = { ...pol[idx], [field]: v };
      return { ...prev, poligono: pol };
    });
  };

  const commitGeoPoligono = (idx: number, field: "lat" | "lng") => {
    setGeoDraft((prev) => {
      const polDraft = [...prev.poligono];
      const raw = polDraft[idx]?.[field] ?? "";
      const normalized = normalizeGeoDisplay(raw);
      const num = parseGeoToNumberOrNull(normalized);

      polDraft[idx] = { ...polDraft[idx], [field]: normalized };

      setCurrentCentro((cPrev) => {
        const base = cPrev ?? emptyCentro;
        const geo = base.georeferencias ?? emptyGeoRef;
        const pol = [...(geo.poligono ?? [])];
        if (!pol[idx]) return base;

        pol[idx] = { ...pol[idx], [field === "lat" ? "latitud" : "longitud"]: num };
        return { ...base, georeferencias: { ...geo, poligono: pol } };
      });

      return { ...prev, poligono: polDraft };
    });
  };

  // cada vez que cambia el polígono del modelo por edit, mantenemos drafts alineados
  useEffect(() => {
    if (!showModal) return;
    const pol = currentCentro.georeferencias?.poligono ?? [];
    setGeoDraft((prev) => ({
      ...prev,
      poligono: pol.map((p, i) => prev.poligono[i] ?? { lat: p.latitud == null ? "" : String(p.latitud), lng: p.longitud == null ? "" : String(p.longitud) }),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return {
    // state
    centros,
    showModal,
    currentCentro,
    setCurrentCentro,
    editingIndex,

    // modal controls
    openAddModal,
    openEditModal,
    closeModal,
    saveCentro,
    deleteCentro,

    // selects
    optionsTipoCentro,
    selectedTipoCentro,
    onTipoCentroChange,

    optionsDocLegal,
    selectedDocLegal,
    onDocLegalChange,

    optionsEntidad,
    selectedEntidad,
    onEntidadChange,

    optionsMunicipio,
    selectedMunicipio,
    onMunicipioChange,

    optionsLocalidad,
    selectedLocalidad,
    onLocalidadChange,

    // geo
    geoDraft,
    setGeoDraftCentro,
    commitGeoCentro,
    setGeoDraftPoligono,
    commitGeoPoligono,
    onAddPolygonPoint,
    onRemovePolygonPoint,

    // disables
    isMunicipioDisabled: !currentCentro?.idEstado,
    isLocalidadDisabled: !currentCentro?.idMunicipio,
  };
};
