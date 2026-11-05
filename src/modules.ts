// Sandpack demo sources only — do not glob `/server` (Rolldown follows ?raw .ts imports into the client).
export const modules = import.meta.glob("/src/**/*.{tsx,ts,css,json}", {
  query: "?raw",
  import: "default",
  eager: true,
});
