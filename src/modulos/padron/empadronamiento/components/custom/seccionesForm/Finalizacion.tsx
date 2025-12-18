
import { CheckCircle2,CircleCheckBig, Download, } from 'lucide-react'
import { useFormContext } from 'react-hook-form';
import type { Productor } from '../../../interfaces/productor.interface';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AcuseRegistroDocument } from './pdf/AcusePdf';
import { toast } from 'sonner';
import { defaultProductorValues } from '../../../interfaces/defaultProductorValues.interface';

type Props = {
  nombreProductor: string;
  curp: string;
  tipoPersona: string;
  folioRegistro: string | undefined;
  fechaRegistro: string;
  fechaActualizacion: string;
};

type VerifyIdentityStepProps = {
  
  stepClick: (stepId: number) => void;
};


export const Finalizacion = ({ stepClick, }: VerifyIdentityStepProps )=> {

const {  watch, reset } = useFormContext<Productor>();
  const nombreCompleto = watch('datos.personal.nombre') + ' ' + watch('datos.personal.apellidoPaterno') + ' ' + watch('datos.personal.apellidoMaterno');
  const tipoPersona:string = watch('datos.personal.idTipoPersona') == 1 ? "Fisica" : "Moral";
  const folio = watch('datos.folio') ;
  const datosPdf:Props = {
    nombreProductor: nombreCompleto,
    curp: watch('datos.personal.curp'),
    tipoPersona:  tipoPersona,
    folioRegistro: folio,
    fechaRegistro: Date(),
    fechaActualizacion: Date(),
  };
  const limpiarFormulario= () =>{
    // reset completo
    reset(defaultProductorValues);

    toast.success("Formulario limpio.", { position: "bottom-center" });
    stepClick(1);


  };
  
  return (
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
        <div className="mb-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
              <CircleCheckBig className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
              <span className="leading-none">Finalización</span>
            </h3>
        </div>
        <div className="space-y-3">
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-2">
          <CheckCircle2 className="w-10 h-10 text-validation-success" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-1">
          ¡Todo listo!
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Has completado todos los pasos del registro. Puedes decargar tu Anexo.
        </p>
      </div>

      

      <div className="flex flex-col sm:flex-row gap-2 pt-6 border-t border-border justify-center items-center">        
        <PDFDownloadLink
              document={<AcuseRegistroDocument {...datosPdf} />}
              fileName={`acuse-registro-${datosPdf.curp || "productor"}.pdf`}
            >
              {({ loading }) => (
                
               <button type="button" disabled={loading}
                  className="px-4 py-2 rounded-md text-white text-sm font-semibold bg-gray-400 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2" >
                  <Download className="w-4 h-4" />
                  {loading ? "Generando PDF..." : "Anexo II"}
                </button>
              )}
            </PDFDownloadLink>
        <button type="button" onClick={limpiarFormulario} title="Crear nuevo Registro" className="items-center rounded-sm bg-guinda-160 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-guinda-170 disabled:cursor-not-allowed disabled:opacity-40">
          Crear nuevo Registro
        </button>
      </div>

    </div>
    </section>

    
  )
}
