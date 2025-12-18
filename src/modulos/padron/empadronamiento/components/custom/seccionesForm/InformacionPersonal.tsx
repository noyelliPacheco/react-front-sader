import {  useFormContext, } from "react-hook-form";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CatalogoResponse } from "../../../interfaces/response/catalogos.response";
import type { UseQueryResult } from "@tanstack/react-query";
import { RFC_REGEX } from "@/lib/expresionesRegulares";
import type { Productor } from "../../../interfaces/productor.interface";

type VerifyIdentityStepProps = {
  catalogos: {
    estadoCivil: UseQueryResult<CatalogoResponse, Error>,
    sexo: UseQueryResult<CatalogoResponse, Error>,      
    nacionalidad: UseQueryResult<CatalogoResponse, Error>,
    tipoTelefono: UseQueryResult<CatalogoResponse, Error>,
    entidadFederativa : UseQueryResult<CatalogoResponse, Error>,
    tipoIdentificacion : UseQueryResult<CatalogoResponse, Error>,
  };
  onNext: () => void;
  onBack: () => void;
};

export const InformacionPersonal = ( { onNext, onBack, catalogos }: VerifyIdentityStepProps ) => {

  /**  Variables  **/
  const { register, formState:{errors} } = useFormContext<Productor>();
  const responseEstadoCivil = catalogos.estadoCivil.data;
  const responseSexo = catalogos.sexo.data;
  const responseEntidadFederativa = catalogos.entidadFederativa.data;
  const responseNacionalidad = catalogos.nacionalidad.data;
  const responseTipoIdentificacion = catalogos.tipoIdentificacion.data;
   
  /**  Métodos  **/
  // Switch controlado: ¿Tiene llave MX?
    // const { field: llaveMxField } = useController({
    //   name: "personal.llaveMx",
    //   defaultValue: false,
    // });    
    //const toggleLlaveMx = () => llaveMxField.onChange(!llaveMxField.value);

  return (
    <section className="rounded-2xl p-4  sm:p-5">
      <div className="mb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <User className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Información personal</span>
        </h3>
      </div>

      {/* Identificación de la persona */}
        <input   type="hidden"  {...register("idPersona")}  value={1} />
        <input   type="hidden"  {...register("personal.telefonos.1.idTelefono")}  value={1} />
        <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
            <span>Información de identidad</span>
          </legend>
          {/* Botón Consultar (ejemplo) */}
          <div className="mb-2 grid gap-4 sm:grid-cols-3">
            {/* CURP */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="curp"> CURP: </label>
              <input id="curp_text" type="text" placeholder="Ingrese CURP" readOnly {...register("personal.curp", ) }
                className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none"/>
            </div>
            {/* RFC */}
            {/* <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="rfc">
                RFC:
              </label>
              <input id="rfc" type="text" placeholder="Ingrese RFC" readOnly {...register("personal.rfc", ) }
                className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none" />
            </div> */}
            {/* RFC */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="rfc" > RFC: </label>

              <input id="rfc" type="text" placeholder="Ingrese RFC" autoComplete="off"
                {...register('personal.rfc', {
                  setValueAs: (value: string) => (value || '').toUpperCase().trim(), 
                  validate: (value) => {
                    if (!value) return true; // campo vacío es válido
                    return (
                      RFC_REGEX.test(value) ||
                      'El RFC no tiene un formato válido.'
                    );
                  },
                  onChange: (e) => { e.target.value = e.target.value.toUpperCase(); },
                })}
                className={cn(
                  'block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none uppercase',
                  {
                    'border-validation-mistake':
                      !!errors.personal?.rfc,
                  }
                )}
              />

              {errors.personal?.rfc && (
                <p className="mt-1 text-sm text-validation-mistake">
                  {errors.personal.rfc.message?.toString()}
                </p>
              )}
            </div>
            {/* <div className="mb-3">
              <div className="flex flex-col items-start gap-2 rounded-xl p-3">
              <span className="text-sm text-gray-700">¿Tiene llave MX?</span>
              <button type="button" onClick={toggleLlaveMx} aria-pressed={!!llaveMxField.value} aria-label="Tiene llave MX"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  llaveMxField.value ? "bg-guinda-160" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                    llaveMxField.value ? "translate-x-5" : "translate-x-1" }`}
                />
              </button>
            </div>
            </div> */}
          </div>
        </fieldset>
      {/* Datos personales */}
      <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
            <span>Datos personales</span>
          </legend>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="nombre">
                Nombre(s):
              </label>
              <input id="nombre" type="text" placeholder="Ejemplo: ANA MARIA" readOnly
                {...register("personal.nombre",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.nombre})}
              />
              { errors.personal?.nombre && (<p className="text-red-500">El nombre es requerido.</p>) }
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="apellidoPaterno">
                Apellido paterno:
              </label>
              <input id="apellidoPaterno" type="text" placeholder="Ejemplo: ALDAMA" readOnly
                {...register("personal.apellidoPaterno",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.apellidoPaterno })}  
              />
              { errors.personal?.nombre && (<p className="text-red-500">El nombre es requerido.</p>) }
            </div>

            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="apellidoMaterno">
                Apellido materno:
              </label>
              <input id="apellidoMaterno" type="text" placeholder="Ejemplo: MARTÍNEZ" readOnly
                {...register("personal.apellidoMaterno",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.apellidoMaterno })}
              />
              { errors.personal?.apellidoMaterno && (<p className="text-red-500">El apellido materno es requerio</p>) }
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fechaNacimiento" className="mb-1 block text-sm text-gray-500">
                Fecha de nacimiento
              </label>
              <input id="fechaNacimiento" type="date" readOnly
                {...register("personal.fechaNacimiento",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.fechaNacimiento })}
              />
              { errors.personal?.fechaNacimiento && (<p className="text-red-500">La fecha de nacimiento es requerida.</p>) }
            </div>

            {/* Estado de nacimiento (placeholder) */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="entidadNacimiento">
                Entidad de nacimiento:
              </label>
              <div className="relative">
                <select id="entidadNacimiento" 
                  {...register("personal.idEntidadNacimiento", {
                    required:true,
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                    "border-red-500":errors.personal?.idEntidadNacimiento })}
                >
                  <option value={""}>Selecciona</option>
                  {(responseEntidadFederativa?.data?? []).map((entidadFederativa) => (
                    <option key={entidadFederativa.id}  value={entidadFederativa.id} >
                      {entidadFederativa.nombre}
                    </option>
                  ))} 
                  
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
              { errors.personal?.idEntidadNacimiento && (<p className="text-red-500">La entidad de nacimiento es requerida.</p>) }
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
                <select id="estadoCivil"
                  {...register("personal.idEstadoCivil", {
                    required:true,
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                    "border-red-500":errors.personal?.idEstadoCivil })}
                >
                  <option value={""}>Selecciona</option>

                   {(responseEstadoCivil?.data ?? []).map((estadoCivil) => (
                    <option key={estadoCivil.id}  value={estadoCivil.id} >
                      {estadoCivil.nombre}
                    </option>
                  ))} 
                  
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
              { errors.personal?.idEstadoCivil && (<p className="text-red-500">El estado civil es requerido.</p>) }
            </div>

            {/* Sexo */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="sexo">
                Sexo:
              </label>
              <div className="relative">
                <select id="sexo"
                  {...register("personal.sexo",
                    {required:true,})
                  }
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                    "border-red-500":errors.personal?.sexo })}
                >
                  <option value={""}>Selecciona</option>
                   {(responseSexo?.data ?? []).map((sexo) => (
                    <option key={sexo.id}  value={sexo.id} >
                      {sexo.nombre}
                    </option>
                  ))} 
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
              { errors.personal?.sexo && (<p className="text-red-500">El sexo es requerido.</p>) }
            </div>

            {/* Nacionalidad (placeholder) */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="entidadNacimiento">
                Nacionalidad:
              </label>
              <div className="relative">
                <select id="nacionalidad"
                  {...register("personal.idNacionalidad", {
                    required:true,
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                    "border-red-500":errors.personal?.idNacionalidad })}
                >
                  <option value={""}>Selecciona</option>
                   {(responseNacionalidad?.data ?? []).map((entidadFederativa) => (
                    <option key={entidadFederativa.id}  value={entidadFederativa.id} >
                      {entidadFederativa.nombre}
                    </option>
                  ))} 
                  
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
              { errors.personal?.idNacionalidad && (<p className="text-red-500">La nacionalidad es requerida.</p>) }
            </div>
            {/* Tipo de identificacipon */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="idTipoIdentificacion">
                Tipo de identificación:
              </label>
              <div className="relative">
                <select id="idTipoIdentificacion"
                  {...register("personal.idTipoIdentificacion", {
                    required:true,
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                    "border-red-500":errors.personal?.idTipoIdentificacion })}
                >
                  <option value={""}>Selecciona</option>
                   {(responseTipoIdentificacion?.data ?? []).map((tipoIdentificacion) => (
                    <option key={tipoIdentificacion.id}  value={tipoIdentificacion.id} >
                      {tipoIdentificacion.nombre}
                    </option>
                  ))} 
                  
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
              { errors.personal?.idTipoIdentificacion && (<p className="text-red-500">La nacionalidad es requerida.</p>) }
            </div>
            {/* Numero de identificacipon */}
            <div className="mb-3">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="numeroIdentificacion">
                Numero de identificación:
              </label>
              <input id="numeroIdentificacion" type="text" placeholder="Ejemplo: 01204545157-DFG-5" readOnly
                {...register("personal.numeroIdentificacion",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.numeroIdentificacion})}
              />
              { errors.personal?.numeroIdentificacion && (<p className="text-red-500">El numero de identifiación es requerido.</p>) }
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
              <input id="correo" type="email" placeholder="Ejemplo: fernando@gmail.com"
                {...register("personal.correoElectronico",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.apellidoMaterno }) }
              />
              { errors.personal?.correoElectronico && (<p className="text-red-500">El correo es requerido.</p>) }
            </div>

            <div className="mb-3">
              <input   type="hidden"  {...register("personal.telefonos.0.idTelefono")}  value={1} />
              <label className="mb-1 block text-sm text-gray-500" htmlFor="numeroTelefono">
                Celular:
              </label>
              <input id="numeroTelefono" type="tel" placeholder="Ejemplo 55 123 5678"
                {...register("personal.telefonos.0.numeroTelefono",
                  {required:true,})
                }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                  "border-red-500":errors.personal?.telefonoCelular }) }                
              />
              { errors.personal?.telefonoCelular && (<p className="text-red-500">El número de celular es requerido.</p>) }
            </div>

            {/* <div className="mb-4">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="tipoTelefono">
                Tipo de teléfono:
              </label>
              <div className="relative">
                <select id="tipoTelefono"
                  {...register("personal.idTipoTelefono", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none")}
                >
                  <option value={""}>Selecciona</option>

                  {(responseTipoTelefono?.data ?? []).map((tipoTelefono) => (
                    <option key={tipoTelefono.id}  value={tipoTelefono.id} >
                      {tipoTelefono.nombre}
                    </option>
                  ))}                  
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
            </div> */}

            <div className="mb-3">
              <input   type="hidden"  {...register("personal.telefonos.1.idTelefono")}  value={1} />
              <label className="mb-1 block text-sm text-gray-500" htmlFor="numeroTelefono">
                Teléfono particular:
              </label>
              <input id="numeroTelefono" type="tel" placeholder="Opcional" {...register("personal.telefonos.1.numeroTelefono", ) }
                className={ cn("block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none",)}
              />
            </div>
          </div>
      </fieldset>
      <div className="flex justify-between pt-6 border-t border-border">
        <Button className="bg-guinda-160 text-white" onClick={onBack} variant="outline" size="lg"> Anterior </Button>
        <Button className="bg-guinda-160  text-white" onClick={onNext} size="lg"> Siguiente </Button>
      </div>
    </section>
  );
}
