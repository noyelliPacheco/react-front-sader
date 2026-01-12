// seccionesForm/informacionExpediente/useInformacionExpediente.ts
import { useEffect, useMemo, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { UseQueryResult } from "@tanstack/react-query";

import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../../interfaces/productor.interface";
import type { Documento } from "../../../../interfaces/expediente.interface";

import { catalogToRows } from "./utils/catalogRows";
import { normalizeDocumento } from "./utils/normalizeDocumento";
import { hasMissingCatalogTypes, mergeCatalogWithDocs } from "./utils/mergeCatalogWithDocs";
import { isBackendFile } from "./utils/documentoState";
import { buildExpedienteFormData } from "./utils/formDataBuilder";

type Params = {
  catalogos: {
    documentosExpediente: UseQueryResult<CatalogoResponse, Error>;
  };
  onSubmit: (data: FormData) => void;
};

export const useInformacionExpediente = ({ catalogos, onSubmit }: Params) => {
  const documentos = catalogos.documentosExpediente.data;

  const { control, watch, getValues } = useFormContext<Productor>();

  // FieldArray ligado al formulario
  const { fields, replace, update } = useFieldArray({
    control,
    name: "datos.expediente.documentosArreglo" as any,
  });

  // refs para inputs file
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // estado local SOLO para spinners de carga (simulación / UX)
  const [uploadingByTipo, setUploadingByTipo] = useState<Record<number, boolean>>({});

  const setFileInputRef = (idTipo: number, el: HTMLInputElement | null) => {
    fileInputRefs.current[idTipo] = el;
  };

  const triggerFilePicker = (idTipo: number) => {
    const input = fileInputRefs.current[idTipo];
    if (input) input.click();
  };

  const isUploading = (idTipo: number) => Boolean(uploadingByTipo[idTipo]);

  // catálogo -> filas base
  const catalogRows = useMemo(() => catalogToRows(documentos), [documentos]);

  // documentos actuales del form (pueden venir precargados)
  const docsFromForm = (watch("datos.expediente.documentosArreglo" as any) ?? []) as Documento[];

  // merge catálogo + docs del backend/form
  useEffect(() => {
    if (!catalogRows.length) return;

    const missing = hasMissingCatalogTypes(catalogRows, docsFromForm);

    // Si aún no hay filas, o faltan tipos del catálogo, hacemos merge y replace
    if (!fields.length || missing) {
      const merged = mergeCatalogWithDocs(catalogRows, docsFromForm);
      replace(merged as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogRows.length, docsFromForm?.length]);

  const handleCheckChange = (idx: number, checked: boolean) => {
    const current = normalizeDocumento(fields[idx] as any);

    // Si venía de backend y lo desmarcan, marcamos eliminado
    const willDelete = !checked && isBackendFile(current);

    update(
      idx,
      {
        ...current,
        indDocumentoDigital: checked,
        eliminado: willDelete ? true : false,
        ...(checked ? {} : { file: null, nombreDocumentoDigital: "", linkDescarga: "" }),
      } as any
    );
  };

  const handleFileChange = (idx: number, file: File | null) => {
    const current = normalizeDocumento(fields[idx] as any);
    const idTipo = Number(current.idTipoDocumentoExpediente);

    if (!file) {
      update(
        idx,
        {
          ...current,
          file: null,
          nombreDocumentoDigital: "",
        } as any
      );
      return;
    }

    // spinner UX
    setUploadingByTipo((prev) => ({ ...prev, [idTipo]: true }));

    setTimeout(() => {
      update(
        idx,
        {
          ...current,
          file,
          nombreDocumentoDigital: file.name,
          eliminado: false,
        } as any
      );

      setUploadingByTipo((prev) => ({ ...prev, [idTipo]: false }));
    }, 500);
  };

  const handleClearFile = (idx: number) => {
    const current = normalizeDocumento(fields[idx] as any);
    const idTipo = Number(current.idTipoDocumentoExpediente);

    const backend = isBackendFile(current);

    update(
      idx,
      {
        ...current,
        file: null,
        nombreDocumentoDigital: "",
        linkDescarga: "",
        eliminado: backend ? true : Boolean(current.eliminado),
      } as any
    );

    const input = fileInputRefs.current[idTipo];
    if (input) input.value = "";
  };

  const handleEnviar = () => {
    const data = getValues();
    const formData = buildExpedienteFormData(data);
    onSubmit(formData);
  };

  return {
    fields,
    catalogRows,

    isUploading,
    setFileInputRef,
    triggerFilePicker,

    handleCheckChange,
    handleFileChange,
    handleClearFile,

    handleEnviar,
  };
};
