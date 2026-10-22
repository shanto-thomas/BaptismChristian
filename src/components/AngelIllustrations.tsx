import React from 'react';

// 1. Cute Baby Angel Girl Illustration (Sleeping gracefully on fluffy clouds with halo & feathery wings)
export const BabyAngelArt: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="cloudGrad" x1="160" y1="200" x2="160" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.6" stopColor="#F9F6F0" />
            <stop offset="1" stopColor="#EFE8DE" />
          </linearGradient>

          <linearGradient id="haloGrad" x1="100" y1="50" x2="220" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.5" stopColor="#EAB308" />
            <stop offset="1" stopColor="#CA8A04" />
          </linearGradient>

          <linearGradient id="wingGradLeft" x1="50" y1="80" x2="150" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#FBF7EE" />
            <stop offset="1" stopColor="#EADCCB" />
          </linearGradient>

          <linearGradient id="wingGradRight" x1="270" y1="80" x2="170" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="0.7" stopColor="#FBF7EE" />
            <stop offset="1" stopColor="#EADCCB" />
          </linearGradient>

          <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#FEF9C3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FEF9C3" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="robeGrad" x1="160" y1="160" x2="160" y2="245" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F7ECE1" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Halo Glow Backdrop */}
        <circle cx="160" cy="80" r="48" fill="url(#haloGlow)" />

        {/* Left Angel Wing */}
        <g className="transition-transform duration-700 ease-in-out hover:-rotate-1 origin-bottom-right">
          <path
            d="M 125 150 C 95 130 55 90 60 45 C 75 55 90 75 92 90 C 85 70 70 40 100 25 C 115 45 118 70 115 85 C 115 60 110 35 130 20 C 145 40 142 80 135 110 C 140 125 135 140 125 150 Z"
            fill="url(#wingGradLeft)"
            stroke="#D6CEBE"
            strokeWidth="1.2"
          />
          {/* Wing Feather Accents */}
          <path d="M 85 75 C 95 85 110 110 115 135" stroke="#E5DEC9" strokeWidth="1" strokeLinecap="round" />
          <path d="M 105 50 C 115 75 125 105 128 128" stroke="#E5DEC9" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Right Angel Wing */}
        <g className="transition-transform duration-700 ease-in-out hover:rotate-1 origin-bottom-left">
          <path
            d="M 195 150 C 225 130 265 90 260 45 C 245 55 230 75 228 90 C 235 70 250 40 220 25 C 205 45 202 70 205 85 C 205 60 210 35 190 20 C 175 40 178 80 185 110 C 180 125 185 140 195 150 Z"
            fill="url(#wingGradRight)"
            stroke="#D6CEBE"
            strokeWidth="1.2"
          />
          {/* Wing Feather Accents */}
          <path d="M 235 75 C 225 85 210 110 205 135" stroke="#E5DEC9" strokeWidth="1" strokeLinecap="round" />
          <path d="M 215 50 C 205 75 195 105 192 128" stroke="#E5DEC9" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* Golden Floating Halo with gentle tilt */}
        <ellipse
          cx="160"
          cy="74"
          rx="38"
          ry="11"
          fill="none"
          stroke="url(#haloGrad)"
          strokeWidth="3.5"
          filter="url(#softGlow)"
          transform="rotate(-4 160 74)"
        />
        {/* Halo sparkle highlight */}
        <ellipse cx="140" cy="72" rx="10" ry="2.5" fill="#FEF08A" opacity="0.8" transform="rotate(-4 140 72)" />

        {/* Baby Angel Robe / Swaddle Blanket */}
        <path
          d="M 125 160 C 120 185 120 225 135 240 C 150 248 170 248 185 240 C 200 225 200 185 195 160 C 180 166 140 166 125 160 Z"
          fill="url(#robeGrad)"
          stroke="#E6DACD"
          strokeWidth="1.2"
        />

        {/* Robe Collar / Golden Lace detail */}
        <path
          d="M 132 165 C 145 174 175 174 188 165"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />

        {/* Baby Little Hands Holding Tiny Gold Cross */}
        <ellipse cx="152" cy="190" rx="6" ry="5" fill="#FFE5D9" />
        <ellipse cx="168" cy="190" rx="6" ry="5" fill="#FFE5D9" />
        {/* Tiny golden cross in baby hands */}
        <path d="M 160 178 L 160 200 M 153 184 L 167 184" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />

        {/* Baby Head */}
        <circle cx="160" cy="128" r="32" fill="#FFE8DF" stroke="#F0D5C9" strokeWidth="1" />

        {/* Soft Baby Hair with gentle curl */}
        <path
          d="M 134 118 C 138 100 160 98 168 104 C 176 100 188 104 186 118 C 182 108 174 105 168 110 C 160 104 145 106 134 118 Z"
          fill="#CCA47C"
        />
        {/* Little Baby Curl on Forehead */}
        <path
          d="M 158 106 C 162 102 166 104 165 110"
          fill="none"
          stroke="#B3895D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Sleeping Peaceful Closed Eyes with long baby eyelashes */}
        <path
          d="M 143 128 C 147 132 153 132 157 128"
          fill="none"
          stroke="#785B49"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 163 128 C 167 132 173 132 177 128"
          fill="none"
          stroke="#785B49"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Cute Baby Cheeks (Rosy Blush) */}
        <circle cx="140" cy="134" r="8" fill="url(#cheekGlow)" />
        <circle cx="180" cy="134" r="8" fill="url(#cheekGlow)" />

        {/* Tiny Button Nose */}
        <path d="M 159 133 C 160 134 161 134 162 133" stroke="#D19E87" strokeWidth="1.4" strokeLinecap="round" />

        {/* Sweet Little Baby Smile */}
        <path
          d="M 155 139 C 158 143 162 143 165 139"
          fill="none"
          stroke="#A85751"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Soft Dreamy Clouds underneath Baby Angel */}
        <g className="filter drop-shadow-sm">
          {/* Cloud Base */}
          <path
            d="M 65 245 C 50 245 40 258 45 272 C 40 282 48 295 62 295 C 65 305 78 312 92 310 C 105 315 125 312 135 305 C 148 314 172 314 185 305 C 195 312 215 315 228 310 C 242 312 255 305 258 295 C 272 295 280 282 275 272 C 280 258 270 245 255 245 C 245 235 230 238 222 245 C 210 236 190 235 180 245 C 170 236 150 236 140 245 C 130 236 110 235 98 245 C 90 238 75 235 65 245 Z"
            fill="url(#cloudGrad)"
            stroke="#E7DEC8"
            strokeWidth="1"
          />
        </g>

        {/* Tiny Golden Sparkles & Floating Stars */}
        {/* Star 1 */}
        <g transform="translate(68, 120)">
          <path
            d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
            fill="#EAB308"
            opacity="0.8"
          />
        </g>
        {/* Star 2 */}
        <g transform="translate(252, 115)">
          <path
            d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z"
            fill="#EAB308"
            opacity="0.75"
          />
        </g>
        {/* Star 3 */}
        <g transform="translate(95, 60)">
          <circle cx="0" cy="0" r="2" fill="#FDE047" opacity="0.9" />
        </g>
        {/* Star 4 */}
        <g transform="translate(225, 55)">
          <circle cx="0" cy="0" r="2.5" fill="#FDE047" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

// 2. Baptism Cross with Olive Laurel and Flying Dove
export const BaptismCrossArt: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="goldCrossGrad" x1="60" y1="15" x2="60" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.4" stopColor="#D97706" />
            <stop offset="0.7" stopColor="#FBBF24" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="doveGrad" x1="60" y1="20" x2="75" y2="45" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F3E8DF" />
          </linearGradient>
        </defs>

        {/* Delicate Golden Cross */}
        {/* Vertical Beam */}
        <rect x="57" y="16" width="6" height="88" rx="2" fill="url(#goldCrossGrad)" stroke="#B45309" strokeWidth="0.6" />
        {/* Horizontal Beam */}
        <rect x="36" y="38" width="48" height="6" rx="2" fill="url(#goldCrossGrad)" stroke="#B45309" strokeWidth="0.6" />

        {/* Cross End Finials (Trefoil style) */}
        <circle cx="60" cy="16" r="3" fill="#FBBF24" />
        <circle cx="60" cy="104" r="3" fill="#FBBF24" />
        <circle cx="36" cy="41" r="3" fill="#FBBF24" />
        <circle cx="84" cy="41" r="3" fill="#FBBF24" />

        {/* Center Radiant Diamond */}
        <path d="M 60 36 L 65 41 L 60 46 L 55 41 Z" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.8" />

        {/* Olive Branch Wreath around cross */}
        <path
          d="M 38 65 C 38 78 50 88 60 88 C 70 88 82 78 82 65"
          fill="none"
          stroke="#84A98C"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Leaves Left */}
        <ellipse cx="40" cy="72" rx="3.5" ry="2" fill="#A3B18A" transform="rotate(-30 40 72)" />
        <ellipse cx="46" cy="80" rx="3.5" ry="2" fill="#A3B18A" transform="rotate(-15 46 80)" />
        <ellipse cx="54" cy="86" rx="3.5" ry="2" fill="#A3B18A" transform="rotate(10 54 86)" />

        {/* Leaves Right */}
        <ellipse cx="80" cy="72" rx="3.5" ry="2" fill="#A3B18A" transform="rotate(30 80 72)" />
        <ellipse cx="74" cy="80" rx="3.5" ry="2" fill="#A3B18A" transform="rotate(15 74 80)" />
        <ellipse cx="66" cy="86" rx="3.5" ry="2" fill="#A3B18A" transform="rotate(-10 66 86)" />

        {/* Holy Dove flying top right */}
        <g transform="translate(68, 14)">
          <path
            d="M 0 10 C 6 6 14 0 20 4 C 18 10 14 14 8 13 C 12 16 16 18 14 22 C 10 20 6 16 4 14 C 0 16 -2 14 0 10 Z"
            fill="url(#doveGrad)"
            stroke="#D6CEBE"
            strokeWidth="0.8"
          />
          {/* Olive Leaf in beak */}
          <path d="M 0 10 L -4 11" stroke="#588157" strokeWidth="1" strokeLinecap="round" />
          <ellipse cx="-5" cy="11" rx="2" ry="1" fill="#84A98C" />
        </g>
      </svg>
    </div>
  );
};

// 3. Storybook Church Chapel Art
export const ChurchChapelArt: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="churchRoof" x1="70" y1="35" x2="70" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9A7B68" />
            <stop offset="1" stopColor="#785945" />
          </linearGradient>
          <linearGradient id="churchWall" x1="70" y1="70" x2="70" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBF7F0" />
            <stop offset="1" stopColor="#E8DFD3" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="70" y1="85" x2="70" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#93C5FD" />
            <stop offset="0.5" stopColor="#FBCFE8" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
        </defs>

        {/* Cross on top of Spire */}
        <path d="M 70 12 L 70 24 M 66 16 L 74 16" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />

        {/* Bell Spire Roof */}
        <polygon points="70,24 60,50 80,50" fill="url(#churchRoof)" stroke="#654A37" strokeWidth="0.8" />
        {/* Bell Tower Body with arch bell opening */}
        <rect x="63" y="50" width="14" height="18" fill="#F4EDE4" stroke="#D1C4B5" strokeWidth="0.8" />
        <path d="M 67 62 C 67 56 73 56 73 62 Z" fill="#44372D" />
        <circle cx="70" cy="59" r="1.5" fill="#F59E0B" />

        {/* Main Chapel Roof */}
        <polygon points="70,68 35,92 105,92" fill="url(#churchRoof)" stroke="#654A37" strokeWidth="0.8" />

        {/* Main Chapel Wall */}
        <rect x="42" y="92" width="56" height="36" fill="url(#churchWall)" stroke="#D6CABB" strokeWidth="0.8" />

        {/* Arched Wooden Door */}
        <path d="M 64 128 L 64 108 C 64 103 76 103 76 108 L 76 128 Z" fill="#855B3E" stroke="#5E3F29" strokeWidth="0.8" />
        <circle cx="73" cy="118" r="1" fill="#F59E0B" />

        {/* Left Stained Glass Arch Window */}
        <path d="M 48 116 L 48 103 C 48 100 54 100 54 103 L 54 116 Z" fill="url(#glassGrad)" stroke="#B3A393" strokeWidth="0.6" />
        {/* Right Stained Glass Arch Window */}
        <path d="M 86 116 L 86 103 C 86 100 92 100 92 103 L 92 116 Z" fill="url(#glassGrad)" stroke="#B3A393" strokeWidth="0.6" />

        {/* Flowering bushes */}
        <circle cx="34" cy="126" r="6" fill="#84A98C" />
        <circle cx="39" cy="128" r="5" fill="#A3B18A" />
        <circle cx="36" cy="123" r="2" fill="#F472B6" />

        <circle cx="106" cy="126" r="6" fill="#84A98C" />
        <circle cx="101" cy="128" r="5" fill="#A3B18A" />
        <circle cx="104" cy="123" r="2" fill="#F472B6" />

        {/* Soft ground line */}
        <path d="M 20 128 L 120 128" stroke="#D6CEBE" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// 4. Angel Wings Flourish Divider
export const AngelWingsFlourish: React.FC<{ className?: string }> = ({ className = 'w-36 h-8' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 180 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Left Wing Flourish */}
        <path
          d="M 90 15 C 80 15 65 5 45 8 C 25 11 10 22 5 24 C 18 20 32 18 45 19 C 30 23 20 28 15 29 C 35 25 60 21 82 17"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Right Wing Flourish */}
        <path
          d="M 90 15 C 100 15 115 5 135 8 C 155 11 170 22 175 24 C 162 20 148 18 135 19 C 150 23 160 28 165 29 C 145 25 120 21 98 17"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Center Cross / Sparkle */}
        <path d="M 90 8 L 90 22 M 83 15 L 97 15" stroke="#C59B27" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="90" cy="15" r="2" fill="#EAB308" />
      </svg>
    </div>
  );
};

// 5. Embossed Gold Wax Seal with Angel Wings & "SJ" monogram
export const AngelWaxSeal: React.FC<{ onClick?: () => void; isOpening?: boolean }> = ({ onClick, isOpening }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`group relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all duration-500 transform hover:scale-105 active:scale-95 ${
        isOpening ? 'scale-110 opacity-70 rotate-12' : ''
      }`}
      title="Click to break seal & open invitation"
      aria-label="Open digital baptism invitation"
    >
      {/* Outer Wax Droplet irregular silhouette */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-lg shadow-amber-900/25 border border-amber-200/50" />

      {/* Wax Rim Texture */}
      <div className="absolute inset-1.5 rounded-full border-2 border-dashed border-amber-300/40 opacity-75" />

      {/* Inner Pressed Seal Circle */}
      <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex flex-col items-center justify-center shadow-inner text-amber-100">
        <svg viewBox="0 0 60 60" fill="none" className="w-10 h-10 drop-shadow">
          {/* Tiny Angel Wings */}
          <path
            d="M 30 22 C 24 16 14 18 8 26 C 14 24 20 25 26 27 Z"
            fill="#FEF3C7"
            opacity="0.9"
          />
          <path
            d="M 30 22 C 36 16 46 18 52 26 C 46 24 40 25 34 27 Z"
            fill="#FEF3C7"
            opacity="0.9"
          />
          {/* Little Cross */}
          <path d="M 30 16 L 30 25 M 26 20 L 34 20" stroke="#FEF3C7" strokeWidth="1.5" strokeLinecap="round" />
          {/* Monogram "SJ" for Sera John */}
          <text
            x="30"
            y="42"
            textAnchor="middle"
            fill="#FFFBEB"
            fontSize="14"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontWeight="bold"
            letterSpacing="2"
          >
            SJ
          </text>
        </svg>
      </div>

      {/* Floating Sparkle Tooltip */}
      <span className="absolute -bottom-8 whitespace-nowrap text-[11px] font-medium tracking-wider uppercase text-amber-800 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-amber-200 shadow-sm transition-opacity group-hover:opacity-100 opacity-90">
        Tap to Open
      </span>
    </button>
  );
};
