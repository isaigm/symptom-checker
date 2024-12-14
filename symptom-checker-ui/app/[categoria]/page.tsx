"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSymptomContext } from "@/app/context/SymptomContext";

import categories from "@/app/data/categories.json";
import symptoms from "@/app/data/symptoms.json";
import SymptomList from "@/app/ui/main/list";
import SearchBar from "@/app/ui/main/searchbar";
import SelectedList from "@/app/ui/main/selected-list";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Page() {
  const { categoria } = useParams();
  const decoded = decodeURIComponent(categoria as string);
  const symptomsInCategory = categories[decoded as keyof typeof categories];
  const allSymptoms = Object.keys(symptoms);
  const [searchQuery, setSearchQuery] = useState("");
  const [predictionResults, setPredictionResults] = useState(null);
  const [showChart, setShowChart] = useState(false);

  if (!symptomsInCategory) {
    return <p>La categoría no existe o no tiene síntomas asociados.</p>;
  }

  const globalFilteredSymptoms = allSymptoms.filter((symptom) =>
    symptoms[symptom as keyof typeof symptoms]?.traduccion
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const { selectedSymptoms } = useSymptomContext();

  const handlePredict = async () => {
    const indices: Array<Number> = selectedSymptoms.map((value: string) => {
      return symptoms[value as keyof typeof symptoms]["idx"];
    });
    const data = { symptom_list: indices };
    if (indices.length == 0)
    {
      alert("Seleccione al menos un síntoma");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/inference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const predictions = await res.json();
      setPredictionResults(predictions);
      setShowChart(true);
    } catch (error) {
      console.error("Error al obtener predicciones:", error);
    }
  };

  const chartData = predictionResults
    ? {
        labels: Object.keys(predictionResults),
        datasets: [
          {
            label: "Probabilidad",
            data: Object.values(predictionResults),
            backgroundColor: ["#3b82f6", "#34d399", "#f87171"],
            borderColor: ["#1e40af", "#059669", "#b91c1c"],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="p-1">
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </div>

      <div className="flex flex-row gap-4 p-4">
        <div className="flex-grow">
          {searchQuery ? (
            <>
              <h2 className="text-lg font-bold mb-2">Resultados de búsqueda</h2>
              <SymptomList
                symptomsInCategory={globalFilteredSymptoms}
                symptomsData={symptoms}
              />
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold mb-4">Síntomas en {decoded}</h1>
              <SymptomList
                symptomsInCategory={symptomsInCategory}
                symptomsData={symptoms}
              />
            </>
          )}
        </div>

        <div className="w-72 p-4 border rounded-lg shadow h-fit bg-white">
          <SelectedList />

          <div className="flex justify-center items-center p-4">
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
              onClick={handlePredict}
            >
              Predecir enfermedad
            </button>
          </div>
        </div>
      </div>

      {showChart && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-center mb-4">
              Enfermedades más probables
            </h2>
            {chartData && (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      
                    },
                  },
                }}
              />
            )}
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => setShowChart(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
