export interface HandleOption {
  id: string;
  name: string;
  style: "Modern" | "Traditional";
  finish: string;
  price: number; // PoraDoor price (40% markup applied)
}

export const larsonQuickFitHandles: HandleOption[] = [
  {
    id: "larson-modern-black",
    name: "QuickFit Modern - Matte Black",
    style: "Modern",
    finish: "Matte Black",
    price: 111,
  },
  {
    id: "larson-modern-nickel",
    name: "QuickFit Modern - Brushed Nickel",
    style: "Modern",
    finish: "Brushed Nickel",
    price: 111,
  },
  {
    id: "larson-modern-bronze",
    name: "QuickFit Modern - Aged Bronze",
    style: "Modern",
    finish: "Aged Bronze",
    price: 111,
  },
  {
    id: "larson-traditional-black",
    name: "QuickFit Traditional - Matte Black",
    style: "Traditional",
    finish: "Matte Black",
    price: 111,
  },
  {
    id: "larson-traditional-nickel",
    name: "QuickFit Traditional - Brushed Nickel",
    style: "Traditional",
    finish: "Brushed Nickel",
    price: 111,
  },
  {
    id: "larson-traditional-bronze",
    name: "QuickFit Traditional - Aged Bronze",
    style: "Traditional",
    finish: "Aged Bronze",
    price: 111,
  },
];

export const andersenHandles: HandleOption[] = [
  // Modern
  {
    id: "andersen-modern-black",
    name: "Andersen Modern - Matte Black",
    style: "Modern",
    finish: "Matte Black",
    price: 119,
  },
  {
    id: "andersen-modern-bronze",
    name: "Andersen Modern - Venetian Bronze",
    style: "Modern",
    finish: "Venetian Bronze",
    price: 119,
  },
  {
    id: "andersen-modern-nickel",
    name: "Andersen Modern - Brushed Dark Nickel",
    style: "Modern",
    finish: "Brushed Dark Nickel",
    price: 119,
  },
  // Traditional
  {
    id: "andersen-traditional-nickel",
    name: "Andersen Traditional - Nickel",
    style: "Traditional",
    finish: "Nickel",
    price: 119,
  },
  {
    id: "andersen-traditional-brass",
    name: "Andersen Traditional - Antique Brass",
    style: "Traditional",
    finish: "Antique Brass",
    price: 119,
  },
  {
    id: "andersen-traditional-bronze",
    name: "Andersen Traditional - Oil-Rubbed Bronze",
    style: "Traditional",
    finish: "Oil-Rubbed Bronze",
    price: 119,
  },
];

// Products that require Larson QuickFit handles
export const larsonQuickFitProducts = [
  "larson-60mt-maximum-view",
  "larson-platinum-fullview",
  "larson-platinum-split-fullview",
];

// Products that require Andersen handles
export const andersenHandleProducts = [
  "andersen-3000-series-interchangeable",
  "andersen-4000-retractable",
  "andersen-4000-interchangeable",
];

export function getHandleOptionsForProduct(productId: string): HandleOption[] {
  if (larsonQuickFitProducts.includes(productId)) {
    return larsonQuickFitHandles;
  }
  if (andersenHandleProducts.includes(productId)) {
    return andersenHandles;
  }
  return [];
}

