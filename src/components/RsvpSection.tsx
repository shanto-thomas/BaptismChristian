import React, { useState } from 'react';
import { RsvpEntry, BaptismDetails } from '../types/invitation';
import { celestialAudio } from '../utils/audio';
import { CheckCircle2, Heart, Send, Calendar, Clock, MapPin } from 'lucide-react';
import { getGoogleCalendarUrl } from '../utils/calendar';

interface RsvpSectionProps {
  details: BaptismDetails;
  onAddRsvp: (rsvp: RsvpEntry) => void;
  rsvpsCount: number;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ details, onAddRsvp, rsvpsCount }) => {
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
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const newRsvp: RsvpEntry = {
      id: `rsvp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      guestName: formData.guestName.trim(),
      email: formData.email.trim(),
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

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      guestName: '',
      email: '',
      phone: '',
      attendance: 'attending-all',
      guestCount: 2,
      dietaryNotes: '',
      messageToBaby: '',
    });
  };

  return (
    <section id="rsvp-section" className="w-full max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md border border-stone-200/80 p-6 sm:p-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest font-sans text-amber-800 font-semibold mb-1">
            Kindly Respond
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
            RSVP for the Celebration
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-sans mt-2">
            Please let John &amp; Ann know if you can join by{' '}
            <span className="font-medium text-stone-700">October 31, 2026</span>
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8 px-4 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <CheckCircle2 className="w-8 h-8 text-amber-700" />
            </div>

            <h3 className="text-2xl font-serif text-stone-900 mb-2">
              Thank You, {formData.guestName}!
            </h3>

            {formData.attendance !== 'declined' ? (
              <p className="text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed mb-6">
                Your response has been lovingly recorded. John, Ann, and baby Sera are thrilled to celebrate this holy day with you!
              </p>
            ) : (
              <p className="text-sm text-stone-600 font-sans max-w-md mx-auto leading-relaxed mb-6">
                We will miss you dearly in person, but we are so thankful for your warm prayers and blessings for baby Sera!
              </p>
            )}

            {formData.attendance !== 'declined' && (
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 max-w-md mx-auto mb-6 text-left text-xs text-stone-600 font-sans space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>Saturday, November 14, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>Ceremony at {details.ceremonyTime} · {details.ceremonyChurch}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                  <span>{details.ceremonyAddress}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {formData.attendance !== 'declined' && (
                <a
                  href={getGoogleCalendarUrl(details)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium tracking-wide transition-colors flex items-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Google Calendar</span>
                </a>
              )}
              <button
                onClick={handleResetForm}
                className="px-4 py-2.5 text-xs text-stone-600 hover:text-stone-900 font-sans underline underline-offset-4 cursor-pointer"
              >
                Submit another RSVP or make changes
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-sans">
                {errorMsg}
              </div>
            )}

            {/* Attendance Choice */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-sans font-medium text-stone-700 mb-2">
                Will you be attending? <span className="text-amber-700">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'attending-all' })}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    formData.attendance === 'attending-all'
                      ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-medium text-stone-900">Joyfully Attending</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Ceremony &amp; Luncheon</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'ceremony-only' })}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    formData.attendance === 'ceremony-only'
                      ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-medium text-stone-900">Ceremony Only</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Church blessing</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'declined' })}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-colors ${
                    formData.attendance === 'declined'
                      ? 'border-stone-600 bg-stone-100 ring-1 ring-stone-600'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="text-xs font-medium text-stone-900">Unable to Attend</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Sending love &amp; prayers</div>
                </button>
              </div>
            </div>

            {/* Guest Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                  Your Full Name <span className="text-amber-700">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.guestName}
                  onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                  placeholder="e.g. Rachel &amp; Thomas"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                  Email Address <span className="text-amber-700">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                />
              </div>
            </div>

            {/* Phone & Guest Count */}
            {formData.attendance !== 'declined' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Total Number of Guests Attending
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  >
                    <option value={1}>1 Guest (Just me)</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests (Family)</option>
                    <option value={5}>5+ Guests</option>
                  </select>
                </div>
              </div>
            )}

            {/* Dietary notes */}
            {formData.attendance !== 'declined' && (
              <div>
                <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                  Dietary Restrictions / Allergies (Optional)
                </label>
                <input
                  type="text"
                  value={formData.dietaryNotes}
                  onChange={(e) => setFormData({ ...formData, dietaryNotes: e.target.value })}
                  placeholder="e.g. 1 Vegetarian, Nut allergy, etc."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                />
              </div>
            )}

            {/* Personal Blessing / Message to Sera & Parents */}
            <div>
              <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                A Prayer or Blessing for Baby Sera <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={formData.messageToBaby}
                onChange={(e) => setFormData({ ...formData, messageToBaby: e.target.value })}
                placeholder="Write a warm wish, holy prayer, or sweet note for baby Sera and proud parents John &amp; Ann..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-medium tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Confirm My RSVP</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
