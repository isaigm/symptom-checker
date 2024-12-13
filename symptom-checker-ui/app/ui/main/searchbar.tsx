"use client";

import { useState } from "react";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="flex items-center justify-between gap-2 p-4 bg-white shadow-md">
            <input
                type="text"
                placeholder="Buscar síntomas"
                value={query}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
        </div>
    );
}
