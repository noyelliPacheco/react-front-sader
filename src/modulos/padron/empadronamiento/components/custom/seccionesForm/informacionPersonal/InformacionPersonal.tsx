import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";
import type { UseQueryResult } from "@tanstack/react-query";
import { RFC_REGEX } from "@/lib/expresionesRegulares";
import type { Productor } from "../../../../interfaces/productor.interface";

import { useInformacionPersonal } from "./useInformacionPersonal";
import { onlyDigitsMax, toUpperTrim, toNumberOrUndef } from "./utils/normalizadores";

type VerifyIdentityStepProps = {
  catalogos: {
    estadoCivil: UseQueryResult<CatalogoResponse, Error>;
    sexo: UseQueryResult<CatalogoResponse, Error>;
    nacionalidad: UseQueryResult<CatalogoResponse, Error>;
    tipoTelefono: UseQueryResult<CatalogoResponse, Error>;
    entidadFederativa: UseQueryResult<CatalogoResponse, Error>;
    tipoIdentificacion: UseQueryResult<CatalogoResponse, Error>;
  };
  onNext: () => void;
  onBack: () => void;
};

export const InformacionPersonal = ({ onNext, onBack, catalogos }: VerifyIdentityStepProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Productor>();

  const { curp } = useInformacionPersonal();

  const responseEstadoCivil = catalogos.estadoCivil.data;
  const responseSexo = catalogos.sexo.data;
  const responseEntidadFederativa = catalogos.entidadFederativa.data;
  const responseNacionalidad = catalogos.nacionalidad.data;
  const responseTipoIdentificacion = catalogos.tipoIdentificacion.data;

  return (
    <section className="rounded-2xl p-4 sm:p-5">
      <div className="mb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <User className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Información personal</span>
        </h3>
      </div>

      {/* Información de identidad */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Información de identidad</span>
        </legend>

        <div className="mb-2 grid gap-4 sm:grid-cols-3">
          {/* CURP (solo lectura) */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="curp_text">
              CURP:
            </label>
            <input id="curp_text" type="text" value={curp ?? ""} readOnly maxLength={18} className="text-gray-400 border-gray-300 cursor-not-allowed border-0 border-b px-0 pb-1 text-base"/>
          </div>

          {/* RFC */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="rfc">
              RFC:
            </label>

            <input id="rfc" type="text" autoComplete="off" maxLength={13}
              {...register("datos.informacionPersonal.rfc", {
                setValueAs: toUpperTrim,
                validate: (value) => {
                  if (!value) return true;
                  return RFC_REGEX.test(value) || "El RFC no tiene un formato válido.";
                },
                onChange: (e) => {
                  e.target.value = (e.target.value || "").toUpperCase();
                },
              })}
              className={cn(
                "block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none uppercase",
                { "border-validation-mistake": !!errors.datos?.informacionPersonal?.rfc }
              )}
            />

            {errors.datos?.informacionPersonal?.rfc && (
              <p className="mt-1 text-sm text-validation-mistake">
                {errors.datos?.informacionPersonal.rfc.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Datos personales */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Datos personales</span>
        </legend>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="mb-1 block text-sm text-gray-500">
              Nombre(s) <span className="ml-1 text-red-500">*</span>
            </label>

            <input id="nombre" type="text" readOnly
              {...register("datos.informacionPersonal.nombre", { required: true })}
              className={cn( "block w-full text-gray-400 border-0 border-b px-0 pb-1 text-base cursor-not-allowed",
                {
                  "border-red-500": !!errors.datos?.informacionPersonal?.nombre,
                  "border-gray-300": !errors.datos?.informacionPersonal?.nombre,
                }
              )}
            />

            {errors.datos?.informacionPersonal?.nombre && (
              <p className="text-sm text-red-500 mt-1">El nombre es requerido.</p>
            )}
          </div>

          {/* Apellido paterno */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="apellidoPaterno">
              Apellido paterno:
            </label>

            <input id="apellidoPaterno" type="text" readOnly
              {...register("datos.informacionPersonal.apellidoPaterno")}
              className={cn( "block w-full text-gray-400 border-gray-300 cursor-not-allowed border-0 border-b px-0 pb-1 text-base",
                { "border-red-500": !!errors.datos?.informacionPersonal?.apellidoPaterno }
              )}
            />
          </div>

          {/* Apellido materno */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="apellidoMaterno">
              Apellido materno:
            </label>

            <input id="apellidoMaterno" type="text" readOnly
              {...register("datos.informacionPersonal.apellidoMaterno")}
              className={cn( "block w-full text-gray-400 border-gray-300 cursor-not-allowed border-0 border-b px-0 pb-1 text-base",
                { "border-red-500": !!errors.datos?.informacionPersonal?.apellidoMaterno }
              )}
            />

            {errors.datos?.informacionPersonal?.apellidoMaterno && (
              <p className="text-red-500">El apellido materno es requerido</p>
            )}
          </div>

          {/* Fecha nacimiento */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fechaNacimiento" className="mb-1 block text-sm text-gray-500">
              Fecha de nacimiento: <span className="ml-1 text-red-500">*</span>
            </label>

            <input id="fechaNacimiento" type="date" readOnly
              {...register("datos.informacionPersonal.fechaNacimiento", { required: true })}
              className={cn( "text-gray-400 border-gray-300 cursor-not-allowed border-0 border-b px-0 pb-1 text-base",
                { "border-red-500": !!errors.datos?.informacionPersonal?.fechaNacimiento }
              )}
            />

            {errors.datos?.informacionPersonal?.fechaNacimiento && (
              <p className="text-red-500">La fecha de nacimiento es requerida.</p>
            )}
          </div>

          {/* Entidad nacimiento (disabled) */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="entidadNacimiento">
              Entidad de nacimiento:<span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <select id="entidadNacimiento" disabled {...register("datos.informacionPersonal.idEntidadNacimiento", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className={cn( "block w-full appearance-none text-gray-400 border-gray-300 cursor-not-allowed border-0 border-b px-0 pb-1 text-base",
                  { "border-red-500": !!errors.datos?.informacionPersonal?.idEntidadNacimiento }
                )}
              >
                <option value="">SELECCIONA</option>
                {(responseEntidadFederativa?.data ?? []).map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400"> ▼ </span>
            </div>

            {errors.datos?.informacionPersonal?.idEntidadNacimiento && (
              <p className="text-red-500">La entidad de nacimiento es requerida.</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Datos civiles */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Datos civiles</span>
        </legend>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* Estado civil */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="estadoCivil">
              Estado civil:
            </label>

            <div className="relative">
              <select id="estadoCivil" {...register("datos.informacionPersonal.idEstadoCivil", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className={cn( "block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                  { "border-red-500": !!errors.datos?.informacionPersonal?.idEstadoCivil }
                )}
              >
                <option value="">SELECCIONA</option>
                {(responseEstadoCivil?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400"> ▼ </span>
            </div>

            {errors.datos?.informacionPersonal?.idEstadoCivil && (
              <p className="text-red-500">El estado civil es requerido.</p>
            )}
          </div>

          {/* NSS */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="nss">
              Seguro social (NSS):
            </label>
            <input id="nss" type="text"
              {...register("datos.informacionPersonal.nss", {
                onChange: (e) => {
                  e.target.value = (e.target.value || "").toUpperCase();
                },
              })}
              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Sexo */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="sexo">
              Sexo:
            </label>

            <div className="relative">
              <select id="sexo" {...register("datos.informacionPersonal.sexo", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className={cn( "block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                  { "border-red-500": !!errors.datos?.informacionPersonal?.sexo }
                )}
              >
                <option value="">SELECCIONA</option>
                {(responseSexo?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select> 
              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400"> ▼ </span>
            </div>

            {errors.datos?.informacionPersonal?.sexo && (
              <p className="text-red-500">El sexo es requerido.</p>
            )}
          </div>

          {/* Nacionalidad */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="nacionalidad">
              Nacionalidad:
            </label>

            <div className="relative">
              <select id="nacionalidad"
                {...register("datos.informacionPersonal.idNacionalidad", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className={cn( "block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                  { "border-red-500": !!errors.datos?.informacionPersonal?.idNacionalidad }
                )}
              >
                <option value="">SELECCIONA</option>
                {(responseNacionalidad?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400"> ▼ </span>
            </div>

            {errors.datos?.informacionPersonal?.idNacionalidad && (
              <p className="text-red-500">La nacionalidad es requerida.</p>
            )}
          </div>

          {/* Tipo identificación */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="idTipoIdentificacion">
              Tipo de identificación:<span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <select id="idTipoIdentificacion"
                {...register("datos.informacionPersonal.idTipoIdentificacion", {
                  required: true,
                  setValueAs: toNumberOrUndef,
                })}
                className={cn( "block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                  { "border-red-500": !!errors.datos?.informacionPersonal?.idTipoIdentificacion }
                )}
              >
                <option value="">SELECCIONA</option>
                {(responseTipoIdentificacion?.data ?? []).map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.nombre}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400"> ▼ </span>
            </div>

            {errors.datos?.informacionPersonal?.idTipoIdentificacion && (
              <p className="text-red-500">El tipo de identificación es requerido.</p>
            )}
          </div>

          {/* Número identificación */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="numeroIdentificacion">
              Numero de identificación:<span className="ml-1 text-red-500">*</span>
            </label>

            <input id="numeroIdentificacion" type="text"
              {...register("datos.informacionPersonal.numeroIdentificacion", {
                setValueAs: toUpperTrim,
                required: true,
                onChange: (e) => {
                  e.target.value = (e.target.value || "").toUpperCase();
                },
              })}
              className={cn( "block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                { "border-red-500": !!errors.datos?.informacionPersonal?.numeroIdentificacion }
              )}
            />

            {errors.datos?.informacionPersonal?.numeroIdentificacion && (
              <p className="text-red-500">El número de identificación es requerido.</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* Contacto */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Contacto</span>
        </legend>

        <div className="mb-3 grid gap-4 sm:grid-cols-3">
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="correo">
              Correo:
            </label>

            <input id="correo" type="email" {...register("datos.informacionPersonal.correoElectronico", {
                onChange: (e) => {
                  e.target.value = (e.target.value || "").toUpperCase();
                },
              })}
              className={cn( "block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                { "border-red-500": !!errors.datos?.informacionPersonal?.correoElectronico }
              )}
            />

            {errors.datos?.informacionPersonal?.correoElectronico && (
              <p className="text-red-500">El correo es requerido.</p>
            )}
          </div>

          {/* Celular */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="numeroTelefonoCelular">
              Celular:
            </label>

            <input id="numeroTelefonoCelular" type="tel" maxLength={10}
              inputMode="numeric" {...register("datos.informacionPersonal.telefonos.0.numeroTelefono", {
                required: true,
                onChange: (e) => {
                  e.target.value = onlyDigitsMax(e.target.value, 10);
                },
              })}
              className={cn( "block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",
                { "border-red-500": !!errors.datos?.informacionPersonal?.telefonos?.[0]?.numeroTelefono }
              )}
            />

            {errors.datos?.informacionPersonal?.telefonos?.[0]?.numeroTelefono && (
              <p className="text-red-500">El número de celular es requerido.</p>
            )}
          </div>

          {/* Tel particular */}
          <div className="mb-3">
            <label className="mb-1 block text-sm text-gray-500" htmlFor="numeroTelefonoParticular">
              Teléfono particular:
            </label>

            <input id="numeroTelefonoParticular" type="tel" maxLength={10} inputMode="numeric"
              {...register("datos.informacionPersonal.telefonos.1.numeroTelefono", {
                onChange: (e) => {
                  e.target.value = onlyDigitsMax(e.target.value, 10);
                },
              })}
              className={cn( "block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none" )}
            />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-between pt-6 border-t border-border">
        <Button className="bg-guinda-160 text-white" onClick={onBack} variant="outline" size="lg">
          Anterior
        </Button>
        <Button className="bg-guinda-160 text-white" onClick={onNext} size="lg">
          Siguiente
        </Button>
      </div>
    </section>
  );
};
