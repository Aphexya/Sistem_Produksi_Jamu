# UI Layout Description: Penjamu Handal (Sistem Informasi Produksi Jamu Madura)

## 1. Overview
Penjamu Handal is a production management system for Madurese Jamu. The interface is designed to be responsive, intuitive, and high-precision, utilizing Tailwind CSS standards for a clean, modern aesthetic.

---

## 2. Admin Dashboard (Mobile)
**Goal:** High-level monitoring of production and inventory.

### Layout Structure:
*   **Navigation:** Top bar with brand logo and profile/logout access. Bottom navigation bar for primary sections (Dashboard, Reports, User Management).
*   **Stok Rempah Table (Critical):**
    *   Compact table layout optimized for mobile (horizontal scroll if necessary).
    *   **Indicators:**
        *   `Red Badge/Background`: Stock below minimum threshold.
        *   `Yellow Badge`: Stock approaching minimum.
        *   `Green Badge`: Healthy stock levels.
*   **Production Overview Cards:** Summary cards showing "Active Productions," "Total Output Today," and "Low Stock Alerts."
*   **Access Control:** Admin can see financial summaries and manage staff accounts, which are hidden from the Staff view.

---

## 3. Staff Production Input Page (Mobile)
**Goal:** Precision-focused data entry for the production floor.

### Layout Structure:
*   **Navigation:** Shared top/bottom nav, focusing on "Input Production" and "Recipe View."
*   **Formuliasi Resep Form (Precision):**
    *   Step-by-step or accordion-style form to prevent data entry fatigue.
    *   Fields for: Recipe Name (Dropdown), Batch Size, and Ingredient Weights.
    *   **Ingredient Input Rows:** Dynamic rows where staff can enter exact grams/kilograms for each spice required.
*   **Validation:** Real-time feedback for ingredient availability.
*   **Access Control:** Staff only sees their assigned production tasks and current inventory levels; they cannot see financial data or user management.

---

## 4. Visual Language (Tailwind CSS)
*   **Colors:** Deep earthy greens (`emerald-900`) and warm herbal tones (`amber-50`) to reflect the traditional Jamu theme.
*   **Typography:** Sans-serif (Inter or Roboto) for high readability in data-heavy views.
*   **Components:** Rounded corners (`rounded-lg`), subtle shadows (`shadow-sm`), and consistent padding (`p-4`).