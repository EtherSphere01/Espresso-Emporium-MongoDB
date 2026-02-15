export const API_BASE_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

export function apiUrl(pathname) {
    if (!pathname) return API_BASE_URL;
    return `${API_BASE_URL}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
}
