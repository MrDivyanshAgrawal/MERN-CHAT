import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useThemeStore } from "../store/useThemeStore";
import { GRADIENT_MAP, isGradientTheme, DEFAULT_THEME } from "../utils/themeUtils";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // Theme-aware colors
  const bgClass = isGradient ? GRADIENT_MAP[appliedTheme] : "bg-base-100";
  const textClass = isGradient ? "text-white" : "text-base-content";
  const subTextClass = isGradient ? "text-white/70" : "text-base-content/70";
  const hoverBg = isGradient ? "hover:bg-white/20" : "hover:bg-base-200";

  // Safe online check
  const isOnline = onlineUsers.some(
    (id) => id.toString() === selectedUser?._id?.toString()
  );

  return (
    <div className={`p-3 border-b border-base-300 ${bgClass}`}>
      <div className="flex items-center justify-between">
        {/* Left side: Avatar + User info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
            />
            <span
              className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full ring-2 ${
                isGradient ? "ring-white" : "ring-base-100"
              } ${isOnline ? "bg-green-500" : "bg-gray-400"}`}
            ></span>
          </div>

          <div className="flex flex-col">
            <h3 className={`font-semibold ${textClass} leading-tight`}>
              {selectedUser.fullName}
            </h3>
            <p className={`text-sm ${subTextClass} leading-tight`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className={`p-2 rounded-full ${hoverBg} transition`}
          aria-label="Close chat"
        >
          <X className={`w-5 h-5 ${textClass}`} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
