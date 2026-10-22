import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { celestialAudio } from '../utils/audio';

interface AngelOpeningLoaderProps {
  isOpen: boolean;
  onComplete: () => void;
  childName: string;
}

export const AngelOpeningLoader: React.FC<AngelOpeningLoaderProps> = ({
  isOpen,
  onComplete,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    celestialAudio.playAngelChime();
    setTimeout(() => {
      onComplete();
      setIsOpening(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#FAF5EE] overflow-hidden"
      >
        {/* Soft Parchment Background with ambient warmth */}
        <div className="absolute inset-0 bg-radial from-[#FFFDF8] via-[#FAF5EE] to-[#EFE2D2] pointer-events-none" />
        <div className="absolute w-[450px] h-[450px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

        {/* The Exact User-Provided Loader Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-[#DFCBB5] bg-[#FAF5EE] cursor-pointer group"
          onClick={handleOpenInvitation}
        >
          {/* Authentic High-Res Loader Artwork */}
          <div className="relative w-full select-none">
            <img
              src="/assets/aistudio/image_c98c4560.png"
              alt="Sera John - Angel Baptism Opening"
              className="w-full h-auto block select-none pointer-events-none"
              referrerPolicy="no-referrer"
            />

            {/* Clickable Interactive Area directly over the OPEN INVITATION button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInvitation();
              }}
              className="absolute left-1/2 -translate-x-1/2 top-[79%] w-[54%] h-[8%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 group-hover:shadow-lg transition-all flex items-center justify-center"
              aria-label="Open Invitation"
            >
              {/* Subtle shimmer effect on hover */}
              <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/15 transition-colors" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
