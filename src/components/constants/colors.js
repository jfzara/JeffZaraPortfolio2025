export const BACKGROUND_COLORS = [
  "#ffffff", 
  "#f9feff", 
  "#ffe3c5", 
  "#fffbf6", 
  "#cfdce2ff", 
];

export const getContrastColor = (hexColor) => {
  if (!hexColor) return "#000";
  const c = hexColor.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff";
};