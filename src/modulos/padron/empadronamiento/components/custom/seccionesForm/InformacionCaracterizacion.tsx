import { useFormContext } from "react-hook-form";
import type { CatalogoResponse } from "../../../interfaces/response/catalogos.response";
import type { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { Productor } from "../../../interfaces/productor.interface";
import { LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";


type Props = {
  onNext: () => void;
  onBack: () => void;
  catalogos:{
    asociacionOrganizacion: UseQueryResult<CatalogoResponse, Error>,
    discapacidad: UseQueryResult<CatalogoResponse, Error>,
    poblacionIndigena: UseQueryResult<CatalogoResponse, Error>,
    nivelEstudios: UseQueryResult<CatalogoResponse, Error>,
    regimenPropietario: UseQueryResult<CatalogoResponse, Error>,
    lenguas: UseQueryResult<CatalogoResponse, Error>,
  }
};

export const  InformacionCaracterizacion = ({ onNext, onBack, catalogos }: Props ) =>{
    /**  Variables  **/
    const { register, watch,   } = useFormContext<Productor>();

    const organizacion = watch("datos.caracterizacion.perteneceAsociacionCampesina"); // "true" | "false" | undefined
    const organizacionSi = organizacion === "true";

    const discapacidad = watch("datos.caracterizacion.discapacidad"); // "true" | "false" | undefined
    const discapacidadSi = discapacidad === "true";

    const poblacionIndigena = watch("datos.caracterizacion.declaratoriaIndigena"); // "true" | "false" | undefined
    const poblacionIndigenaSi = poblacionIndigena === "true";

    const hablaEspaniol = watch("datos.caracterizacion.hablaEspanol"); // "true" | "false" | undefined
    const hablaEspaniolNo = hablaEspaniol === "false";


    
    //const responseOrganizacion = catalogos.asociacionOrganizacion.data;s
    const responseTipoDiscapacidad = catalogos.discapacidad.data;
    const responseEscolaridad  = catalogos.nivelEstudios.data;
    const responsePoblacionIndigena  = catalogos.poblacionIndigena.data;
    const responseRegimenPropietario  = catalogos.regimenPropietario.data;
    //const responseLenguas  = catalogos.lenguas.data;
    

  return ( 
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
        <div className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
            <LayoutList className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
            <span className="leading-none">Caracterización</span>
            </h3>
        </div>
        <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm mt-2">
            <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">          
            <span>Organización o asociación social</span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-2 mb-3">   
                <div className="mb-4">
                    <span className="block mb-1 text-sm text-gray-500">
                        ¿Pertenece a una asociación u organización?
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                        <label className="flex items-center gap-1">
                            <input type="radio"  value="true" 
                                {...register("datos.caracterizacion.perteneceAsociacionCampesina")}/>
                            <span>Sí</span>
                        </label> 
                        <label className="flex items-center gap-1">
                            <input type="radio" value="false"  
                            {...register("datos.caracterizacion.perteneceAsociacionCampesina")}/>
                            <span>No</span>
                        </label>
                    </div>    
                </div> 
                {/* <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                    ¿Cuál?
                    </label>
                    <div className="relative">
                    <select 
                        {...register("caracterizacion.idAsociacion"),{ setValueAs: (v) => (v === "" ? undefined : Number(v)),})}
                        className="{`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none`}">
                        <option value="">SELECCIONA</option>
                        {(responseOrganizacion?.data ?? []).map((organizacion) => (
                            <option key={organizacion.id}  value={organizacion.id} >
                            {organizacion.nombre}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                    { errors.caracterizacion?.idAsociacion && (<p className="text-red-500">La asociación es requerido.</p>) }
                </div>             */}
                <div className="mb-3">
                    <label className="mb-1 block text-sm text-gray-500" htmlFor="asociacionCampesina">
                        ¿Cuál?:
                    </label>
                    <input id="asociacionCampesina" type="text" disabled={!organizacionSi} 
                    {...register("datos.caracterizacion.asociacionCampesina",{
                        setValueAs: (value: string) => (value || '').toUpperCase().trim(),
                        onChange: (e) => { e.target.value = e.target.value.toUpperCase(); 
                    },})} 
                    className={cn("block w-full border-0 border-b px-0 pb-1 text-base focus:outline-none", "border-gray-300 text-gray-900 focus:border-blue-500",
                    "disabled: disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed")}
                    /> 
                </div>
            </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm mt-2">
            <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">          
                <span>Condición personal</span>
            </legend>            
            <div className="grid gap-4 sm:grid-cols-2 mb-3">
                <div className="mb-4">
                    <span className="block mb-1 text-sm text-gray-500">
                        ¿Tiene alguna discapacidad?
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                        <label className="flex items-center gap-1">
                        <input type="radio"  value="true"  
                            {...register("datos.caracterizacion.discapacidad", {
                                required: true,
                                   
                            })}/>
                            <span>Sí</span>
                        </label> 
                        <label className="flex items-center gap-1">
                            <input type="radio"  value="false"   {...register("datos.caracterizacion.discapacidad")}/>
                            <span>No</span>
                        </label>
                    </div>    
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                    ¿Cuál?
                    </label>
                    <div className="relative">
                    <select disabled={!discapacidadSi}
                        {...register("datos.caracterizacion.idTipoDiscapacidad", 
                            { setValueAs: (v) => (v === "" ? undefined : Number(v)),})
                        }
                        className={cn(`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none,
                        disabled: disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed `)}>
                        <option value="">SELECCIONA</option>
                        {(responseTipoDiscapacidad?.data ?? []).map((discapacidad) => (
                            <option key={discapacidad.id}  value={discapacidad.id} >
                            {discapacidad.nombre}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                </div>  
                
            </div>
            <div className="grid gap-4 sm:grid-cols-2 mb-3">
                <div className="mb-4">
                    <span className="block mb-1 text-sm text-gray-500">
                        ¿Pertenece a una población indígena?
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                        <label className="flex items-center gap-1">
                            <input type="radio"  value="true"  
                                {...register("datos.caracterizacion.declaratoriaIndigena", {
                                    required: true,
                                    
                                })}/>
                            <span>Sí</span>
                        </label> 
                        <label className="flex items-center gap-1">
                            <input type="radio"  value="false"  {...register("datos.caracterizacion.declaratoriaIndigena")}/>
                            <span>No</span>
                        </label>
                    </div>    
                </div>
                
                
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1"> ¿Cuál? </label>
                    <div className="relative">
                    <select disabled={!poblacionIndigenaSi} {...register("datos.caracterizacion.idTipoDeclaratoriaIndigena",  {  setValueAs: (v) => (v === "" ? undefined : Number(v)), }) }
                        className={cn(`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none,
                        disabled: disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed `)}>
                        <option value="">SELECCIONA</option>
                        {(responsePoblacionIndigena?.data ?? []).map((poblacionIndigena) => (
                            <option key={poblacionIndigena.id}  value={poblacionIndigena.id} >
                            {poblacionIndigena.nombre}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                </div>   
                
            </div>
        </fieldset>
        <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm mt-2">
            <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">          
            <span>Idioma y nivel educativo</span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-2 mb-3"> 
                <div className="mb-4">
                    <span className="block mb-1 text-sm text-gray-500">
                        ¿Habla español?
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-700">
                        <label className="flex items-center gap-1">
                            <input type="radio" value="true" 
                                {...register("datos.caracterizacion.hablaEspanol", {
                                    required: true,
                                    
                                })}/>
                            <span>Sí</span>
                        </label> 
                        <label className="flex items-center gap-1">
                            <input type="radio"  value="false" {...register("datos.caracterizacion.hablaEspanol")}/>
                            <span>No</span>
                        </label>
                    </div>    
                </div>
                <div className="mb-3">
                    <label className="mb-1 block text-sm text-gray-500" htmlFor="asociacionCampesina">
                        ¿Que lengua habla?:
                    </label>
                    <input id="lenguaIndigena" type="text" disabled={!hablaEspaniolNo} 
                    className={cn("block w-full border-0 border-b px-0 pb-1 text-base focus:outline-none", "border-gray-300 text-gray-900 focus:border-blue-500",
                    "disabled: disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed")}
                    {...register("datos.caracterizacion.lenguaIndigena",{
                        setValueAs: (value: string) => (value || '').toUpperCase().trim(),
                        onChange: (e) => { e.target.value = e.target.value.toUpperCase(); 
                    },})} /> 
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Nivel de estudios:
                    </label>
                    <div className="relative">
                    <select 
                        {...register("datos.caracterizacion.idNivelEstudios", 
                            { setValueAs: (v) => (v === "" ? undefined : Number(v)),})
                        }
                        className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none">
                        <option value="">SELECCIONA</option>
                        {(responseEscolaridad?.data ?? []).map((escolaridad) => (
                            <option key={escolaridad.id}  value={escolaridad.id} >
                            {escolaridad.nombre}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                </div>   
                <div>
                    <label className="block text-sm text-gray-500 mb-1">
                        Regimen de propiedad:
                    </label>
                    <div className="relative">
                        <select {...register("datos.caracterizacion.idRegimenPropiedad",  { setValueAs: (v) => (v === "" ? undefined : Number(v)), }) }
                            className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none">
                            <option value="">SELECCIONA</option>
                            {(responseRegimenPropietario?.data ?? []).map((regimen) => (
                                <option key={regimen.id}  value={regimen.id} >
                                    {regimen.nombre}
                                </option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                </div>                         
            </div>
        </fieldset>
        <div className="flex justify-between pt-6 border-t border-border">
            <Button className="bg-guinda-160  text-white" onClick={onBack} variant="outline" size="lg"> Anterior </Button>
            <Button className="bg-guinda-160  text-white" onClick={onNext} size="lg"> Siguiente </Button>
        </div>
    </section>
   );
}