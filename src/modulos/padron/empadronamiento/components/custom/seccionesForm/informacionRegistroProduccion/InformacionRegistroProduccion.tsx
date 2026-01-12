import { ChartLine } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { UseQueryResult } from "@tanstack/react-query";

import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../../interfaces/productor.interface";

import { useInformacionRegistroProduccion } from "./useInformacionRegistroProduccion";
import { toNumberOrNull } from "./utils/normalizadores";
import { RHFReactSelect } from "./utils/RHFReactSelect";
import { decimalOnChange, decimalSetValueAs, digitsMaxOnChange, digitsSetValueAs } from "./utils/inputNumero";

type VerifyIdentityStepProps = {
  onNext: () => void;
  onBack: () => void;
  catalogos: {
    sectorAlimentario: UseQueryResult<CatalogoResponse, Error>;
    cultivosEspecies: UseQueryResult<CatalogoResponse, Error>;
    tipoCultivo: UseQueryResult<CatalogoResponse, Error>;
    regimenHidrico: UseQueryResult<CatalogoResponse, Error>;
  };
};

export const InformacionRegistroProduccion = ({ onNext, onBack, catalogos }: VerifyIdentityStepProps) => {
  const { control, responseAgroalimentario, responseTipoCultivo,
    responseRegimenHidrico, cultivoEspecieOptions, isCultivoLoading,
  } = useInformacionRegistroProduccion({ catalogos });

  const { register, formState: { errors }, } = useFormContext<Productor>();

  return (
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <ChartLine className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Registro de producción</span>
        </h3>
      </div>

      <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Información productiva</span>
        </legend>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Sector agroalimentario */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Sector agroalimentario:</label>
            <div className="relative">
                <select className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
                    {...register("datos.registroProduccion.idSectorAgroalimentario", {
                        required: true,
                        setValueAs: toNumberOrNull,
                })} >
                <option value="">SELECCIONA</option>
                {(responseAgroalimentario?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
            </div>
            {errors.datos?.registroProduccion?.idSectorAgroalimentario && (
              <p className="text-red-500">El sector agroalimentario es requerido.</p>
            )}
          </div>

          {/* Cultivo/Especie (react-select + Controller) */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Cultivo / especie:</label>
            <div className="border-b border-gray-300">
              <RHFReactSelect<Productor> control={control} name={"datos.registroProduccion.principalesCultivos.0.idCultivoEspecie"}
                options={cultivoEspecieOptions} isLoading={isCultivoLoading}
              />
            </div>
            {errors.datos?.registroProduccion?.principalesCultivos?.[0]?.idCultivoEspecie && (
              <p className="text-red-500">El cultivo/especie es requerido.</p>
            )}
          </div>

          {/* Tipo cultivo */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Tipo de cultivo:</label>
            <div className="relative">
                <select
                    {...register("datos.registroProduccion.principalesCultivos.0.idTipoCultivo", {
                    required: true,
                    setValueAs: toNumberOrNull,
                    })}
                    className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
                >
                <option value="">SELECCIONA</option>
                {(responseTipoCultivo?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
            </div>
            {errors.datos?.registroProduccion?.principalesCultivos?.[0]?.idTipoCultivo && (
              <p className="text-red-500">El tipo de cultivo es requerido.</p>
            )}
          </div>

          {/* Superficie */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Superficie (ha):</label>
            <input
              type="text"
              {...register("datos.registroProduccion.principalesCultivos.0.superficie", {
                required: true,
                onChange: decimalOnChange,
                setValueAs: decimalSetValueAs,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
            {errors.datos?.registroProduccion?.principalesCultivos?.[0]?.superficie && (
              <p className="text-red-500">La superficie es requerida.</p>
            )}
          </div>

          {/* Clave UPP/PSG */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Clave UPP/PSG:</label>
            <input
              type="text"
              {...register("datos.registroProduccion.claveUpp", { required: false })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Número de vientres/colmenas */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Número de vientres/colmenas:</label>
            <input
              type="text"
              {...register("datos.registroProduccion.principalesCultivos.0.numeroVientresColmenas", {
                onChange: digitsMaxOnChange(10),
                setValueAs: digitsSetValueAs,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Total cabezas hato */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Total cabezas hato:</label>
            <input
              type="text"
              {...register("datos.registroProduccion.principalesCultivos.0.totalCabezasHato", {
                onChange: digitsMaxOnChange(10),
                setValueAs: digitsSetValueAs,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Volumen producción */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Volumen producción (Ton):</label>
            <input
              type="text"
              {...register("datos.registroProduccion.principalesCultivos.0.volumenProduccion", {
                onChange: decimalOnChange,
                setValueAs: decimalSetValueAs,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Valor producción */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Valor producción:</label>
            <input
              type="text"
              {...register("datos.registroProduccion.principalesCultivos.0.valorProduccion", {
                onChange: decimalOnChange,
                setValueAs: decimalSetValueAs,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Precio cultivo/especie */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Precio cultivo/especie:</label>
            <input
              type="text"
              {...register("datos.registroProduccion.principalesCultivos.0.precioCultivoEspecie", {
                onChange: decimalOnChange,
                setValueAs: decimalSetValueAs,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Régimen hídrico */}
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Régimen hídrico:</label>
            <div className="relative">
              <select
                {...register("datos.registroProduccion.principalesCultivos.0.idRegimenHidrico", {
                  required: true,
                  setValueAs: toNumberOrNull,
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="">SELECCIONA</option>
                {(responseRegimenHidrico?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
            </div>
            {errors.datos?.registroProduccion?.principalesCultivos?.[0]?.idRegimenHidrico && (
              <p className="text-red-500">El régimen hídrico es requerido.</p>
            )}
          </div>
        </div>
      </fieldset>

      <div className="flex justify-between border-t border-border pt-6">
        <Button className="bg-guinda-160 text-white" onClick={onBack} variant="outline" size="lg" type="button">
          Anterior
        </Button>
        <Button className="bg-guinda-160 text-white" onClick={onNext} size="lg" type="button">
          Siguiente
        </Button>
      </div>
    </section>
  );
};
