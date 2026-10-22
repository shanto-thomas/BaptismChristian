import React, { useState } from 'react';
import { BlessingEntry, BaptismDetails } from '../types/invitation';
import { celestialAudio } from '../utils/audio';
import { Heart, Sparkles, Send } from 'lucide-react';

interface BlessingsWallProps {
  blessings: BlessingEntry[];
  onAddBlessing: (entry: BlessingEntry) => void;
  details: BaptismDetails;
}

export const BlessingsWall: React.FC<BlessingsWallProps> = ({
  blessings,
  onAddBlessing,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [likesState, setLikesState] = useState<Record<string, number>>({});

  const handleLike = (id: string) => {
    celestialAudio.playSoftBell();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const newBlessing: BlessingEntry = {
      id: `bless-${Date.now()}`,
      author: author.trim(),
      relation: 'Family & Friends',
      message: message.trim(),
      date: 'Just now',
      likes: 1,
    };

    celestialAudio.playAngelChime();
    onAddBlessing(newBlessing);
    setAuthor('');
    setMessage('');
    setShowAddForm(false);
  };

  return (
    <section className="w-full max-w-xl mx-auto px-4 py-8">
      {/* Seamless Parchment Container */}
      <div className="relative bg-[#FAF4EA] rounded-2xl border border-[#DFCBB5] p-6 sm:p-8 text-stone-800 shadow-sm text-center">
        {/* Subtle corner flourishes */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-amber-600/50" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-amber-600/50" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-amber-600/50" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-amber-600/50" />

        <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-amber-900/80 mb-1">
          Angel Keepsake
        </p>
        <h3 className="font-serif italic text-2xl text-stone-900 mb-2">
          Prayers &amp; Blessings
        </h3>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-6 h-px bg-amber-300" />
          <Heart className="w-2.5 h-2.5 text-amber-700 fill-amber-600" />
          <span className="w-6 h-px bg-amber-300" />
        </div>

        <p className="text-xs text-stone-600 font-serif italic max-w-sm mx-auto mb-5 leading-relaxed">
          Leave a holy wish or Bible verse for baby Sera that John &amp; Ann will treasure forever.
        </p>

        {!showAddForm ? (
          <button
            onClick={() => {
              celestialAudio.playSoftBell();
              setShowAddForm(true);
            }}
            className="px-5 py-2.5 bg-[#FFFDF9] hover:bg-white text-stone-800 border border-[#DFCBB5] rounded-full font-cinzel text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Write a Blessing</span>
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="mb-6 text-left bg-white/70 p-4 rounded-xl border border-[#DFCBB5]">
            <div className="space-y-3">
              <div>
                <label className="block font-cinzel text-[10px] uppercase text-stone-600 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Uncle Mathew &amp; Family"
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DFCBB5] bg-white text-xs font-serif"
                />
              </div>
              <div>
                <label className="block font-cinzel text-[10px] uppercase text-stone-600 mb-1">
                  Your Blessing or Verse
                </label>
                <textarea
                  required
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="May God bless and keep little angel Sera..."
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DFCBB5] bg-white text-xs font-serif resize-none"
                />
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-stone-500 font-serif hover:text-stone-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#982846] text-white rounded-full font-cinzel text-[11px] tracking-wider uppercase hover:bg-[#85233c] cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Post Blessing</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Blessings List */}
        <div className="space-y-3 text-left">
          {blessings.map((b) => {
            const totalLikes = b.likes + (likesState[b.id] || 0);
            return (
              <div
                key={b.id}
                className="bg-[#FFFDF9]/90 rounded-xl p-3.5 border border-[#DFCBB5]/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-serif font-bold text-xs text-stone-900">
                      {b.author}
                    </span>
                    <span className="text-[10px] text-stone-600 font-serif">
                      {b.date}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 font-serif italic leading-relaxed">
                    &ldquo;{b.message}&rdquo;
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-[#DFCBB5]/40 flex items-center justify-end">
                  <button
                    onClick={() => handleLike(b.id)}
                    className="flex items-center gap-1 text-[11px] text-stone-600 hover:text-[#982846] transition-colors cursor-pointer"
                  >
                    <Heart className="w-3 h-3 fill-rose-100 text-rose-500" />
                    <span>{totalLikes}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
