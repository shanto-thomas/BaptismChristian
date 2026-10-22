import React, { useState } from 'react';
import { RsvpEntry, BaptismDetails } from '../types/invitation';
import { celestialAudio } from '../utils/audio';
import { Check, Heart, Send } from 'lucide-react';

interface ContinuousRsvpProps {
  details: BaptismDetails;
  onAddRsvp: (rsvp: RsvpEntry) => void;
  onClose?: () => void;
}

export const ContinuousRsvp: React.FC<ContinuousRsvpProps> = ({
  details,
  onAddRsvp,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    attendance: 'attending-all' as 'attending-all' | 'ceremony-only' | 'declined',
    guestCount: 2,
    dietaryNotes: '',
    messageToBaby: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.guestName.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }

    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}`,
      guestName: formData.guestName.trim(),
      email: formData.email.trim() || `${formData.guestName.toLowerCase().replace(/\s+/g, '.')}@guest.com`,
      phone: formData.phone.trim(),
      attendance: formData.attendance,
      guestCount: formData.attendance === 'declined' ? 0 : Number(formData.guestCount),
      dietaryNotes: formData.dietaryNotes.trim(),
      messageToBaby: formData.messageToBaby.trim(),
      createdAt: new Date().toISOString(),
    };

    celestialAudio.playAngelChime();
    onAddRsvp(newRsvp);
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 px-4">
      {/* Seamless Parchment Container */}
      <div className="relative bg-[#FAF4EA] rounded-2xl border border-[#DFCBB5] p-6 sm:p-8 text-stone-800 shadow-sm">
        {/* Decorative corner flourishes */}
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-amber-600/50" />
        <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t border-r border-amber-600/50" />
        <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b border-l border-amber-600/50" />
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-amber-600/50" />

        {/* Header */}
        <div className="text-center mb-6">
          <p className="font-cinzel text-xs tracking-[0.25em] uppercase text-amber-900/80 mb-1">
            Kindly Respond
          </p>
          <h3 className="font-serif italic text-2xl sm:text-3xl text-stone-900">
            RSVP for Baby Sera
          </h3>
          <div className="flex items-center justify-center gap-2 my-2">
            <span className="w-6 h-px bg-amber-300" />
            <Heart className="w-2.5 h-2.5 text-amber-700 fill-amber-600" />
            <span className="w-6 h-px bg-amber-300" />
          </div>
          <p className="text-xs text-stone-600 font-serif italic">
            Please let John &amp; Ann know if you will celebrate with us by April 18, 2026
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-amber-100/70 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6 text-amber-700" />
            </div>
            <h4 className="font-serif text-xl text-stone-900 mb-1">
              Thank You, {formData.guestName}!
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-serif italic leading-relaxed max-w-sm mx-auto">
              {formData.attendance !== 'declined'
                ? 'Your blessing and presence are cherished. We look forward to seeing you at St. Mary’s Church, Kottayam!'
                : 'Thank you for your warm wishes and prayers for baby Sera!'}
            </p>
            {onClose && (
              <button
                onClick={onClose}
                className="mt-5 px-6 py-2 bg-stone-900 text-white rounded-full text-xs font-serif tracking-wider uppercase hover:bg-stone-800 cursor-pointer"
              >
                Done
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 font-sans text-center">
                {errorMsg}
              </div>
            )}

            {/* Attendance Choice */}
            <div>
              <label className="block font-cinzel text-[11px] uppercase tracking-wider text-stone-700 mb-1.5 text-center">
                Will you be attending?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'attending-all' })}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    formData.attendance === 'attending-all'
                      ? 'border-[#982846] bg-[#982846]/5 text-[#982846] ring-1 ring-[#982846]'
                      : 'border-[#DFCBB5] bg-white/60 hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="font-serif text-xs font-semibold">Joyfully Attending</div>
                  <div className="text-[10px] text-stone-500 font-sans mt-0.5">Ceremony &amp; Feast</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'ceremony-only' })}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    formData.attendance === 'ceremony-only'
                      ? 'border-[#982846] bg-[#982846]/5 text-[#982846] ring-1 ring-[#982846]'
                      : 'border-[#DFCBB5] bg-white/60 hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="font-serif text-xs font-semibold">Church Ceremony</div>
                  <div className="text-[10px] text-stone-500 font-sans mt-0.5">10:30 AM Mass</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                  className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                    formData.attendance === 'declined'
                      ? 'border-stone-600 bg-stone-100 text-stone-800 ring-1 ring-stone-600'
                      : 'border-[#DFCBB5] bg-white/60 hover:bg-white text-stone-700'
                  }`}
                >
                  <div className="font-serif text-xs font-semibold">Unable to Attend</div>
                  <div className="text-[10px] text-stone-500 font-sans mt-0.5">Sending Prayers</div>
                </button>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-cinzel text-[10px] uppercase tracking-wider text-stone-600 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="e.g. Thomas &amp; Mary"
                  className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white/80 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 font-serif"
                />
              </div>

              <div>
                <label className="block font-cinzel text-[10px] uppercase tracking-wider text-stone-600 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98470 00000"
                  className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white/80 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 font-serif"
                />
              </div>
            </div>

            {/* Guest Count (if attending) */}
            {formData.attendance !== 'declined' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-cinzel text-[10px] uppercase tracking-wider text-stone-600 mb-1">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 font-serif"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={5}>5+ Family members</option>
                  </select>
                </div>

                <div>
                  <label className="block font-cinzel text-[10px] uppercase tracking-wider text-stone-600 mb-1">
                    Dietary / Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.dietaryNotes}
                    onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                    placeholder="e.g. Vegetarian"
                    className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white/80 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 font-serif"
                  />
                </div>
              </div>
            )}

            {/* Prayer or Blessing Note */}
            <div>
              <label className="block font-cinzel text-[10px] uppercase tracking-wider text-stone-600 mb-1">
                A Prayer or Note for Baby Sera &amp; Parents
              </label>
              <textarea
                rows={2}
                value={formData.messageToBaby}
                onChange={(e) => setFormData({ ...formData, messageToBaby: e.target.value })}
                placeholder="May God always watch over sweet little Sera..."
                className="w-full px-3 py-2 rounded-lg border border-[#DFCBB5] bg-white/80 text-xs focus:outline-none focus:ring-1 focus:ring-amber-600 font-serif resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex items-center justify-between gap-3">
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-stone-500 font-serif hover:text-stone-800 cursor-pointer"
                >
                  Close
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-3 px-6 bg-[#982846] hover:bg-[#85233c] text-white rounded-full font-cinzel text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm RSVP</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
