import { useBuscarProductor } from "../../../hooks/useProductor";
import type { UseQueryResult } from "@tanstack/react-query";
import { CURP_REGEX } from '@/lib/expresionesRegulares'
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from 'react-hook-form';
import { ShieldCheck } from 'lucide-react';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { ProductorResponse } from "../../../interfaces/response/productorFisico.response";
import type { CatalogoResponse } from "../../../interfaces/response/catalogos.response";
import type { CentroProduccion, Coordenadas } from "../../../interfaces/centroProducccion.interface";
import type { Documento } from "../../../interfaces/expediente.interface";
import type { Productor } from "../../../interfaces/productor.interface";
//import type { CentroProduccion } from "../../../interfaces/registroDeProduccion.interface";
//import type { Documento } from "../../../interfaces/expediente.interface";

type VerifyIdentityStepProps = {
  catalogos: UseQueryResult<CatalogoResponse, Error>;
  onNext: () => void;
};

export const VerificarIdentidad = ({ onNext,catalogos }: VerifyIdentityStepProps ) => {
  /**  Variables  **/
  
  const {register, formState:{errors}, watch,getValues, setValue} = useFormContext<Productor>(); 
  const idTipoPersona =  watch("datos.personal.idTipoPersona");
  const curp =  watch("datos.personal.curp");
  
  const responseTipoPersona = catalogos.data;
  const { refetch,isFetching,  } = useBuscarProductor(Number(idTipoPersona), curp,{ 
  onSuccess: (data) => {
    if (!data.success) {
      
      toast.error("Ocurrió un problema al consultar la información del productor.", {
          position: "bottom-center",
        });
      
      return;
    }
    const productor = data.data;
    if (!productor) {
      
      toast.error("No se encontró un productor con la combinación de tipo de persona y CURP ingresada.", {
          position: "bottom-center",
        });
      return;
    }
    hidratarDerechohabiente(data);
    
    onNext();
  },
  onError: () => {
    toast.error("Error al consultar la información del productor.", {
      position: "bottom-center",
    });
  },}); 

  /**  Métodos  **/ 
  const buscarProductor = () => {
    const idTipoPersona = getValues("datos.personal.idTipoPersona");
    const curp = getValues("datos.personal.curp");
    if (!idTipoPersona || !curp) return;
    refetch();
  };
  
  const hidratarDerechohabiente = (informacionProdctor:ProductorResponse) =>{
    const productor = informacionProdctor.data;
    const infoPersonal = productor.informacionPersonal;
      setValue("datos.personal.idTipoPersona", idTipoPersona ?? '');
      setValue("datos.personal.curp", productor.curp ?? '');
      setValue("datos.personal.rfc", infoPersonal.rfc ?? '');
      //setValue("personal.llaveMx", infoPersonal.llaveMx ?? false);
      setValue("datos.personal.nombre", infoPersonal.nombre ?? '');
      setValue("datos.personal.apellidoPaterno", infoPersonal.primerApellido ?? '');
      setValue("datos.personal.apellidoMaterno", infoPersonal.segundoApellido ?? '');
      setValue("datos.personal.fechaNacimiento", infoPersonal.fechaNacimiento ?? '');
      setValue("datos.personal.sexo", infoPersonal.idGenero ?? '');
      setValue("datos.personal.idEstadoCivil", infoPersonal.idEstadoCivil ?? '');
      setValue("datos.personal.idEntidadNacimiento", infoPersonal.idEntidadFederativa ?? '');
      setValue("datos.personal.idTipoIdentificacion", infoPersonal.idTipoIdentificacion ?? '');
      setValue("datos.personal.telefonos.1.numeroTelefono", infoPersonal.numeroTelefonoAdicional ?? '');
      setValue("datos.personal.telefonos.0.numeroTelefono", infoPersonal.numeroTelefono ?? '');
      setValue("datos.personal.telefonos.0.idTelefono", 1 );
      setValue("datos.personal.telefonos.1.idTelefono", 2);
      setValue("datos.personal.correoElectronico", infoPersonal.correoElectronico ?? '');
      setValue("datos.personal.idNacionalidad", infoPersonal.idNacionalidad ?? '');

      // ---------- DOMICILIO ----------
    if (productor.domicilio) {
      const domicilio = productor.domicilio;
      //const ubicacion = domicilio.ubicacionGeografica ?? {};
      setValue("datos.domicilio.codigoPostal", domicilio.codigoPostal ?? null);
      setValue("datos.domicilio.idEntidadFederativa", domicilio.idEntidadFederativa ?? 0);
      setValue("datos.domicilio.idMunicipio", domicilio.idMunicipio ?? 0);
      setValue("datos.domicilio.idLocalidad", domicilio.idLocalidad ?? 0);
      //setValue("domicilio.centroIntegrador", domicilio.centroIntegrador ?? "");
      setValue("datos.domicilio.idTipoAsentamiento", domicilio.idTipoAsentamiento ?? 0);
      setValue("datos.domicilio.nombreAsentamiento", domicilio.nombreAsentamiento ?? "");
      setValue("datos.domicilio.idTipoDireccion", domicilio.idTipoDireccion ?? 0);
      setValue("datos.domicilio.idTipoVialidad", domicilio.idTipoVialidad ?? 0);
      setValue("datos.domicilio.nombreVialidad", domicilio.nombreVialidad ?? "");
      setValue("datos.domicilio.noExterior", domicilio.numeroExterior ?? null);
      setValue("datos.domicilio.noInterior", domicilio.numeroInterior ?? null);
      setValue("datos.domicilio.latitud", domicilio.latitud?? "");
      setValue("datos.domicilio.longitud", domicilio.longitud ?? "");
    }

    // ---------- REGISTRO DE PRODUCCIÓN ----------
    if (productor.registroProduccion) {
      const registroProduccion = productor.registroProduccion;
      setValue("datos.registroDeProduccion.idSectorAgroalimentario", registroProduccion.idSectorAgroalimentario ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.idCultivoEspecie", registroProduccion.idCultivo ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.idTipoCultivo", registroProduccion.idCultivo ?? '');//TODO: Repara esta sección idTipoCultivo
      setValue("datos.registroDeProduccion.principalesCultivos.0.superficie", registroProduccion.superficieHa ?? '');
      setValue("datos.registroDeProduccion.claveUpp", registroProduccion.claveUppPsg ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.numeroVientresColmenas", registroProduccion.totalCabezasHato ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.totalCabezasHato", registroProduccion.totalCabezasHato ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.volumenProduccion", registroProduccion.volumenProduccionTon ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.valorProduccion", registroProduccion.valorProduccion ?? '');
      //setValue("registroDeProduccion.precioCultivo", productor.registroProduccion.precioCultivo ?? '');
      //setValue("registroDeProduccion.precioCultivoEspecie", registroProduccion.precioCultivoEspecie ?? '');
      setValue("datos.registroDeProduccion.principalesCultivos.0.idRegimenHidrico", registroProduccion.idRegimenHidrico ?? '');

      // Si tu API trae centros de producción, mapeas el arreglo completo:
      if (productor.centrosProduccion) {
        const centrosForm: CentroProduccion[] = productor.centrosProduccion.map( (centro) => ({
        idCentroProduccion: centro.idCentroProduccion ?? "",
        idTipoCentroProduccion: centro.idTipoCentroProduccion ?? "",
        tipoCentroProduccion: centro.tipoCentroProduccion,
        nombre: centro.nombreCentroProduccion,
        idTipoDocumentoLegal: centro.idTipoDocumentoLegal ?? "",
        idEstado: centro.idEntidadFederativa ?? "",
        idMunicipio: centro.idMunicipio ?? "",
        idLocalidad: centro.idLocalidad ?? "",
        tipoDocumentoLegal: centro.tipoDocumentoLegal,
        nombreEntidadFederativa: centro.nombreEntidadFederativa,
        nombreMunicipio: centro.nombreMunicipio,
        nombreLocalidad: centro.nombreLocalidad,

        georeferencias:{
          coordenadasCentro: (() => {
            const geoCentro = (centro.georreferencias ?? []).find(
              (geo) => geo.tipoGeorreferencia === "CENTRO"
            );

            return geoCentro
              ? {
                  idGeorreferencia: geoCentro?.idGeorreferencia ?? 0,
                  latitud: geoCentro?.latitud ?? 0,
                  longitud: geoCentro?.longitud ?? 0,
                  orden: geoCentro?.orden ?? null,
                  tipoGeorreferencia: geoCentro?.tipoGeorreferencia ?? "",
                }
              : {
                  idGeorreferencia: 0,
                  latitud: 0,
                  longitud: 0,
                  orden: null,
                  tipoGeorreferencia: '',
                };
          })(),
          poligono: (centro.georreferencias ?? [])
          .filter((geo) => geo.tipoGeorreferencia === "POLIGONO")
          .map( (geo): Coordenadas => ({
              idGeorreferencia: geo.idGeorreferencia,
              latitud: geo.latitud,
              longitud: geo.longitud,
              orden: geo.orden,
              tipoGeorreferencia: geo.tipoGeorreferencia,
            })
          ),
        }
        
      })
  );

  setValue("datos.unidadProduccion", centrosForm);
}
    }

    // ---------- CARACTERIZACIÓN ----------
    if (productor.caracterizacion) {
      const caracterizacion = productor.caracterizacion;
      setValue("datos.caracterizacion.perteneceAsociacionCampesina", String(caracterizacion.indAsociacionCampesinaOrganizacionProductores) ?? '');
      //setValue("caracterizacion.idAsociacion", caracterizacion.idTipoDiscapacidad ?? '');//Todo: revisar este nombre de variable
      setValue("datos.caracterizacion.discapacidad", String(caracterizacion.indDiscapacidad )?? '');
      setValue("datos.caracterizacion.idTipoDiscapacidad", caracterizacion.idTipoDiscapacidad ?? '');
      setValue("datos.caracterizacion.idNivelEstudios", caracterizacion.idEscolaridad ?? '');
      setValue("datos.caracterizacion.hablaEspanol", String(caracterizacion.indEspaniol) ?? '');
      setValue("datos.caracterizacion.declaratoriaIndigena", String(caracterizacion.indDeclaratoriaIndigena) ?? '');
      setValue("datos.caracterizacion.idTipoDeclaratoriaIndigena", caracterizacion.idTipoDeclaratoriaIndigena ?? '');
      //TODO: Hace falta el parametro de regimen de propiedad y el de el tipo de lengua
      
    }

    // ---------- EXPEDIENTE ----------
    if (productor.expediente) {
      const expediente = productor.expediente;

      setValue("datos.expediente.idEstadoExpediente", expediente.idExpediente ?? 0);

     const expedienteForm: Documento[] = (expediente.documentos ?? []).map((documento) => ({
        idDocumento: documento.idDocumento ?? undefined,
        idTipoDocumentoExpediente: documento.idTipoDocumentoExpediente ?? undefined,
        tipoDocumentoExpediente: documento.tipoDocumentoExpediente ?? "",
        indDocumentoDigital: documento.indDocumentoDigital ?? undefined,
        nombreDocumentoDigital: documento.nombreDocumentoDigital ?? "",
        linkDescarga: documento.linkDescarga ?? "",
        file: null,
        eliminado: false,
      }));

    setValue("datos.expediente.documentosArreglo", expedienteForm);
    } 
  };  

  return (
    <section className="rounded-lg  bg-card p-4">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <ShieldCheck className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Verificación de identidad</span>
        </h3>
      </div>
        {/* Identificación de la persona */}
        <fieldset className="mt-2 rounded-2xl border border-gray-200 bg-white p-4 ">
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
                <select id="idTipoPersona"
                  {...register("datos.personal.idTipoPersona",  { required:true, setValueAs: (v) => (v === "" ? undefined : Number(v)), })}
                  className={ cn("block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-blue-500 focus:outline-none",{
                      "border-validation-mistake":errors.datos?.personal?.idTipoPersona }) }>
                  <option value={""}>Selecciona</option>
                  {(responseTipoPersona?.data ?? []).map((tipoPersona) => (
                    <option key={tipoPersona.id}  value={tipoPersona.id} >
                      {tipoPersona.nombre}
                    </option>
                  ))}                  
                </select>
                <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
              </div>
              {errors.datos?.personal?.idTipoPersona && (<p className="text-validation-mistake">El tipo persona es requerido.</p>)}
            </div>
  
            {/* CURP */}
            <div className="mb-4">
              <label className="mb-1 block text-sm text-gray-500" htmlFor="curp" >CURP: </label>

              <input id="curp" type="text" placeholder="Ingrese CURP" autoComplete="off"
                {...register('datos.personal.curp', {
                  required: 'La CURP es requerida.',
                  minLength: {
                    value: 18,
                    message: 'La CURP debe tener 18 caracteres.',
                  },
                  onChange: (e) => {
                    e.target.value = e.target.value.toUpperCase();
                  },
                  maxLength: {
                    value: 18,
                    message: 'La CURP debe tener 18 caracteres.',
                  },
                  setValueAs: (value: string) =>
                    (value || '').toUpperCase().trim(),
                  pattern: {
                    value: CURP_REGEX,
                    message: 'La CURP no tiene un formato válido.',
                  },
                  
                })}
                className={cn(
                  'block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-blue-500 focus:outline-none',
                  {
                    'border-validation-mistake':
                      !!errors.datos?.personal?.curp,
                  }
                )}
              />

              {errors.datos?.personal?.curp && (
                <p className="mt-1 text-sm text-validation-mistake">
                  {errors.datos?.personal.curp.message?.toString()}
                </p>
              )}
            </div>
          </div>  
          <div className="mb-3 grid gap-4 sm:grid-cols-3">
            {/* Botón Consultar (ejemplo) */}
            <div className="">
              <button type="button" onClick={ buscarProductor } title="Consultar" disabled={isFetching}
                className="rounded-xl bg-guinda-160 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-guinda-170 disabled:cursor-not-allowed disabled:opacity-40">
                {isFetching ? ( <div className="flex items-center gap-2"><Spinner /> <span>Buscando información...</span>  </div> ) : ( 'Consultar' )}                
              </button>
            </div>
          </div>
        </fieldset>
      </section>
    );
  }
  