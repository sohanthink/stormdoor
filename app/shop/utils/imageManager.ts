/**
 * Image Management Utility
 * 
 * IMAGE NAMING CONVENTION:
 * 
 * 1. Base product image (default):
 *    Format: {productId}.png
 *    Example: larson-platinum-split-fullview.png
 * 
 * 2. Product with color:
 *    Format: {productId}-{color-slug}.png
 *    Example: larson-platinum-split-fullview-white-linen.png
 *    Example: larson-platinum-split-fullview-black.png
 * 
 * 3. Product with color and handle:
 *    Format: {productId}-{color-slug}-{handle-slug}.png
 *    Example: larson-platinum-split-fullview-white-linen-classic-handle.png
 *    Example: larson-platinum-split-fullview-black-modern-handle.png
 * 
 * COLOR SLUG FORMATTING:
 * - Convert to lowercase
 * - Replace spaces with hyphens
 * - Remove special characters
 * Examples: "White Linen" -> "white-linen", "Black" -> "black"
 * 
 * HANDLE SLUG FORMATTING:
 * - Convert to lowercase
 * - Replace spaces with hyphens
 * - Remove special characters
 * Examples: "Classic Handle" -> "classic-handle", "Modern Handle" -> "modern-handle"
 * 
 * FOLDER STRUCTURE:
 * /public/products/
 *   ├── larson-platinum-split-fullview.png (base)
 *   ├── larson-platinum-split-fullview-white-linen.png
 *   ├── larson-platinum-split-fullview-black.png
 *   ├── larson-platinum-split-fullview-white-linen-classic-handle.png
 *   └── ...
 */

/**
 * Converts a string to a URL-friendly slug
 */
function toSlug(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
}

/**
 * Normalizes product ID to match image naming convention
 * Handles case variations (e.g., larson-30-midview -> LARSON-30-Midview)
 * This matches the actual image file naming used
 */
function normalizeProductIdForImage(productId: string): string {
    // Special handling for products with "30" in the name
    // Convert: larson-30-midview -> LARSON-30-Midview
    if (productId.includes("-30-")) {
        const parts = productId.split("-");
        return parts
            .map((part, index) => {
                if (part === "30") return "30";
                if (index === 0) return part.toUpperCase(); // LARSON
                // Capitalize first letter, rest lowercase: midview -> Midview
                return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
            })
            .join("-");
    }
    // For other products, try to match common patterns
    // If product ID is all lowercase, try to match uppercase brand pattern
    if (productId.startsWith("larson-") || productId.startsWith("andersen-")) {
        const parts = productId.split("-");
        if (parts.length > 0) {
            parts[0] = parts[0].toUpperCase(); // LARSON or ANDERSEN
        }
        return parts.join("-");
    }
    // Default: keep as is
    return productId;
}

/**
 * Products that use a dedicated subfolder for images (e.g. /products/larson-split-view/).
 * Image naming inside the folder follows product-specific rules (e.g. color + swing, no handle).
 */
const PRODUCT_IMAGE_SUBFOLDERS: Record<
    string,
    {
        folder: string;
        colorToSlug: Record<string, string>;
        swingSuffix?: (colorSlug: string, swing: string) => string;
        ext?: string;
        handleToSlug?: Record<string, string>;
    }
> = {
    "andersen-4000-interchangeable": {
        folder: "andersen-4000-interchangeable",
        ext: ".png",
        colorToSlug: {
            White: "white",
            Black: "black",
            Almond: "almond",
            Bronze: "bronze",
            "Cinnamon Toast": "cinnamon-toast",
            Sandstone: "sandstone",
            Terratone: "terratone",
        },
        // Base image = left; -right = right-hand outswing
        swingSuffix: (_colorSlug: string, swing: string) =>
            swing === "right" ? "right" : "",
        handleToSlug: {
            "Modern Matte Black": "modern-matte-black",
            "Modern Brushed Dark Nickel": "modern-brushed-dark-nickel",
            "Modern Brushed French Gold": "modern-brushed-french-gold",
            "Modern Metallic Stone": "modern-metallic-stone",
            "Modern Venetian Bronze": "modern-venetian-bronze",
            "Traditional": "traditional",
            "Traditional Brass": "traditional-brass",
            "Traditional Antique Brass": "traditional-antique-brass",
            "Traditional Matte Black": "traditional-matte-black",
            "Traditional Oil Rubbed Bronze": "traditional-oil-rubbed-bronze",
        },
    },
    "andersen-400-series-retractable": {
        folder: "andersen-400-series-3:4",
        ext: ".png",
        colorToSlug: {
            White: "white",
            Black: "black",
            Almond: "almond",
            Bronze: "bronze",
            Grey: "gray",
            Sandstone: "sandtone",
            "Forest Green": "forest-green",
        },
    },
    "andersen-3000-series-interchangeable": {
        folder: "andersen-3000-series",
        ext: ".png",
        colorToSlug: {
            White: "white",
            Black: "black",
            Almond: "almond",
            Bronze: "bronze",
            Grey: "gray",
            Sandstone: "sandtone",
            Terratone: "terratone",
        },
        swingSuffix: (_colorSlug: string, swing: string) =>
            swing === "right" ? "right" : "",
    },
    "andersen-2000-series-retractable": {
        folder: "anderson-2000-series",
        colorToSlug: {
            White: "white",
            Almond: "almond",
            Sandstone: "sandtone",
        },
    },
    "larson-20-midview": {
        folder: "larson-20-midview",
        colorToSlug: {
            White: "white",
            Brown: "brown",
        },
    },
    "larson-60mt-maximum-view": {
        folder: "larson-60mt",
        colorToSlug: {
            White: "white",
            Black: "black",
            Almond: "almond",
            Brown: "brown",
            Graphite: "graphait",
            Sandstone: "sandstone",
        },
    },
    "larson-30-midview": {
        folder: "larson-30-midview",
        colorToSlug: {
            White: "white",
            Brown: "brown",
            Almond: "almond",
        },
    },
    "larson-platinum-fullview": {
        folder: "larson-platinum-fullview",
        colorToSlug: {
            "White Linen": "white-lilen",
            Black: "black",
            Graphite: "graphait",
            Pebblestone: "pebbleston",
            Woodland: "woodland",
        },
        swingSuffix: (_colorSlug: string, swing: string) =>
            swing === "right" ? "right" : "",
    },
    "larson-platinum-split-fullview": {
        folder: "larson-platinum-split-fullview",
        colorToSlug: {
            "White Linen": "white-lilen",
            Black: "black",
            Graphite: "graphait",
            Pebblestone: "pebbleston",
            Woodland: "woodland",
        },
        // Base image for left swing; -right for right-hand outswing
        swingSuffix: (_colorSlug: string, swing: string) =>
            swing === "right" ? "right" : "",
    },
    "larson-split-view": {
        folder: "larson-split-view",
        // Display name -> exact filename slug (your naming)
        colorToSlug: {
            "White Linen": "white-lilen",
            Graphite: "graphait",
            Pebblestone: "pebbleston",
            Woodland: "woodland",
            Black: "black",
        },
        // Swing suffix for filename: color base + left/right (black uses -left-handle / -right-handle-outside)
        swingSuffix: (colorSlug: string, swing: string) => {
            if (colorSlug === "black") {
                return swing === "left" ? "left-handle" : "right-handle-outside";
            }
            return swing; // -left or -right
        },
    },
};

/**
 * Gets the product image path based on product ID, color, handle, and optional swing.
 * Supports per-product subfolders and swing-based images (e.g. larson-split-view).
 *
 * Priority for subfolder products (e.g. larson-split-view):
 * 1. /products/{folder}/{colorSlug}-{swingSuffix}.avif when swing selected
 * 2. /products/{folder}/{colorSlug}.avif (color only)
 * 3. /products/door1.png (fallback)
 *
 * Priority for flat products:
 * 1. {productId}-{color}-{handle}.{ext}
 * 2. {productId}-{color}.{ext}
 * 3. {productId}.{ext}
 * 4. door1.png
 */
export function getProductImage(
    productId: string,
    color?: string,
    handleId?: string,
    handleName?: string,
    swing?: string
): string {
    const formats = [".avif", ".png", ".jpg", ".jpeg", ".webp"];
    const subfolder = PRODUCT_IMAGE_SUBFOLDERS[productId];

    // Per-product subfolder (e.g. larson-split-view): color + optional swing, no handle
    if (subfolder) {
        const baseUrl = `/products/${subfolder.folder}`;
        const colorSlug = color
            ? subfolder.colorToSlug[color] ?? toSlug(color)
            : null;

        if (colorSlug) {
            const ext = subfolder.ext ?? ".avif";
            const handleSlug =
                handleName && subfolder.handleToSlug
                    ? subfolder.handleToSlug[handleName] ?? toSlug(handleName)
                    : null;

            if (swing && subfolder.handleToSlug && handleSlug) {
                return `${baseUrl}/${colorSlug}-${swing}-${handleSlug}${ext}`;
            }
            if (swing && subfolder.swingSuffix) {
                const suffix = subfolder.swingSuffix(colorSlug, swing);
                if (suffix) {
                    return `${baseUrl}/${colorSlug}-${suffix}${ext}`;
                }
            }
            return `${baseUrl}/${colorSlug}${ext}`;
        }
        return `/products/door1.png`;
    }

    const normalizedProductId = normalizeProductIdForImage(productId);

    if (color && handleName) {
        const colorSlug = toSlug(color);
        const handleSlug = toSlug(handleName);
        for (const ext of formats) {
            return `/products/${normalizedProductId}-${colorSlug}-${handleSlug}${ext}`;
        }
    }

    if (color) {
        const colorSlug = toSlug(color);
        for (const ext of formats) {
            return `/products/${normalizedProductId}-${colorSlug}${ext}`;
        }
    }

    for (const ext of formats) {
        return `/products/${normalizedProductId}${ext}`;
    }

    return `/products/door1.png`;
}

/**
 * Gets all available images for a product based on available colors and handles
 * Useful for thumbnail galleries
 */
export function getProductImageVariants(
    productId: string,
    colors: string[],
    handles?: Array<{ id: string; name: string }>
): string[] {
    const images: string[] = [];

    // Add base image
    images.push(`/products/${productId}.png`);

    // Add color variants
    colors.forEach((color) => {
        const colorSlug = toSlug(color);
        images.push(`/products/${productId}-${colorSlug}.png`);
    });

    // Add color + handle combinations
    if (handles) {
        colors.forEach((color) => {
            handles.forEach((handle) => {
                const colorSlug = toSlug(color);
                const handleSlug = toSlug(handle.name);
                images.push(
                    `/products/${productId}-${colorSlug}-${handleSlug}.png`
                );
            });
        });
    }

    return images;
}

/**
 * Products that have handle thumbnail images in a handle/ subfolder
 */
const HANDLE_IMAGE_FOLDERS: Record<string, Record<string, string>> = {
    "andersen-4000-interchangeable": {
        "Modern Matte Black": "Modern-Matte-Black.webp",
        "Modern Brushed Dark Nickel": "Modern-Brushed-Dark-Nickel.webp",
        "Modern Brushed French Gold": "Modern-Brushed-French-Gold.webp",
        "Modern Metallic Stone": "Modern-Metallic-Stone-Modern-Metallic-Stone.webp",
        "Modern Venetian Bronze": "Modern-Venetian-Bronze.webp",
        "Traditional": "traditional.webp",
        "Traditional Brass": "traditional brass.webp",
        "Traditional Antique Brass": "traditional-Antique-Brass.webp",
        "Traditional Matte Black": "Traditional-Matte-Black.webp",
        "Traditional Oil Rubbed Bronze": "Traditional Oil Rubbed Bronze.webp",
    },
};

/**
 * Gets the handle thumbnail image path for display beside the handle selector
 */
export function getHandleImagePath(productId: string, handleName: string): string | null {
    const map = HANDLE_IMAGE_FOLDERS[productId];
    if (!map || !handleName) return null;
    const filename = map[handleName];
    if (!filename) return null;
    const subfolder = PRODUCT_IMAGE_SUBFOLDERS[productId];
    const folder = subfolder?.folder ?? productId;
    return `/products/${folder}/handle/${encodeURIComponent(filename)}`;
}

/**
 * Checks if an image exists (for client-side validation)
 * Note: This is a placeholder - in production, you'd want to check server-side
 * or use a CDN that returns 404 for missing images
 */
export async function imageExists(imagePath: string): Promise<boolean> {
    try {
        const response = await fetch(imagePath, { method: "HEAD" });
        return response.ok;
    } catch {
        return false;
    }
}
