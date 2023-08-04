export const modules = import.meta.glob("/**/*.{tsx,ts,css,json}", {
  as: "raw",
  eager: true,
});
