import React from 'react';
import { BaptismDetails } from '../types/invitation';
import { Heart } from 'lucide-react';

interface InvitationSheetProps {
  details: BaptismDetails;
}

export const InvitationSheet: React.FC<InvitationSheetProps> = ({ details }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* The Authentic Digital Invitation Card */}
      <div className="relative w-full max-w-lg mx-auto shadow-2xl rounded-2xl overflow-hidden border border-[#DFCBB5] bg-[#FAF5EE]">
        <div className="relative w-full select-none">
          <img
            src="/assets/aistudio/image_9566ce3f.png"
            alt="Holy Sacrament of Baptism - Sera John"
            className="w-full h-auto block object-cover select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Discreet Parent Tribute Badge */}
          <div className="absolute top-3.5 left-1/2 -translate-x-1/2 bg-[#FFFDF8]/95 backdrop-blur-xs px-4 py-1 rounded-full border border-amber-300/60 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
            <Heart className="w-3 h-3 text-[#982846] fill-[#982846]" />
            <span className="font-serif italic text-xs text-stone-800">
              Parents: {details.parentsFather} &amp; {details.parentsMother}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
