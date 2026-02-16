# Dynamic Image Switching - Implementation Plan

## ✅ What Has Been Implemented

### 1. Image Management Utility (`/app/shop/utils/imageManager.ts`)
- `getProductImage()` function that automatically determines the correct image path
- Handles color, handle, and **swing** (for products like Larson Split View)
- **Per-product subfolders:** e.g. `/products/larson-split-view/` with product-specific naming (color + swing, no handle)
- Automatic fallback system (most specific → least specific)
- Slug conversion and optional display-name → file-slug mapping for custom names

### 2. Updated ProductDetail Component
- Dynamic image switching based on color selection
- Dynamic image switching based on handle selection (when handle required)
- **Dynamic image switching based on swing direction** (Left-Hand Outswing / Right-Hand Outswing)
- Automatic image updates when selections change
- Error handling with fallback images
- Smooth transitions between images

### 3. Image Naming Convention
- Clear documentation in `IMAGE_NAMING_GUIDE.md`
- Consistent naming pattern for all product images
- Easy to follow and maintain

---

## 📋 How It Works

### Step-by-Step Flow:

1. **User visits product page**
   - Shows base image: `{productId}.png`

2. **User selects a color (e.g., "White Linen")**
   - System looks for: `{productId}-white-linen.png`
   - If found → shows that image
   - If not found → falls back to base image

3. **User selects a handle (e.g., "Classic Handle")**
   - System looks for: `{productId}-white-linen-classic-handle.png`
   - If found → shows that image
   - If not found → tries color-only image
   - If still not found → falls back to base image

4. **User changes color or handle**
   - Image updates automatically
   - Smooth transition effect

---

## 🗂️ Image Organization Strategy

### Recommended Folder Structure

**Flat (single folder):**
```
/public/products/
├── door1.png (fallback/default)
├── larson-platinum-split-fullview.png
├── larson-platinum-split-fullview-white-linen.png
└── ...
```

**Per-product subfolder (for many images):**
```
/public/products/
├── door1.png
├── larson-split-view/
│   ├── white-lilen.avif
│   ├── white-lilen-left.avif
│   ├── white-lilen-right.avif
│   ├── graphait.avif
│   ├── graphait-left.avif
│   ├── graphait-right.avif
│   ├── pebbleston.avif
│   ├── woodland.avif
│   ├── black.avif
│   ├── black-left-handle.avif
│   └── black-right-handle-outside.avif
└── ...
```

Products that use subfolders are configured in `PRODUCT_IMAGE_SUBFOLDERS` in `imageManager.ts` (e.g. `larson-split-view` with color + swing only, no handle).

---

## 📝 Naming Examples

### Example 1: Base Product
- **Product ID:** `larson-platinum-split-fullview`
- **File:** `larson-platinum-split-fullview.png`

### Example 2: With Color
- **Product ID:** `larson-platinum-split-fullview`
- **Color:** `White Linen` → slug: `white-linen`
- **File:** `larson-platinum-split-fullview-white-linen.png`

### Example 3: With Color + Handle
- **Product ID:** `larson-platinum-split-fullview`
- **Color:** `White Linen` → slug: `white-linen`
- **Handle:** `Classic Handle` → slug: `classic-handle`
- **File:** `larson-platinum-split-fullview-white-linen-classic-handle.png`

---

## 🎯 Priority System

The system tries images in this order:

1. **Most Specific:** `{productId}-{color}-{handle}.png`
2. **Color Only:** `{productId}-{color}.png`
3. **Base Product:** `{productId}.png`
4. **Ultimate Fallback:** `door1.png`

**Why this works:**
- You don't need images for every combination
- System gracefully falls back if specific image doesn't exist
- Users always see an image (never a broken image)

---

## 🚀 Next Steps for You

### 1. Organize Your Images
- Create images following the naming convention
- Place them in `/public/products/` folder
- Start with base images for each product
- Add color variants as you have them
- Add color+handle combinations for key products

### 2. Image Requirements
- **Format:** PNG or JPG
- **Size:** Recommended 1200x1200px minimum
- **Quality:** High resolution for best display
- **Consistency:** Same angle/view for all variants of same product

### 3. Testing
- Test with different color selections
- Test with different handle selections
- Verify fallbacks work when images don't exist
- Check image loading performance

---

## 💡 Tips

1. **Start Simple:** Begin with base images + color variants
2. **Add Gradually:** Add handle combinations as needed
3. **Consistent Angles:** Use the same camera angle/view for all variants
4. **Optimize Images:** Compress images for web (use tools like TinyPNG)
5. **CDN Consideration:** For production, consider using a CDN for images

---

## 🔧 Technical Details

### Functions Used:
- `getProductImage(productId, color?, handleId?, handleName?)` - Gets image path
- `toSlug(str)` - Converts names to URL-friendly slugs

### React Hooks:
- `useEffect` - Watches for color/handle changes
- `useState` - Manages current image state

### Error Handling:
- Automatic fallback to less specific images
- Graceful degradation if images don't exist
- No broken images shown to users

---

## ✅ Current Status

- ✅ Image management utility created
- ✅ Dynamic image switching implemented
- ✅ Error handling with fallbacks
- ✅ Documentation created
- ✅ Ready for image uploads

**You're all set!** Just add your images following the naming convention, and the system will automatically handle the rest.
