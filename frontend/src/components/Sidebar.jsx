import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import {
  GRADIENT_MAP,
  isGradientTheme,
  DEFAULT_THEME,
} from "../utils/themeUtils";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const { theme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // Theme-aware classes
  const bgClass = isGradient ? GRADIENT_MAP[appliedTheme] : "bg-base-100";
  const borderClass = isGradient ? "border-white/20" : "border-base-300";
  const textClass = isGradient ? "text-white" : "text-base-content";
  const subTextClass = isGradient ? "text-white/70" : "text-base-content/60";
  const hoverClass = isGradient ? "hover:bg-white/10" : "hover:bg-base-200";

  // Online/offline indicator colors
  const onlineIndicatorBg = isGradient ? "bg-green-400" : "bg-green-500";
  const offlineIndicatorBg = isGradient ? "bg-gray-50" : "bg-gray-400";
  const ringColor = isGradient ? "ring-white" : "ring-white";

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filter & reorder: online users always on top
  const filteredUsers = (
    showOnlineOnly
      ? users.filter((user) => onlineUsers.includes(user._id))
      : users
  ).sort((a, b) => {
    const aOnline = onlineUsers.includes(a._id);
    const bOnline = onlineUsers.includes(b._id);
    return aOnline === bOnline ? 0 : aOnline ? -1 : 1;
  });

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className={`h-full w-20 lg:w-72 border-r flex flex-col transition-all duration-200 ${bgClass} ${borderClass}`}
      data-theme={!isGradient ? appliedTheme : undefined}
    >
      {/* Header */}
      <div className={`border-b p-4 ${borderClass}`}>
        <div className="flex items-center gap-2">
          <Users className={`w-5 h-5 ${textClass}`} />
          <span className={`font-medium hidden lg:block ${textClass}`}>
            Contacts
          </span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className={`text-sm ${subTextClass}`}>Show online only</span>
          </label>
          <span className={`text-xs ${subTextClass}`}>
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers.length === 0 && (
          <div className={`text-center py-4 ${subTextClass}`}>
            No users found
          </div>
        )}
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const isSelected = selectedUser?._id === user._id;

          // Selected background colors based on theme
          const selectedBg = isGradient
            ? "bg-white/20"
            : "bg-primary/10 border border-primary";

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`relative flex items-center gap-3 w-full p-3 pl-5 rounded-lg transition-all ${hoverClass} ${
                isSelected ? selectedBg : ""
              }`}
            >
              {/* Accent bar for selected user */}
              {isSelected && (
                <span
                  className={`absolute left-0 top-0 h-full w-1 rounded-r ${
                    isGradient ? "bg-white/80" : "bg-primary"
                  }`}
                />
              )}

              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ${ringColor} ${
                    isOnline ? onlineIndicatorBg : offlineIndicatorBg
                  }`}
                ></span>
              </div>

              {/* User info */}
              <div className="hidden lg:flex flex-col min-w-0 items-start justify-center">
                <span
                  className={`font-medium truncate ${textClass} leading-tight`}
                >
                  {user.fullName}
                </span>
                <span
                  className={`text-sm leading-tight ${
                    isOnline ? "text-green-500" : subTextClass
                  }`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
