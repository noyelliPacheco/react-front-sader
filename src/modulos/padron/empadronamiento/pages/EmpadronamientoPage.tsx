import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { InformacionRegistroProduccion } from "../components/custom/seccionesForm/InformacionRegistroProduccion";
import { InformacionCaracterizacion } from "../components/custom/seccionesForm/InformacionCaracterizacion";
import { InformacionExpediente } from "../components/custom/seccionesForm/InformacionExpediente";
import { InformacionDomicilio } from "../components/custom/seccionesForm/InformacionDomicilio";
import { InformacionPersonal } from "../components/custom/seccionesForm/InformacionPersonal";

import { VerificarIdentidad } from "../components/custom/seccionesForm/VerificarIdentidad";
import { Finalizacion } from "../components/custom/seccionesForm/Finalizacion";
import {  WizardSidebar,  type WizardStep,} from "../components/custom/wizard/WizardSiderbar";

import {  ShieldCheck,  User,Home, FolderOpen, MapPinned,ChartLine,LayoutList,CircleCheckBig} from "lucide-react";
import { CentrosProduccion } from "../components/custom/seccionesForm/CentrosProduccion";
import { useCatalogosCultivoEspecie, useCatalogosDocumentosExpediente, useCatalogosEntidadFederativa, 
  useCatalogosEscolaridad, useCatalogosEstadoCivil, useCatalogosLocalidad, useCatalogosMunicipio, useCatalogosNacionalidad, useCatalogosOrganizacion, 
  useCatalogosPoblacionIndigena, useCatalogosRegimenHidrico, useCatalogosSectorAgroalimentario, useCatalogosSexo, 
  useCatalogosTipoAsentamientoHumano, useCatalogosTipoCultivo, useCatalogosTipoDireccion, useCatalogosTipoDiscapacidad, 
  useCatalogosTipoDocumentoLegal, useCatalogosTipoPersona, useCatalogosTipoRegimen, useCatalogosTipoTelefono, useCatalogosTipoVialidad } from "../hooks/useCatalogos";
import type { Productor } from "../interfaces/productor.interface";

interface Props {
  derechohabienteForm: Productor | undefined;
}

export const EmpadronamientoPage = ({ derechohabienteForm }: Props) => {
  /**  Variables  **/
  const methods = useForm<Productor>({ defaultValues: derechohabienteForm, mode: "onSubmit", });
  const { handleSubmit, /*formState: { errors },*/ watch  } = methods;

  const idEntidad = Number(watch("domicilio.idEntidad"));
  const idMunicipio = Number(watch("domicilio.idMunicipio"));
  
  
    const catalogoMunicipio = useCatalogosMunicipio(idEntidad);
    const catalogoLocalidad = useCatalogosLocalidad(idMunicipio); 

  // Estado del wizard
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps: WizardStep[] = [
    {
      id: 1,
      title: "Verificar identidad",
      icon: ShieldCheck,
      status:
        currentStep === 1
          ? "active"
          : completedSteps.includes(1)
          ? "complete"
          : "pending",
    },{
      id: 2,
      title: "Información personal",
      icon: User,
      status:
        currentStep === 2
          ? "active"
          : completedSteps.includes(2)
          ? "complete"
          : "pending",
    },{
      id: 3,
      title: "Domicilio particular",
      icon: Home,
      status:
        currentStep === 3
          ? "active"
          : completedSteps.includes(3)
          ? "complete"
          : "pending",
    },{
      id: 4,
      title: "Registro de producción",
      icon: ChartLine,
      status:
        currentStep === 4
          ? "active"
          : completedSteps.includes(4)
          ? "complete"
          : "pending",
    },{
      id: 5,
      title: "Centro de producción",
      icon: MapPinned,
      status:
        currentStep === 5
          ? "active"
          : completedSteps.includes(5)
          ? "complete"
          : "pending",
    },
    {
      id: 6,
      title: "Caracterización",
      icon: LayoutList,
      status:
        currentStep === 6
          ? "active"
          : completedSteps.includes(6)
          ? "complete"
          : "pending",
    },{
      id: 7,
      title: "Expediente",
      icon: FolderOpen,
      status:
        currentStep === 7
          ? "active"
          : completedSteps.includes(7)
          ? "complete"
          : "pending",
    },{
      id: 8,
      title: "Finalización",
      icon: CircleCheckBig,
      status:
        currentStep === 8
          ? "active"
          : completedSteps.includes(8)
          ? "complete"
          : "pending",
    },
  ];

  const catalogoEntidadFederativa = useCatalogosEntidadFederativa();
  const catalogoTipoPersona = useCatalogosTipoPersona();
  const catalogosInformacionPersonal = {
    estadoCivil: useCatalogosEstadoCivil(),
    sexo: useCatalogosSexo(),      
    nacionalidad: useCatalogosNacionalidad(),
    tipoTelefono: useCatalogosTipoTelefono(),
    entidadFederativa : catalogoEntidadFederativa,
  };
    
  const catalogoDocumentosExpediente= {documentosExpediente:useCatalogosDocumentosExpediente()};

  const catalogoDomicilio={
      tipoAsentamiento: useCatalogosTipoAsentamientoHumano(),
      tipoDireccion: useCatalogosTipoDireccion(),      
      tipoVialidad: useCatalogosTipoVialidad(),
      entidadFederativa : catalogoEntidadFederativa,
      municipio : catalogoMunicipio,
      localidad : catalogoLocalidad,
    };
  const catalogoRegistroProduccion={
      sectorAlimentario: useCatalogosSectorAgroalimentario(),
      cultivosEspecies: useCatalogosCultivoEspecie(),      
      tipoCultivo: useCatalogosTipoCultivo(),
      regimenHidrico: useCatalogosRegimenHidrico(),
    };
  const catalogoCentroProductivo={
      tipoDocumentoLegal: useCatalogosTipoDocumentoLegal(),
      entidadFederativa : catalogoEntidadFederativa,
    };
    const catalogoCaracterizacion={
      asociacionOrganizacion: useCatalogosOrganizacion(),
      discapacidad: useCatalogosTipoDiscapacidad(),
      poblacionIndigena: useCatalogosPoblacionIndigena(),
      nivelEstudios: useCatalogosEscolaridad(),
      regimenPropietario: useCatalogosTipoRegimen(),
    };

  /**  Métodos  **/
  const onSubmit = (data: Productor) => {
    console.log("Empadronamiento -> datos:", JSON.stringify(data, null, 2));
    handleNext();

  };

  const handleNext = () => {
    console.log(currentStep);
    if (currentStep < 9) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    
    <div className="flex min-h-[calc(100vh-5rem)] gap-6 p-4">
      {/* Columna de pasos */}
      <WizardSidebar steps={steps} currentStep={currentStep} onStepClick={handleStepClick} />

      {/* Contenido del formulario */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-1 flex-col" >
          {/* Tarjeta principal que se estira */}
          <div className="flex-1 rounded-2xl  bg-white p-3 ">

            {/* Contenido del paso con scroll si es muy largo */}
            <div className="flex-1 overflow-auto">
              {currentStep === 1 && ( <VerificarIdentidad onNext={handleNext} catalogos={catalogoTipoPersona}/> )}
              {currentStep === 2 && ( <InformacionPersonal onNext={handleNext} onBack={handleBack} catalogos={catalogosInformacionPersonal} /> )}
              {currentStep === 3 && ( <InformacionDomicilio onNext={handleNext} onBack={handleBack} catalogos={catalogoDomicilio}/> )}
              {currentStep === 4 && ( <InformacionRegistroProduccion onNext={handleNext} onBack={handleBack} catalogos={catalogoRegistroProduccion}/> )}
              {currentStep === 5 && ( <CentrosProduccion onNext={handleNext} onBack={handleBack} catalogos={catalogoCentroProductivo}/> )}
              {currentStep === 6 && ( <InformacionCaracterizacion onNext={handleNext} onBack={handleBack} catalogos={catalogoCaracterizacion}/> )}
              {currentStep === 7 && ( <InformacionExpediente onNext={handleNext} onBack={handleBack} onSubmit={onSubmit} catalogos={catalogoDocumentosExpediente}/> )}
              {currentStep === 8 && <Finalizacion  />}
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
