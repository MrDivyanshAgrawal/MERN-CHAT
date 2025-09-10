import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import {
  GRADIENT_MAP,
  isGradientTheme,
  DEFAULT_THEME,
} from "../utils/themeUtils";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // Classes
  const borderClass = isGradient ? "border-white/20" : "border-base-300";
  const shadowClass = "shadow-lg";
  const textClass = isGradient ? "text-white" : "text-base-content";
  const subTextClass = isGradient ? "text-white" : "text-base-content/70";
  const placeholderClass = isGradient
    ? "placeholder-white/70"
    : "placeholder-base-content/60";

  return (
    <div
      className={`min-h-screen pt-20 sm:pt-24 ${
        isGradient ? GRADIENT_MAP[appliedTheme] : ""
      }`}
      data-theme={!isGradient ? appliedTheme : undefined}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* OUTER CONTAINER with border */}
        <div className={`space-y-6 rounded-xl border ${borderClass} p-6 ${shadowClass}`}>
          {/* Theme Selector Header */}
          <div className="flex flex-col gap-1">
            <h2 className={`text-lg font-semibold ${textClass}`}>Theme</h2>
            <p className={`text-sm ${subTextClass}`}>
              Choose a theme for your chat interface
            </p>
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => {
              const selected = appliedTheme === t;
              const tIsGradient = isGradientTheme(t);

              return (
                <button
                  key={t}
                  className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors border ${borderClass} ${shadowClass} ${
                    selected ? "bg-base-200" : "hover:bg-base-200/50"
                  }`}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className={`relative h-8 w-full rounded-md overflow-hidden ${
                      tIsGradient ? GRADIENT_MAP[t] : ""
                    }`}
                    data-theme={!tIsGradient ? t : undefined}
                  >
                    {!tIsGradient && (
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-medium truncate w-full text-center ${
                      selected
                        ? "text-base-content" // dark text for selected white box
                        : tIsGradient
                        ? "text-white" // white text for gradients
                        : textClass
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Preview Section */}
          <h3 className={`text-lg font-semibold mb-3 ${textClass}`}>
            Preview
          </h3>

          {/* OUTER PREVIEW BOX with border */}
          <div className={`rounded-xl border ${borderClass} ${shadowClass} overflow-hidden`}>
            <div
              className={`${isGradient ? "bg-white/10" : "bg-base-100"} p-4`}
            >
              <div className="max-w-lg mx-auto">
                {/* INNER PREVIEW CHAT BOX with border */}
                <div
                  className={`rounded-xl border ${borderClass} ${shadowClass} overflow-hidden ${
                    isGradient ? "bg-white/10" : "bg-base-100"
                  }`}
                >
                  {/* Chat Header */}
                  <div className={`px-4 py-3 border-b ${borderClass}`}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                          isGradient
                            ? "bg-white/20 text-white"
                            : "bg-primary text-primary-content"
                        }`}
                      >
                        J
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${textClass}`}>
                          John Doe
                        </h3>
                        <p className={`text-xs ${subTextClass}`}>Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div
                    className={`p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto ${
                      isGradient ? "bg-white/5" : "bg-base-100"
                    }`}
                  >
                    {PREVIEW_MESSAGES.map((message) => {
                      const isSent = message.isSent;

                      const bubbleClass = isSent
                        ? isGradient
                          ? "bg-white/20 border border-white/40 text-white"
                          : "bg-primary/20 border border-primary/30 text-base-content"
                        : isGradient
                        ? "bg-white/10 border border-white/30 text-white"
                        : "bg-base-200 border border-base-300 text-base-content";

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isSent ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-xl px-4 py-2 shadow-sm border ${bubbleClass}`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-[10px] mt-1.5 ${subTextClass}`}>
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Chat Input */}
                  <div className={`p-4 border-t ${borderClass}`}>
                    <div
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 ${
                        isGradient
                          ? "bg-white/10 border border-white/20"
                          : "bg-base-200 border border-base-300"
                      }`}
                    >
                      <input
                        type="text"
                        className={`flex-1 bg-transparent outline-none text-sm ${textClass} ${placeholderClass}`}
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button
                        className={`btn btn-sm rounded-full ${
                          isGradient
                            ? "bg-white/20 hover:bg-white/30 text-white border-none"
                            : "btn-primary"
                        }`}
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                {/* End INNER PREVIEW */}
              </div>
            </div>
          </div>
          {/* End OUTER PREVIEW */}
        </div>
        {/* End OUTER CONTAINER */}
      </div>
    </div>
  );
}

export default SettingsPage;
