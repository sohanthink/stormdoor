// Pricing constants
export const INSTALLATION_PRICE = 199;
export const DELIVERY_PRICE_INSIDE_RADIUS = 0; // FREE
export const DELIVERY_PRICE_OUTSIDE_RADIUS = 99;

// ZIP codes within service radius (example - you'd replace with actual logic)
// For demo purposes, assuming ZIP codes starting with 100, 101, 200, 201 are inside radius
export function isWithinServiceRadius(zipCode: string): boolean {
  if (!zipCode || zipCode.length < 5) return false;
  
  // Example logic: ZIP codes in NYC (100xx), DC (200xx), etc.
  const prefix = zipCode.substring(0, 3);
  const insideRadiusPrefixes = ["100", "101", "102", "200", "201", "202"];
  
  return insideRadiusPrefixes.includes(prefix);
}

export function calculateDeliveryPrice(
  zipCode: string | null,
  installationSelected: boolean
): number {
  // Delivery is waived if installation is selected
  if (installationSelected) {
    return 0;
  }
  
  if (!zipCode) {
    return 0; // Will be calculated after ZIP is entered
  }
  
  return isWithinServiceRadius(zipCode)
    ? DELIVERY_PRICE_INSIDE_RADIUS
    : DELIVERY_PRICE_OUTSIDE_RADIUS;
}

export interface PriceBreakdown {
  doorPrice: number;
  handlePrice: number;
  installationPrice: number;
  deliveryPrice: number;
  subtotal: number;
  tax: number;
  total: number;
}

export function calculatePriceBreakdown(
  doorPrice: number,
  handlePrice: number,
  installationSelected: boolean,
  zipCode: string | null
): PriceBreakdown {
  const installationPrice = installationSelected ? INSTALLATION_PRICE : 0;
  const deliveryPrice = calculateDeliveryPrice(zipCode, installationSelected);
  
  const subtotal = doorPrice + handlePrice + installationPrice + deliveryPrice;
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // Assuming 8% tax
  const total = subtotal + tax;

  return {
    doorPrice,
    handlePrice,
    installationPrice,
    deliveryPrice,
    subtotal,
    tax,
    total,
  };
}

