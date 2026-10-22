import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AngelWaxSeal, AngelWingsFlourish } from './AngelIllustrations';
import { BaptismDetails } from '../types/invitation';
import { celestialAudio } from '../utils/audio';

interface EnvelopeModalProps {
  isOpen: boolean;
  onOpenCard: () => void;
  details: BaptismDetails;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({ isOpen, onOpenCard, details }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    setIsOpening(true);
    celestialAudio.playAngelChime();
    setTimeout(() => {
      onOpenCard();
      setIsOpening(false);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg"
        >
          {/* Outer Envelope Container */}
          <div className="relative bg-[#FAF6EE] rounded-2xl shadow-2xl overflow-hidden border border-amber-200/60 p-1">
            {/* Linen paper texture subtle grid & border */}
            <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EB] to-[#F5ECE0] rounded-xl p-8 sm:p-10 text-center border border-amber-100 shadow-inner flex flex-col items-center justify-between min-h-[460px]">
              
              {/* Top Envelope Flap Shadow Line */}
              <div className="w-full flex items-center justify-between border-b border-stone-200/80 pb-4 mb-2">
                <span className="text-xs uppercase tracking-widest text-stone-600 font-sans">
                  Holy Sacrament of Baptism
                </span>
                <span className="text-xs tracking-wider text-amber-700/80 font-serif italic">
                  Grace & Blessings
                </span>
              </div>

              {/* Heavenly Corner Accents */}
              <div className="my-auto flex flex-col items-center">
                {/* Wings flourish */}
                <AngelWingsFlourish className="w-32 h-7 opacity-85 mb-3" />

                <p className="text-xs font-sans tracking-widest uppercase text-stone-600 mb-1">
                  Joyfully Inviting You
                </p>

                <h1 className="text-4xl sm:text-5xl font-serif font-normal text-stone-800 tracking-tight mb-2">
                  {details.childName}
                </h1>

                <p className="font-script text-2xl text-amber-800/90 mb-3">
                  Sacrament of Holy Baptism
                </p>

                <div className="w-12 h-px bg-amber-300 my-2" />

                <p className="text-xs sm:text-sm text-stone-600 font-serif italic max-w-xs leading-relaxed">
                  Daughter of {details.parentsFather} &amp; {details.parentsMother}
                </p>

                {/* Wax Seal Placement */}
                <div className="mt-8 mb-4">
                  <AngelWaxSeal onClick={handleSealClick} isOpening={isOpening} />
                </div>

                <p className="text-[12px] text-stone-600 font-sans tracking-wide mt-3">
                  Tap the golden angel wax seal to unseal invitation
                </p>
              </div>

              {/* Bottom Envelope Footer */}
              <div className="w-full pt-4 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-600 font-sans">
                <span>St. Mary’s Angelic Chapel</span>
                <span>November 2026</span>
              </div>
            </div>
          </div>

          {/* Quick skip button */}
          <div className="text-center mt-4">
            <button
              onClick={onOpenCard}
              className="text-xs text-stone-200/90 hover:text-white underline underline-offset-4 tracking-wide font-sans transition-colors cursor-pointer"
            >
              Skip envelope &amp; view invitation directly →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
