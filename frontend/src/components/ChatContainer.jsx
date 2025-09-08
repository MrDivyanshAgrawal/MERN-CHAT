import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useThemeStore } from "../store/useThemeStore";
import {
  GRADIENT_MAP,
  isGradientTheme,
  DEFAULT_THEME,
} from "../utils/themeUtils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const messageEndRef = useRef(null);

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // --- Dark theme detection ---
  const darkThemeKeys = ["dark", "night", "dracula", "midnight", "black", "synthwave", "halloween", "forest", "business"];
  const name = (appliedTheme || "").toLowerCase();
  const isDarkTheme = darkThemeKeys.some((k) => name.includes(k));

  // --- Background ---
  const bgClass = isGradient
    ? GRADIENT_MAP[appliedTheme]
    : isDarkTheme
    ? "bg-[#0a101f]"
    : "bg-base-100";

  /// --- Bubble styles (lighter for dark themes) ---
const bubbleSentClass = isGradient
  ? "bg-white/20 border border-white/40 shadow-sm"
  : isDarkTheme
  ? "bg-primary/60 border border-primary/70 shadow-md" // lighter tinted bubble for sent
  : "bg-primary/20 border border-primary/30 shadow-sm";

const bubbleReceivedClass = isGradient
  ? "bg-white/10 border border-white/30 shadow-sm"
  : isDarkTheme
  ? "bg-white/10 border border-white/20 shadow-md" // soft light gray for received
  : "bg-base-200 border border-base-300 shadow-sm";


  const textSentClass = isGradient
    ? "text-white"
    : isDarkTheme
    ? "text-white"
    : "text-base-content";

  const textReceivedClass = isGradient
    ? "text-white"
    : isDarkTheme
    ? "text-white"
    : "text-base-content";

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className={`flex-1 flex flex-col overflow-auto ${bgClass}`}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col overflow-auto ${bgClass}`}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`chat ${isSent ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div
                  className={`size-10 rounded-full border ${
                    isGradient ? "border-white/30" : "border-base-300"
                  }`}
                >
                  <img
                    src={
                      isSent
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              {/* Timestamp */}
              <div className="chat-header mb-1">
                <time
                  className={`text-xs opacity-50 ml-1 ${
                    isGradient || isDarkTheme ? "text-white/60" : ""
                  }`}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Bubble */}
              <div
                className={`chat-bubble inline-flex max-w-[70%] px-4 py-2 rounded-2xl break-words flex-col ${
                  isSent
                    ? bubbleSentClass + " " + textSentClass
                    : bubbleReceivedClass + " " + textReceivedClass
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-xl mb-2 self-start border border-white/20"
                  />
                )}
                {message.text && (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
