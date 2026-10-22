export interface BaptismDetails {
  childName: string;
  childSubtitle: string;
  parentsFather: string;
  parentsMother: string;
  godfather: string;
  godmother: string;
  ceremonyDate: string; // YYYY-MM-DD
  ceremonyTime: string; // e.g. "11:00 AM"
  ceremonyChurch: string;
  ceremonyAddress: string;
  ceremonyOfficiant: string;
  ceremonyMapsQuery: string;
  hasReception: boolean;
  receptionVenue: string;
  receptionTime: string; // e.g. "1:00 PM"
  receptionAddress: string;
  receptionNotes: string;
  receptionMapsQuery: string;
  scriptureVerse: string;
  scriptureReference: string;
  themeStyle: 'celestial-gold' | 'rose-blush' | 'sky-blue' | 'eucalyptus-grace';
  dressCode: string;
  wishingWellNote: string;
  contactEmail: string;
  contactPhone: string;
}

export interface RsvpEntry {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  attendance: 'attending-all' | 'ceremony-only' | 'declined';
  guestCount: number;
  dietaryNotes: string;
  messageToBaby: string;
  createdAt: string;
}

export interface BlessingEntry {
  id: string;
  author: string;
  relation: string;
  message: string;
  date: string;
  likes: number;
}

export const SCRIPTURE_PRESETS = [
  {
    reference: 'James 1:17',
    verse: 'Every good and perfect gift is from above, coming down from the Father of the heavenly lights.',
  },
  {
    reference: 'Psalm 91:11',
    verse: 'For He will command His angels concerning you to guard you in all your ways.',
  },
  {
    reference: '1 Samuel 1:27',
    verse: 'For this child I prayed, and the Lord has granted the desires of my heart.',
  },
  {
    reference: 'Matthew 19:14',
    verse: 'Jesus said, "Let the little children come to me, and do not hinder them, for the kingdom of heaven belongs to such as these."',
  },
  {
    reference: 'Numbers 6:24-26',
    verse: 'The Lord bless you and keep you; the Lord make His face shine upon you and be gracious to you; the Lord turn His face toward you and give you peace.',
  },
];

export const INITIAL_BAPTISM_DETAILS: BaptismDetails = {
  childName: 'Sera John',
  childSubtitle: 'Our Little Angel',
  parentsFather: 'John TH',
  parentsMother: 'Ann John',
  godfather: 'David Thomas',
  godmother: 'Maria Joseph',
  ceremonyDate: '2026-04-26',
  ceremonyTime: '10:30 AM',
  ceremonyChurch: 'St. Mary’s Church',
  ceremonyAddress: 'Kottayam, Kerala',
  ceremonyOfficiant: 'Rev. Fr. Mathew Paul',
  ceremonyMapsQuery: 'St. Mary’s Church Kottayam',
  hasReception: true,
  receptionVenue: 'The Seraphim Banquet & Garden Hall',
  receptionTime: '12:30 PM',
  receptionAddress: 'Near St. Mary’s, Kottayam',
  receptionNotes: 'Traditional luncheon & fellowship to follow',
  receptionMapsQuery: 'St. Mary’s Church Kottayam',
  scriptureVerse: 'He will command His angels concerning you to guard you in all your ways.',
  scriptureReference: 'Psalm 91:11',
  themeStyle: 'celestial-gold',
  dressCode: 'White, cream or pastel traditional / garden attire',
  wishingWellNote: 'Your prayers, love, and presence are the most treasured gifts for baby Sera. For loved ones who have kindly asked to bless her future, a contribution to her little angel savings fund or a book inscribed with your blessing is warmly cherished.',
  contactEmail: 'johnandann.celebration@gmail.com',
  contactPhone: '+91 98470 12345',
};

export const INITIAL_BLESSINGS: BlessingEntry[] = [
  {
    id: 'bless-1',
    author: 'Grandpa & Grandma TH',
    relation: 'Paternal Grandparents',
    message: 'May the holy angels watch over precious little Sera every step of her life. You are the joy and sunshine of our family!',
    date: 'Oct 20, 2026',
    likes: 12,
  },
  {
    id: 'bless-2',
    author: 'Uncle Mark & Aunt Sarah',
    relation: 'Godparents & Family',
    message: 'Welcome into God’s loving family, sweet angel Sera! We promise to guide and love you always. Congratulations John & Ann!',
    date: 'Oct 21, 2026',
    likes: 9,
  },
  {
    id: 'bless-3',
    author: 'Father Mathew Paul',
    relation: 'Parish Priest',
    message: 'May God shower His boundless grace upon baby Sera as she receives the blessed sacrament of holy baptism.',
    date: 'Oct 22, 2026',
    likes: 15,
  },
];
