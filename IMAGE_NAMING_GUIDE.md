# Image Naming Convention Guide

This guide explains how to name and organize product images for dynamic image switching based on color and handle selections.

## Folder Structure

All product images should be placed in:
```
/public/products/
```

## Naming Convention

### 1. Base Product Image (Default)
**Format:** `{productId}.png`

**Example:**
- `larson-platinum-split-fullview.png`
- `andersen-2000-series-retractable.png`

**When used:** Default image shown when no color/handle is selected, or as fallback.

---

### 2. Product with Color
**Format:** `{productId}-{color-slug}.png`

**Color Slug Rules:**
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters

**Examples:**
- Color: "White Linen" → `larson-platinum-split-fullview-white-linen.png`
- Color: "Black" → `larson-platinum-split-fullview-black.png`
- Color: "Grey" → `larson-platinum-split-fullview-grey.png`

**When used:** Image shown when a specific color is selected (without handle selection).

---

### 3. Product with Color and Handle
**Format:** `{productId}-{color-slug}-{handle-slug}.png`

**Handle Slug Rules:**
- Convert handle name to lowercase
- Replace spaces with hyphens
- Remove special characters

**Examples:**
- Product: `larson-platinum-split-fullview`
- Color: "White Linen" → `white-linen`
- Handle: "Classic Handle" → `classic-handle`
- **Result:** `larson-platinum-split-fullview-white-linen-classic-handle.png`

**When used:** Most specific image shown when both color and handle are selected.

---

## Image Priority System

The system tries to load images in this order (most specific first):

1. **`{productId}-{color}-{handle}.png`** ← Most specific (if both color & handle selected)
2. **`{productId}-{color}.png`** ← Color only (if only color selected)
3. **`{productId}.png`** ← Base product image (fallback)
4. **`door1.png`** ← Ultimate fallback

---

## Example File Structure

```
/public/products/
├── door1.png                                    (fallback)
├── larson-platinum-split-fullview.png           (base)
├── larson-platinum-split-fullview-white-linen.png
├── larson-platinum-split-fullview-black.png
├── larson-platinum-split-fullview-grey.png
├── larson-platinum-split-fullview-white-linen-classic-handle.png
├── larson-platinum-split-fullview-white-linen-modern-handle.png
├── larson-platinum-split-fullview-black-classic-handle.png
├── andersen-2000-series-retractable.png         (base)
├── andersen-2000-series-retractable-white.png
└── andersen-2000-series-retractable-grey.png
```

---

## How It Works

1. **User selects a color** → System looks for `{productId}-{color-slug}.png`
2. **User selects a handle** → System looks for `{productId}-{color-slug}-{handle-slug}.png`
3. **If image not found** → Falls back to less specific image (color only, then base)
4. **If still not found** → Shows default `door1.png`

---

## Color Name to Slug Conversion

| Color Name | Slug |
|------------|------|
| White Linen | `white-linen` |
| Black | `black` |
| Grey | `grey` |
| White | `white` |
| Brown | `brown` |

---

## Handle Name to Slug Conversion

| Handle Name | Slug |
|-------------|------|
| Classic Handle | `classic-handle` |
| Modern Handle | `modern-handle` |
| Premium Handle | `premium-handle` |
| Standard Handle | `standard-handle` |

---

## Tips

1. **Always include base image:** Every product should have a `{productId}.png` as fallback
2. **Use consistent naming:** Follow the exact product ID from your products data
3. **Test fallbacks:** Not every color/handle combination needs an image - the system will fall back gracefully
4. **Image quality:** Use high-quality images (recommended: 1200x1200px minimum)
5. **File format:** Use PNG or JPG (PNG recommended for transparency if needed)

---

## Quick Reference

**Product ID:** `larson-platinum-split-fullview`  
**Color:** `White Linen`  
**Handle:** `Classic Handle`

**Resulting image path:**
```
/products/larson-platinum-split-fullview-white-linen-classic-handle.png
```

---

## Implementation

The image switching is handled automatically by the `getProductImage()` function in:
```
/app/shop/utils/imageManager.ts
```

No manual configuration needed - just follow the naming convention!
