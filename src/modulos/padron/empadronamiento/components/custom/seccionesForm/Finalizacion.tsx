
import { CheckCircle2,CircleCheckBig, Download, SmilePlus } from 'lucide-react'
import { useFormContext } from 'react-hook-form';
import type { Productor } from '../../../interfaces/productor.interface';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { AcuseRegistroDocument } from './pdf/AcusePdf';

type Props = {
  nombreProductor: string;
  curp: string;
  tipoPersona: string;
  folioRegistro: string;
  fechaRegistro: string;
  fechaActualizacion: string;
};

export const Finalizacion = ( )=> {

const {  watch,  } = useFormContext<Productor>();
  const nombreCompleto = watch('personal.nombre') + ' ' + watch('personal.apellidoPaterno') + ' ' + watch('personal.apellidoMaterno');
  const tipoPersona:string = watch('personal.idTipoPersona') == 1 ? "Fisica" : "Moral";
  const datosPdf:Props = {
    nombreProductor: nombreCompleto,
    curp: watch('personal.curp'),
    tipoPersona:  tipoPersona,
    folioRegistro: '00-1',
    fechaRegistro: Date(),
    fechaActualizacion: Date(),
  };
  const limpiarFormulario= () =>{

  }
 
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
          Has completado todos los pasos del registro. Estamos generando tu comprobante de Registro.
        </p>
      </div>

      

      <div className="flex flex-col sm:flex-row gap-2 pt-6 border-t border-border justify-center items-center">        
        <PDFDownloadLink
              document={<AcuseRegistroDocument {...datosPdf} />}
              fileName={`acuse-registro-${datosPdf.curp || "productor"}.pdf`}
            >
              {({ loading }) => (
                
                <button type="button" className="px-4 py-2 rounded-md text-white text-sm font-semibold bg-gray-400 hover:bg-gray-800 items-center" >
                  {loading ? "Generando PDF..." : <Download className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />}
                </button>
              )}
            </PDFDownloadLink>
        <button type="button" onClick={limpiarFormulario} title="Crear nuevo Registro" className="items-center rounded-sm bg-guinda-160 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-guinda-170 disabled:cursor-not-allowed disabled:opacity-40">
          <SmilePlus className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          Crear nuevo Registro
        </button>
      </div>

    </div>
    </section>

    
  )
}
