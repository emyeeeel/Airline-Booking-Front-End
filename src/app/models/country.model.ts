// src/app/models/country.model.ts
export interface Country {
    id: number;
    name: string;
    code: string;
    cities: City[];
  }
  
  export interface City {
    id: number;
    name: string;
    code: string,
    country: number;  // This is the country ID
    airports: Airport[];
  }
  
  export interface Airport {
    id: number;
    name: string;
    // Add other airport properties if available in your API
    // code?: string;
    // city?: number;
  }