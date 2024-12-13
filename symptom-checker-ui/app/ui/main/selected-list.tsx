// SeleccionList.tsx
import { useSymptomContext } from "@/app/context/SymptomContext";
import { TrashIcon } from '@heroicons/react/24/outline';
import  symptoms  from '@/app/data/symptoms.json'

export default function SeleccionList() {
  const { selectedSymptoms, toggleSymptom } = useSymptomContext();

  if (selectedSymptoms.length === 0) {
    return (
      <p className="text-gray-500 text-center">No hay síntomas seleccionados.</p>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Síntomas seleccionados
      </h3>
      <ul className="space-y-2">
        {selectedSymptoms.map((symptom) => (
          <li
            key={symptom}
            className="flex justify-between items-center px-3 py-2 bg-gray-50 border rounded-lg hover:bg-gray-100"
          >
            <span
              className="text-sm font-medium text-gray-700 truncate max-w-[14rem]" // Trunca el texto si es muy largo
              title={symptoms[symptom as keyof typeof symptoms]["traduccion"]} // Muestra un tooltip con el texto completo
            >
              {symptoms[symptom as keyof typeof symptoms]["traduccion"]}
            </span>
            <button
              className="text-sm text-red-500 hover:text-red-700 hover:underline"
              onClick={() => toggleSymptom(symptom)}
            >
              <TrashIcon className="size-6 text-blue-500" />
            </button>
          </li>
        ))}
      </ul>
      
    </div>
   
    
  );
}
