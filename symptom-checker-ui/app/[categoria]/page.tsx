"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSymptomContext } from "@/app/context/SymptomContext";

import categories from "@/app/data/categories.json";
import symptoms from "@/app/data/symptoms.json";
import SymptomList from "@/app/ui/main/list";
import SearchBar from "@/app/ui/main/searchbar";
import SelectedList from "@/app/ui/main/selected-list";

export default function Page() {
  const { categoria } = useParams();
  const decoded = decodeURIComponent(categoria as string);
  const symptomsInCategory = categories[decoded as keyof typeof categories];
  const allSymptoms = Object.keys(symptoms);
  const [searchQuery, setSearchQuery] = useState("");

  if (!symptomsInCategory) {
    return <p>La categoría no existe o no tiene síntomas asociados.</p>;
  }

  const globalFilteredSymptoms = allSymptoms.filter((symptom) =>
    symptoms[symptom as keyof typeof symptoms]?.traduccion
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );
  const { selectedSymptoms } = useSymptomContext();

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
              onClick={() => {
                console.log("Prediciendo enfermedad con síntomas:");
                console.log(selectedSymptoms);
              }}
            >
              Predecir enfermedad
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
