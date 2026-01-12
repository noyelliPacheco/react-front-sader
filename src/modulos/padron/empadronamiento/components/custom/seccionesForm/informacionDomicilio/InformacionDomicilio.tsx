import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../../interfaces/productor.interface";
import { RHFReactSelect } from "./utils/RHFReactSelect";

import { useInformacionDomicilio } from "./useInformacionDomicilio";
import { toNumberOrUndef, toUpperOnChange } from "./utils/normalizadores";
import { geoOnBlur, geoOnChange, geoRequired, geoSetValueAs } from "./utils/geoInputs";

type InformacionDomicilioProps = {
  catalogos: {
    tipoAsentamiento: UseQueryResult<CatalogoResponse, Error>;
    tipoDireccion: UseQueryResult<CatalogoResponse, Error>;
    tipoVialidad: UseQueryResult<CatalogoResponse, Error>;
    entidadFederativa: UseQueryResult<CatalogoResponse, Error>;
    municipio: UseQueryResult<CatalogoResponse, Error>;
    localidad: UseQueryResult<CatalogoResponse, Error>;
  };
  onNext: () => void;
  onBack: () => void;
};

export const InformacionDomicilio = ({ onNext, onBack, catalogos }: InformacionDomicilioProps) => {
  const {
    control,
    optionsEstados,
    optionsMunicipios,
    optionsLocalidades,
    responseAsentamiento,
    responseDireccion,
    responseVialidad,
  } = useInformacionDomicilio({ catalogos });

  const { register, watch, formState: { errors } } = useFormContext<Productor>();

  return (
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <House className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Domicilio particular</span>
        </h3>
      </div>

      {/* Ubicación general */}
      <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Ubicación general</span>
        </legend>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Código Postal */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Código Postal:</label>
            <input
              type="text"
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              {...register("datos.domicilio.codigoPostal", { required: true })}
            />
            {errors.datos?.domicilio?.codigoPostal && (
              <p className="text-red-500">El código postal es requerido.</p>
            )}
          </div>

          {/* Estado */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Estado:</label>

            <RHFReactSelect<Productor>
              control={control}
              name={"datos.domicilio.idEntidadFederativa"}
              options={optionsEstados}
              error={!!errors.datos?.domicilio?.idEntidadFederativa}
            />

            {errors.datos?.domicilio?.idEntidadFederativa && (
              <p className="text-red-500">El estado es requerido.</p>
            )}
          </div>

          {/* Municipio */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Municipio:</label>

            <RHFReactSelect<Productor>
              control={control}
              name={"datos.domicilio.idMunicipio"}
              options={optionsMunicipios}
              isDisabled={!watch("datos.domicilio.idEntidadFederativa")}
              error={!!errors.datos?.domicilio?.idMunicipio}
            />

            {errors.datos?.domicilio?.idMunicipio && (
              <p className="text-red-500">El municipio es requerido.</p>
            )}
          </div>

          {/* Localidad */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Localidad:</label>

            <RHFReactSelect<Productor>
              control={control}
              name={"datos.domicilio.idLocalidad"}
              options={optionsLocalidades}
              isDisabled={!watch("datos.domicilio.idMunicipio")}
              error={!!errors.datos?.domicilio?.idLocalidad}
            />

            {errors.datos?.domicilio?.idLocalidad && (
              <p className="text-red-500">La localidad es requerida.</p>
            )}
          </div>

        </div>
      </fieldset>

      {/* Asentamiento */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Asentamiento</span>
        </legend>

        <div className="mb-3 grid gap-4 sm:grid-cols-3">
          {/* Tipo asentamiento */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Tipo de asentamiento:</label>
            <div className="relative">
              <select
                {...register("datos.domicilio.idTipoAsentamiento", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="">SELECCIONA</option>
                {(responseAsentamiento?.data ?? []).map((asent) => (
                  <option key={asent.id} value={asent.id}>
                    {asent.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
            </div>
            {errors.datos?.domicilio?.idTipoAsentamiento && (
              <p className="text-red-500">El tipo de asentamiento es requerido.</p>
            )}
          </div>

          {/* Nombre asentamiento */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Nombre asentamiento:</label>
            <input
              type="text"
              {...register("datos.domicilio.nombreAsentamiento", {
                onChange: toUpperOnChange,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
            {errors.datos?.domicilio?.nombreAsentamiento && (
              <p className="text-red-500">El nombre del asentamiento es requerido.</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Dirección */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Dirección</span>
        </legend>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {/* Tipo dirección */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Tipo de dirección:</label>
            <div className="relative">
              <select
                {...register("datos.domicilio.idTipoDireccion", {
                  setValueAs: toNumberOrUndef,
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="">SELECCIONA</option>
                {(responseDireccion?.data ?? []).map((dir) => (
                  <option key={dir.id} value={dir.id}>
                    {dir.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
            </div>
          </div>

          {/* Tipo vialidad */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Tipo de vialidad:</label>
            <div className="relative">
              <select
                {...register("datos.domicilio.idTipoVialidad", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value="">SELECCIONA</option>
                {(responseVialidad?.data ?? []).map((vial) => (
                  <option key={vial.id} value={vial.id}>
                    {vial.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
            </div>
            {errors.datos?.domicilio?.idTipoVialidad && (
              <p className="text-red-500">El tipo de vialidad es requerido.</p>
            )}
          </div>

          {/* Nombre vialidad */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Nombre de vialidad:</label>
            <input
              type="text"
              {...register("datos.domicilio.nombreVialidad", { onChange: toUpperOnChange })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
            {errors.datos?.domicilio?.nombreVialidad && (
              <p className="text-red-500">El nombre de la vialidad es requerido.</p>
            )}
          </div>

          {/* Número exterior */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Número exterior:</label>
            <input
              type="text"
              {...register("datos.domicilio.noExterior", {
                required: true,
                onChange: toUpperOnChange,
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
            {errors.datos?.domicilio?.noExterior && (
              <p className="text-red-500">El número exterior es requerido.</p>
            )}
          </div>

          {/* Número interior */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Número interior:</label>
            <input
              type="text"
              {...register("datos.domicilio.noInterior", { onChange: toUpperOnChange })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      {/* Ubicación geográfica */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Ubicación geográfica</span>
        </legend>

        <div className="mb-3 grid gap-4 sm:grid-cols-3">
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Latitud:</label>
            <input
              type="text"
              {...register("datos.domicilio.latitud", {
                required: true,
                onChange: geoOnChange,
                setValueAs: geoSetValueAs,
                onBlur: geoOnBlur,
                validate: geoRequired("La latitud"),
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
            {errors.datos?.domicilio?.latitud && <p className="text-red-500">La latitud es requerida.</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Longitud:</label>
            <input
              type="text"
              {...register("datos.domicilio.longitud", {
                required: true,
                onChange: geoOnChange,
                setValueAs: geoSetValueAs,
                onBlur: geoOnBlur,
                validate: geoRequired("La longitud"),
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
            {errors.datos?.domicilio?.longitud && <p className="text-red-500">La longitud es requerida.</p>}
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
