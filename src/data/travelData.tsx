// travelData.tsx

export interface Travel {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  longDescription?: string[];
  duration: string;
  price: number;
  groupSize?: number;
  departureLocation?: string;
  includes?: {
    transport: string[];
    accommodation: string[];
    meals: string[];
    activities: string[];
  };
  notIncluded?: string[];
}
