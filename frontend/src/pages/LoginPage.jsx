import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  Zap,
  Users,
  Smartphone,
} from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { GRADIENT_MAP, isGradientTheme, DEFAULT_THEME } from "../utils/themeUtils";
import MernChatLogo from "../assets/MernChatLogo.jsx";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const { theme } = useThemeStore();

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);

  // Left side text colors
  const leftHeadingColor = isGradient ? "text-white" : "text-primary";
  const leftSubTextColor = isGradient ? "text-white/80" : "text-base-content/80";
  const leftFeatureTextColor = isGradient ? "text-white" : "text-base-content";

  // Right side text colors
  const textColor = isGradient ? "text-white" : "text-base-content";
  const subTextColor = isGradient ? "text-white/70" : "text-base-content/70";
  const placeholderColor = isGradient ? "placeholder-white/70" : "placeholder-base-content/70";
  const borderClass = isGradient ? "border-white/20" : "border-base-300";
  const shadowClass = "shadow-2xl";

  // Logo text color: white for gradient, secondary for light
  const logoTextColor = isGradient ? "#FFFFFF" : "#F43F5E"; // DaisyUI secondary (pink-500)

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isGradient ? GRADIENT_MAP[appliedTheme] : "bg-base-100"
      }`}
      data-theme={!isGradient ? appliedTheme : undefined}
    >
      <div className="grid lg:grid-cols-2 w-full max-w-7xl">
        {/* LEFT SIDE - Branding */}
        <div className="flex flex-col justify-center items-center text-center px-8 sm:px-12 lg:px-16 py-12 sm:py-16">
          <MernChatLogo className="w-40 sm:w-48 mb-6" fillColor={logoTextColor} />
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-3 ${leftHeadingColor}`}>
            💬 Chat Faster. Connect Smarter.
          </h1>
          <p className={`mt-2 text-base sm:text-lg lg:text-xl max-w-lg ${leftSubTextColor}`}>
            Connect instantly with friends, share ideas, and stay in touch — anytime, anywhere.
          </p>
          <p className={`mt-2 text-sm ${leftSubTextColor}`}>
            Built with ❤️ using the MERN Stack
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left max-w-md">
            <div className={`flex items-center gap-3 ${leftFeatureTextColor}`}>
              <ShieldCheck className="h-5 w-5 text-green-300" />End-to-End Encryption
            </div>
            <div className={`flex items-center gap-3 ${leftFeatureTextColor}`}>
              <Zap className="h-5 w-5 text-yellow-300" />Lightning Fast Chats
            </div>
            <div className={`flex items-center gap-3 ${leftFeatureTextColor}`}>
              <Smartphone className="h-5 w-5 text-pink-300" />Responsive Web Design
            </div>
            <div className={`flex items-center gap-3 ${leftFeatureTextColor}`}>
              <Users className="h-5 w-5 text-pink-300" />Community Friendly
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="flex flex-col justify-center items-center px-6 sm:px-12 py-12">
          <div
            className={`w-full max-w-md bg-base-100/10 backdrop-blur-md rounded-2xl p-8 ${borderClass} ${shadowClass}`}
            data-theme={!isGradient ? appliedTheme : undefined}
          >
            <div className="text-center mb-8">
              <h2 className={`text-2xl font-bold ${textColor}`}>Welcome Back</h2>
              <p className={subTextColor}>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className={`label-text font-medium ${textColor}`}>Email</span>
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${placeholderColor}`} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`input w-full pl-10 rounded-lg border ${borderClass} bg-base-100/20 ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className={`label-text font-medium ${textColor}`}>Password</span>
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${placeholderColor}`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`input w-full pl-10 rounded-lg border ${borderClass} bg-base-100/20 ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-pink-400`}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className={`h-5 w-5 ${placeholderColor}`} /> : <Eye className={`h-5 w-5 ${placeholderColor}`} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn w-full rounded-lg bg-pink-500 hover:bg-pink-600 text-white border-0 transition-all duration-200 flex items-center justify-center gap-2"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
              </button>
            </form>

            <div className={`text-center mt-6 ${textColor}`}>
              <p>
                Don't have an account?{" "}
                <Link className="font-semibold text-pink-300 hover:text-pink-200 transition" to="/signup">
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
