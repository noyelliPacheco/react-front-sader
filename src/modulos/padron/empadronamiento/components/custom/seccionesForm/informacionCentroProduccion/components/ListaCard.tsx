import { Edit2, MapPin, MoreVertical, Star, Trash2 } from "lucide-react";
import { useState } from 'react';
import type { CentroProduccion } from "../../../../../interfaces/centroProducccion.interface";

type Props = {
  centros: CentroProduccion[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export const ListaCard = ({ centros, onEdit, onDelete }: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  if (centros.length === 0) {
    return <div className="text-center py-8 text-neutro-600">No hay centros productivos registrados</div>;
  }

  return (<>
    {centros.map((centro, index) => (
      <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-emerald-300 transition-all duration-200 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                {centro.nombre}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="truncate">{centro.nombreLocalidad}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700" title="Editar"
                  onClick={(e) => {
                    e.preventDefault();
                    onEdit(index);
                  }}>
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-red-600" title="Eliminar"
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(index);
                  }}>
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Estado</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {centro.nombreEntidadFederativa}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Municipio</p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {centro.nombreMunicipio}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">Localidad</p>
            <p className="text-sm font-medium text-gray-700 line-clamp-2">
              {centro.nombreLocalidad}
            </p>
          </div>
        </div>
      </div>
    ))}
    </>
  );
};

//   return (
//     <div className="space-y-4">
//       {centros.map((centro, index) => (
//         <div
//           key={centro.idCentroProduccion ?? index}
//           className="border border-neutro-300 rounded-lg p-4 bg-neutro-300 hover:shadow-md transition-shadow"
//         >
//           <div className="flex items-start justify-between">
//             <div className="flex-1 grid grid-cols-2 gap-3 text-sm">
//               <div>
//                 <span className="font-medium text-neutro-800">Nombre:</span>
//                 <span className="ml-2 text-neutro-700">{centro.nombre || "N/A"}</span>
//               </div>
//               <div>
//                 <span className="font-medium text-neutro-800">Estado:</span>
//                 <span className="ml-2 text-neutro-700">{centro.nombreEntidadFederativa || "N/A"}</span>
//               </div>
//               <div>
//                 <span className="font-medium text-neutro-800">Municipio:</span>
//                 <span className="ml-2 text-neutro-700">{centro.nombreMunicipio || "N/A"}</span>
//               </div>
//               <div>
//                 <span className="font-medium text-neutro-800">Localidad:</span>
//                 <span className="ml-2 text-neutro-700">{centro.nombreLocalidad || "N/A"}</span>
//               </div>
//             </div>

//             <div className="flex space-x-2 ml-4">
//               <button
//                 title="Editar"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onEdit(index);
//                 }}
//                 className="p-2 text-validation-info hover:bg-validation-info-light rounded transition-colors"
//               >
//                 <Edit2 className="w-4 h-4" />
//               </button>

//               <button
//                 title="Eliminar"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onDelete(index);
//                 }}
//                 className="p-2 text-validation-mistake hover:bg-validation-mistake-light rounded transition-colors"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };





// function ProductionCenterCard({ center }: ProductionCenterCardProps) {
//   const [showMenu, setShowMenu] = useState(false);

//   return (
//     <div className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-emerald-300 transition-all duration-200 relative">
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-start gap-3 flex-1">
//           <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
//             <Star className="w-6 h-6 text-emerald-600" />
//           </div>
//           <div className="flex-1 min-w-0">
//             <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
//               {centro.nombre}
//             </h3>
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
//               <span className="truncate">{centro.nombreLocalidad}</span>
//             </div>
//           </div>
//         </div>

//         <div className="relative">
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <MoreVertical className="w-5 h-5" />
//           </button>

//           {showMenu && (
//             <>
//               <div
//                 className="fixed inset-0 z-10"
//                 onClick={() => setShowMenu(false)}
//               />
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
//                 <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700" title="Editar"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onEdit(index);
//                 }}>
//                   <Edit2 className="w-4 h-4" />
//                   Editar
//                 </button>
//                 <button className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-red-600" title="Eliminar"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   onDelete(index);
//                 }}>
//                   <Trash2 className="w-4 h-4" />
//                   Eliminar
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="space-y-3">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-xs font-medium text-gray-500 mb-1">Estado</p>
//             <p className="text-sm font-semibold text-gray-900 truncate">
//               {centro.nombreEntidadFederativa}
//             </p>
//           </div>
//           <div>
//             <p className="text-xs font-medium text-gray-500 mb-1">Municipio</p>
//             <p className="text-sm font-semibold text-gray-900 truncate">
//               {centro.nombreMunicipio}
//             </p>
//           </div>
//         </div>

//         <div>
//           <p className="text-xs font-medium text-gray-500 mb-1">Localidad</p>
//           <p className="text-sm font-medium text-gray-700 line-clamp-2">
//             {centro.locality}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductionCenterCard;
