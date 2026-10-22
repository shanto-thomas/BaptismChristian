import React, { useState, useEffect } from 'react';
import { BaptismDetails } from '../types/invitation';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';
import { celestialAudio } from '../utils/audio';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Share2,
  Printer,
  ChevronDown,
  Sparkles,
  Volume2,
  VolumeX,
  ExternalLink,
  Check,
  Download,
  Image as ImageIcon,
  Compass,
} from 'lucide-react';

interface InvitationCardProps {
  details: BaptismDetails;
  onScrollToRsvp: () => void;
  onReopenLoader: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  details,
  onScrollToRsvp,
  onReopenLoader,
}) => {
  const [copied, setCopied] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(celestialAudio.isMuted);
  const [viewMode, setViewMode] = useState<'poster' | 'details'>('poster');

  // Countdown calculations
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(`${details.ceremonyDate}T10:30:00`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, isPast: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [details.ceremonyDate]);

  // Formatted date string
  const formattedDate = (() => {
    try {
      const d = new Date(`${details.ceremonyDate}T10:30:00`);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return details.ceremonyDate;
    }
  })();

  const handleShare = async () => {
    celestialAudio.playSoftBell();
    const shareData = {
      title: `Baptism Invitation: ${details.childName}`,
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
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleToggleAudio = () => {
    celestialAudio.isMuted = !celestialAudio.isMuted;
    setIsAudioMuted(celestialAudio.isMuted);
    if (!celestialAudio.isMuted) {
      celestialAudio.playAngelChime();
    }
  };

  const handlePrint = () => {
    celestialAudio.playSoftBell();
    window.print();
  };

  const handleDownloadImage = () => {
    celestialAudio.playSoftBell();
    const link = document.createElement('a');
    link.href = '/assets/aistudio/image_9566ce3f.png';
    link.download = `Sera_John_Baptism_Invitation.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Top Utility Ribbon */}
      <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-stone-200 text-xs text-stone-600 font-sans">
        <div className="flex items-center gap-3">
          <button
            onClick={onReopenLoader}
            className="hover:text-amber-900 transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Angel Opening</span>
          </button>
          <span className="text-stone-300">·</span>
          <button
            onClick={handleToggleAudio}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {isAudioMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
            )}
            <span>{isAudioMuted ? 'Muted' : 'Angelic Harmony'}</span>
          </button>
        </div>

        {/* View Switcher: Pinterest Poster vs Full Interactive Details */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/80">
          <button
            onClick={() => {
              celestialAudio.playSoftBell();
              setViewMode('poster');
            }}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'poster'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-700" />
            <span>Pinterest Card</span>
          </button>
          <button
            onClick={() => {
              celestialAudio.playSoftBell();
              setViewMode('details');
            }}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'details'
                ? 'bg-white text-stone-900 shadow-2xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>Event &amp; Venue Details</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadImage}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Download high-resolution Pinterest invitation image"
          >
            <Download className="w-3.5 h-3.5 text-amber-700" />
            <span>Save Image</span>
          </button>
          <span className="text-stone-300">·</span>
          <button
            onClick={handleShare}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
          <span className="text-stone-300">·</span>
          <button
            onClick={handlePrint}
            className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Pinterest Visual Card */}
      {viewMode === 'poster' && (
        <div className="flex flex-col items-center">
          <div className="relative max-w-lg w-full bg-[#FAF5EE] rounded-3xl shadow-2xl border border-amber-200/80 p-2 sm:p-3 overflow-hidden transition-all duration-300">
            {/* The Pinterest Artwork Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-amber-100">
              <img
                src="/assets/aistudio/image_9566ce3f.png"
                alt="Baptism Invitation of Sera John"
                className="w-full h-auto object-cover select-none"
                referrerPolicy="no-referrer"
              />

              {/* Parents Tribute Ribbon Overlay */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#FFFDF8]/95 backdrop-blur-xs px-4 py-1 rounded-full border border-amber-200/70 shadow-xs flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-amber-700 fill-amber-700/60" />
                <span className="text-[11px] font-serif text-stone-700 tracking-wide">
                  Parents: {details.parentsFather} &amp; {details.parentsMother}
                </span>
              </div>
            </div>

            {/* Quick Floating Action Bar under the card */}
            <div className="no-print mt-3 p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-amber-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-600 font-sans">
                <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span>St. Mary’s Church, Kottayam · 10:30 AM</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onScrollToRsvp}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium transition-colors cursor-pointer"
                >
                  RSVP Now
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${details.ceremonyChurch} ${details.ceremonyAddress}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          <p className="no-print text-xs text-stone-500 font-serif italic mt-4 text-center">
            Designed with sweet angelic grace for Sera John · Tap &ldquo;Event &amp; Venue Details&rdquo; above for schedule &amp; directions
          </p>
        </div>
      )}

      {/* VIEW 2: Interactive Typography & Venue Schedule Card */}
      {viewMode === 'details' && (
        <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5ECE0] rounded-3xl shadow-xl border border-amber-200/90 overflow-hidden p-4 sm:p-10 transition-all duration-300">
          
          {/* Subtle Corner Filigrees */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-300/70" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-300/70" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-300/70" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-300/70" />

          {/* Double Frame Canvas */}
          <div className="bg-white/70 backdrop-blur-xs rounded-2xl border border-amber-100 p-6 sm:p-12 text-center">
            
            {/* Header */}
            <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-stone-600 mb-2 font-medium">
              A Blessed Beginning
            </p>
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-8 h-px bg-amber-300" />
              <Heart className="w-2.5 h-2.5 text-amber-700 fill-amber-600" />
              <span className="w-8 h-px bg-amber-300" />
            </div>

            {/* Sacred Title */}
            <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-stone-600 font-semibold mb-1">
              The Holy Sacrament Of
            </p>

            <h2 className="font-serif italic text-4xl sm:text-5xl text-[#B45309] my-2">
              Baptism
            </h2>

            <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.25em] uppercase text-stone-600 font-semibold mt-2 mb-1">
              Of Our Beloved Daughter
            </p>

            {/* Child's Name in Calligraphy Magenta-Wine */}
            <h1 className="font-alex text-6xl sm:text-7xl text-[#9A354C] my-2 drop-shadow-xs">
              {details.childName}
            </h1>

            {/* Parents Notice */}
            <p className="text-sm sm:text-base font-serif text-stone-700 mt-1">
              Joyfully presented by parents{' '}
              <span className="font-semibold text-stone-900">
                {details.parentsFather} &amp; {details.parentsMother}
              </span>
            </p>

            {/* Godparents */}
            {(details.godfather || details.godmother) && (
              <p className="text-xs text-stone-500 font-sans mt-2">
                Godparents &amp; Sponsors:{' '}
                <span className="font-medium text-stone-700">
                  {details.godfather} &amp; {details.godmother}
                </span>
              </p>
            )}

            <div className="w-12 h-px bg-amber-300 mx-auto my-6" />

            {/* Invitation Prose */}
            <p className="font-serif italic text-base sm:text-lg text-stone-700 max-w-lg mx-auto leading-relaxed mb-8">
              &ldquo;With hearts full of joy and gratitude, we invite you to celebrate this blessed day as our little angel receives God&apos;s grace.&rdquo;
            </p>

            {/* Schedule Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left mb-8">
              
              {/* Church Ceremony */}
              <div className="bg-white/90 p-6 rounded-2xl border border-amber-200/60 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-cinzel text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Ceremony
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans">Holy Mass</span>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                    {details.ceremonyChurch}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-stone-600 font-sans">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>{details.ceremonyTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                      <span>{details.ceremonyAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="no-print mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${details.ceremonyChurch} ${details.ceremonyAddress}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-amber-800 hover:text-amber-900 flex items-center gap-1 underline underline-offset-2"
                  >
                    <span>Get Directions (Kottayam)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Reception / Fellowship */}
              {details.hasReception && (
                <div className="bg-white/90 p-6 rounded-2xl border border-amber-200/60 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-cinzel text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                        Reception
                      </span>
                      <span className="text-[11px] text-stone-500 font-sans">Luncheon</span>
                    </div>

                    <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2">
                      {details.receptionVenue}
                    </h3>

                    <div className="space-y-2 text-xs sm:text-sm text-stone-600 font-sans">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>{formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>{details.receptionTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                        <span>{details.receptionAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div className="no-print mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500 font-serif italic">
                      Traditional fellowship &amp; feast
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Countdown */}
            {!timeLeft.isPast && (
              <div className="no-print my-6 py-4 px-4 max-w-sm mx-auto bg-stone-50 rounded-xl border border-stone-200/80">
                <p className="font-cinzel text-[11px] uppercase tracking-widest text-stone-500 mb-2 font-medium">
                  Counting Down to Sunday
                </p>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="p-1">
                    <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {timeLeft.days}
                    </div>
                    <div className="text-[10px] uppercase text-stone-500 font-sans">Days</div>
                  </div>
                  <div className="p-1">
                    <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {timeLeft.hours}
                    </div>
                    <div className="text-[10px] uppercase text-stone-500 font-sans">Hours</div>
                  </div>
                  <div className="p-1">
                    <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {timeLeft.minutes}
                    </div>
                    <div className="text-[10px] uppercase text-stone-500 font-sans">Mins</div>
                  </div>
                  <div className="p-1">
                    <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                      {timeLeft.seconds}
                    </div>
                    <div className="text-[10px] uppercase text-stone-500 font-sans">Secs</div>
                  </div>
                </div>
              </div>
            )}

            {/* Scripture Verse at bottom */}
            <div className="mt-8 pt-6 border-t border-amber-200/60 max-w-md mx-auto">
              <blockquote className="font-serif italic text-sm text-stone-700">
                &ldquo;{details.scriptureVerse}&rdquo;
              </blockquote>
              <p className="font-cinzel text-xs tracking-widest uppercase text-amber-800 font-semibold mt-1">
                — {details.scriptureReference}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action CTA buttons for all views */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <button
          onClick={onScrollToRsvp}
          className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs sm:text-sm font-medium tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>RSVP For Ceremony &amp; Feast</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="w-full sm:w-auto flex items-center gap-2">
          <a
            href={getGoogleCalendarUrl(details)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-initial px-5 py-3.5 bg-white hover:bg-stone-50 text-stone-800 rounded-xl text-xs sm:text-sm font-medium border border-stone-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Google Calendar</span>
          </a>

          <button
            onClick={() => {
              celestialAudio.playSoftBell();
              downloadIcsFile(details);
            }}
            className="px-4 py-3.5 bg-white hover:bg-stone-50 text-stone-700 rounded-xl text-xs sm:text-sm font-medium border border-stone-300 transition-colors cursor-pointer shadow-2xs"
            title="Download .ics file for Apple Calendar or Outlook"
          >
            <span>.ICS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
