import type { UseQueryResult } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { ShieldCheck } from "lucide-react";

import { CURP_REGEX } from "@/lib/expresionesRegulares";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../../interfaces/productor.interface";

import { useVerificarIdentidad } from "./useVerificarIdentidad";

type VerifyIdentityStepProps = {
  catalogos: UseQueryResult<CatalogoResponse, Error>;
  onNext: () => void;
  actualizar: () => void;
};

export const VerificarIdentidad = ({ onNext, catalogos, actualizar }: VerifyIdentityStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Productor>();

  const responseTipoPersona = catalogos.data;

  const { buscarProductor, isFetching } = useVerificarIdentidad({ onNext, actualizar });

  return (
    <section className="rounded-lg bg-card p-4">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <ShieldCheck className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Verificación de identidad</span>
        </h3>
      </div>

      {/* Identificación de la persona */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Identificación de la persona</span>
        </legend>

        <div className="mb-3 grid gap-4 sm:grid-cols-2">
          {/* Tipo de persona */}
          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="idTipoPersona">
              Tipo de persona:
            </label>

            <div className="relative">
              <select id="idTipoPersona" {...register("datos.informacionPersonal.idTipoPersona", {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className={cn(
                  "block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                  {
                    "border-validation-mistake":
                      !!errors.datos?.informacionPersonal?.idTipoPersona,
                  }
                )}
              >
                <option value="">SELECCIONA</option>
                {(responseTipoPersona?.data ?? []).map((tipoPersona) => (
                  <option key={tipoPersona.id} value={tipoPersona.id}>
                    {tipoPersona.nombre}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>

            {!!errors.datos?.informacionPersonal?.idTipoPersona && (
              <p className="mt-1 text-sm text-validation-mistake">
                El tipo persona es requerido.
              </p>
            )}
          </div>

          {/* CURP */}
          <div className="mb-4">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="curp">
              CURP:
            </label>

            <input
              id="curp"
              type="text"
              maxLength={18}
              {...register("datos.informacionPersonal.curp", {
                required: "La CURP es requerida.",
                minLength: {
                  value: 18,
                  message: "La CURP debe tener 18 caracteres.",
                },
                onChange: (e) => {
                  e.target.value = e.target.value.toUpperCase();
                },
                pattern: {
                  value: CURP_REGEX,
                  message: "La CURP no tiene un formato válido.",
                },
              })}
              className={cn(
                "block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                {
                  "border-validation-mistake": !!errors.datos?.informacionPersonal?.curp,
                }
              )}
            />

            {errors.datos?.informacionPersonal?.curp && (
              <p className="mt-1 text-sm text-validation-mistake">
                {errors.datos.informacionPersonal.curp.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Botón Consultar */}
        <div className="mb-3 grid gap-4 sm:grid-cols-3">
          <div>
            <button
              type="button"
              onClick={buscarProductor}
              title="Consultar"
              disabled={isFetching}
              className="rounded-xl bg-guinda-160 px-4 py-2 text-white hover:bg-guinda-170 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isFetching ? (
                <div className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  <span>Consultando información...</span>
                </div>
              ) : (
                "Consultar"
              )}
            </button>
          </div>
        </div>
      </fieldset>
    </section>
  );
};
