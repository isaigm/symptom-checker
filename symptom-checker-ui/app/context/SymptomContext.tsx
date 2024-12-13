// context/SymptomContext.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

type SymptomContextType = {
    selectedSymptoms: string[];
    toggleSymptom: (symptom: string) => void;
};

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export const SymptomProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    // Cargar síntomas desde localStorage al inicio
    useEffect(() => {
        const storedSymptoms = localStorage.getItem("selectedSymptoms");
        if (storedSymptoms) {
            setSelectedSymptoms(JSON.parse(storedSymptoms));
        }
    }, []);

    // Guardar síntomas en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem("selectedSymptoms", JSON.stringify(selectedSymptoms));
    }, [selectedSymptoms]);

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((item) => item !== symptom)
                : [...prev, symptom]
        );
    };

    return (
        <SymptomContext.Provider value={{ selectedSymptoms, toggleSymptom }}>
            {children}
        </SymptomContext.Provider>
    );
};

export const useSymptomContext = () => {
    const context = useContext(SymptomContext);
    if (!context) {
        throw new Error("useSymptomContext must be used within a SymptomProvider");
    }
    return context;
};
