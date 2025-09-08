import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { LogOut, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import MernChatLogo from "../assets/MernChatLogo.jsx";
import { isGradientTheme, DEFAULT_THEME, GRADIENT_MAP } from "../utils/themeUtils";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { theme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);
  const isDark = appliedTheme === "dark";

  // Resolve colors
  const [logoFillColor, setLogoFillColor] = useState("#FFFFFF");

  useEffect(() => {
    if (isGradient || isDark) {
      setLogoFillColor("#FFFFFF"); // white for dark/gradient
    } else {
      // Light theme: use DaisyUI secondary color dynamically
      const tempEl = document.createElement("div");
      tempEl.className = "text-secondary hidden";
      document.body.appendChild(tempEl);
      const secondaryColor = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);
      setLogoFillColor(secondaryColor || "#F43F5E"); // fallback to Tailwind secondary pink
    }
  }, [isGradient, isDark, appliedTheme]);

  // Text classes
  const textColorClass = isGradient || isDark ? "text-white" : "text-secondary";

  // Navbar background
  const navbarBgClass = isGradient
    ? `${GRADIENT_MAP[appliedTheme]} bg-opacity-90`
    : isDark
    ? "bg-base-200/90"
    : "bg-base-100/90";

  const logoBgClass = isGradient
    ? `${GRADIENT_MAP[appliedTheme]} bg-opacity-80`
    : isDark
    ? "bg-base-300"
    : "bg-base-100";

  const borderClass = isGradient ? "border-white/30" : "border-base-300";
  const logoBorderClass = isGradient ? "border-white/40" : "border-base-300";

  const actionBgClass = isGradient
    ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
    : isDark
    ? "bg-base-300/80 hover:bg-base-300"
    : "bg-base-200/80 hover:bg-base-200";

  return (
    <header className={`fixed w-full top-0 z-50 backdrop-blur-md border-b ${borderClass} ${navbarBgClass}`}>
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + App Name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-200">
            <div className={`p-2 sm:p-3 rounded-2xl border ${logoBorderClass} ${logoBgClass} flex items-center justify-center shadow-sm`}>
              <MernChatLogo className="w-10 sm:w-14 h-auto" fillColor={logoFillColor} />
            </div>
            <span className={`text-lg sm:text-xl font-bold ${textColorClass} truncate`}>
              MERN CHAT
            </span>
          </Link>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/settings"
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${actionBgClass} transition-all duration-200 ${textColorClass} text-sm font-medium shadow-sm hover:shadow-md`}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${actionBgClass} transition-all duration-200 ${textColorClass} text-sm font-medium shadow-sm hover:shadow-md`}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg ${actionBgClass} transition-all duration-200 ${textColorClass} text-sm font-medium shadow-sm hover:shadow-md hover:bg-red-500/20`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
