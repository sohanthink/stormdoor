# Andersen 4000 Interchangeable – Image Naming Guide

## Current setup (what's working now)

- **Colors:** White, Black, Almond, Bronze, Cinnamon Toast, Sandstone, Terratone  
- **Handle images for White:** uploaded (left + right for each handle)  
- **Handle images for other colors:** to be added later  

---

## Naming convention

### 1. Color only (no swing selected)
- Format: `{color-slug}.png`
- Examples: `white.png`, `black.png`, `almond.png`, `bronze.png`, `cinnamon-toast.png`, `sandtone.png`, `terratone.png`

### 2. Color + swing (no handle)
- **Left:** uses base `{color}.png` (e.g. `white.png`)
- **Right:** `{color-slug}-right.png` (e.g. `white-right.png`, `black-right.png`)

### 3. Color + swing + handle (when handle is selected)
- Format: `{color-slug}-{left|right}-{handle-slug}.png`
- Examples:
  - `white-left-modern-matte-black.png`
  - `white-right-traditional-antique-brass.png`
  - `almond-left-traditional-nickel.png`

---

## Color → filename slug

| Color          | Slug           |
|----------------|----------------|
| White          | white          |
| Black          | black          |
| Almond         | almond         |
| Bronze         | bronze         |
| Cinnamon Toast | cinnamon-toast |
| Sandstone      | sandtone       |
| Terratone      | terratone      |

---

## Handle name → handle slug

| Handle display name                     | Handle slug             |
|----------------------------------------|-------------------------|
| Andersen Modern - Matte Black           | modern-matte-black      |
| Andersen Modern - Venetian Bronze       | modern-venetian-bronze  |
| Andersen Modern - Brushed Dark Nickel   | modern-brushed-dark-nickel |
| Andersen Traditional - Nickel           | traditional-nickel      |
| Andersen Traditional - Antique Brass    | traditional-antique-brass |
| Andersen Traditional - Oil-Rubbed Bronze| traditional-oil-rubbed-bronze |

---

## To add later (by color)

### Black
- `black-left-{handle-slug}.png`
- `black-right-{handle-slug}.png`  
  (You already have `black.png`, `black-right.png`.)

### Almond
- `almond-left-{handle-slug}.png` for each handle  
  (You have `almond-left-traditional-brass.png`, `almond-left-traditional-nickel.png` – add the rest.)
- `almond-right-{handle-slug}.png`  
  (You have `almond.png`, `almond-right.png`.)

### Bronze
- `bronze-left-{handle-slug}.png`
- `bronze-right-{handle-slug}.png`  
  (You have `bronze.png`, `bronze-right.png`.)

### Cinnamon Toast
- `cinnamon-toast-left-{handle-slug}.png`
- `cinnamon-toast-right-{handle-slug}.png`  
  (You have `cinnamon-toast.png`, `cinnamon-toast-right.png`.)

### Sandstone
- `sandtone-left-{handle-slug}.png`
- `sandtone-right-{handle-slug}.png`  
  (You have `sandtone.png`, `sandtone-right.png`.)

### Terratone
- `terratone-left-{handle-slug}.png`
- `terratone-right-{handle-slug}.png`  
  (You have `terratone.png`, `terratone-right.png`.)

---

## Fallback behavior

1. **Color + swing + handle:**  
   Looks for `{color}-{left|right}-{handle-slug}.png`. If missing, falls back to color + swing.

2. **Color + swing:**  
   Looks for `{color}-{left|right}.png`. If missing, falls back to color only.

3. **Color only:**  
   Uses `{color}.png`.

4. **No matching file:**  
   Uses the default door image.

Add files in the order above; the app will use whatever exists and fall back as needed.
