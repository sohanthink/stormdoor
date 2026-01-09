// Color mapping for door colors
export interface ColorInfo {
  name: string;
  hex: string;
  displayName: string;
}

export const doorColors: Record<string, ColorInfo> = {
  White: {
    name: "White",
    hex: "#FFFFFF",
    displayName: "White",
  },
  "White Linen": {
    name: "White Linen",
    hex: "#F5F5F0",
    displayName: "White Linen",
  },
  Black: {
    name: "Black",
    hex: "#1A1A1A",
    displayName: "Black",
  },
  Brown: {
    name: "Brown",
    hex: "#8B4513",
    displayName: "Brown",
  },
  Grey: {
    name: "Grey",
    hex: "#808080",
    displayName: "Grey",
  },
  "Dark Grey": {
    name: "Dark Grey",
    hex: "#4A4A4A",
    displayName: "Dark Grey",
  },
  "Light Grey": {
    name: "Light Grey",
    hex: "#D3D3D3",
    displayName: "Light Grey",
  },
  Bronze: {
    name: "Bronze",
    hex: "#CD7F32",
    displayName: "Bronze",
  },
  "Aged Bronze": {
    name: "Aged Bronze",
    hex: "#8C7853",
    displayName: "Aged Bronze",
  },
};

export function getColorInfo(colorName: string): ColorInfo {
  return doorColors[colorName] || {
    name: colorName,
    hex: "#CCCCCC",
    displayName: colorName,
  };
}

