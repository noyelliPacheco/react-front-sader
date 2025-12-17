import { useEffect, useMemo, useRef, useState } from "react";
import { Table,  TableBody,  TableCell,  TableHead,  TableHeader,  TableRow,} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {  CreditCard,  Home,  FileCheck,  Users,  Fish,  Upload,  X,
  FileText,  Loader2,  Folder,  FileSignature,} from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import type { CatalogoResponse } from "../../../interfaces/response/catalogos.response";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { Productor } from "../../../interfaces/productor.interface";
import type { Documento } from "../../../interfaces/Expediente.interface";



type VerifyIdentityStepProps = {
  onBack: () => void;
  onNext: () => void;
  onSubmit: (data: Productor) => void;
  catalogos: {
    documentosExpediente: UseQueryResult<CatalogoResponse, Error>;
  };
};

type CatalogRow = {
  id: number;
  nombre: string;
  clave: string;
};

const iconForTipo = (idTipo: number) => {
  // Ajusta este mapping según tus IDs reales
  switch (idTipo) {
    case 1:
      return <CreditCard className="h-4 w-4" />;
    case 2:
      return <Home className="h-4 w-4" />;
    case 3:
      return <FileCheck className="h-4 w-4" />;
    case 4:
      return <FileSignature className="h-4 w-4" />;
    case 5:
      return <Users className="h-4 w-4" />;
    case 6:
      return <Fish className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const normalizeDocumento = (d: Partial<Documento>): Documento => ({
  idDocumento: (d.idDocumento ?? "") as any,
  idTipoDocumentoExpediente: (d.idTipoDocumentoExpediente ?? "") as any,
  tipoDocumentoExpediente: (d.tipoDocumentoExpediente ?? "") as any,
  indDocumentoDigital: Boolean(d.indDocumentoDigital) as any,
  nombreDocumentoDigital: (d.nombreDocumentoDigital ?? "") as any,
  linkDescarga: (d.linkDescarga ?? "") as any,
  file: d.file ?? null,
  eliminado: (d.eliminado ?? false) as any,
});

export const InformacionExpediente = ({   onBack, onSubmit, catalogos, }: VerifyIdentityStepProps) => {
  
  const responseDocumentos = catalogos.documentosExpediente.data;
  const { control, watch,getValues } = useFormContext<Productor>();
  
  

  const handleEnviar= ()=>{
    const data = getValues(); // <-- todo el Productor
    onSubmit(data);

  }

  // FieldArray ligado al formulario
  const { fields, replace, update } = useFieldArray({control,name: "expediente.documentos" as any,});
  console.log(watch('expediente.documentos.0.tipoDocumentoExpediente'));

  // refs para inputs file
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  // estado local SOLO para spinners de carga (simulación / UX)
  const [uploadingByTipo, setUploadingByTipo] = useState<Record<number, boolean>>(
    {}
  );

  // catálogo -> filas base
  const catalogRows = useMemo(() => {
    const data = (responseDocumentos?.data ?? []) as CatalogRow[];
    return data.map((c) => ({
      idTipoDocumentoExpediente: c.id,
      tipoDocumentoExpediente: c.nombre,
      description: c.clave,
    }));
  }, [responseDocumentos]);

  // documentos actuales del form (pueden venir precargados al consultar CURP)
  const docsFromForm = (watch("expediente.documentos" as any) ??
    []) as Documento[];

  // merge catálogo + docs del backend/form:
  // - garantiza que siempre existan todas las filas del catálogo
  // - si el backend trae info (ind/nombre/link/idDocumento), se respeta
  useEffect(() => {
    if (!catalogRows.length) return;

    const hasMissing = catalogRows.some(
      (c) =>
        !docsFromForm?.some(
          (d) =>
            Number(d.idTipoDocumentoExpediente) === c.idTipoDocumentoExpediente
        )
    );

    // Si aún no hay filas, o faltan tipos del catálogo, hacemos merge y replace
    if (!fields.length || hasMissing) {
      const merged: Documento[] = catalogRows.map((c) => {
        const existing = docsFromForm?.find(
          (d) => Number(d.idTipoDocumentoExpediente) === c.idTipoDocumentoExpediente
        );

        if (existing) {
          // respeta lo que ya haya (incluye linkDescarga/nombreDocumentoDigital/indDocumentoDigital)
          return normalizeDocumento({
            ...existing,
            idTipoDocumentoExpediente: c.idTipoDocumentoExpediente,
            tipoDocumentoExpediente:
              existing.tipoDocumentoExpediente || c.tipoDocumentoExpediente,
          });
        }

        // fila nueva sin backend
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

      replace(merged);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogRows.length, docsFromForm?.length]);

  const isUploading = (idTipo: number) => Boolean(uploadingByTipo[idTipo]);

  const hasDigital = (doc: Documento) => Boolean(doc.indDocumentoDigital);
  const hasFileSelected = (doc: Documento) => Boolean(doc.file);
  const hasFileAlreadyUploaded = (doc: Documento) =>
    Boolean(doc.nombreDocumentoDigital) || Boolean(doc.linkDescarga);

  const getStatusBadge = (doc: Documento) => {
    const checked = hasDigital(doc);
    if (!checked) {
      return (
        <Badge variant="outline" className="text-muted-foreground">
          No requerido
        </Badge>
      );
    }
    if (isUploading(Number(doc.idTipoDocumentoExpediente))) {
      return (
        <Badge className="bg-guinda-160/20 text-primary border-0">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Cargando
        </Badge>
      );
    }
    if (hasFileSelected(doc) || hasFileAlreadyUploaded(doc)) {
      return (
        <Badge className="bg-validation-success/20 text-validation-success border-0">
          Completado
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive/20 text-destructive border-0">
        Pendiente
      </Badge>
    );
  };

  const handleCheckChange = (idx: number, checked: boolean) => {
    const current = normalizeDocumento(fields[idx] as any);

    // Si venía de backend y lo desmarcan, marcamos eliminado para que backend lo quite (si aplica)
    const willDelete =
      !checked &&
      Boolean(current.idDocumento) &&
      (Boolean(current.nombreDocumentoDigital) || Boolean(current.linkDescarga));

    update(idx, {
      ...current,
      indDocumentoDigital: checked,
      eliminado: willDelete ? true : false,
      // si lo desmarcan, limpiamos selección local de archivo (y nombre)
      ...(checked
        ? {}
        : { file: null, nombreDocumentoDigital: "", linkDescarga: "" }),
    } as any);
  };

  const handleFileChange = (idx: number, file: File | null) => {
    const current = normalizeDocumento(fields[idx] as any);
    const idTipo = Number(current.idTipoDocumentoExpediente);

    if (!file) {
      update(idx, {
        ...current,
        file: null,
        nombreDocumentoDigital: "",
      } as any);
      return;
    }

    // UX: spinner corto
    setUploadingByTipo((p) => ({ ...p, [idTipo]: true }));
    setTimeout(() => {
      update(idx, {
        ...current,
        indDocumentoDigital: true,
        eliminado: false,
        file: file,
        nombreDocumentoDigital: file.name,
      } as any);
      setUploadingByTipo((p) => ({ ...p, [idTipo]: false }));
    }, 500);
  };

  const handleClearFile = (idx: number) => {
    const current = normalizeDocumento(fields[idx] as any);

    // Si el archivo ya existía en backend, al "quitar" marcamos eliminado
    const isBackendFile = hasFileAlreadyUploaded(current) && Boolean(current.idDocumento);

    update(idx, {
      ...current,
      file: null,
      nombreDocumentoDigital: "",
      linkDescarga: "",
      eliminado: isBackendFile ? true : Boolean(current.eliminado),
    } as any);

    const idTipo = Number(current.idTipoDocumentoExpediente);
    const input = fileInputRefs.current[idTipo];
    if (input) input.value = "";
  };

  return (
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <Folder className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Expediente</span>
        </h3>
      </div>

      {/* Table */}
      <div className="rounded-1xl border border-border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="w-12">
                <span className="sr-only">Seleccionar</span>
              </TableHead>
              <TableHead>Documento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Archivo</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(fields as any[]).map((row, index) => {
              const doc = normalizeDocumento(row);
              const idTipo = Number(doc.idTipoDocumentoExpediente);

              const checked = hasDigital(doc);
              const completed = checked && (hasFileSelected(doc) || hasFileAlreadyUploaded(doc));

              const displayName =
                (doc.file && doc.file.name) ||
                doc.nombreDocumentoDigital ||
                "";

              // description se toma del catálogo si existe
              const catalogDesc =
                catalogRows.find((c) => c.idTipoDocumentoExpediente === idTipo)
                  ?.description ?? "";

              return (
                <TableRow
                  key={`${idTipo}-${index}`}
                  className={cn(
                    "transition-colors duration-300",
                    completed && "bg-validation-success/5",
                    checked && !completed && "bg-guinda-160/5",
                    doc.eliminado && "opacity-70"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Checkbox */}
                  <TableCell>
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(val) =>
                        handleCheckChange(index, val as boolean)
                      }
                      className="flex items-center justify-center
                        h-5 w-5 rounded-full border border-neutro-400
                        data-[state=checked]:bg-guinda-160
                        data-[state=checked]:border-guinda-150
                        [&_svg]:h-3 [&_svg]:w-3
                        [&_svg]:text-neutro-100"
                    />
                  </TableCell>

                  {/* Document Info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                          completed
                            ? "bg-validation-success/15 text-validation-success"
                            : checked
                            ? "bg-guinda-160/15 text-guinda-160"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {iconForTipo(idTipo)}
                      </span>

                      <div>
                        <p className="font-medium text-foreground">
                          {doc.tipoDocumentoExpediente || "Documento"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {catalogDesc}
                        </p>

                        {/* Si viene link de descarga, lo mostramos */}
                        {doc.linkDescarga ? (
                          <p className="text-xs mt-1">
                            <a
                              className="text-guinda-160 hover:underline"
                              href={doc.linkDescarga as any}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Descargar actual
                            </a>
                          </p>
                        ) : null}

                        {doc.eliminado ? (
                          <p className="text-xs mt-1 text-destructive">
                            Marcado para eliminar al guardar
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>{getStatusBadge(doc)}</TableCell>

                  {/* File Upload */}
                  <TableCell>
                    {checked && (
                      <div className="flex items-center gap-2">
                        {displayName ? (
                          <div className="flex items-center gap-2 max-w-[280px]">
                            <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5">
                              <FileText className="h-4 w-4 text-validation-success shrink-0" />
                              <span className="text-sm truncate">
                                {displayName}
                              </span>
                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => handleClearFile(index)}
                              disabled={isUploading(idTipo)}
                              title="Quitar archivo"
                            >
                              <X className="h-4 w-4" />
                            </Button>

                            {/* Reemplazar */}
                            <input
                              ref={(el) => { fileInputRefs.current[idTipo] = el; }}
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0] ?? null;
                                handleFileChange(index, f);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              disabled={isUploading(idTipo)}
                              onClick={() => fileInputRefs.current[idTipo]?.click()}
                              title="Reemplazar archivo"
                            >
                              {isUploading(idTipo) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                              Reemplazar
                            </Button>
                          </div>
                        ) : (
                          <>
                            <input
                              ref={(el) => { fileInputRefs.current[idTipo] = el; }}
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0] ?? null;
                                handleFileChange(index, f);
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="gap-2"
                              disabled={isUploading(idTipo)}
                              onClick={() => fileInputRefs.current[idTipo]?.click()}
                            >
                              {isUploading(idTipo) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Upload className="h-4 w-4" />
                              )}
                              Subir
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          className="bg-guinda-160 text-white"
          onClick={onBack}
          variant="outline"
          size="lg"
        >
          Anterior
        </Button>
        <Button
          className="bg-guinda-160 text-white"
          onClick={handleEnviar}
          variant="outline"
          size="lg"
        >
          Guardar
        </Button>
      </div>
    </section>
  );
};
