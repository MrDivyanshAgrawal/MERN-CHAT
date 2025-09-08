import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { GRADIENT_MAP, isGradientTheme, DEFAULT_THEME } from "../utils/themeUtils";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const { theme } = useThemeStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  const appliedTheme = theme || DEFAULT_THEME;
  const isGradient = isGradientTheme(appliedTheme);
  const borderClass = isGradient ? "border-white/20" : "border-base-300";
  const shadowClass = "shadow-2xl";

  return (
    <div
      className={`min-h-screen pt-20 sm:pt-24 ${isGradient ? GRADIENT_MAP[appliedTheme] : ""}`}
      data-theme={!isGradient ? appliedTheme : undefined}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 ${borderClass} ${shadowClass} space-y-8`}>
          {/* Title */}
          <div className="text-center">
            <h1 className={`text-2xl font-bold ${isGradient ? "text-white" : "text-base-content"}`}>Profile</h1>
            <p className={`${isGradient ? "text-white/70" : "text-base-content/70"} mt-1`}>Your profile information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser?.profilePic || "/avatar.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-white/20 hover:bg-white/30 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className={`${isGradient ? "text-white/70" : "text-base-content/70"} text-sm`}>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Info */}
          <div className={`space-y-6 ${isGradient ? "text-white" : "text-base-content"}`}>
            <div className="space-y-1.5">
              <div className={`text-sm flex items-center gap-2 ${isGradient ? "text-white/70" : "text-gray-300"}`}>
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className={`px-4 py-2.5 rounded-lg ${borderClass} ${shadowClass} ${isGradient ? "bg-white/10" : "bg-base-100"}`}>
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className={`text-sm flex items-center gap-2 ${isGradient ? "text-white/70" : "text-gray-300"}`}>
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className={`px-4 py-2.5 rounded-lg ${borderClass} ${shadowClass} ${isGradient ? "bg-white/10" : "bg-base-100"}`}>
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className={`rounded-xl p-6 ${borderClass} ${shadowClass} ${isGradient ? "bg-white/10" : "bg-base-100"} ${isGradient ? "text-white" : "text-base-content"}`}>
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className={`flex items-center justify-between py-2 border-b ${borderClass}`}>
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
