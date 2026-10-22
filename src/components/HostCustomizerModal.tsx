import React, { useState } from 'react';
import { BaptismDetails, RsvpEntry, SCRIPTURE_PRESETS } from '../types/invitation';
import { celestialAudio } from '../utils/audio';
import {
  X,
  Settings,
  Users,
  Download,
  Palette,
  Check,
  Calendar,
  Sparkles,
} from 'lucide-react';

interface HostCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: BaptismDetails;
  onUpdateDetails: (newDetails: BaptismDetails) => void;
  rsvps: RsvpEntry[];
  onDeleteRsvp: (id: string) => void;
}

export const HostCustomizerModal: React.FC<HostCustomizerModalProps> = ({
  isOpen,
  onClose,
  details,
  onUpdateDetails,
  rsvps,
  onDeleteRsvp,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'theme' | 'rsvps'>('details');
  const [draft, setDraft] = useState<BaptismDetails>(details);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    celestialAudio.playSoftBell();
    onUpdateDetails(draft);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportCsv = () => {
    celestialAudio.playSoftBell();
    const headers = ['Guest Name', 'Email', 'Phone', 'Attendance', 'Guest Count', 'Dietary Notes', 'Message to Baby', 'Submitted At'];
    const rows = rsvps.map((r) => [
      `"${r.guestName.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.phone.replace(/"/g, '""')}"`,
      `"${r.attendance}"`,
      r.guestCount,
      `"${r.dietaryNotes.replace(/"/g, '""')}"`,
      `"${r.messageToBaby.replace(/"/g, '""')}"`,
      `"${r.createdAt}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Sera_John_Baptism_RSVPs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // RSVP statistics
  const totalAttendingGuests = rsvps
    .filter((r) => r.attendance !== 'declined')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const totalResponses = rsvps.length;
  const attendingResponses = rsvps.filter((r) => r.attendance !== 'declined').length;
  const declinedResponses = rsvps.filter((r) => r.attendance === 'declined').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
              <Settings className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-serif font-semibold text-stone-900">
                Host Settings &amp; RSVP Manager
              </h3>
              <p className="text-xs text-stone-500 font-sans">
                Customize details for John TH &amp; Ann John
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-stone-200 flex items-center gap-2 font-sans text-xs">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Ceremony &amp; Names
          </button>
          <button
            onClick={() => setActiveTab('theme')}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'theme'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Angel Palette &amp; Scripture</span>
          </button>
          <button
            onClick={() => setActiveTab('rsvps')}
            className={`pb-2.5 px-3 font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'rsvps'
                ? 'border-amber-600 text-stone-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>RSVP Guestlist ({totalResponses})</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 text-sm text-stone-800">
          {activeTab === 'details' && (
            <form onSubmit={handleSave} className="space-y-5">
              {/* Child & Parents */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Child&apos;s Full Name
                  </label>
                  <input
                    type="text"
                    value={draft.childName}
                    onChange={(e) => setDraft({ ...draft, childName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Father&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={draft.parentsFather}
                    onChange={(e) => setDraft({ ...draft, parentsFather: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Mother&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={draft.parentsMother}
                    onChange={(e) => setDraft({ ...draft, parentsMother: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Godparents */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Godfather / Sponsor
                  </label>
                  <input
                    type="text"
                    value={draft.godfather}
                    onChange={(e) => setDraft({ ...draft, godfather: e.target.value })}
                    placeholder="e.g. David Thomas"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Godmother / Sponsor
                  </label>
                  <input
                    type="text"
                    value={draft.godmother}
                    onChange={(e) => setDraft({ ...draft, godmother: e.target.value })}
                    placeholder="e.g. Maria Joseph"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4" />

              {/* Ceremony details */}
              <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-800">
                Ceremony Details
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={draft.ceremonyDate}
                    onChange={(e) => setDraft({ ...draft, ceremonyDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={draft.ceremonyTime}
                    onChange={(e) => setDraft({ ...draft, ceremonyTime: e.target.value })}
                    placeholder="11:00 AM"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Celebrant / Priest
                  </label>
                  <input
                    type="text"
                    value={draft.ceremonyOfficiant}
                    onChange={(e) => setDraft({ ...draft, ceremonyOfficiant: e.target.value })}
                    placeholder="Rev. Fr. Mathew Paul"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Church Name
                  </label>
                  <input
                    type="text"
                    value={draft.ceremonyChurch}
                    onChange={(e) => setDraft({ ...draft, ceremonyChurch: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Church Address
                  </label>
                  <input
                    type="text"
                    value={draft.ceremonyAddress}
                    onChange={(e) => setDraft({ ...draft, ceremonyAddress: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="border-t border-stone-200 pt-4" />

              {/* Reception details */}
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-800">
                  Reception &amp; Luncheon
                </h4>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-sans text-stone-600">
                  <input
                    type="checkbox"
                    checked={draft.hasReception}
                    onChange={(e) => setDraft({ ...draft, hasReception: e.target.checked })}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Include Reception</span>
                </label>
              </div>

              {draft.hasReception && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                        Reception Venue Name
                      </label>
                      <input
                        type="text"
                        value={draft.receptionVenue}
                        onChange={(e) => setDraft({ ...draft, receptionVenue: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                        Reception Time
                      </label>
                      <input
                        type="text"
                        value={draft.receptionTime}
                        onChange={(e) => setDraft({ ...draft, receptionTime: e.target.value })}
                        placeholder="1:00 PM"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                      Reception Address
                    </label>
                    <input
                      type="text"
                      value={draft.receptionAddress}
                      onChange={(e) => setDraft({ ...draft, receptionAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* Dress Code & Attire */}
              <div>
                <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                  Dress Code Note
                </label>
                <input
                  type="text"
                  value={draft.dressCode}
                  onChange={(e) => setDraft({ ...draft, dressCode: e.target.value })}
                  placeholder="White or soft pastels recommended"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                {savedSuccess && (
                  <span className="text-xs text-emerald-600 flex items-center gap-1 font-sans">
                    <Check className="w-3.5 h-3.5" /> Changes saved!
                  </span>
                )}
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                >
                  Save Ceremony Details
                </button>
              </div>
            </form>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              {/* Color Themes */}
              <div>
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-800 mb-3">
                  Angel Palette Color Theme
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      id: 'celestial-gold',
                      title: 'Celestial Gold & Ivory',
                      desc: 'Classic holy gold foil with cream linen and subtle amber warmth',
                      preview: 'bg-amber-100 border-amber-300',
                    },
                    {
                      id: 'rose-blush',
                      title: 'Pastel Rose & Blush Angel',
                      desc: 'Sweet delicate pink and warm rose tones for baby girl Sera',
                      preview: 'bg-rose-100 border-rose-300',
                    },
                    {
                      id: 'sky-blue',
                      title: 'Seraphic Sky Blue & Pearl',
                      desc: 'Gentle morning celestial blue clouds and soft silver accents',
                      preview: 'bg-sky-100 border-sky-300',
                    },
                    {
                      id: 'eucalyptus-grace',
                      title: 'Eucalyptus & Botanical Grace',
                      desc: 'Peaceful olive leaves, sage green, and organic gold touches',
                      preview: 'bg-emerald-100 border-emerald-300',
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        const updated = { ...draft, themeStyle: t.id as BaptismDetails['themeStyle'] };
                        setDraft(updated);
                        onUpdateDetails(updated);
                      }}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                        draft.themeStyle === t.id
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full border ${t.preview} shrink-0 mt-0.5 flex items-center justify-center`}>
                        {draft.themeStyle === t.id && <Check className="w-4 h-4 text-stone-700" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-stone-900">{t.title}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5 leading-normal">{t.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scripture Presets */}
              <div className="border-t border-stone-200 pt-6">
                <h4 className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-800 mb-2">
                  Select Holy Scripture Verse
                </h4>
                <div className="space-y-2 mb-4">
                  {SCRIPTURE_PRESETS.map((p) => (
                    <button
                      key={p.reference}
                      type="button"
                      onClick={() => {
                        const updated = { ...draft, scriptureVerse: p.verse, scriptureReference: p.reference };
                        setDraft(updated);
                        onUpdateDetails(updated);
                      }}
                      className={`w-full p-3 rounded-lg border text-left cursor-pointer transition-colors text-xs ${
                        draft.scriptureReference === p.reference
                          ? 'border-amber-600 bg-amber-50/50 text-stone-900'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-white'
                      }`}
                    >
                      <span className="font-semibold text-amber-900">{p.reference}:</span>{' '}
                      <span className="italic font-serif">&ldquo;{p.verse}&rdquo;</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-sans font-medium text-stone-700 mb-1">
                    Or write a custom verse / dedication:
                  </label>
                  <textarea
                    rows={2}
                    value={draft.scriptureVerse}
                    onChange={(e) => {
                      const updated = { ...draft, scriptureVerse: e.target.value };
                      setDraft(updated);
                      onUpdateDetails(updated);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rsvps' && (
            <div className="space-y-6">
              {/* Stat Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    {totalAttendingGuests}
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans">Attending Guests</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    {attendingResponses}
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans">Yes RSVPs</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tabular-nums">
                    {declinedResponses}
                  </div>
                  <div className="text-[11px] text-stone-500 font-sans">Declined</div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 font-sans">
                  Showing {rsvps.length} responses
                </span>
                <button
                  onClick={handleExportCsv}
                  disabled={rsvps.length === 0}
                  className="px-3.5 py-1.5 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Guest List (CSV)</span>
                </button>
              </div>

              {/* RSVP Table / List */}
              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-stone-400 text-xs font-sans">
                  No RSVPs have been submitted yet. Share the invitation link with guests!
                </div>
              ) : (
                <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100">
                  {rsvps.map((r) => (
                    <div key={r.id} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-stone-900 text-sm font-serif">
                            {r.guestName}
                          </span>
                          <span
                            className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded ${
                              r.attendance === 'attending-all'
                                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                : r.attendance === 'ceremony-only'
                                ? 'bg-sky-50 text-sky-800 border border-sky-200'
                                : 'bg-stone-100 text-stone-600 border border-stone-200'
                            }`}
                          >
                            {r.attendance === 'attending-all'
                              ? 'Attending (Both)'
                              : r.attendance === 'ceremony-only'
                              ? 'Ceremony Only'
                              : 'Declined'}
                          </span>
                          {r.guestCount > 0 && (
                            <span className="text-stone-500">
                              ({r.guestCount} {r.guestCount === 1 ? 'person' : 'guests'})
                            </span>
                          )}
                        </div>

                        <div className="text-stone-500 text-[11px] mt-1 space-x-2">
                          <span>{r.email}</span>
                          {r.phone && <span>· {r.phone}</span>}
                        </div>

                        {r.dietaryNotes && (
                          <div className="text-[11px] text-amber-800 mt-1">
                            Dietary: {r.dietaryNotes}
                          </div>
                        )}

                        {r.messageToBaby && (
                          <div className="text-[11px] text-stone-600 italic font-serif mt-1 max-w-md">
                            &ldquo;{r.messageToBaby}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onDeleteRsvp(r.id)}
                          className="text-stone-400 hover:text-red-600 text-xs transition-colors cursor-pointer"
                          title="Remove entry"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
