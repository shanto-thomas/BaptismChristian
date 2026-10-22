import React, { useState } from 'react';
import { Heart, Plus, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { celestialAudio } from '../utils/audio';
import { CuteBabyAngel } from './CuteBabyAngel';

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc?: string;
  type: 'illustration' | 'image' | 'custom';
  aspect?: string;
  likes: number;
}

const DEFAULT_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Peaceful Angel',
    subtitle: 'Resting on soft heavenly clouds',
    type: 'illustration',
    imageSrc: '/assets/aistudio/image_9566ce3f.png',
    aspect: 'crop-praying',
    likes: 18,
  },
  {
    id: 'gal-2',
    title: 'Sweet Dreams',
    subtitle: 'Little Sera resting in divine grace',
    type: 'illustration',
    imageSrc: '/assets/aistudio/image_9566ce3f.png',
    aspect: 'crop-resting',
    likes: 24,
  },
  {
    id: 'gal-3',
    title: 'First Smiles',
    subtitle: 'Bringing boundless sunshine to John & Ann',
    type: 'custom',
    likes: 15,
  },
  {
    id: 'gal-4',
    title: 'Baptism Heirloom',
    subtitle: 'Blessed christening gown & holy cross',
    type: 'custom',
    likes: 19,
  },
];

export const BabyGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sera_baby_gallery_v1');
      return saved ? JSON.parse(saved) : DEFAULT_GALLERY_ITEMS;
    } catch {
      return DEFAULT_GALLERY_ITEMS;
    }
  });

  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    celestialAudio.playSoftBell();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;

    const newItem: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: newTitle.trim() || 'Precious Moment',
      subtitle: newSubtitle.trim() || 'Baby Sera John',
      imageSrc: newImageUrl,
      type: 'image',
      likes: 1,
    };

    const updated = [newItem, ...items];
    setItems(updated);
    try {
      localStorage.setItem('sera_baby_gallery_v1', JSON.stringify(updated));
    } catch {}

    celestialAudio.playAngelChime();
    setShowUploadModal(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewImageUrl('');
  };

  return (
    <section className="w-full max-w-xl mx-auto my-12 px-4">
      {/* Gallery Section Header */}
      <div className="text-center mb-8">
        <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-amber-900/80 mb-1">
          Sweet Memories
        </p>
        <h2 className="font-serif italic text-3xl sm:text-4xl text-stone-900">
          Our Little Angel Gallery
        </h2>
        <div className="flex items-center justify-center gap-2 my-2.5">
          <span className="w-8 h-px bg-amber-300" />
          <Heart className="w-2.5 h-2.5 text-amber-700 fill-amber-600" />
          <span className="w-8 h-px bg-amber-300" />
        </div>
        <p className="text-xs text-stone-600 font-serif italic max-w-sm mx-auto">
          Cherished moments of baby Sera John, surrounded by love, warmth, and heavenly blessings.
        </p>
      </div>

      {/* Pinterest-Style Photo Grid */}
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => {
          const totalLikes = item.likes + (likesState[item.id] || 0);

          return (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group relative bg-[#FAF4EA] rounded-2xl p-2.5 sm:p-3 border border-[#DFCBB5] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              {/* Photo Frame Container */}
              <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#F5ECE0] border border-[#E8DDCE]">
                {item.aspect === 'crop-praying' ? (
                  // Praying angel crop from user's image
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-[50%_16%] scale-150 group-hover:scale-160 transition-transform duration-500"
                  />
                ) : item.aspect === 'crop-resting' ? (
                  // Resting angel crop from user's image
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover object-[84%_88%] scale-200 group-hover:scale-210 transition-transform duration-500"
                  />
                ) : item.imageSrc ? (
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : item.id === 'gal-3' ? (
                  // Cute illustrated baby scene for First Smiles
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-radial from-[#FFFDF9] via-[#FAF4EA] to-[#F1E5D4] text-center">
                    <svg viewBox="0 0 100 100" fill="none" className="w-20 h-20 mb-2 drop-shadow-xs">
                      {/* Sweet smiling baby face */}
                      <circle cx="50" cy="50" r="28" fill="#FFEFE7" stroke="#F5DACD" strokeWidth="1" />
                      {/* Rosy Cheeks */}
                      <circle cx="38" cy="54" r="5" fill="#FDA4AF" opacity="0.65" />
                      <circle cx="62" cy="54" r="5" fill="#FDA4AF" opacity="0.65" />
                      {/* Happy curved eyes */}
                      <path d="M 40 48 C 42 45 46 45 48 48" stroke="#65452C" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M 52 48 C 54 45 58 45 60 48" stroke="#65452C" strokeWidth="1.6" strokeLinecap="round" />
                      {/* Joyful baby smile */}
                      <path d="M 45 58 C 48 62 52 62 55 58" stroke="#A85751" strokeWidth="1.6" strokeLinecap="round" />
                      {/* Lace Bonnet */}
                      <path d="M 24 50 C 22 28 40 22 50 22 C 60 22 78 28 76 50" stroke="#E5DEC9" strokeWidth="2.5" strokeDasharray="2 3" fill="none" />
                      {/* Little flower */}
                      <circle cx="34" cy="28" r="3" fill="#FEF08A" />
                      <circle cx="34" cy="28" r="1.5" fill="#EAB308" />
                    </svg>
                    <span className="font-serif italic text-xs text-stone-700">First Smiles</span>
                  </div>
                ) : (
                  // Cute illustrated heirloom gown & cross scene
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-radial from-[#FFFDF9] via-[#FAF4EA] to-[#F1E5D4] text-center">
                    <svg viewBox="0 0 100 100" fill="none" className="w-20 h-20 mb-2 drop-shadow-xs">
                      {/* Baptism Cross */}
                      <path d="M 50 22 L 50 78 M 34 38 L 66 38" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
                      {/* Halo */}
                      <ellipse cx="50" cy="20" rx="14" ry="4" stroke="#FBBF24" strokeWidth="1.5" fill="none" />
                      {/* Olive leaves */}
                      <path d="M 38 60 C 42 66 50 68 58 64" stroke="#84A98C" strokeWidth="1.5" strokeLinecap="round" />
                      <ellipse cx="40" cy="62" rx="3" ry="1.5" fill="#A3B18A" transform="rotate(-20 40 62)" />
                      <ellipse cx="54" cy="65" rx="3" ry="1.5" fill="#A3B18A" transform="rotate(15 54 65)" />
                    </svg>
                    <span className="font-serif italic text-xs text-stone-700">Baptism Heirloom</span>
                  </div>
                )}

                {/* Floating Heart Button */}
                <button
                  onClick={(e) => handleLike(item.id, e)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/85 backdrop-blur-xs text-stone-600 hover:text-[#982846] hover:scale-110 active:scale-95 transition-all shadow-xs"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-100 text-rose-500" />
                </button>
              </div>

              {/* Photo Caption */}
              <div className="mt-2.5 px-1 flex items-center justify-between text-left">
                <div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                    {item.title}
                  </h4>
                  <p className="font-serif italic text-[11px] text-stone-500 leading-tight mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
                <span className="font-serif text-[11px] text-stone-400 tabular-nums shrink-0 ml-1">
                  {totalLikes} ♥
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to Upload / Add Baby Photos (for John & Ann) */}
      <div className="text-center mt-6">
        <button
          onClick={() => {
            celestialAudio.playSoftBell();
            setShowUploadModal(true);
          }}
          className="px-5 py-2.5 bg-[#FAF4EA] hover:bg-white text-stone-800 border border-[#DFCBB5] rounded-full font-cinzel text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5 text-amber-800" />
          <span>Add Photo to Gallery</span>
        </button>
      </div>

      {/* Add Photo Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm bg-[#FAF4EA] border border-[#DFCBB5] rounded-3xl p-6 shadow-2xl text-stone-800">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif italic text-2xl text-stone-900 text-center mb-1">
              Add a Baby Photo
            </h3>
            <p className="text-xs text-stone-600 font-serif italic text-center mb-4">
              Share a sweet memory of little Sera John
            </p>

            <form onSubmit={handleAddPhotoSubmit} className="space-y-3">
              <div>
                <label className="block font-cinzel text-[10px] uppercase text-stone-600 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. In Her Christening Gown"
                  className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white text-xs font-serif"
                />
              </div>

              <div>
                <label className="block font-cinzel text-[10px] uppercase text-stone-600 mb-1">
                  Short Caption
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Blessed baby girl"
                  className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white text-xs font-serif"
                />
              </div>

              <div>
                <label className="block font-cinzel text-[10px] uppercase text-stone-600 mb-1">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-stone-600 font-serif file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border file:border-[#DFCBB5] file:bg-white file:text-xs file:font-cinzel cursor-pointer"
                />
              </div>

              {newImageUrl && (
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#DFCBB5] mx-auto mt-2">
                  <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <button
                type="submit"
                disabled={!newImageUrl}
                className="w-full mt-2 py-2.5 px-4 bg-[#982846] hover:bg-[#85233c] text-white rounded-full font-cinzel text-xs tracking-wider uppercase transition-colors disabled:opacity-50 cursor-pointer"
              >
                Add to Gallery
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-[#FAF4EA] rounded-3xl p-4 border border-[#DFCBB5] shadow-2xl text-center"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 text-stone-500 hover:text-stone-800 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-4/5 w-full rounded-2xl overflow-hidden bg-white border border-[#DFCBB5] mb-3">
              {activePhoto.aspect === 'crop-praying' ? (
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover object-[50%_16%] scale-150"
                />
              ) : activePhoto.aspect === 'crop-resting' ? (
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover object-[84%_88%] scale-200"
                />
              ) : activePhoto.imageSrc ? (
                <img
                  src={activePhoto.imageSrc}
                  alt={activePhoto.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <CuteBabyAngel className="w-48 h-48" />
                </div>
              )}
            </div>

            <h3 className="font-serif italic text-2xl text-stone-900">
              {activePhoto.title}
            </h3>
            <p className="font-serif text-xs text-stone-600 mt-1">
              {activePhoto.subtitle}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
