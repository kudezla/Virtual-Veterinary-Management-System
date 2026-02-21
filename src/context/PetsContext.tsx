"use client";

import React, { createContext, useContext, useState } from "react";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  color: string;
  weight: string;
  notes: string;
  location: string;
  ownerName: string;
  registeredAt: string;
}

interface PetsContextType {
  pets: Pet[];
  addPet: (pet: Pet) => void;
}

const PetsContext = createContext<PetsContextType>({
  pets: [],
  addPet: () => {},
});

const initialPets: Pet[] = [
  {
    id: "P-001",
    name: "Max",
    species: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    gender: "Male",
    color: "Black & Tan",
    weight: "30 kg",
    notes: "Vaccinated. Friendly with children.",
    location: "Nairobi",
    ownerName: "Jane Wanjiku",
    registeredAt: "2025-01-15",
  },
];

export function PetsProvider({ children }: { children: React.ReactNode }) {
  const [pets, setPets] = useState<Pet[]>(initialPets);

  const addPet = (pet: Pet) => {
    setPets((prev) => [...prev, pet]);
  };

  return (
    <PetsContext.Provider value={{ pets, addPet }}>
      {children}
    </PetsContext.Provider>
  );
}

export function usePets() {
  return useContext(PetsContext);
}
