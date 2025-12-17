
import  { useState } from 'react'
import type { CentroProduccion, UbicacionGeografica } from '../../../interfaces/centrosProducccion.interface';
import {  useCatalogosLocalidad, useCatalogosMunicipio} from '../../../hooks/useCatalogos';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import type { UseQueryResult } from '@tanstack/react-query';
import type { CatalogoResponse } from '../../../interfaces/response/catalogos.response';
import { Edit2, MapPinned, Plus, Trash2 } from 'lucide-react'
import type { Productor } from '../../../interfaces/productor.interface';
type VerifyIdentityStepProps = {
  onNext: () => void;
  onBack: () => void;
  catalogos:{
    tipoDocumentoLegal: UseQueryResult<CatalogoResponse, Error>,
    entidadFederativa : UseQueryResult<CatalogoResponse, Error>,
  }
};
export const CentrosProduccion = ({ onNext,onBack,catalogos }: VerifyIdentityStepProps ) => {

    const {  /*control,formState:{errors},*/ watch, setValue } = useFormContext<Productor>();
    
    const [showModal, setShowModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);  
    
    
    const emptyCentro: CentroProduccion = {
      idCentroProduccion: undefined,
      idTipoCentroProduccion: undefined,
      tipoCentroProduccion: '',
      nombreCentroProduccion: "",
      idTipoDocumentoLegal: undefined,
      idEntidadFederativa: undefined,
      idMunicipio: undefined,
      idLocalidad: undefined,
      tipoDocumentoLegal: "",
      nombreEntidadFederativa: "",
      nombreMunicipio: "",
      nombreLocalidad: "",
      georeferencias: [],
    };

    const createEmptyGeo = (orden: number): UbicacionGeografica => ({
      idGeorreferencia: 0,        // 0 temporal (backend suele asignar)
      latitud: "",
      longitud: "",
      orden,
      tipoGeorreferencia: "",
    });
    const [currentCentro, setCurrentCentro] = useState<CentroProduccion | null>( emptyCentro);
    const handleAddCentro = () => {
        setEditingIndex(null);
        setCurrentCentro(emptyCentro);
        setShowModal(true);
    };
    
    const arregloCentrosProduccion =  watch("centroProduccion") ?? [];
    
    const handleEditCentro = (index: number) => {
        setEditingIndex(index);
        setCurrentCentro({ ...arregloCentrosProduccion[index] });
        setShowModal(true);
    };
    
      const handleSaveCentro = (currentCentro:CentroProduccion) => {
      // Buscar nombres en los catálogos según los IDs del currentCentro
      const nombreEstado =
        (responseEntidadFederativa?.data ?? []).find(
          (e) => e.id === currentCentro.idEntidadFederativa
        )?.nombre ?? "";
    
      const nombreMunicipio =
        (dataMunicipio?.data ?? []).find(
          (m) => m.id === currentCentro.idMunicipio
        )?.nombre ?? "";
    
      const nombreLocalidad =
        (dataLocalidad?.data ?? []).find(
          (l) => l.id === currentCentro.idLocalidad
        )?.nombre ?? "";
    
      // Construir centro con IDs + nombres
      const centroConNombres: CentroProduccion = {
        ...currentCentro,
        nombreEntidadFederativa: nombreEstado,
        nombreMunicipio,
        nombreLocalidad,
      };
    
      const updatedCentros = [...arregloCentrosProduccion];
    
      if (editingIndex !== null) {
        updatedCentros[editingIndex] = centroConNombres;
      } else {
        updatedCentros.push(centroConNombres);
      }
    
      // Guardar en el form
      setValue("centroProduccion", updatedCentros, {
        shouldDirty: true,
        shouldValidate: true,
      });
    
      setShowModal(false);
    };
    
    const handleDeleteCentro = (index: number) => {
      const updatedCentros = arregloCentrosProduccion.filter((_, i) => i !== index);
    
      setValue("centroProduccion", updatedCentros, {
        shouldDirty: true,
        shouldValidate: true,
      });
    };
      const idEntidadCentro = Number(currentCentro?.idEntidadFederativa || 0);
      const idMunicipioCentro = Number(currentCentro?.idMunicipio || 0);


    const  responseDocumentoLegal = catalogos.tipoDocumentoLegal.data;
    //Catalogos
    const responseEntidadFederativa = catalogos.entidadFederativa.data;
    const { data: dataMunicipio, /*isLoading: isLoadingMunicipio,  isError: isErrorMunicipio,*/} = useCatalogosMunicipio( Number(idEntidadCentro) );
    const { data: dataLocalidad, /*isLoading: isLoadingLocalidad,  isError: isErrorLocalidad,*/} = useCatalogosLocalidad( Number(idMunicipioCentro) );
    
  return (
    <section className="rounded-2xl p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-dorado-110">
          <MapPinned className="h-5 w-5 text-dorado-110 shrink-0" aria-hidden />
          <span className="leading-none">Centros de producción</span>
        </h3>
      </div>
    {/* Centros Productivos */}
      <fieldset className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm mt-2">
        <legend className="flex items-center gap-2 px-2 text-sm font-semibold text-guinda-150">          
          <span>Centros Productivos</span>
        </legend>
        <button onClick={(e) => {e.preventDefault(); handleAddCentro(); }}
          className="mb-4 px-4 py-2 bg-guinda-150 text-neutro-100 rounded-lg font-medium hover:bg-guinda-160 transition-all flex items-center space-x-2 shadow-md hover:shadow-lg" >
          <Plus className="w-4 h-4" />
          <span>Agregar Centro</span>
        </button>

        { arregloCentrosProduccion.length === 0 ? (
          <div className="text-center py-8 text-neutro-600">
            No hay centros productivos registrados
          </div>
          ) : (
          <div className="space-y-4">
            {arregloCentrosProduccion.map((centro, index) => (
              <div key={centro.idCentroProduccion} className="border border-neutro-300 rounded-lg p-4 bg-neutro-300 hover:shadow-md transition-shadow" >
                <div className="flex items-start justify-between">
                  <div className="flex-1 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-neutro-800">Nombre:</span>
                      <span className="ml-2 text-neutro-700">
                        {centro.nombreCentroProduccion || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-neutro-800">Estado:</span>
                      <span className="ml-2 text-neutro-700">
                        {centro.nombreEntidadFederativa || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-neutro-800">Municipio:</span>
                        <span className="ml-2 text-neutro-700">
                          {centro.nombreMunicipio || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium text-neutro-800">Localidad:</span>
                        <span className="ml-2 text-neutro-700">
                          {centro.nombreLocalidad || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button onClick={(e) => {
                          e.preventDefault();
                          handleEditCentro(index);
                        }}
                        className="p-2 text-validation-info hover:bg-validation-info-light rounded transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteCentro(index);
                        }}
                        className="p-2 text-validation-mistake hover:bg-validation-mistake-light rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          )}
          </fieldset>

      {showModal && (
        <div className="fixed inset-0  bg-gray-500/40  flex items-center justify-center z-50">
          <div className="bg-neutro-100 rounded-lg  bg-opacity-10 shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
            <div className="p-6 border-b border-neutro-200">
              <h3 className="text-xl font-bold text-guinda-170">
                {editingIndex !== null ? 'Editar' : 'Agregar'} Centro Productivo
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutro-800 mb-2">
                    Nombre centro:
                  </label>
                  <input type="text" value={currentCentro?.nombreCentroProduccion}
                    onChange={(e) =>
                      setCurrentCentro((prev) => ({
                        ...(prev ?? emptyCentro),
                        nombreCentroProduccion: e.target.value,
                      }))
                    }
                    placeholder="Ejemplo: Rancho escondido"
                    className="w-full px-4 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutro-800 mb-2">
                    Tipo de Documento Legal *
                  </label>
                  <select value={currentCentro?.idTipoDocumentoLegal}
                    onChange={(e) =>
                      setCurrentCentro((prev ) => ({
                      ...(prev ?? emptyCentro), idTipoDocumentoLegal: e.target.value === "" ? undefined : Number(e.target.value),})) }
                    
                    className="w-full px-4 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none" >
                    <option value={-1}>Seleccione...</option>

                    {(responseDocumentoLegal?.data ?? []).map((documentoLegal) => (
                            <option key={documentoLegal.id}  value={documentoLegal.id} >
                            {documentoLegal.nombre}
                            </option>
                        ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutro-800 mb-2">
                    Estado *
                  </label>
                  <select value={currentCentro?.idEntidadFederativa}
                    onChange={(e) =>
                      setCurrentCentro((prev) => ({
                      ...(prev ?? emptyCentro), idEntidadFederativa: e.target.value === "" ? undefined : Number(e.target.value),})) }

                    className="w-full px-4 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                  >
                    <option value={-1}>Seleccione...</option>
                    {(responseEntidadFederativa?.data ?? []).map((entidadFedereativa) => (
                            <option key={entidadFedereativa.id}  value={entidadFedereativa.id} >
                            {entidadFedereativa.nombre}
                            </option>
                        ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutro-800 mb-2">
                    Municipio *
                  </label>
                  <select value={currentCentro?.idMunicipio} disabled={!currentCentro?.idEntidadFederativa || currentCentro.idEntidadFederativa === -1}
                    onChange={(e) =>
                      setCurrentCentro((prev) => ({
                      ...(prev ?? emptyCentro), idMunicipio: e.target.value === "" ? undefined : Number(e.target.value),})) }
                    
                    className="w-full px-4 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                  >
                    <option value={-1}>Seleccione...</option>
                    {(dataMunicipio?.data ?? []).map((municipio) => (
                            <option key={municipio.id}  value={municipio.id} >
                            {municipio.nombre}
                            </option>
                        ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutro-800 mb-2">
                    Localidad *
                  </label>
                  <select value={currentCentro?.idLocalidad} disabled={!currentCentro?.idMunicipio || currentCentro.idMunicipio === -1}
                    onChange={(e) => setCurrentCentro((prev) => ({ ...(prev ?? emptyCentro), idLocalidad: e.target.value === "" ? undefined : Number(e.target.value),})) }

                    className="w-full px-4 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                  >
                    <option value={-1}>Seleccione...</option>
                    {(dataLocalidad?.data ?? []).map((localidad) => (
                            <option key={localidad.id}  value={localidad.id} >
                            {localidad.nombre}
                            </option>
                        ))}
                  </select>
                </div>
                {/* ===================== Georreferencias ===================== */}
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-neutro-800">
                      Ubicación geográfica (georreferencias)
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentCentro((prev) => {
                          const base = prev ?? emptyCentro;
                          const geos = Array.isArray(base.georeferencias) ? base.georeferencias : [];
                          const nextOrden = geos.length + 1;

                          return {
                            ...base,
                            georeferencias: [...geos, createEmptyGeo(nextOrden)],
                          };
                        });
                      }}
                      className="px-3 py-2 bg-guinda-150 text-neutro-100 rounded-lg hover:bg-guinda-160 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Agregar ubicación
                    </button>
                  </div>

                  {/* Lista */}
                  <div className="mt-3 space-y-3">
                    {(currentCentro?.georeferencias ?? []).length === 0 ? (
                      <div className="text-sm text-neutro-600">
                        No hay ubicaciones registradas.
                      </div>
                    ) : (
                      (currentCentro?.georeferencias ?? []).map((geo, idx) => (
                        <div
                          key={`${geo.idGeorreferencia}-${idx}`}
                          className="border border-neutro-300 rounded-lg p-3 bg-white"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                              <div>
                                <label className="block text-xs font-medium text-neutro-700 mb-1">
                                  Latitud
                                </label>
                                <input
                                  type="text"
                                  value={geo.latitud ?? ""}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setCurrentCentro((prev) => {
                                      const base = prev ?? emptyCentro;
                                      const geos = [...(base.georeferencias ?? [])];
                                      geos[idx] = { ...geos[idx], latitud: val };
                                      return { ...base, georeferencias: geos };
                                    });
                                  }}
                                  placeholder="Ej: 20.659699"
                                  className="w-full px-3 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-neutro-700 mb-1">
                                  Longitud
                                </label>
                                <input
                                  type="text"
                                  value={geo.longitud ?? ""}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setCurrentCentro((prev) => {
                                      const base = prev ?? emptyCentro;
                                      const geos = [...(base.georeferencias ?? [])];
                                      geos[idx] = { ...geos[idx], longitud: val };
                                      return { ...base, georeferencias: geos };
                                    });
                                  }}
                                  placeholder="Ej: -103.349609"
                                  className="w-full px-3 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-medium text-neutro-700 mb-1">
                                  Tipo de georreferencia
                                </label>
                                <select
                                  value={geo.tipoGeorreferencia ?? ""}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setCurrentCentro((prev) => {
                                      const base = prev ?? emptyCentro;
                                      const geos = [...(base.georeferencias ?? [])];
                                      geos[idx] = { ...geos[idx], tipoGeorreferencia: val };
                                      return { ...base, georeferencias: geos };
                                    });
                                  }}
                                  className="w-full px-3 py-2 border border-neutro-400 rounded-lg focus:ring-2 focus:ring-guinda-150 focus:border-transparent outline-none"
                                >
                                  <option value="">Seleccione...</option>
                                  <option value="PUNTO">Punto</option>
                                  <option value="CENTROIDE">Centroide</option>
                                  <option value="DOMICILIO">Domicilio</option>
                                  <option value="OTRO">Otro</option>
                                </select>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setCurrentCentro((prev) => {
                                  const base = prev ?? emptyCentro;
                                  const geos = [...(base.georeferencias ?? [])].filter((_, i) => i !== idx);

                                  // re-orden opcional
                                  const geosReorden = geos.map((g, i) => ({ ...g, orden: i + 1 }));

                                  return { ...base, georeferencias: geosReorden };
                                });
                              }}
                              className="p-2 text-validation-mistake hover:bg-validation-mistake-light rounded transition-colors"
                              title="Eliminar ubicación"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
            <div className="p-6 border-t border-neutro-200 flex justify-end space-x-3">
              <button onClick={(e) => {e.preventDefault();setShowModal(false)}}
                className="px-6 py-2 border border-neutro-400 text-neutro-700 rounded-lg hover:bg-neutro-300 transition-colors"
              >
                Cancelar
              </button>
              <button type="button"
                onClick={(e) => { e.preventDefault(); if (!currentCentro) return; 
                  handleSaveCentro(currentCentro);
                }}
                className="px-6 py-2 bg-guinda-150 text-neutro-100 rounded-lg hover:bg-guinda-160 transition-colors shadow-md" >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )} 
         
        <div className="flex justify-between pt-6 border-t border-border">
            <Button  className="bg-guinda-160  text-white" onClick={onBack} variant="outline" size="lg"> Anterior </Button>
            <Button className="bg-guinda-160  text-white" onClick={onNext} size="lg"> Siguiente </Button>
        </div>
    </section>
  )
}


