import React, { useState } from 'react';
import { BaptismDetails } from '../types/invitation';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { celestialAudio } from '../utils/audio';
import { ContinuousRsvp } from './ContinuousRsvp';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Check,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

interface ContinuousInvitationProps {
  details: BaptismDetails;
  onAddRsvp: (rsvp: any) => void;
  onReopenLoader: () => void;
}

export const ContinuousInvitation: React.FC<ContinuousInvitationProps> = ({
  details,
  onAddRsvp,
  onReopenLoader,
}) => {
  const [copied, setCopied] = useState(false);
  const [showRsvpForm, setShowRsvpForm] = useState(false);

  const handleShare = async () => {
    celestialAudio.playSoftBell();
    const shareData = {
      title: `Baptism of ${details.childName}`,
      text: `You are cordially invited to celebrate the Holy Sacrament of Baptism for baby ${details.childName}, daughter of ${details.parentsFather} & ${details.parentsMother}.`,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownloadCard = () => {
    celestialAudio.playSoftBell();
    const link = document.createElement('a');
    link.href = '/assets/aistudio/image_9566ce3f.png';
    link.download = `Sera_John_Baptism_Invitation.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 1. Main Continuous Invitation Canvas (Matching exact attached poster style) */}
      <div className="relative w-full max-w-xl mx-auto shadow-2xl rounded-2xl overflow-hidden border border-[#E3D3C2] bg-[#FAF4EA]">
        
        {/* Subtle decorative inner hairline & floral gold corners */}
        <div className="relative">
          {/* Authentic High-Res Art Card from user attachment */}
          <div className="relative w-full overflow-hidden select-none">
            <img
              src="/assets/aistudio/image_9566ce3f.png"
              alt="Holy Sacrament of Baptism - Sera John"
              className="w-full h-auto block object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Parent Tribute Tag Floating Elegantly Over Artwork Top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#FFFDF8]/90 backdrop-blur-xs px-4 py-1 rounded-full border border-amber-300/60 shadow-xs flex items-center gap-1.5 whitespace-nowrap">
              <Heart className="w-3 h-3 text-[#982846] fill-[#982846]" />
              <span className="font-serif italic text-xs text-stone-800">
                Parents: {details.parentsFather} &amp; {details.parentsMother}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Seamless Continuous Ceremony & Celebration Section (Same parchment background) */}
        <div className="px-6 sm:px-8 py-8 bg-[#FAF4EA] border-t border-[#DFCBB5] text-center">
          
          <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-amber-900/80 mb-1">
            Celebration Details
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-amber-300" />
            <Heart className="w-2.5 h-2.5 text-amber-700 fill-amber-600" />
            <span className="w-8 h-px bg-amber-300" />
          </div>

          <h3 className="font-serif italic text-2xl text-stone-900 mb-2">
            Ceremony &amp; Luncheon
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 font-serif italic max-w-md mx-auto leading-relaxed mb-6">
            Following the baptism at St. Mary’s Church, Kottayam, please join John &amp; Ann for a traditional feast and fellowship.
          </p>

          {/* Continuous Schedule Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left mb-6">
            {/* Church Card */}
            <div className="bg-[#FFFDF9]/80 rounded-xl p-4 border border-[#DFCBB5]">
              <span className="font-cinzel text-[10px] uppercase tracking-wider text-amber-900 font-semibold block mb-1">
                Sacrament
              </span>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                {details.ceremonyChurch}
              </h4>
              <p className="text-xs text-stone-600 font-serif">
                Kottayam, Kerala
              </p>
              <p className="text-xs text-amber-900 font-serif mt-1 font-medium">
                Sunday, April 26 · 10:30 AM
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('St. Mary’s Church Kottayam')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-amber-800 hover:text-amber-900 underline mt-3"
              >
                <span>Google Maps Route</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Luncheon Card */}
            <div className="bg-[#FFFDF9]/80 rounded-xl p-4 border border-[#DFCBB5]">
              <span className="font-cinzel text-[10px] uppercase tracking-wider text-amber-900 font-semibold block mb-1">
                Fellowship
              </span>
              <h4 className="font-serif font-bold text-base text-stone-900 mb-1">
                {details.receptionVenue}
              </h4>
              <p className="text-xs text-stone-600 font-serif">
                Near St. Mary’s, Kottayam
              </p>
              <p className="text-xs text-amber-900 font-serif mt-1 font-medium">
                Luncheon · 12:30 PM Onwards
              </p>

              <span className="text-[11px] text-stone-500 font-serif italic block mt-3">
                Traditional luncheon &amp; fellowship
              </span>
            </div>
          </div>

          {/* Godparents & Sponsors */}
          <p className="text-xs font-serif text-stone-600 mb-6">
            Godparents &amp; Sponsors:{' '}
            <span className="font-medium text-stone-900">
              {details.godfather} &amp; {details.godmother}
            </span>
          </p>

          {/* Continuous Action Buttons (Styled in Burgundy & Gold) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => {
                celestialAudio.playSoftBell();
                setShowRsvpForm(!showRsvpForm);
              }}
              className="w-full sm:w-auto px-7 py-3 bg-[#982846] hover:bg-[#85233c] text-white rounded-full font-cinzel text-xs tracking-wider uppercase shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{showRsvpForm ? 'Close RSVP' : 'Kindly RSVP'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showRsvpForm ? 'rotate-180' : ''}`} />
            </button>

            <a
              href={getGoogleCalendarUrl(details)}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3 bg-[#FFFDF9] hover:bg-white text-stone-800 border border-[#DFCBB5] rounded-full font-cinzel text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              <span>Add to Calendar</span>
            </a>

            <button
              onClick={handleDownloadCard}
              className="w-full sm:w-auto px-4 py-3 bg-[#FFFDF9] hover:bg-white text-stone-700 border border-[#DFCBB5] rounded-full font-cinzel text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              title="Download invitation image for WhatsApp status"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Save Card</span>
            </button>
          </div>

          {/* Continuous RSVP Form Inline Expand */}
          {showRsvpForm && (
            <div className="mt-6 text-left animate-in fade-in zoom-in-95 duration-200">
              <ContinuousRsvp
                details={details}
                onAddRsvp={onAddRsvp}
                onClose={() => setShowRsvpForm(false)}
              />
            </div>
          )}

          {/* Share Link Row */}
          <div className="mt-8 pt-4 border-t border-[#DFCBB5] flex items-center justify-center gap-4 text-xs font-serif text-stone-600">
            <button
              onClick={handleShare}
              className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-amber-700" />}
              <span>{copied ? 'Link Copied!' : 'Share Invitation'}</span>
            </button>
            <span className="text-stone-300">·</span>
            <button
              onClick={onReopenLoader}
              className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Replay Angel Opening</span>
            </button>
          </div>

          <p className="font-serif italic text-xs text-stone-500 mt-4">
            &ldquo;May God bless and keep little angel Sera all the days of her life.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
