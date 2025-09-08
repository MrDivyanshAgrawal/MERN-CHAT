// src/utils/themeUtils.js

// Default theme
export const DEFAULT_THEME = "profileDefault"; // the ProfilePage default

// Gradient themes map (including the default theme)
export const GRADIENT_MAP = {
  profileDefault: "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600", // default
  sunset: "bg-gradient-to-br from-pink-400 to-orange-500",
  ocean: "bg-gradient-to-br from-cyan-400 to-blue-600",
  aurora: "bg-gradient-to-br from-purple-500 to-green-400",
  midnight: "bg-gradient-to-br from-gray-900 to-indigo-900",
  peach: "bg-gradient-to-br from-orange-400 to-pink-500",
  mint: "bg-gradient-to-br from-green-400 to-teal-400",
  lavender: "bg-gradient-to-br from-purple-300 to-pink-300",
  fire: "bg-gradient-to-br from-red-500 to-orange-600",
};

// Check if a theme is a gradient
export const isGradientTheme = (theme) => Object.keys(GRADIENT_MAP).includes(theme);
