import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Download,
  ShieldCheck,
} from 'lucide-react';
import { PRINCIPAL_BROKER } from '../data/brokerageData';

interface BookingRecord {
  bookingId: string;
  dateLabel: string;
  dateISO: string;
  timeSlot: string;
  format: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  agenda: string;
}

const generateUpcomingBusinessDays = () => {
  const days: { iso: string; dayName: string; dayNum: string; monthShort: string; fullLabel: string }[] = [];
  const base = new Date();
  let offset = 1;
  while (days.length < 10) {
    const d = new Date(base);
    d.setDate(base.getDate() + offset);
    offset++;
    // Skip Sundays (0)
    if (d.getDay() === 0) continue;
    const iso = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.toLocaleDateString('en-US', { day: '2-digit' });
    const monthShort = d.toLocaleDateString('en-US', { month: 'short' });
    const fullLabel = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    days.push({ iso, dayName, dayNum, monthShort, fullLabel });
  }
  return days;
};

const TIME_SLOTS = [
  '10:00 AM IST',
  '11:30 AM IST',
  '02:30 PM IST',
  '04:30 PM IST',
  '06:30 PM IST',
  '08:00 PM IST (Global Desk)',
];

const MEETING_FORMATS = [
  'Executive Suite In-Person (Mumbai)',
  'Private Encrypted Video Briefing',
  `Direct Telephone Briefing (${PRINCIPAL_BROKER.phoneRaw})`,
];

export const ContactPage: React.FC = () => {
  const upcomingDays = React.useMemo(() => generateUpcomingBusinessDays(), []);

  // Copy Phone State
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Active Tab: 'calendar' | 'form'
  const [activeTab, setActiveTab] = useState<'calendar' | 'form'>('calendar');

  // Calendar Booking Widget State
  const [selectedDay, setSelectedDay] = useState(upcomingDays[0]);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[1]);
  const [selectedFormat, setSelectedFormat] = useState(MEETING_FORMATS[0]);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingAgenda, setBookingAgenda] = useState(
    'Off-Market Commercial / Trophy Estate Consultation'
  );
  const [bookingError, setBookingError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Direct Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactOrg, setContactOrg] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('Primary Residence (For personal use)');
  const [contactBudget, setContactBudget] = useState('₹1 Crore – ₹5 Crore');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSuccessId, setContactSuccessId] = useState('');

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText(PRINCIPAL_BROKER.phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError('');

    if (!bookingName.trim() || bookingName.trim().length < 2) {
      setBookingError('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingEmail.trim())) {
      setBookingError('Please enter a valid corporate or private email address.');
      return;
    }
    if (bookingPhone.replace(/\D/g, '').length < 7) {
      setBookingError('Please provide a direct telephone number.');
      return;
    }

    const record: BookingRecord = {
      bookingId: `DC-CAL-${Math.floor(10000 + Math.random() * 90000)}`,
      dateLabel: selectedDay.fullLabel,
      dateISO: selectedDay.iso,
      timeSlot: selectedSlot,
      format: selectedFormat,
      clientName: bookingName.trim(),
      clientEmail: bookingEmail.trim(),
      clientPhone: bookingPhone.trim(),
      agenda: bookingAgenda.trim(),
    };

    setConfirmedBooking(record);
  };

  const handleDownloadICS = (booking: BookingRecord) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Deluxe Consultant//Munir Pathan Executive Desk//EN',
      'BEGIN:VEVENT',
      `UID:${booking.bookingId}@deluxeconsultant.com`,
      `SUMMARY:Private Consultation with Munir Pathan (Deluxe Consultant)`,
      `DESCRIPTION:Mandate Agenda: ${booking.agenda} | Format: ${booking.format} | Direct Owner Line: ${PRINCIPAL_BROKER.phoneRaw}`,
      `LOCATION:${booking.format}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${booking.bookingId}-Munir-Pathan-Consultation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');

    if (!contactName.trim() || contactName.trim().length < 2) {
      setContactError('Please enter your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.trim())) {
      setContactError('Please enter a valid email address.');
      return;
    }
    if (contactPhone.replace(/\D/g, '').length < 7) {
      setContactError('Please enter a valid telephone number.');
      return;
    }
    if (!contactMessage.trim() || contactMessage.trim().length < 10) {
      setContactError('Please include a brief summary of your mandate requirement.');
      return;
    }

    setContactSuccessId(`DC-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  return (
    <div>
      {/* 1. MINIMALIST LUXURY HEADER */}
      <section className="border-b border-white/10 bg-[#0A0D0C] py-16 text-[#F9FAF9] lg:py-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#C5A059]">
              <span>Executive Desk &amp; Private Appointments</span>
              <span aria-hidden="true">·</span>
              <span>Principal Broker: {PRINCIPAL_BROKER.name}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{PRINCIPAL_BROKER.phoneRaw}</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#F9FAF9] sm:text-5xl">
              Connect with Principal Broker Munir Pathan
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[#F9FAF9]/80">
              Initiate a confidential mandate consultation via direct telephone, private calendar reservation, or encrypted dossier transmission.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTACT & CALENDAR BOOKING WORKSPACE */}
      <section className="bg-[#F9FAF9] py-16 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left 5 Columns: Direct Owner Information & Executive Office Details */}
            <div className="lg:col-span-5">
              <div className="border border-[#0A0D0C]/15 bg-[#0A0D0C] p-8 text-[#F9FAF9]">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-medium text-[#C5A059]">
                      Owner &amp; Principal Broker
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-semibold text-white">
                      {PRINCIPAL_BROKER.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#F9FAF9]/70">
                      Deluxe Consultant · Private Client Desk
                    </p>
                  </div>
                  <ShieldCheck className="h-7 w-7 text-[#C5A059] shrink-0" />
                </div>

                {/* Highlighted Owner Number Box */}
                <div className="mt-6 border border-[#C5A059]/40 bg-[#062C21]/45 p-5">
                  <span className="text-xs font-medium text-[#C5A059]">
                    Direct Owner Number for More Information
                  </span>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                      className="font-mono text-2xl font-semibold text-white hover:text-[#C5A059] tabular-nums"
                    >
                      {PRINCIPAL_BROKER.phoneRaw}
                    </a>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                        className="inline-flex items-center gap-1.5 border border-[#C5A059] bg-[#C5A059] px-3 py-1.5 text-xs font-semibold text-[#0A0D0C] hover:bg-[#DFC286] whitespace-nowrap"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>Call Now</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyNumber}
                        className="inline-flex items-center gap-1 border border-white/20 bg-white/5 px-3 py-1.5 text-xs text-[#F9FAF9] hover:border-[#C5A059] whitespace-nowrap"
                      >
                        {copiedPhone ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#C5A059]" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 font-mono text-xs text-[#F9FAF9]/75 tabular-nums">
                    International Format: {PRINCIPAL_BROKER.phoneFormatted}
                  </p>
                </div>

                {/* Detailed Contact Coordinates */}
                <div className="mt-6 space-y-5 text-xs">
                  <div className="flex items-start gap-3.5">
                    <Mail className="mt-0.5 h-4 w-4 text-[#C5A059] shrink-0" />
                    <div>
                      <span className="block text-[#F9FAF9]/55">
                        Executive Desk Email
                      </span>
                      <a
                        href={`mailto:${PRINCIPAL_BROKER.email}`}
                        className="mt-0.5 block text-sm font-medium text-[#F9FAF9] hover:text-[#C5A059]"
                      >
                        {PRINCIPAL_BROKER.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="mt-0.5 h-4 w-4 text-[#C5A059] shrink-0" />
                    <div>
                      <span className="block text-[#F9FAF9]/55">
                        Executive Suite &amp; Boardroom
                      </span>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#F9FAF9]">
                        {PRINCIPAL_BROKER.headquarters}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="mt-0.5 h-4 w-4 text-[#C5A059] shrink-0" />
                    <div>
                      <span className="block text-[#F9FAF9]/55">
                        Private Desk Operating Hours
                      </span>
                      <p className="mt-0.5 text-sm text-[#F9FAF9]">
                        {PRINCIPAL_BROKER.privateDeskHours}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5 text-xs text-[#F9FAF9]/65">
                  All physical boardroom consultations require prior appointment confirmation. Chauffeur and private helipad transfer coordination available upon request.
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Interactive Calendar Booking Widget & Contact Intake Form */}
            <div className="lg:col-span-7">
              {/* Interactive Mode Switcher (Functional Segmented Buttons) */}
              <div className="flex items-center gap-2 border-b border-[#0A0D0C]/15 pb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('calendar')}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'calendar'
                      ? 'bg-[#0A0D0C] text-[#C5A059]'
                      : 'bg-white text-[#0A0D0C]/70 hover:bg-[#0A0D0C]/5 hover:text-[#0A0D0C]'
                  }`}
                >
                  <Calendar className="h-4 w-4" />
                  <span>1. Interactive Calendar Booking Widget</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeTab === 'form'
                      ? 'bg-[#0A0D0C] text-[#C5A059]'
                      : 'bg-white text-[#0A0D0C]/75 hover:bg-[#0A0D0C]/5 hover:text-[#0A0D0C]'
                  }`}
                >
                  <Mail className="h-4 w-4" />
                  <span>2. Written Mandate Dossier Form</span>
                </button>
              </div>

              {activeTab === 'calendar' ? (
                <div className="mt-6 border border-[#0A0D0C]/15 bg-white p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0A0D0C]/10 pb-4">
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-[#0A0D0C]">
                        Reserve a Private Consultation Slot with Munir Pathan
                      </h2>
                      <p className="mt-1 text-xs text-[#0A0D0C]/65">
                        Select your preferred date, IST time window, and consultation medium below.
                      </p>
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#062C21] tabular-nums">
                      Desk: {PRINCIPAL_BROKER.phoneRaw}
                    </span>
                  </div>

                  {confirmedBooking ? (
                    <div className="py-6">
                      <div className="flex items-center gap-2 text-[#062C21]">
                        <CheckCircle2 className="h-6 w-6" />
                        <span className="font-mono text-xs font-semibold tabular-nums">
                          Appointment Confirmed · {confirmedBooking.bookingId}
                        </span>
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-semibold text-[#0A0D0C]">
                        Private Calendar Briefing Locked
                      </h3>
                      <p className="mt-2 text-sm text-[#0A0D0C]/80">
                        Principal Broker <strong>{PRINCIPAL_BROKER.name}</strong>’s executive desk has reserved your private consultation slot.
                      </p>

                      <div className="mt-6 grid grid-cols-1 gap-4 border border-[#0A0D0C]/12 bg-[#F1F4F2] p-5 sm:grid-cols-2">
                        <div>
                          <span className="text-xs text-[#0A0D0C]/55">Date &amp; Time Window</span>
                          <p className="mt-0.5 font-mono text-sm font-semibold text-[#062C21] tabular-nums">
                            {confirmedBooking.dateLabel} · {confirmedBooking.timeSlot}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-[#0A0D0C]/55">Consultation Medium</span>
                          <p className="mt-0.5 text-sm font-semibold text-[#0A0D0C]">
                            {confirmedBooking.format}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-[#0A0D0C]/55">Principal Attendee</span>
                          <p className="mt-0.5 text-sm font-medium text-[#0A0D0C]">
                            {confirmedBooking.clientName} ({confirmedBooking.clientPhone})
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-[#0A0D0C]/55">Mandate Agenda</span>
                          <p className="mt-0.5 text-sm text-[#0A0D0C]">
                            {confirmedBooking.agenda}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleDownloadICS(confirmedBooking)}
                          className="inline-flex items-center gap-2 border border-[#0A0D0C] bg-[#0A0D0C] px-5 py-3 text-xs font-semibold text-[#F9FAF9] hover:bg-[#062C21] whitespace-nowrap"
                        >
                          <Download className="h-4 w-4 text-[#C5A059]" />
                          <span>Download Calendar Invite (.ICS)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setConfirmedBooking(null)}
                          className="border border-[#0A0D0C]/20 px-5 py-3 text-xs font-semibold text-[#0A0D0C] hover:bg-[#0A0D0C]/5 whitespace-nowrap"
                        >
                          Modify or Book Another Slot
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleConfirmBooking} className="mt-6 space-y-6" noValidate>
                      {bookingError && (
                        <div className="border border-red-600/40 bg-red-50 px-4 py-2.5 text-xs text-red-800">
                          {bookingError}
                        </div>
                      )}

                      {/* Step A: Date Picker Grid */}
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0D0C]">
                          Step 1: Select Available Business Date
                        </label>
                        <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {upcomingDays.map((d) => {
                            const isSelected = selectedDay.iso === d.iso;
                            return (
                              <button
                                key={d.iso}
                                type="button"
                                onClick={() => setSelectedDay(d)}
                                className={`flex flex-col items-center justify-center border p-3 transition-colors ${
                                  isSelected
                                    ? 'border-[#062C21] bg-[#062C21] text-[#F9FAF9]'
                                    : 'border-[#0A0D0C]/12 bg-[#F9FAF9] text-[#0A0D0C] hover:border-[#062C21]'
                                }`}
                              >
                                <span
                                  className={`text-[11px] ${
                                    isSelected ? 'text-[#C5A059]' : 'text-[#0A0D0C]/60'
                                  }`}
                                >
                                  {d.dayName}
                                </span>
                                <span className="mt-0.5 font-mono text-lg font-semibold tabular-nums">
                                  {d.dayNum}
                                </span>
                                <span
                                  className={`text-[11px] ${
                                    isSelected ? 'text-[#F9FAF9]/85' : 'text-[#0A0D0C]/65'
                                  }`}
                                >
                                  {d.monthShort}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step B: Time Window Picker */}
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0D0C]">
                          Step 2: Select Time Slot ({selectedDay.fullLabel})
                        </label>
                        <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedSlot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setSelectedSlot(slot)}
                                className={`border px-3 py-2.5 font-mono text-xs font-medium transition-colors tabular-nums whitespace-nowrap ${
                                  isSelected
                                    ? 'border-[#0A0D0C] bg-[#0A0D0C] text-[#C5A059]'
                                    : 'border-[#0A0D0C]/15 bg-white text-[#0A0D0C] hover:border-[#0A0D0C]'
                                }`}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step C: Consultation Format */}
                      <div>
                        <label className="block text-xs font-semibold text-[#0A0D0C]">
                          Step 3: Select Consultation Medium
                        </label>
                        <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                          {MEETING_FORMATS.map((fmt) => {
                            const isSelected = selectedFormat === fmt;
                            return (
                              <button
                                key={fmt}
                                type="button"
                                onClick={() => setSelectedFormat(fmt)}
                                className={`border px-3.5 py-2.5 text-left text-xs font-medium transition-colors ${
                                  isSelected
                                    ? 'border-[#062C21] bg-[#062C21]/10 text-[#062C21] font-semibold'
                                    : 'border-[#0A0D0C]/15 bg-white text-[#0A0D0C]/80 hover:border-[#0A0D0C]'
                                }`}
                              >
                                {fmt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Step D: Principal Details */}
                      <div className="grid grid-cols-1 gap-4 border-t border-[#0A0D0C]/10 pt-5 sm:grid-cols-3">
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            placeholder="Principal Name"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3 py-2.5 text-xs text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Executive Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            placeholder="name@firm.com"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3 py-2.5 text-xs text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Direct Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            value={bookingPhone}
                            onChange={(e) => setBookingPhone(e.target.value)}
                            placeholder="+91 98200 00000"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3 py-2.5 font-mono text-xs text-[#0A0D0C] focus:border-[#062C21] focus:outline-none tabular-nums"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#0A0D0C]">
                          Consultation Agenda / Target Mandate
                        </label>
                        <input
                          type="text"
                          value={bookingAgenda}
                          onChange={(e) => setBookingAgenda(e.target.value)}
                          className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 text-xs text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                        />
                      </div>

                      <div className="flex flex-col items-stretch justify-between gap-4 border-t border-[#0A0D0C]/10 pt-4 sm:flex-row sm:items-center">
                        <span className="text-xs text-[#0A0D0C]/60">
                          Selected: <strong className="text-[#0A0D0C]">{selectedDay.monthShort} {selectedDay.dayNum}</strong> at{' '}
                          <strong className="font-mono text-[#062C21]">{selectedSlot}</strong>
                        </span>

                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 border border-[#062C21] bg-[#062C21] px-6 py-3.5 text-xs font-semibold text-[#F9FAF9] transition-colors duration-150 hover:bg-[#0A3D2E] whitespace-nowrap"
                        >
                          <span>Confirm Calendar Consultation</span>
                          <ArrowRight className="h-4 w-4 text-[#C5A059]" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <div className="mt-6 border border-[#0A0D0C]/15 bg-white p-6 sm:p-8">
                  <div className="border-b border-[#0A0D0C]/10 pb-4">
                    <h2 className="font-serif text-2xl font-semibold text-[#0A0D0C]">
                      Transmit a Confidential Mandate Dossier
                    </h2>
                    <p className="mt-1 text-xs text-[#0A0D0C]/65">
                      Submit your acquisition, disposition, or joint-venture parameters directly to Munir Pathan.
                    </p>
                  </div>

                  {contactSuccessId ? (
                    <div className="py-8">
                      <div className="flex items-center gap-2 text-[#062C21]">
                        <CheckCircle2 className="h-6 w-6" />
                        <span className="font-mono text-xs font-semibold tabular-nums">
                          Transmission Verified · {contactSuccessId}
                        </span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl font-semibold text-[#0A0D0C]">
                        Mandate Brief Delivered to Munir Pathan
                      </h3>
                      <p className="mt-2 text-sm text-[#0A0D0C]/75">
                        Thank you, <strong>{contactName}</strong>. Our principal desk will review your brief and reach out via your direct telephone number ({contactPhone}).
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setContactSuccessId('');
                          setContactMessage('');
                        }}
                        className="mt-6 border border-[#0A0D0C] bg-[#0A0D0C] px-5 py-2.5 text-xs font-semibold text-white"
                      >
                        Send Another Transmission
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="mt-6 space-y-4" noValidate>
                      {contactError && (
                        <div className="border border-red-600/40 bg-red-50 px-4 py-2.5 text-xs text-red-800">
                          {contactError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Enter full name"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 text-sm text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Family Office / Institution
                          </label>
                          <input
                            type="text"
                            value={contactOrg}
                            onChange={(e) => setContactOrg(e.target.value)}
                            placeholder="Organization name"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 text-sm text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Direct Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="principal@domain.com"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 text-sm text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Direct Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="+91 98200 00000"
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 font-mono text-sm text-[#0A0D0C] focus:border-[#062C21] focus:outline-none tabular-nums"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Primary Advisory Objective
                          </label>
                          <select
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 text-sm text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                          >
                            <option value="Primary Residence (For personal use)">
                              Primary Residence (For personal use)
                            </option>
                            <option value="Acquisition Mandate">Acquisition Mandate</option>
                            <option value="Exclusive Asset Disposition">
                              Exclusive Asset Disposition
                            </option>
                            <option value="Joint Development (JDA) Structuring">
                              Joint Development (JDA) Structuring
                            </option>
                            <option value="Family Office Portfolio Consultation">
                              Family Office Portfolio Consultation
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#0A0D0C]">
                            Estimated Transaction Amount (₹)
                          </label>
                          <select
                            value={contactBudget}
                            onChange={(e) => setContactBudget(e.target.value)}
                            className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 font-mono text-xs text-[#0A0D0C] focus:border-[#062C21] focus:outline-none tabular-nums"
                          >
                            <option value="₹50 Lakh – ₹1 Crore">
                              ₹50 Lakh – ₹1 Crore
                            </option>
                            <option value="₹1 Crore – ₹5 Crore">
                              ₹1 Crore – ₹5 Crore
                            </option>
                            <option value="₹5 Crore – ₹10 Crore">
                              ₹5 Crore – ₹10 Crore
                            </option>
                            <option value="₹10 Crore+">
                              ₹10 Crore+
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#0A0D0C]">
                          Confidential Mandate Brief *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Detail your property specifications, target yield, location preference, or disposition timeline..."
                          className="mt-1.5 w-full border border-[#0A0D0C]/20 bg-[#F9FAF9] px-3.5 py-2.5 text-sm text-[#0A0D0C] focus:border-[#062C21] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end pt-2">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 border border-[#062C21] bg-[#062C21] px-6 py-3.5 text-xs font-semibold text-[#F9FAF9] hover:bg-[#0A3D2E] whitespace-nowrap"
                        >
                          <span>Submit Confidential Brief</span>
                          <ArrowRight className="h-4 w-4 text-[#C5A059]" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
