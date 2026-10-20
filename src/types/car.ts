export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  priceEGP: number;
  originalPriceEGP?: number;
  mileageKm: number;
  condition: 'كسر زيرو' | 'حالة نادرة' | 'كلاسيك ذهبي' | 'فابريكا بالكامل';
  category: 'suv' | 'sedan' | 'coupe' | 'classic';
  fuel: string;
  transmission: string;
  engine: string;
  horsePower: number;
  color: string;
  interiorColor: string;
  image: string;
  additionalImages?: string[];
  isFeatured?: boolean;
  isSpecialGold?: boolean;
  features: string[];
  inspectionPoints: {
    engine: string;
    gearbox: string;
    chassis: string;
    paint: string;
    interior: string;
  };
  monthlyEstimateEGP: number;
}

export type CategoryFilter = 'all' | 'kasr-zero' | 'classic' | 'suv' | 'sedan';
