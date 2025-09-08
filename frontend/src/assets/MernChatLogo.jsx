import React from "react";

function MernChatLogo({
  className = "w-24 h-auto",
  fillColor = "#1F2937", // default dark text
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ovalGradient1" x1="50" y1="20" x2="140" y2="90">
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="ovalGradient2" x1="100" y1="25" x2="190" y2="95">
          <stop stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#9333EA" />
        </linearGradient>
        <filter id="ovalShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
          <feOffset dx="3" dy="3" result="offsetblur" />
          <feFlood floodColor="#000" floodOpacity="0.3" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#ovalShadow)">
        <ellipse
          cx="100"
          cy="65"
          rx="55"
          ry="35"
          transform="rotate(-20 100 65)"
          fill="url(#ovalGradient2)"
        />
        <ellipse
          cx="140"
          cy="65"
          rx="55"
          ry="35"
          transform="rotate(20 140 65)"
          fill="url(#ovalGradient1)"
          opacity="0.9"
        />
      </g>

      <text
        x="120"
        y="140"
        fontFamily="'Inter', sans-serif"
        fontSize="26"
        fontWeight="800"
        fill={fillColor}   // <-- use exact same color as title
        textAnchor="middle"
        letterSpacing="0.05em"
      >
        MERN CHAT
      </text>
    </svg>
  );
}

export default MernChatLogo;
