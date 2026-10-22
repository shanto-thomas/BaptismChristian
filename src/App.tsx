import React, { useState } from 'react';
import {
  BaptismDetails,
  INITIAL_BAPTISM_DETAILS,
} from './types/invitation';
import { InvitationSheet } from './components/InvitationSheet';
import { AngelOpeningLoader } from './components/AngelOpeningLoader';

const STORAGE_KEY_DETAILS = 'sera_baptism_details_v7';

export default function App() {
  const [details] = useState<BaptismDetails>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DETAILS);
      return saved ? JSON.parse(saved) : INITIAL_BAPTISM_DETAILS;
    } catch {
      return INITIAL_BAPTISM_DETAILS;
    }
  });

  const [isAngelLoaderOpen, setIsAngelLoaderOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-stone-800 flex flex-col items-center justify-center font-sans selection:bg-amber-100 selection:text-amber-900 relative">
      
      {/* Main Presentation: The Authentic Invitation Card */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-4 sm:py-8 px-2 sm:px-4">
        <InvitationSheet details={details} />
      </main>

      {/* Cute Angel Opening Loader (image_c98c4560.png) */}
      <AngelOpeningLoader
        isOpen={isAngelLoaderOpen}
        onComplete={() => setIsAngelLoaderOpen(false)}
        childName={details.childName}
      />
    </div>
  );
}
