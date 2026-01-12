import Select from "react-select";
import { Plus, Trash2 } from "lucide-react";
import type { CentroProduccion } from "../../../../../interfaces/centroProducccion.interface";
import type { SelectOption } from "../utils/opcionesSelect";

type GeoDraft = {
  centro: { lat: string; lng: string };
  poligono: Array<{ lat: string; lng: string }>;
};

type Props = {
  title: string;
  currentCentro: CentroProduccion;
  setCurrentCentro: React.Dispatch<React.SetStateAction<CentroProduccion>>;
  onClose: () => void;
  onSave: () => void;

  // selects
  optionsTipoCentro: SelectOption[];
  selectedTipoCentro: SelectOption | null;
  onTipoCentroChange: (opt: SelectOption | null) => void;

  optionsDocLegal: SelectOption[];
  selectedDocLegal: SelectOption | null;
  onDocLegalChange: (opt: SelectOption | null) => void;

  optionsEntidad: SelectOption[];
  selectedEntidad: SelectOption | null;
  onEntidadChange: (opt: SelectOption | null) => void;

  optionsMunicipio: SelectOption[];
  selectedMunicipio: SelectOption | null;
  onMunicipioChange: (opt: SelectOption | null) => void;

  optionsLocalidad: SelectOption[];
  selectedLocalidad: SelectOption | null;
  onLocalidadChange: (opt: SelectOption | null) => void;

  // geo draft
  geoDraft: GeoDraft;
  setGeoDraftCentro: (field: "lat" | "lng", text: string) => void;
  commitGeoCentro: (field: "lat" | "lng") => void;

  setGeoDraftPoligono: (idx: number, field: "lat" | "lng", text: string) => void;
  commitGeoPoligono: (idx: number, field: "lat" | "lng") => void;

  onAddPolygonPoint: () => void;
  onRemovePolygonPoint: (idx: number) => void;

  isMunicipioDisabled: boolean;
  isLocalidadDisabled: boolean;
};

export const CentroProduccionModal = ({
  title,
  currentCentro,
  setCurrentCentro,
  onClose,
  onSave,
  optionsTipoCentro,
  selectedTipoCentro,
  onTipoCentroChange,
  optionsDocLegal,
  selectedDocLegal,
  onDocLegalChange,
  optionsEntidad,
  selectedEntidad,
  onEntidadChange,
  optionsMunicipio,
  selectedMunicipio,
  onMunicipioChange,
  optionsLocalidad,
  selectedLocalidad,
  onLocalidadChange,
  geoDraft,
  setGeoDraftCentro,
  commitGeoCentro,
  setGeoDraftPoligono,
  commitGeoPoligono,
  onAddPolygonPoint,
  onRemovePolygonPoint,
  isMunicipioDisabled,
  isLocalidadDisabled,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-50">
      <div className="bg-neutro-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 border-b border-neutro-200">
          <h3 className="text-xl font-bold text-guinda-170">{title}</h3>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="mb-2 block text-sm text-gray-500">
                Nombre centro: <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentCentro.nombre ?? ""}
                className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                onChange={(e) =>
                  setCurrentCentro((prev) => ({
                    ...prev,
                    nombre: (e.target.value ?? "").toUpperCase(),
                  }))
                }
              />
            </div>

            {/* Tipo centro */}
            <div>
              <label className="mb-1 block text-sm text-gray-500">Tipo de centro de producción *:</label>
              <Select
                unstyled
                value={selectedTipoCentro}
                options={optionsTipoCentro}
                placeholder="SELECCIONA"
                isClearable
                isSearchable
                onChange={(opt) => onTipoCentroChange(opt as any)}
                classNames={{
                  control: ({ isFocused }) =>
                    [
                      "block w-full min-w-0 appearance-none",
                      "border-0 border-b bg-transparent",
                      "px-0 pb-1 pr-6",
                      "text-base text-gray-900",
                      "focus:outline-none",
                      isFocused ? "border-guinda-150" : "border-gray-300",
                    ].join(" "),
                  valueContainer: () => "p-0",
                  input: () => "m-0 p-0 text-base text-gray-900",
                  singleValue: () => "m-0 p-0 text-base text-gray-900 truncate",
                  placeholder: () => "m-0 p-0 text-gray-400",
                  indicatorsContainer: () => "p-0",
                  clearIndicator: () => "text-gray-400 hover:text-gray-600",
                  dropdownIndicator: () => "text-gray-400 hover:text-gray-600",
                  menu: () => "z-50 rounded-md border border-gray-200 bg-white shadow-lg",
                  option: ({ isFocused, isSelected }) =>
                    ["px-4 py-2 cursor-pointer text-sm", isSelected ? "bg-guinda-150 text-white" : "", isFocused && !isSelected ? "bg-guinda-50" : ""].join(
                      " "
                    ),
                }}
              />
            </div>

            {/* Documento legal */}
            <div className="min-w-0 w-full">
              <label className="block text-sm font-medium text-neutro-800 mb-2">
                Tipo de Documento Legal: <span className="ml-1 text-red-500">*</span>
              </label>
              <Select
                unstyled
                value={selectedDocLegal}
                options={optionsDocLegal}
                placeholder="SELECCIONA"
                isClearable
                isSearchable
                onChange={(opt) => onDocLegalChange(opt as any)}
                classNames={{
                  control: ({ isFocused }) =>
                    [
                      "block w-full min-w-0 appearance-none",
                      "border-0 border-b bg-transparent",
                      "px-0 pb-1 pr-6",
                      "text-base text-gray-900",
                      "focus:outline-none",
                      isFocused ? "border-guinda-150" : "border-gray-300",
                    ].join(" "),
                  valueContainer: () => "p-0",
                  placeholder: () => "m-0 p-0 text-gray-400",
                  indicatorsContainer: () => "p-0",
                  menu: () => "z-50 rounded-md border border-gray-200 bg-white shadow-lg",
                  option: ({ isFocused, isSelected }) =>
                    ["px-4 py-2 cursor-pointer text-sm", isSelected ? "bg-guinda-150 text-white" : "", isFocused && !isSelected ? "bg-guinda-50" : ""].join(
                      " "
                    ),
                }}
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-medium text-neutro-800 mb-2">
                Estado: <span className="ml-1 text-red-500">*</span>
              </label>
              <Select
                unstyled
                value={selectedEntidad}
                options={optionsEntidad}
                placeholder="SELECCIONA"
                isClearable
                isSearchable
                onChange={(opt) => onEntidadChange(opt as any)}
                classNames={{
                  control: ({ isFocused }) =>
                    [
                      "block w-full min-w-0 appearance-none",
                      "border-0 border-b bg-transparent",
                      "px-0 pb-1 pr-6",
                      "text-base text-gray-900",
                      "focus:outline-none",
                      isFocused ? "border-guinda-150" : "border-gray-300",
                    ].join(" "),
                  valueContainer: () => "p-0",
                  placeholder: () => "m-0 p-0 text-gray-400",
                  indicatorsContainer: () => "p-0",
                  menu: () => "z-50 rounded-md border border-gray-200 bg-white shadow-lg",
                }}
              />
            </div>

            {/* Municipio */}
            <div>
              <label className="block text-sm font-medium text-neutro-800 mb-2">
                Municipio: <span className="ml-1 text-red-500">*</span>
              </label>
              <Select
                unstyled
                value={selectedMunicipio}
                options={optionsMunicipio}
                placeholder="SELECCIONA"
                isClearable
                isSearchable
                isDisabled={isMunicipioDisabled}
                onChange={(opt) => onMunicipioChange(opt as any)}
                classNames={{
                  control: ({ isFocused }) =>
                    [
                      "block w-full min-w-0 appearance-none",
                      "border-0 border-b bg-transparent",
                      "px-0 pb-1 pr-6",
                      "text-base text-gray-900",
                      "focus:outline-none",
                      isFocused ? "border-guinda-150" : "border-gray-300",
                    ].join(" "),
                  valueContainer: () => "p-0",
                  placeholder: () => "m-0 p-0 text-gray-400",
                  indicatorsContainer: () => "p-0",
                  menu: () => "z-50 rounded-md border border-gray-200 bg-white shadow-lg",
                }}
              />
            </div>

            {/* Localidad */}
            <div>
              <label className="block text-sm font-medium text-neutro-800 mb-2">
                Localidad: <span className="ml-1 text-red-500">*</span>
              </label>
              <Select
                unstyled
                value={selectedLocalidad}
                options={optionsLocalidad}
                placeholder="SELECCIONA"
                isClearable
                isSearchable
                isDisabled={isLocalidadDisabled}
                onChange={(opt) => onLocalidadChange(opt as any)}
                classNames={{
                  control: ({ isFocused }) =>
                    [
                      "block w-full min-w-0 appearance-none",
                      "border-0 border-b bg-transparent",
                      "px-0 pb-1 pr-6",
                      "text-base text-gray-900",
                      "focus:outline-none",
                      isFocused ? "border-guinda-150" : "border-gray-300",
                    ].join(" "),
                  valueContainer: () => "p-0",
                  placeholder: () => "m-0 p-0 text-gray-400",
                  indicatorsContainer: () => "p-0",
                  menu: () => "z-50 rounded-md border border-gray-200 bg-white shadow-lg",
                }}
              />
            </div>

            {/* Coordenadas centro */}
            <div className="md:col-span-2">
              <div className="border border-neutro-300 rounded-lg p-3 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Latitud (centro)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={geoDraft.centro.lat}
                      onChange={(e) => setGeoDraftCentro("lat", e.target.value)}
                      onBlur={() => commitGeoCentro("lat")}
                      className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Longitud (centro)</label>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={geoDraft.centro.lng}
                      onChange={(e) => setGeoDraftCentro("lng", e.target.value)}
                      onBlur={() => commitGeoCentro("lng")}
                      className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1">Tipo (centro)</label>
                    <div className="relative">
                      <select
                        value={currentCentro.georeferencias?.coordenadasCentro.tipoGeorreferencia ?? "CENTRO"}
                        className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                        onChange={(e) =>
                          setCurrentCentro((prev) => ({
                            ...prev,
                            georeferencias: {
                              ...prev.georeferencias!,
                              coordenadasCentro: {
                                ...prev.georeferencias!.coordenadasCentro,
                                tipoGeorreferencia: e.target.value,
                              },
                            },
                          }))
                        }
                      >
                        <option value="CENTRO">CENTRO</option>
                      </select>
                      <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Polígono */}
              <div className="flex items-center justify-between mt-3">
                <label className="block text-sm font-medium text-neutro-800">Polígono (múltiples coordenadas)</label>

                <button
                  type="button"
                  className="px-3 py-2 bg-guinda-150 text-neutro-100 rounded-lg hover:bg-guinda-160 transition-colors flex items-center gap-2"
                  onClick={onAddPolygonPoint}
                >
                  <Plus className="w-4 h-4" />
                  Agregar coordenada
                </button>
              </div>

              <div className="mt-3 space-y-3">
                {geoDraft.poligono.length === 0 ? (
                  <div className="text-sm text-neutro-600">No hay coordenadas en el polígono.</div>
                ) : (
                  geoDraft.poligono.map((p, idx) => (
                    <div key={idx} className="border border-neutro-300 rounded-lg p-3 bg-white">
                      <div className="flex items-start justify-between gap-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Latitud</label>
                            <input
                              type="text"
                              value={p.lat}
                              onChange={(e) => setGeoDraftPoligono(idx, "lat", e.target.value)}
                              onBlur={() => commitGeoPoligono(idx, "lat")}
                              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Longitud</label>
                            <input
                              type="text"
                              value={p.lng}
                              onChange={(e) => setGeoDraftPoligono(idx, "lng", e.target.value)}
                              onBlur={() => commitGeoPoligono(idx, "lng")}
                              className="block w-full border-0 border-b border-gray-300 px-0 pb-1 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Tipo</label>
                            <div className="relative">
                              <select
                                value={currentCentro.georeferencias?.poligono?.[idx]?.tipoGeorreferencia ?? "POLIGONO"}
                                className="block w-full appearance-none border-0 border-b border-gray-300 bg-transparent px-0 pb-1 pr-6 text-base text-gray-900 focus:border-guinda-150 focus:outline-none"
                                onChange={(e) =>
                                  setCurrentCentro((prev) => {
                                    const pol = [...(prev.georeferencias?.poligono ?? [])];
                                    pol[idx] = { ...pol[idx], tipoGeorreferencia: e.target.value };
                                    return {
                                      ...prev,
                                      georeferencias: { ...prev.georeferencias!, poligono: pol },
                                    };
                                  })
                                }
                              >
                                <option value="POLIGONO">POLIGONO</option>
                              </select>
                              <span className="pointer-events-none absolute right-0 top-1 text-xs text-gray-400">▼</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          title="Eliminar coordenada"
                          className="p-2 text-validation-mistake hover:bg-validation-mistake-light rounded transition-colors"
                          onClick={() => onRemovePolygonPoint(idx)}
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
          <button
            className="px-6 py-2 border border-neutro-400 text-neutro-700 rounded-lg hover:bg-neutro-300 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancelar
          </button>

          <button
            className="px-6 py-2 bg-guinda-150 text-neutro-100 rounded-lg hover:bg-guinda-160 transition-colors shadow-md"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onSave();
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};
