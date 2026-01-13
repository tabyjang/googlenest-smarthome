export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: 'audio' | 'hub' | 'security' | 'control';
}

export interface ProductDetail extends Product {
  fullDescription: string;
  features: string[];
  specs: Record<string, string>;
  price: number;
  modelPath?: string;
  officialUrl?: string;
}

export interface RoomState {
  id: string;
  name: string;
  lightOn: boolean;
  temperature: number;
  devices: string[];
}

export type ZoneId = 'living' | 'bedroom' | 'kitchen' | 'kids';

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface QuoteOptions {
  lighting: boolean;
  heating: boolean;
  voice: boolean;
  security: boolean;
}

export interface QuotePayload {
  customer: QuoteFormData;
  rooms: number;
  options: QuoteOptions;
  totalPrice: number;
  breakdown: { item: string; price: number }[];
}

export interface EmailResponse {
  success: boolean;
  message: string;
  id?: string;
}

// Room Planner Types
export interface PlannerProduct {
  id: string;
  name: string;
  nameKo: string;
  image: string;
  width: number;
  height: number;
  price: number;
  category: 'display' | 'audio' | 'security' | 'climate';
}

export interface PlacedProduct {
  instanceId: string;
  productId: string;
  x: number;
  y: number;
  scale: number;
  zIndex: number;
}

export interface Background {
  id: string;
  name: string;
  thumbnail: string;
  fullImage: string;
  isCustom?: boolean;
}

export interface RoomPlannerState {
  selectedBackground: Background | null;
  placedProducts: PlacedProduct[];
  selectedProductInstance: string | null;
}
