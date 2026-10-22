import React from 'react';

export const CuteBabyAngel: React.FC<{ className?: string }> = ({ className = 'w-40 h-40' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none"
      >
        <defs>
          {/* Radial Halo Glow */}
          <radialGradient id="haloRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#FEF08A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
          </radialGradient>

          {/* Golden Halo Gradient */}
          <linearGradient id="goldHalo" x1="60" y1="25" x2="180" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.4" stopColor="#EAB308" />
            <stop offset="1" stopColor="#CA8A04" />
          </linearGradient>

          {/* Soft Wings Gradient */}
          <linearGradient id="wingGradL" x1="40" y1="60" x2="110" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.75" stopColor="#FAF4EA" />
            <stop offset="1" stopColor="#EAE0D2" />
          </linearGradient>
          <linearGradient id="wingGradR" x1="200" y1="60" x2="130" y2="150" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.75" stopColor="#FAF4EA" />
            <stop offset="1" stopColor="#EAE0D2" />
          </linearGradient>

          {/* Soft Fluffy Cloud Base Gradient */}
          <linearGradient id="cloudGradBase" x1="120" y1="165" x2="120" y2="230" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#FBF7F0" />
            <stop offset="1" stopColor="#EADCCB" />
          </linearGradient>

          {/* Cheeks blush */}
          <radialGradient id="blushPink" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Halo Glow */}
        <circle cx="120" cy="50" r="45" fill="url(#haloRadial)" />

        {/* Left Fluffy Feathered Angel Wing */}
        <g className="transition-transform duration-700 ease-in-out hover:-rotate-2 origin-bottom-right">
          {/* Main Wing Body */}
          <path
            d="M 95 120 C 65 105 32 75 35 42 C 48 50 62 65 65 80 C 58 62 48 40 70 28 C 82 45 85 70 82 85 C 85 62 82 45 98 32 C 108 52 108 85 102 110 C 105 118 100 122 95 120 Z"
            fill="url(#wingGradL)"
            stroke="#D6C7B2"
            strokeWidth="1.2"
          />
          {/* Wing Feathers Details */}
          <path d="M 60 62 C 70 75 80 95 85 115" stroke="#DFD4C5" strokeWidth="1" strokeLinecap="round" />
          <path d="M 75 42 C 84 62 92 88 95 105" stroke="#DFD4C5" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Right Fluffy Feathered Angel Wing */}
        <g className="transition-transform duration-700 ease-in-out hover:rotate-2 origin-bottom-left">
          {/* Main Wing Body */}
          <path
            d="M 145 120 C 175 105 208 75 205 42 C 192 50 178 65 175 80 C 182 62 192 40 170 28 C 158 45 155 70 158 85 C 155 62 158 45 142 32 C 132 52 132 85 138 110 C 135 118 140 122 145 120 Z"
            fill="url(#wingGradR)"
            stroke="#D6C7B2"
            strokeWidth="1.2"
          />
          {/* Wing Feathers Details */}
          <path d="M 180 62 C 170 75 160 95 155 115" stroke="#DFD4C5" strokeWidth="1" strokeLinecap="round" />
          <path d="M 165 42 C 156 62 148 88 145 105" stroke="#DFD4C5" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Floating Golden Halo Ring */}
        <ellipse
          cx="120"
          cy="46"
          rx="32"
          ry="9"
          fill="none"
          stroke="url(#goldHalo)"
          strokeWidth="3.2"
          transform="rotate(-3 120 46)"
        />
        {/* Halo sparkle highlight */}
        <ellipse cx="102" cy="44" rx="8" ry="2" fill="#FEF9C3" opacity="0.9" transform="rotate(-3 102 44)" />

        {/* Baby Angel Robe / Little Gown */}
        <path
          d="M 94 130 C 90 152 92 180 102 192 C 112 198 128 198 138 192 C 148 180 150 152 146 130 C 135 135 105 135 94 130 Z"
          fill="#FFFFFF"
          stroke="#DFD3C3"
          strokeWidth="1.2"
        />
        {/* Gold Ribbon / Sash around waist */}
        <path d="M 98 152 C 110 156 130 156 142 152" stroke="#EAB308" strokeWidth="1.6" strokeLinecap="round" />

        {/* Cute Baby Praying Hands */}
        <ellipse cx="114" cy="144" rx="5" ry="6" fill="#FFE5D9" transform="rotate(-15 114 144)" />
        <ellipse cx="126" cy="144" rx="5" ry="6" fill="#FFE5D9" transform="rotate(15 126 144)" />
        {/* Tiny golden cross in hands */}
        <path d="M 120 136 L 120 150 M 115 140 L 125 140" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" />

        {/* Baby Head */}
        <circle cx="120" cy="100" r="26" fill="#FFE8DE" stroke="#F3D5C8" strokeWidth="1" />

        {/* Soft Brown Baby Hair with adorable curls */}
        <path
          d="M 98 94 C 100 80 118 78 126 83 C 132 79 144 82 142 94 C 138 85 130 84 126 88 C 120 84 108 85 98 94 Z"
          fill="#94623C"
        />
        {/* Sweet baby curl on forehead */}
        <path d="M 118 85 C 122 81 125 83 124 88" stroke="#7A4C2A" strokeWidth="1.4" strokeLinecap="round" fill="none" />

        {/* Cute Baby Cheeks (Rosy Blush) */}
        <circle cx="104" cy="105" r="7" fill="url(#blushPink)" />
        <circle cx="136" cy="105" r="7" fill="url(#blushPink)" />

        {/* Sweet Sleeping Closed Eyelashes (Happy/Peaceful) */}
        <path
          d="M 107 98 C 110 102 115 102 118 98"
          stroke="#6B4931"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 122 98 C 125 102 130 102 133 98"
          stroke="#6B4931"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Tiny Button Nose */}
        <circle cx="120" cy="103" r="1" fill="#D39F88" />

        {/* Sweet Baby Smile */}
        <path
          d="M 116 109 C 118 112 122 112 124 109"
          stroke="#A85751"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Soft Fluffy Clouds Underneath */}
        <path
          d="M 52 185 C 40 185 32 195 36 206 C 32 215 38 225 50 225 C 53 233 64 238 75 237 C 86 241 102 238 110 232 C 120 240 140 240 150 232 C 158 238 174 241 185 237 C 196 238 207 233 210 225 C 222 225 228 215 224 206 C 228 195 220 185 208 185 C 200 177 188 179 181 185 C 171 177 155 176 147 185 C 139 177 123 177 115 185 C 107 177 91 176 81 184 C 74 179 62 177 52 185 Z"
          fill="url(#cloudGradBase)"
          stroke="#DFD1BD"
          strokeWidth="1"
        />

        {/* Tiny Floating Golden Stars */}
        <g transform="translate(56, 95)">
          <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#EAB308" opacity="0.85" />
        </g>
        <g transform="translate(186, 92)">
          <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill="#EAB308" opacity="0.85" />
        </g>
        <circle cx="78" cy="48" r="2" fill="#FDE047" opacity="0.9" />
        <circle cx="162" cy="45" r="2.5" fill="#FDE047" opacity="0.9" />
      </svg>
    </div>
  );
};
