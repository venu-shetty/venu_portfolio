import { useState } from "react";

interface VenuPhotoProps {
  className?: string;
  isHeader?: boolean;
}

export default function VenuPhoto({ className = "w-full h-full", isHeader = false }: VenuPhotoProps) {
  const [srcIndex, setSrcIndex] = useState(0);

  // Fallback chain of real profile photos:
  // 1. Google Drive direct embed url, high-rest thumbnail, and public stream links
  // 2. Local uploaded workspace file fallbacks
  // 3. GitHub profile fallback links
  const imageSources = [
    "https://lh3.googleusercontent.com/d/15l1Hp-Vyz782b8DPqK90tQCKWWcl_hYW",
    "https://drive.google.com/thumbnail?id=15l1Hp-Vyz782b8DPqK90tQCKWWcl_hYW&sz=w1000",
    "https://drive.google.com/uc?id=15l1Hp-Vyz782b8DPqK90tQCKWWcl_hYW",
    "https://docs.google.com/uc?export=download&id=15l1Hp-Vyz782b8DPqK90tQCKWWcl_hYW",
    "https://lh3.googleusercontent.com/d/1kx8K7zY0ZN62xqppG5QLUAwl9Q5eObRi",
    "https://drive.google.com/thumbnail?id=1kx8K7zY0ZN62xqppG5QLUAwl9Q5eObRi&sz=w1000",
    "https://drive.google.com/uc?id=1kx8K7zY0ZN62xqppG5QLUAwl9Q5eObRi",
    "/profile.jpg",
    "/profile.png",
    "/assets/profile.jpg",
    "/assets/profile.png",
    "https://github.com/venu-shetty.png",
    "https://github.com/venushetty24.png",
    "https://avatars.githubusercontent.com/u/74381395?v=4"
  ];

  const handleImageError = () => {
    if (srcIndex < imageSources.length) {
      setSrcIndex(prev => prev + 1);
    }
  };

  // If we haven't exhausted our real image sources, render the img element
  if (srcIndex < imageSources.length) {
    return (
      <img
        src={imageSources[srcIndex]}
        onError={handleImageError}
        alt="Shetti Venu"
        className={`${className} object-cover`}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Vector fallback representation if all external image sources fail
  return (
    <svg
      viewBox="0 0 400 500"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="studio-bg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FAFAFC" />
          <stop offset="60%" stopColor="#EDEEF4" />
          <stop offset="100%" stopColor="#D9DBE5" />
        </radialGradient>
        <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5C4A1" />
          <stop offset="50%" stopColor="#E6B28C" />
          <stop offset="100%" stopColor="#CE9871" />
        </linearGradient>
        <linearGradient id="skin-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D8A07A" stopOpacity="0" />
          <stop offset="100%" stopColor="#B37C56" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="blazer-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252B35" />
          <stop offset="40%" stopColor="#181C24" />
          <stop offset="100%" stopColor="#0B0D11" />
        </linearGradient>
        <linearGradient id="blazer-lapel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2C333E" />
          <stop offset="100%" stopColor="#0C0E12" />
        </linearGradient>
        <linearGradient id="shirt-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id="hair-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2D3341" />
          <stop offset="60%" stopColor="#161A22" />
          <stop offset="100%" stopColor="#0A0B0F" />
        </linearGradient>
        <filter id="shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#090B0F" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* 1. Official Studio Wall Backdrop */}
      <rect width="400" height="500" rx="20" fill="url(#studio-bg)" />

      {/* 2. Client Shoulders & Corporate Black Blazer */}
      <g filter="url(#shadow-blur)">
        {/* Main shoulders frame */}
        <path
          d="M 40 500 L 70 415 C 95 365 135 360 165 360 L 235 360 C 265 360 305 365 330 415 L 360 500 Z"
          fill="url(#blazer-body)"
        />

        {/* Outer sharp lapel creases */}
        <path d="M 110 500 L 165 375 L 180 395 L 155 500 Z" fill="url(#blazer-lapel)" />
        <path d="M 290 500 L 235 375 L 220 395 L 245 500 Z" fill="url(#blazer-lapel)" />
      </g>

      {/* 3. Executive Sky-Blue Dress Shirt (Clean open collar) */}
      <path d="M 160 360 L 240 360 L 230 450 L 170 450 Z" fill="url(#shirt-blue)" />
      
      {/* Dynamic collar folds */}
      <path d="M 160 360 L 188 405 L 198 360 Z" fill="#93C5FD" stroke="#60A5FA" strokeWidth="0.8" />
      <path d="M 240 360 L 212 405 L 202 360 Z" fill="#93C5FD" stroke="#60A5FA" strokeWidth="0.8" />
      
      {/* Inner neckline shadows */}
      <path d="M 188 360 L 200 390 L 212 360 Z" fill="#2563EB" opacity="0.15" />

      {/* 4. Well-proportioned Neck */}
      <path d="M 170 305 C 180 325 220 325 230 305 L 226 368 M 174 368 Z" fill="#E6B28C" />
      <path d="M 170 305 Q 200 338 230 305 L 228 322 Q 200 345 172 322 Z" fill="url(#skin-shadow)" />

      {/* 5. Natural Ear Outlines */}
      <ellipse cx="140" cy="225" rx="10" ry="16" fill="#E6B28C" transform="rotate(-10 140 225)" />
      <ellipse cx="260" cy="225" rx="10" ry="16" fill="#E6B28C" transform="rotate(10 260 225)" />
      <ellipse cx="141" cy="225" rx="5" ry="10" fill="#CD946D" transform="rotate(-10 141 225)" />
      <ellipse cx="259" cy="225" rx="5" ry="10" fill="#CD946D" transform="rotate(10 259 225)" />

      {/* 6. Realistic Face & Chin Base Structure */}
      <path d="M 148 170 Q 200 140 252 170 Q 264 225 254 270 Q 200 315 146 270 Q 136 225 148 170 Z" fill="url(#skin)" />
      
      {/* 3D highlights & shadows on face skin contours */}
      <path d="M 154 180 Q 200 152 246 180 Q 254 220 246 255 Q 200 292 154 255 Q 146 220 154 180 Z" fill="#FFE2C9" opacity="0.25" />

      {/* 7. Eyes (Confident, Clean & Symmetry) */}
      {/* Left Eye */}
      <path d="M 166 212 Q 177 205 188 212 Q 177 219 166 212 Z" fill="#FFFFFF" stroke="#6B7280" strokeWidth="0.5" />
      <circle cx="177" cy="212" r="5" fill="#1C1E24" />
      <circle cx="175.5" cy="210.5" r="1.5" fill="#FFFFFF" />
      
      {/* Right Eye */}
      <path d="M 212 212 Q 223 205 234 212 Q 223 219 212 212 Z" fill="#FFFFFF" stroke="#6B7280" strokeWidth="0.5" />
      <circle cx="223" cy="212" r="5" fill="#1C1E24" />
      <circle cx="221.5" cy="210.5" r="1.5" fill="#FFFFFF" />

      {/* 8. Well-groomed Masculine Bold Eyebrows */}
      <path d="M 160 197 Q 177 186 193 199" stroke="#111317" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M 240 197 Q 223 186 207 199" stroke="#111317" strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* 9. Symmetric Defined Nose */}
      <path d="M 200 200 L 196 244 Q 196 250 200 250 Q 204 250 204 244 Z" fill="#CD946D" opacity="0.5" />
      <path d="M 194 246 Q 200 252 206 246" stroke="#9A613C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* 10. Perfectly Trimmed Dark Connected Mustache & Beard */}
      {/* Full handsome mustache covering top lip */}
      <path d="M 172 268 Q 186 258 200 262 Q 214 258 228 268 Q 214 274 200 271 Q 186 274 172 268 Z" fill="#13161C" />

      {/* Symmetrical dark styled beard running along face line, matching photo exactly */}
      <path
        d="M 144 235 L 149 268 C 156 302 185 315 200 315 C 215 315 244 302 251 268 L 256 235 Q 251 275 236 295 Q 200 310 164 295 Q 149 275 144 235 Z"
        fill="#13161C"
        opacity="0.9"
      />
      {/* Soul patch / chin tuft details */}
      <path d="M 189 281 Q 200 286 211 281 Q 200 293 189 281 Z" fill="#090B0F" />

      {/* Red lip outline under mustache */}
      <path d="M 188 274 Q 200 279 212 274" stroke="#D15B5B" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

      {/* 11. Thick Dark Combed Hair (Left side-swept parting matching image) */}
      {/* Main hair background volume */}
      <path
        d="M 136 210 C 130 160 144 105 198 94 C 256 80 276 125 270 175 C 266 193 258 190 252 170 C 244 145 220 130 196 135 C 170 140 152 165 145 198 C 143 207 137 213 136 210 Z"
        fill="url(#hair-gradient)"
      />
      {/* Individual smooth combed hair wave highlight lines */}
      <path d="M 140 175 Q 170 120 230 115" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M 148 150 Q 185 110 245 125" stroke="#4B5563" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.2" />
    </svg>
  );
}
