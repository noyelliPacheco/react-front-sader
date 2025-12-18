
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { CatalogoResponse } from "../../../interfaces/response/catalogos.response";
import type { Productor } from "../../../interfaces/productor.interface";

type InformacionDomicilioProps = {
  catalogos: {
    tipoAsentamiento: UseQueryResult<CatalogoResponse, Error>;
    tipoDireccion: UseQueryResult<CatalogoResponse, Error>;
    tipoVialidad: UseQueryResult<CatalogoResponse, Error>;
    entidadFederativa: UseQueryResult<CatalogoResponse, Error>;
    municipio : UseQueryResult<CatalogoResponse, Error>;
    localidad : UseQueryResult<CatalogoResponse, Error>;
  };
  onNext: () => void;
  onBack: () => void;
};

export const InformacionDomicilio = ({ onNext, onBack, catalogos, }: InformacionDomicilioProps) => {
  /**  Catálogos precargados (estado, tipo asentamiento, tipo dirección, tipo vialidad) **/
  const responseAsentamiento = catalogos.tipoAsentamiento.data;
  const responseDireccion = catalogos.tipoDireccion.data;
  const responseVialidad = catalogos.tipoVialidad.data;
  const responseEntidadFederativa = catalogos.entidadFederativa.data;
  const responseMunicipio = catalogos.municipio.data;
  const responseLocalidad = catalogos.localidad.data;
  

  /**  Form  **/
  const { register, formState: { errors },   } = useFormContext<Productor>();

   

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
            <label className="block mb-1 text-sm text-gray-500">
              Código Postal:
            </label>
            <input type="text" placeholder="Ingrese código postal"
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              {...register("domicilio.codigoPostal", { required: true })} />
            {errors.domicilio?.codigoPostal && (
              <p className="text-red-500">El código postal es requerido.</p>
            )}
          </div>

          {/* Estado */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">Estado:</label>
            <div className="relative">
              <select
                {...register("domicilio.idEntidadFederativa", { required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value={""}>Selecciona</option>
                {(responseEntidadFederativa?.data ?? []).map((entidad) => (
                  <option key={entidad.id} value={entidad.id}>
                    {entidad.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>
            {errors.domicilio?.idEntidadFederativa && (
              <p className="text-red-500">El estado es requerido.</p>
            )}
          </div>

          {/* Municipio */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Municipio:
            </label>
            <div className="relative">
              <select
                {...register("domicilio.idMunicipio", {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value={""}>Selecciona</option>
                {(responseMunicipio?.data ?? []).map((municipio) => (
                  
                  <option key={municipio.id} value={municipio.id} >
                    {municipio.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>
            {errors.domicilio?.idMunicipio && (
              <p className="text-red-500">El municipio es requerido.</p>
            )}
          </div>

          {/* Localidad */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Localidad:
            </label>
            <div className="relative">
              <select {...register("domicilio.idLocalidad", { required: true,setValueAs: (v) => (v === "" ? undefined : Number(v)), })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none" >
                <option value={""}>Selecciona</option>
                {(responseLocalidad?.data ?? []).map((localidad) => (
                  <option key={localidad.id} value={localidad.id}>
                    {localidad.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>
            {errors.domicilio?.idLocalidad && (
              <p className="text-red-500">La localidad es requerida.</p>
            )}
          </div>

          {/* Centro integrador */}
          {/* <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Centro integrador:
            </label>
            <input
              type="text"
              {...register("domicilio.centroIntegrador", { required: true })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Ingrese centro integrador"
            />
            {errors.domicilio?.centroIntegrador && (
              <p className="text-red-500">
                El centro integrador es requerido.
              </p>
            )}
          </div> */}
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
            <label className="block mb-1 text-sm text-gray-500">
              Tipo de asentamiento:
            </label>
            <div className="relative">
              <select
                {...register("domicilio.idTipoAsentamiento", {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value={""}>Selecciona</option>
                {(responseAsentamiento?.data ?? []).map((asent) => (
                  <option key={asent.id} value={asent.id}>
                    {asent.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>
            {errors.domicilio?.idTipoAsentamiento && (
              <p className="text-red-500">
                El tipo de asentamiento es requerido.
              </p>
            )}
          </div>

          {/* Nombre asentamiento */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Nombre asentamiento:
            </label>
            <input
              type="text"
              {...register("domicilio.nombreAsentamiento", { required: true })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Ingrese nombre del asentamiento"
            />
            {errors.domicilio?.nombreAsentamiento && (
              <p className="text-red-500">
                El nombre del asentamiento es requerido.
              </p>
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
            <label className="block mb-1 text-sm text-gray-500">
              Tipo de dirección:
            </label>
            <div className="relative">
              <select
                {...register("domicilio.idTipoDireccion", {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value={""}>Selecciona</option>
                {(responseDireccion?.data ?? []).map((dir) => (
                  <option key={dir.id} value={dir.id}>
                    {dir.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>
            {errors.domicilio?.idTipoDireccion && (
              <p className="text-red-500">
                El tipo de dirección es requerido.
              </p>
            )}
          </div>

          {/* Tipo vialidad */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Tipo de vialidad:
            </label>
            <div className="relative">
              <select
                {...register("domicilio.idTipoVialidad", {
                  required: true,
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              >
                <option value={""}>Selecciona</option>
                {(responseVialidad?.data ?? []).map((vial) => (
                  <option key={vial.id} value={vial.id}>
                    {vial.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">
                ▼
              </span>
            </div>
            {errors.domicilio?.idTipoVialidad && (
              <p className="text-red-500">
                El tipo de vialidad es requerido.
              </p>
            )}
          </div>

          {/* Nombre vialidad */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Nombre de vialidad:
            </label>
            <input
              type="text"
              {...register("domicilio.nombreVialidad", { required: true })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Ingrese nombre de la vialidad"
            />
            {errors.domicilio?.nombreVialidad && (
              <p className="text-red-500">
                El nombre de la vialidad es requerido.
              </p>
            )}
          </div>

          {/* Número exterior */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Número exterior:
            </label>
            <input
              type="text"
              {...register("domicilio.noExterior", { required: true })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Ingrese número exterior"
            />
            {errors.domicilio?.noExterior && (
              <p className="text-red-500">
                El número exterior es requerido.
              </p>
            )}
          </div>

          {/* Número interior */}
          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Número interior:
            </label>
            <input
              type="text"
              {...register("domicilio.noInterior")}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Opcional"
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
            <label className="block mb-1 text-sm text-gray-500">
              Latitud:
            </label>
            <input
              type="text"
              {...register("domicilio.latitud", { required: true })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Ingrese latitud"
            />
            {errors.domicilio?.latitud && (
              <p className="text-red-500">La latitud es requerida.</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-gray-500">
              Longitud:
            </label>
            <input
              type="text"
              {...register("domicilio.longitud", { required: true })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
              placeholder="Ingrese longitud"
            />
            {errors.domicilio?.longitud && (
              <p className="text-red-500">La longitud es requerida.</p>
            )}
          </div>
        </div>
      </fieldset>

      <div className="flex justify-between border-t border-border pt-6">
        <Button className="bg-guinda-160 text-white" onClick={onBack} variant="outline" size="lg" type="button" >
          Anterior
        </Button>
        <Button className="bg-guinda-160 text-white" onClick={onNext} size="lg" type="button" >
          Siguiente
        </Button>
      </div>
    </section>
  );
};
