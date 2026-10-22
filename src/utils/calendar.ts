import { BaptismDetails } from '../types/invitation';

export function getGoogleCalendarUrl(details: BaptismDetails): string {
  // Convert date & time (e.g. 2026-11-14 and 11:00 AM) to ISO format
  const dateStr = details.ceremonyDate.replace(/-/g, '');
  // Default to 110000 / 140000 local
  const startHours = '110000';
  const endHours = '150000';
  const dates = `${dateStr}T${startHours}/${dateStr}T${endHours}`;

  const title = encodeURIComponent(`Baptism of ${details.childName}`);
  const location = encodeURIComponent(`${details.ceremonyChurch}, ${details.ceremonyAddress}`);
  const description = encodeURIComponent(
    `You are cordially invited to celebrate the Holy Sacrament of Baptism of baby ${details.childName}, daughter of ${details.parentsFather} and ${details.parentsMother}.\n\nCeremony: ${details.ceremonyChurch} at ${details.ceremonyTime}.\nReception: ${details.receptionVenue} at ${details.receptionTime}.\n\n" ${details.scriptureVerse} " — ${details.scriptureReference}`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${description}&location=${location}`;
}

export function downloadIcsFile(details: BaptismDetails): void {
  const dateStr = details.ceremonyDate.replace(/-/g, '');
  const start = `${dateStr}T110000`;
  const end = `${dateStr}T150000`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baptism Invitation//Sera John//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Holy Baptism of ${details.childName}`,
    `DESCRIPTION:Sacrament of Baptism for ${details.childName}, daughter of ${details.parentsFather} and ${details.parentsMother}. Ceremony at ${details.ceremonyChurch} (${details.ceremonyTime}).`,
    `LOCATION:${details.ceremonyChurch}, ${details.ceremonyAddress}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${details.childName.replace(/\s+/g, '_')}_Baptism.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
