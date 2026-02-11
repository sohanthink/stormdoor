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
 * Gets the product image path based on product ID, color, and handle
 * Tries to find the most specific image first, then falls back to less specific ones
 * Supports multiple formats: .avif, .png, .jpg, .webp
 * 
 * Priority order:
 * 1. {productId}-{color}-{handle}.{ext} (most specific)
 * 2. {productId}-{color}.{ext} (color only)
 * 3. {productId}.{ext} (base/default)
 * 4. door1.png (fallback)
 */
export function getProductImage(
    productId: string,
    color?: string,
    handleId?: string,
    handleName?: string
): string {
    // Supported image formats (in order of preference)
    const formats = [".avif", ".png", ".jpg", ".jpeg", ".webp"];

    // Normalize product ID for image matching
    const normalizedProductId = normalizeProductIdForImage(productId);

    // Try to find the most specific image first
    if (color && handleName) {
        const colorSlug = toSlug(color);
        const handleSlug = toSlug(handleName);

        // Try each format
        for (const ext of formats) {
            const specificPath = `/products/${normalizedProductId}-${colorSlug}-${handleSlug}${ext}`;
            // Return first format - Next.js Image will handle 404s
            return specificPath;
        }
    }

    // Try color-only image
    if (color) {
        const colorSlug = toSlug(color);

        // Try each format
        for (const ext of formats) {
            const colorPath = `/products/${normalizedProductId}-${colorSlug}${ext}`;
            return colorPath;
        }
    }

    // Fall back to base product image
    for (const ext of formats) {
        const basePath = `/products/${normalizedProductId}${ext}`;
        return basePath;
    }

    // Ultimate fallback
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
