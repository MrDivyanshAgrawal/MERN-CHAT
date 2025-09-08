import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { useThemeStore } from "../store/useThemeStore";
import { GRADIENT_MAP, isGradientTheme, DEFAULT_THEME } from "../utils/themeUtils";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();
  const { theme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // --- Dark / Light detection ---
  const darkThemeKeys = [
    "dark", "night", "dracula", "midnight", "black",
    "synthwave", "halloween", "forest", "business"
  ];
  const isDarkTheme = darkThemeKeys.some(k =>
    appliedTheme.toLowerCase().includes(k)
  );

  // --- Backgrounds & Borders ---
  const inputBg = isGradient
    ? "bg-white/10 backdrop-blur-md"
    : isDarkTheme
    ? "bg-[#141c2c]" // darker input for dark theme
    : "bg-base-200"; // light theme

  const inputText = isGradient
    ? "text-white placeholder-white/70"
    : "text-base-content placeholder-base-content/60";

  const attachBtnColor = isGradient
    ? "text-white/80 hover:text-white"
    : "text-base-content/70 hover:text-base-content";

  const sendBtnColor = isGradient
    ? "bg-white text-primary hover:bg-white/90"
    : "btn-primary";

  const borderClass = isGradient
    ? "border-white/30"
    : isDarkTheme
    ? "border-slate-700"
    : "border-base-300";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file?.type.startsWith("image/")) return toast.error("Please select an image file");

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessages({ text: text.trim(), image: imagePreview });
      setText("");
      removeImage();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div
      className={`p-4 border-t ${borderClass} ${inputBg} rounded-t-xl shadow-md border ${borderClass}`}
    >
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className={`w-28 h-28 object-cover rounded-2xl shadow-lg border ${isGradient ? "border-white/40" : borderClass}`}
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-error text-error-content flex items-center justify-center shadow-md"
              onClick={removeImage}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div
          className={`flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl shadow-inner ${inputBg} ${inputText} focus-within:ring-2 focus-within:ring-primary border ${borderClass}`}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm sm:text-base outline-none"
          />

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`p-2 rounded-full transition-colors ${attachBtnColor}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          className={`btn btn-circle ${sendBtnColor} shadow-md`}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
