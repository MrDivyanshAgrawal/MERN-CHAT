import React from 'react';
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { GRADIENT_MAP, isGradientTheme, DEFAULT_THEME } from "../utils/themeUtils";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

function HomePage() {
  const { selectedUser } = useChatStore();
  const { theme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  const darkThemeKeys = [
    "dark", "night", "dracula", "midnight", "black",
    "synthwave", "halloween", "forest", "business"
  ];
  const name = (appliedTheme || "").toLowerCase();
  const isDarkTheme = darkThemeKeys.some(k => name.includes(k));

  // Outer background
  const bgClass = isGradient
    ? GRADIENT_MAP[appliedTheme]
    : isDarkTheme
    ? "bg-[#0a101f]"
    : "bg-slate-100";

  // Inner card
  const cardBg = isGradient
    ? "bg-white/10 backdrop-blur-md"
    : isDarkTheme
    ? "bg-[#121a2e]"
    : "bg-white";

  const sidebarBg = isGradient
    ? "bg-white/5 backdrop-blur-sm"
    : isDarkTheme
    ? "bg-[#121a2e]/50"
    : "bg-slate-50";

  const borderClass = isGradient
    ? "border-white/20"
    : isDarkTheme
    ? "border-slate-800"
    : "border-slate-200";

  const shadowClass = "shadow-2xl";
  const transitionClass = "transition-all duration-300";

  return (
    <div
      className={`h-screen ${bgClass} ${transitionClass}`}
      data-theme={!isGradient ? appliedTheme : undefined}
    >
      <div className="flex items-center justify-center pt-20 px-4">
        <div
          className={`${cardBg} ${shadowClass} w-full max-w-7xl h-[calc(100vh-6rem)] rounded-2xl overflow-hidden flex flex-col ${transitionClass} border ${borderClass}`}
        >
          <div className="flex h-full">
            {/* Sidebar */}
            <Sidebar className={`border-r ${borderClass} ${sidebarBg} ${transitionClass}`} />

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <ChatContainer appliedTheme={appliedTheme} isGradient={isGradient} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
