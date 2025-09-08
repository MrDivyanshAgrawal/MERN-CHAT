import { useThemeStore } from "../store/useThemeStore";
import {
  GRADIENT_MAP,
  isGradientTheme,
  DEFAULT_THEME,
} from "../utils/themeUtils";
import MernChatLogo from "../assets/MernChatLogo.jsx";

const NoChatSelected = () => {
  const { theme } = useThemeStore();
  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // Dynamic colors based on theme
  const textColor = isGradient ? "text-white/90" : "text-base-content/80";
  const subText = isGradient ? "text-white/80" : "text-base-content/60";
  const bgClass = isGradient ? GRADIENT_MAP[appliedTheme] : "bg-base-100";

  // Logo text color for SVG fill
  const logoTextColor = isGradient ? "#FFFFFF" : "#F43F5E"; // pink-500 for light theme

  return (
    <div
      className={`flex-1 w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-12 lg:py-16 ${bgClass} rounded-r-2xl relative overflow-hidden`}
      data-theme={!isGradient ? appliedTheme : undefined}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-primary rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-md text-center space-y-4 sm:space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/10 items-center justify-center animate-bounce shadow-lg">
            <MernChatLogo
              className="w-12 sm:w-16 lg:w-20 h-auto"
              fillColor={logoTextColor} // <-- dynamic logo text color
            />
          </div>
        </div>

        {/* Heading */}
        <h2
          className={`text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight ${textColor}`}
        >
          Welcome to <span style={{ color: logoTextColor }}>MERN CHAT</span>
        </h2>

        {/* Subtext */}
        <p
          className={`text-sm sm:text-base lg:text-lg leading-relaxed ${subText}`}
        >
          Select a conversation from the sidebar to start chatting. Connect,
          share, and enjoy real-time messaging 🚀
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
