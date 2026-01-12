import { MapPinned, Plus, Search } from "lucide-react";
import type { UseQueryResult } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import type { CatalogoResponse } from "../../../../interfaces/response/catalogos.response";

import { useInformacionCentroProduccion } from "./useInformacionCentroProduccion";
import { CentroProduccionModal } from "./components/CentroProduccionModal";
import { ListaCard } from "./components/ListaCard";

type Props = {
  onNext: () => void;
  onBack: () => void;
  catalogos: {
    tipoDocumentoLegal: UseQueryResult<CatalogoResponse, Error>;
    entidadFederativa: UseQueryResult<CatalogoResponse, Error>;
    tipoCentroProduccion: UseQueryResult<CatalogoResponse, Error>;
  };
};

export const InformacionCentroProduccion = ({ onNext, onBack, catalogos }: Props) => {
  const vm = useInformacionCentroProduccion({ catalogos });

  return (
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <MapPinned className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Centros de producción</span>
        </h3>
      </div>

      <fieldset >
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">
          <span>Centros Productivos</span>
        </legend>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar centro por nombre,estado, municipio y localidad"                    
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg  transition-all"
                  />
                </div>

                <div className="flex gap-3">                  
                  <button className="mb-4 px-4 py-2 bg-guinda-150 text-neutro-100 rounded-lg font-medium hover:bg-guinda-160 transition-all flex items-center space-x-2 shadow-md hover:shadow-lg" 
                    onClick={(e) => {
                      e.preventDefault();
                      vm.openAddModal();
                    }} >
                    
                    <Plus className="w-5 h-5" />
                    Agregar Centro
                  </button>
                </div>
              </div>
            </div>
          </div>
          

        

        <ListaCard centros={vm.centros} onEdit={vm.openEditModal} onDelete={vm.deleteCentro} />
      </fieldset>

      {vm.showModal && (
        <CentroProduccionModal
          title={vm.editingIndex !== null ? "Editar Centro Productivo" : "Agregar Centro Productivo"}
          currentCentro={vm.currentCentro}
          setCurrentCentro={vm.setCurrentCentro}
          onClose={vm.closeModal}
          onSave={vm.saveCentro}
          optionsTipoCentro={vm.optionsTipoCentro}
          selectedTipoCentro={vm.selectedTipoCentro}
          onTipoCentroChange={vm.onTipoCentroChange}
          optionsDocLegal={vm.optionsDocLegal}
          selectedDocLegal={vm.selectedDocLegal}
          onDocLegalChange={vm.onDocLegalChange}
          optionsEntidad={vm.optionsEntidad}
          selectedEntidad={vm.selectedEntidad}
          onEntidadChange={vm.onEntidadChange}
          optionsMunicipio={vm.optionsMunicipio}
          selectedMunicipio={vm.selectedMunicipio}
          onMunicipioChange={vm.onMunicipioChange}
          optionsLocalidad={vm.optionsLocalidad}
          selectedLocalidad={vm.selectedLocalidad}
          onLocalidadChange={vm.onLocalidadChange}
          geoDraft={vm.geoDraft}
          setGeoDraftCentro={vm.setGeoDraftCentro}
          commitGeoCentro={vm.commitGeoCentro}
          setGeoDraftPoligono={vm.setGeoDraftPoligono}
          commitGeoPoligono={vm.commitGeoPoligono}
          onAddPolygonPoint={vm.onAddPolygonPoint}
          onRemovePolygonPoint={vm.onRemovePolygonPoint}
          isMunicipioDisabled={vm.isMunicipioDisabled}
          isLocalidadDisabled={vm.isLocalidadDisabled}
        />
      )}

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
