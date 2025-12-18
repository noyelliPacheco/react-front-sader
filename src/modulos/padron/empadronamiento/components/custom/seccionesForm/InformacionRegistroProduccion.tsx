import { ChartLine,} from 'lucide-react'
import { useFormContext/*, useController*/ } from "react-hook-form";
import { Button } from '@/components/ui/button';
import type { CatalogoResponse } from '../../../interfaces/response/catalogos.response';
import type { UseQueryResult } from '@tanstack/react-query';
import type { Productor } from '../../../interfaces/productor.interface';


type VerifyIdentityStepProps = {
  onNext: () => void;
  onBack: () => void;
  catalogos: {
      sectorAlimentario: UseQueryResult<CatalogoResponse, Error>,
      cultivosEspecies : UseQueryResult<CatalogoResponse, Error>,      
      tipoCultivo: UseQueryResult<CatalogoResponse, Error>, 
      regimenHidrico: UseQueryResult<CatalogoResponse, Error>, 
    };
};
 

export const InformacionRegistroProduccion= ({ onNext,onBack,catalogos }: VerifyIdentityStepProps ) => {

  /**  Variables  **/
  const { register, /*control,*/formState:{errors}, } = useFormContext<Productor>(); 
  const responseAgroalimentario = catalogos.sectorAlimentario.data;
  const responseCultivoEspecie = catalogos.cultivosEspecies.data;
  const responseTipoCultivo = catalogos.tipoCultivo.data;
  const responseRegimenHidrico = catalogos.regimenHidrico.data;
  /**  Métodos  **/ 
  

  return ( 
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
        <div className="mb-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
            <ChartLine className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
            <span className="leading-none">Registro de producción</span>
            </h3>
        </div>
        <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm mt-2">
            <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">          
                <span>Actividad principal</span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-3 mb-3">  
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Sector agroalimentario:
                    </label>
                    <div className="relative">
                    <select 
                        {...register("registroDeProduccion.idSectorAgroalimentario", 
                            {
                                required:true,
                            })
                        }
                        className="{`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none`}">
                        <option value={""}>Selecciona</option>
                        {(responseAgroalimentario?.data ?? []).map((sectorAgroalimentario) => (
                            <option key={sectorAgroalimentario.id}  value={sectorAgroalimentario.id} >
                            {sectorAgroalimentario.nombre}
                            </option>
                        ))}
                        <option value={1}>Arrendado</option>
                        <option value={2}>Propio</option>
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                    { errors.registroDeProduccion?.idSectorAgroalimentario && (<p className="text-red-500">El nombre es requerido.</p>) }
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Principales cultivos/especies:
                    </label>
                    <div className="relative">
                    <select
                        {...register("registroDeProduccion.principalesCultivos.0.idCultivoEspecie", 
                            {
                                required:true,
                            })
                        }
                        className="{`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none`}">
                        <option value={-1}>Selecciona</option>
                        {(responseCultivoEspecie?.data ?? []).map((cultivoExpecie) => (
                            <option key={cultivoExpecie.id}  value={cultivoExpecie.id} >
                            {cultivoExpecie.nombre}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Tipo de cultivo:
                    </label>
                    <div className="relative">
                    <select 
                        {...register("registroDeProduccion.principalesCultivos.0.idTipoCultivo", 
                            {
                                required:true,
                            })
                        }
                        className="{`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none`}">
                        <option value={""}>Selecciona</option>
                        {(responseTipoCultivo?.data ?? []).map((tipoCultivo) => (
                            <option key={tipoCultivo.id}  value={tipoCultivo.id} >
                            {tipoCultivo.nombre}
                            </option>
                        ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-1 text-gray-400 text-xs">▼</span>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Régimen hidrico:
                    </label>
                    <div className="relative">
                    <select
                        {...register("registroDeProduccion.principalesCultivos.0.regimenHidrico", 
                            {
                                required:true,
                            })
                        }
                        className="{`block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none`}">
                        <option value={-1}>Selecciona</option>
                        {(responseRegimenHidrico?.data ?? []).map((regimenHidrico) => (
                            <option key={regimenHidrico.id}  value={regimenHidrico.id} >
                            {regimenHidrico.nombre}
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
                <span>Capacidad productiva</span>
            </legend>
            <div className="grid gap-4 sm:grid-cols-3 mb-3"> 
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Superficie (ha):
                    </label>
                    <input type="text" 
                        {...register("registroDeProduccion.principalesCultivos.0.superficie", 
                            {
                                required:true,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} placeholder="Ingrese la superficie" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Clave UPP/PSG:
                    </label>
                    <input type="text" 
                        {...register("registroDeProduccion.claveUpp", 
                            {
                                required:false,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} placeholder="Ingrese clave " />
                    
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Número de vientres/colmenas:
                    </label>
                    <input type="text" 
                        {...register("registroDeProduccion.principalesCultivos.0.numeroVientresColmenas", 
                            {
                                required:true,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} 
                        placeholder="Ingrese CURP" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Total de cabezas de hato:
                    </label>
                    <input type="text" 
                        {...register("registroDeProduccion.principalesCultivos.0.totalCabezasHato", 
                            {
                                required:true,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} 
                        placeholder="Ingrese CURP" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Volumen de producción (ton):
                    </label>
                    <input type="text"
                        {...register("registroDeProduccion.principalesCultivos.0.volumenProduccion", 
                            {
                                required:true,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} 
                        placeholder="Ingrese CURP" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Valor de la producción (ton/$):
                    </label>
                    <input type="text" 
                        {...register("registroDeProduccion.principalesCultivos.0.valorProduccion", 
                            {
                                required:true,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} 
                        placeholder="Ingrese CURP" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm text-gray-500 mb-1">
                        Precio del cultivo/especie:
                    </label>
                    <input type="text" 
                        {...register("registroDeProduccion.principalesCultivos.0.precioCultivoEspecie", 
                            {
                                required:true,
                            })
                        }
                        className={"block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:outline-none focus:border-blue-500"} 
                        placeholder="Ingrese CURP" />
                </div>                
            </div>
        </fieldset>        
        <div className="flex justify-between pt-6 border-t border-border">
            <Button  className="bg-guinda-160  text-white" onClick={onBack} variant="outline" size="lg"> Anterior </Button>
            <Button className="bg-guinda-160 " onClick={onNext} size="lg"> Siguiente </Button>
        </div>
    </section>
   );
}

