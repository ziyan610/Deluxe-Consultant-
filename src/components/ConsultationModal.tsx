import React, { useState } from 'react';
import { X, Phone, CheckCircle2, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { DealListing, PRINCIPAL_BROKER } from '../data/brokerageData';
import { ResilientImage } from './ResilientImage';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
  selectedDeal?: DealListing | null;
}

export interface MandateSubmissionRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  mandateType: string;
  capitalBand: string;
  notes: string;
  submittedAt: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialSubject = 'Private Consultation with Munir Pathan',
  selectedDeal = null,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [mandateType, setMandateType] = useState(
    selectedDeal ? `Mandate Dossier: ${selectedDeal.title}` : initialSubject
  );
  const [capitalBand, setCapitalBand] = useState('₹1 Crore – ₹5 Crore');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<MandateSubmissionRecord | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(PRINCIPAL_BROKER.phoneRaw);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name or principal representative name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid corporate or private email address.');
      return;
    }
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setErrorMessage('Please enter a valid direct telephone number for confidential callback.');
      return;
    }

    const newRecord: MandateSubmissionRecord = {
      id: `DC-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      organization: organization.trim() || 'Private Principal Account',
      mandateType: selectedDeal ? `${selectedDeal.referenceCode} · ${selectedDeal.title}` : mandateType,
      capitalBand,
      notes: notes.trim(),
      submittedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      const existingRaw = localStorage.getItem('deluxe_consultant_inquiries');
      const existing: MandateSubmissionRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      localStorage.setItem('deluxe_consultant_inquiries', JSON.stringify([newRecord, ...existing]));
    } catch {
      // Ignore storage error
    }

    setSubmittedRecord(newRecord);
  };

  const resetAndClose = () => {
    setSubmittedRecord(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0D0C]/85 p-4 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-consultation-title"
    >
      <div className="relative my-8 w-full max-w-4xl border border-[#C5A059]/40 bg-[#0A0D0C] text-[#F9FAF9] shadow-2xl">
        {/* Top Bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#062C21]/60 px-6 py-4">
          <div className="flex items-center gap-2.5 text-xs text-[#C5A059]">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            <span>
              Deluxe Consultant · Direct Principal Desk ({PRINCIPAL_BROKER.name}) · NDA Protected
            </span>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="inline-flex h-8 w-8 items-center justify-center text-[#F9FAF9]/70 hover:text-white focus-visible:outline-2 focus-visible:outline-[#C5A059]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[82vh] overflow-y-auto p-6 sm:p-8">
          {submittedRecord ? (
            <div className="py-6">
              <div className="flex items-center gap-3 text-[#C5A059]">
                <CheckCircle2 className="h-7 w-7 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider">
                  Mandate Registered · Ref #{submittedRecord.id}
                </span>
              </div>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-[#F9FAF9] sm:text-3xl">
                Confidential Briefing Request Received
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#F9FAF9]/80">
                Thank you, <span className="font-semibold text-white">{submittedRecord.fullName}</span>. Your dossier request and consultation brief have been routed directly to Principal Broker{' '}
                <span className="font-semibold text-[#C5A059]">{PRINCIPAL_BROKER.name}</span>.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 border border-white/15 bg-[#111715] p-5 sm:grid-cols-2">
                <div>
                  <span className="text-xs text-[#F9FAF9]/55">Mandate Reference</span>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-[#C5A059] tabular-nums">
                    {submittedRecord.id} · {submittedRecord.submittedAt}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#F9FAF9]/55">Principal Entity</span>
                  <p className="mt-0.5 text-sm font-medium text-[#F9FAF9]">
                    {submittedRecord.organization}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#F9FAF9]/55">Selected Mandate / Subject</span>
                  <p className="mt-0.5 text-sm font-medium text-[#F9FAF9]">
                    {submittedRecord.mandateType}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-[#F9FAF9]/55">Target Capital Allocation</span>
                  <p className="mt-0.5 font-mono text-sm text-[#F9FAF9] tabular-nums">
                    {submittedRecord.capitalBand}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-[#C5A059]/30 bg-[#062C21]/40 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-medium text-[#C5A059]">
                    Immediate Priority Desk — Munir Pathan
                  </p>
                  <p className="mt-1 text-xs text-[#F9FAF9]/80">
                    For time-sensitive off-market bids or immediate principal connect, call Owner &amp; Principal Broker Munir Pathan directly:
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                    className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#C5A059] px-4 py-2.5 font-mono text-xs font-semibold text-[#0A0D0C] hover:bg-[#DFC286] whitespace-nowrap tabular-nums"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call {PRINCIPAL_BROKER.phoneDisplay}</span>
                  </a>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="border border-white/20 px-4 py-2.5 text-xs font-medium text-[#F9FAF9] hover:bg-white/10 whitespace-nowrap"
                  >
                    Return to Deluxe Consultant
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left Column: Deal Dossier Details or Munir Pathan Executive Summary */}
              <div className="lg:col-span-5 flex flex-col justify-between border-b border-white/10 pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-7">
                {selectedDeal ? (
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#C5A059]">
                      <span className="font-mono tabular-nums">{selectedDeal.referenceCode}</span>
                      <span aria-hidden="true">·</span>
                      <span>{selectedDeal.categoryLabel}</span>
                    </div>
                    <h2
                      id="modal-consultation-title"
                      className="mt-2 font-serif text-xl font-semibold text-[#F9FAF9] sm:text-2xl"
                    >
                      {selectedDeal.title}
                    </h2>
                    <p className="mt-1 text-xs text-[#F9FAF9]/65">{selectedDeal.location}</p>

                    <div className="mt-4 h-44 w-full overflow-hidden border border-white/10">
                      <ResilientImage
                        src={selectedDeal.imageUrl}
                        alt={selectedDeal.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-[#F9FAF9]/80">
                      {selectedDeal.investmentThesis}
                    </p>

                    <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                      <p className="text-xs font-semibold text-[#C5A059]">
                        Financial Summary (INR ₹)
                      </p>
                      {selectedDeal.financialBreakdown.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between text-xs border-b border-white/5 pb-1.5"
                        >
                          <span className="text-[#F9FAF9]/70">{item.label}</span>
                          <span className="font-mono font-medium text-[#F9FAF9] tabular-nums">
                            {item.valueINR}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-medium text-[#C5A059]">
                      Executive Mandate Desk
                    </p>
                    <h2
                      id="modal-consultation-title"
                      className="mt-2 font-serif text-2xl font-semibold text-[#F9FAF9]"
                    >
                      Connect Directly with Principal Broker Munir Pathan
                    </h2>
                    <p className="mt-3 text-xs leading-relaxed text-[#F9FAF9]/75">
                      Every consultation at Deluxe Consultant is handled at the principal level. Whether you are acquiring a trophy sky residence, divesting a commercial tower, or structuring a joint venture, your brief remains strictly confidential.
                    </p>

                    <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs">
                      <div>
                        <span className="text-[#F9FAF9]/55">Principal Broker &amp; Owner</span>
                        <p className="mt-0.5 font-serif text-base font-semibold text-[#F9FAF9]">
                          {PRINCIPAL_BROKER.name}
                        </p>
                      </div>
                      <div>
                        <span className="text-[#F9FAF9]/55">Direct Owner Number (Call / WhatsApp)</span>
                        <div className="mt-1 flex items-center gap-2">
                          <a
                            href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                            className="font-mono text-sm font-semibold text-[#C5A059] hover:underline tabular-nums"
                          >
                            {PRINCIPAL_BROKER.phoneFormatted} ({PRINCIPAL_BROKER.phoneRaw})
                          </a>
                          <button
                            type="button"
                            onClick={handleCopyPhone}
                            className="inline-flex items-center gap-1 border border-white/15 bg-white/5 px-2 py-1 text-[11px] text-[#F9FAF9]/80 hover:border-[#C5A059]"
                          >
                            {copiedPhone ? (
                              <>
                                <Check className="h-3 w-3 text-[#C5A059]" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#F9FAF9]/55">Executive Suite</span>
                        <p className="mt-0.5 text-[#F9FAF9]/85">{PRINCIPAL_BROKER.headquarters}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 border border-[#C5A059]/30 bg-[#062C21]/30 p-3.5 text-xs">
                  <p className="font-medium text-[#C5A059]">Prefer Immediate Voice Briefing?</p>
                  <p className="mt-1 text-[#F9FAF9]/75">
                    Dial Principal Broker Munir Pathan directly at{' '}
                    <a
                      href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                      className="font-mono font-semibold text-white underline tabular-nums"
                    >
                      {PRINCIPAL_BROKER.phoneRaw}
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Right Column: Confidential Intake Form */}
              <div className="lg:col-span-7">
                <h3 className="font-serif text-lg font-semibold text-[#F9FAF9]">
                  {selectedDeal
                    ? 'Request Watermarked Information Memorandum & Private Viewing'
                    : 'Schedule a Private Consultation'}
                </h3>
                <p className="mt-1 text-xs text-[#F9FAF9]/65">
                  Complete the secure principal intake below. Response guaranteed within 4 business hours.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                  {errorMessage && (
                    <div className="border border-red-400/50 bg-red-950/40 px-4 py-2.5 text-xs text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Full Name / Principal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rajeshwar Oberoi"
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Family Office / Organization
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="e.g. Oberoi Capital Holdings"
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Direct Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="principal@organization.com"
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Direct Telephone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98200 00000"
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 font-mono text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none tabular-nums"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Mandate Requirement
                      </label>
                      <select
                        value={mandateType}
                        onChange={(e) => setMandateType(e.target.value)}
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] focus:border-[#C5A059] focus:outline-none"
                      >
                        {selectedDeal && (
                          <option value={`Mandate Dossier: ${selectedDeal.title}`}>
                            Dossier: {selectedDeal.title}
                          </option>
                        )}
                        <option value="Primary Residence (For personal use)">
                          Primary Residence (For personal use)
                        </option>
                        <option value="Private Consultation with Munir Pathan">
                          Private Consultation with Munir Pathan
                        </option>
                        <option value="Off-Market Commercial Tower Acquisition">
                          Off-Market Commercial Tower Acquisition
                        </option>
                        <option value="Ultra-Prime Trophy Residence Mandate">
                          Ultra-Prime Trophy Residence Mandate
                        </option>
                        <option value="Asset Disposition / Exclusive Sale Mandate">
                          Asset Disposition / Exclusive Sale Mandate
                        </option>
                        <option value="Joint Development (JDA) & Capital Structuring">
                          Joint Development (JDA) &amp; Capital Structuring
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Estimated Transaction Amount (₹)
                      </label>
                      <select
                        value={capitalBand}
                        onChange={(e) => setCapitalBand(e.target.value)}
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 font-mono text-xs text-[#F9FAF9] focus:border-[#C5A059] focus:outline-none tabular-nums"
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
                    <label className="block text-xs font-medium text-[#F9FAF9]/85">
                      Confidential Mandate Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Specify target yield criteria, preferred micro-market, holding structure, or preferred callback window..."
                      className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2 text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center">
                    <span className="text-[11px] text-[#F9FAF9]/55">
                      Protected under Mutual Non-Disclosure Standard
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 border border-[#C5A059] bg-[#C5A059] px-6 py-3 text-xs font-semibold tracking-wide text-[#0A0D0C] transition-colors duration-150 hover:bg-[#DFC286] whitespace-nowrap"
                    >
                      <span>Transmit to Munir Pathan</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
