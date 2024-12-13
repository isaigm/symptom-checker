"use client";
import { useSymptomContext } from "@/app/context/SymptomContext"; // Importa el contexto

type SymptomsProps = {
    symptomsInCategory: string[];
    symptomsData: Record<string, { traduccion: string }>;
};

export default function SymptomList({ symptomsInCategory, symptomsData }: SymptomsProps) {
    const { selectedSymptoms, toggleSymptom } = useSymptomContext(); // Usar el contexto
    return (
        <ul className="space-y-3 max-h-[70vh] overflow-y-auto p-2 border rounded-lg shadow-md bg-white">
            {symptomsInCategory.map((symptom) => (
                <li
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)} // Usar la función del contexto
                    className={`flex items-center gap-3 rounded-lg px-4 py-2 shadow cursor-pointer ${selectedSymptoms.includes(symptom) ? "bg-blue-100" : "bg-gray-100"
                        } hover:bg-blue-50`}
                >
                    <input
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        checked={selectedSymptoms.includes(symptom)}
                        onChange={(e) => e.stopPropagation()} // Evita que el clic en el checkbox dispare el evento del `li`
                    />
                    <span className="text-gray-800">
                        {symptomsData[symptom as keyof typeof symptomsData]?.traduccion || "N/A"}
                    </span>
                </li>
            ))}
        </ul>
    );
}
