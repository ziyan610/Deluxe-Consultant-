import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';
import {
  ADVISORY_SERVICES,
  BRAND_IMAGES,
  CLIENT_ENDORSEMENTS,
  DealCategory,
  DealListing,
  FEATURED_DEALS,
  PageId,
  PRINCIPAL_BROKER,
} from '../data/brokerageData';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (subject?: string, deal?: DealListing) => void;
}

const DEAL_CATEGORIES: { id: DealCategory; label: string }[] = [
  { id: 'all', label: 'All Mandates' },
  { id: 'commercial', label: 'Commercial Towers' },
  { id: 'estates', label: 'Ultra-Prime Estates' },
  { id: 'hospitality', label: 'Hospitality & Mixed-Use' },
  { id: 'development', label: 'Land & Development' },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DealCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'irr' | 'capRate'>('featured');

  // Hero Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadInterest, setLeadInterest] = useState('Primary Residence (For personal use)');
  const [leadCapital, setLeadCapital] = useState('₹1 Crore – ₹5 Crore');
  const [leadError, setLeadError] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadRefCode, setLeadRefCode] = useState('');

  const handleHeroLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadError('');

    if (!leadName.trim() || leadName.trim().length < 2) {
      setLeadError('Please enter your full name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(leadEmail.trim())) {
      setLeadError('Please enter a valid corporate or private email.');
      return;
    }
    if (leadPhone.replace(/\D/g, '').length < 7) {
      setLeadError('Please enter a valid direct phone number.');
      return;
    }

    const code = `DC-${Math.floor(100000 + Math.random() * 900000)}`;
    setLeadRefCode(code);
    setLeadSubmitted(true);
  };

  const filteredDeals = FEATURED_DEALS.filter((deal) =>
    selectedCategory === 'all' ? true : deal.category === selectedCategory
  ).sort((a, b) => {
    if (sortBy === 'irr') {
      return parseFloat(b.projectedIRR) - parseFloat(a.projectedIRR);
    }
    if (sortBy === 'capRate') {
      return parseFloat(b.capRate) - parseFloat(a.capRate);
    }
    return 0;
  });

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0A0D0C] text-[#F9FAF9]">
        {/* Architectural 16:9 Backdrop with Measured Contrast Scrim */}
        <div className="absolute inset-0">
          <ResilientImage
            src={BRAND_IMAGES.heroPenthouse}
            alt="Ultra-luxury architectural penthouse lounge overlooking financial skyline at twilight"
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0D0C] via-[#0A0D0C]/85 to-[#0A0D0C]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0C] via-transparent to-[#0A0D0C]/50" />
        </div>

        <div className="relative mx-auto max-w-[1360px] px-4 py-16 sm:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Hero Editorial Proposition (7 Columns) */}
            <div className="lg:col-span-7 lg:pr-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#C5A059]">
                <span>Deluxe Consultant</span>
                <span aria-hidden="true">·</span>
                <span>Principal Broker: {PRINCIPAL_BROKER.name}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">Desk: {PRINCIPAL_BROKER.phoneRaw}</span>
              </div>

              <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-[1.12] tracking-tight text-[#F9FAF9] sm:text-5xl lg:text-[56px]">
                Luxury Brokerage &amp; Consulting Reimagined
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F9FAF9]/85 sm:text-lg">
                Owned and led by Principal Broker{' '}
                <span className="font-semibold text-white">{PRINCIPAL_BROKER.name}</span>, Deluxe Consultant originates confidential off-market real estate acquisitions, Grade-A commercial dispositions, and structured joint ventures for sovereign investors, family offices, and ultra-high-net-worth principals.
              </p>

              {/* Primary CTA & Direct Owner Desk Block */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    onOpenConsultation('Schedule a Private Consultation — Munir Pathan')
                  }
                  className="inline-flex items-center gap-2.5 border border-[#C5A059] bg-[#C5A059] px-6 py-3.5 text-xs font-semibold tracking-wide text-[#0A0D0C] transition-colors duration-150 hover:bg-[#DFC286] whitespace-nowrap"
                >
                  <span>Schedule a Private Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 border border-white/25 bg-[#062C21]/70 px-6 py-3.5 text-xs font-semibold tracking-wide text-[#F9FAF9] transition-colors duration-150 hover:border-[#C5A059] hover:bg-[#0A3D2E] whitespace-nowrap"
                >
                  <span>Connect with Munir Pathan</span>
                  <ArrowUpRight className="h-4 w-4 text-[#C5A059]" />
                </button>
              </div>

              {/* Direct Owner Phone Callout & Quantitative Proof Strip */}
              <div className="mt-10 border-t border-white/15 pt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <span className="font-mono text-2xl font-semibold text-[#C5A059] tabular-nums sm:text-3xl">
                      ₹79.5 Crore
                    </span>
                    <p className="mt-1 text-xs text-[#F9FAF9]/70">
                      Cumulative Mandate &amp; Advisory Volume Transacted
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-2xl font-semibold text-[#F9FAF9] tabular-nums sm:text-3xl">
                      78%
                    </span>
                    <p className="mt-1 text-xs text-[#F9FAF9]/70">
                      Bilateral Off-Market Transfers Under Strict NDA
                    </p>
                  </div>
                  <div>
                    <a
                      href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                      className="group inline-flex items-center gap-2 font-mono text-xl font-semibold text-[#C5A059] hover:underline tabular-nums sm:text-2xl"
                    >
                      <Phone className="h-4 w-4 text-[#C5A059]" />
                      <span>{PRINCIPAL_BROKER.phoneRaw}</span>
                    </a>
                    <p className="mt-1 text-xs text-[#F9FAF9]/70">
                      Direct Principal Broker Line ({PRINCIPAL_BROKER.displayName})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Converting Lead Generation Form in Hero (5 Columns) */}
            <div className="lg:col-span-5">
              <div className="border border-[#C5A059]/40 bg-[#0A0D0C]/95 p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-medium text-[#C5A059]">
                      Direct Principal Mandate Desk
                    </p>
                    <h2 className="mt-1 font-serif text-xl font-semibold text-[#F9FAF9]">
                      Request a Confidential Briefing
                    </h2>
                  </div>
                  <ShieldCheck className="h-6 w-6 text-[#C5A059] shrink-0" />
                </div>

                {leadSubmitted ? (
                  <div className="py-6">
                    <div className="flex items-center gap-2 text-[#C5A059]">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-mono text-xs font-semibold tabular-nums">
                        Dossier Registered · {leadRefCode}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-semibold text-[#F9FAF9]">
                      Thank You, {leadName}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#F9FAF9]/80">
                      Your inquiry regarding <span className="text-white font-medium">{leadInterest}</span> ({leadCapital}) has been assigned to Principal Broker{' '}
                      <span className="text-[#C5A059] font-semibold">{PRINCIPAL_BROKER.name}</span>.
                    </p>
                    <div className="mt-5 border border-white/10 bg-[#111715] p-4 text-xs">
                      <p className="text-[#F9FAF9]/70">For immediate priority attention, dial:</p>
                      <a
                        href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                        className="mt-1 inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#C5A059] hover:underline tabular-nums"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>
                          {PRINCIPAL_BROKER.phoneFormatted} ({PRINCIPAL_BROKER.phoneRaw})
                        </span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setLeadName('');
                        setLeadEmail('');
                        setLeadPhone('');
                      }}
                      className="mt-5 w-full border border-white/20 py-2.5 text-xs font-medium text-[#F9FAF9] hover:bg-white/10"
                    >
                      Submit Another Mandate Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleHeroLeadSubmit} className="mt-5 space-y-4" noValidate>
                    {leadError && (
                      <div className="border border-red-400/50 bg-red-950/50 px-3.5 py-2 text-xs text-red-200">
                        {leadError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Principal or Representative Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        placeholder="Enter full name"
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-[#F9FAF9]/85">
                          Executive Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#F9FAF9]/85">
                          Direct Telephone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={leadPhone}
                          onChange={(e) => setLeadPhone(e.target.value)}
                          placeholder="+91 98200 00000"
                          className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 font-mono text-sm text-[#F9FAF9] placeholder:text-white/30 focus:border-[#C5A059] focus:outline-none tabular-nums"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Primary Advisory Objective
                      </label>
                      <select
                        value={leadInterest}
                        onChange={(e) => setLeadInterest(e.target.value)}
                        className="mt-1.5 w-full border border-white/15 bg-[#111715] px-3.5 py-2.5 text-sm text-[#F9FAF9] focus:border-[#C5A059] focus:outline-none"
                      >
                        <option value="Primary Residence (For personal use)">
                          Primary Residence (For personal use)
                        </option>
                        <option value="Off-Market Acquisition Mandate">
                          Off-Market Acquisition Mandate
                        </option>
                        <option value="Commercial Tower / Floor Plate Disposition">
                          Commercial Tower / Floor Plate Disposition
                        </option>
                        <option value="Trophy Sky Residence or Coastal Estate">
                          Trophy Sky Residence or Coastal Estate
                        </option>
                        <option value="Joint Development (JDA) & Capital Structuring">
                          Joint Development (JDA) &amp; Capital Structuring
                        </option>
                        <option value="Family Office Portfolio Rebalancing">
                          Family Office Portfolio Rebalancing
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#F9FAF9]/85">
                        Estimated Transaction Amount (₹)
                      </label>
                      <select
                        value={leadCapital}
                        onChange={(e) => setLeadCapital(e.target.value)}
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

                    <button
                      type="submit"
                      className="w-full border border-[#C5A059] bg-[#062C21] px-5 py-3.5 text-xs font-semibold tracking-wide text-[#F9FAF9] transition-colors duration-150 hover:bg-[#0A3D2E] hover:border-[#DFC286] whitespace-nowrap"
                    >
                      Connect with Munir Pathan
                    </button>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#F9FAF9]/60">
                      <span>Strict Principal Discretion</span>
                      <a
                        href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                        className="font-mono text-[#C5A059] hover:underline tabular-nums"
                      >
                        Direct: {PRINCIPAL_BROKER.phoneRaw}
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRINCIPAL BROKER INTRODUCTION SECTION (MUNIR PATHAN) */}
      <section className="border-b border-[#0A0D0C]/10 bg-[#F9FAF9] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative border border-[#0A0D0C]/15 bg-[#0A0D0C] p-3">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={BRAND_IMAGES.executiveOffice}
                    alt="Executive Boardroom and Principal Broker Suite of Munir Pathan at Deluxe Consultant"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between bg-[#0A0D0C] px-3 py-2 text-xs text-[#F9FAF9]">
                  <div>
                    <span className="font-serif font-semibold text-[#C5A059]">
                      {PRINCIPAL_BROKER.name}
                    </span>
                    <span className="mx-2 text-white/30">·</span>
                    <span className="text-white/80">Founder &amp; Principal Broker</span>
                  </div>
                  <a
                    href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                    className="font-mono text-[#C5A059] hover:underline tabular-nums"
                  >
                    {PRINCIPAL_BROKER.phoneRaw}
                  </a>
                </div>
              </div>
            </div>

            {/* Editorial Introduction */}
            <div className="lg:col-span-7 lg:pl-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#062C21]">
                <span>Principal Leadership</span>
                <span aria-hidden="true">·</span>
                <span>Deluxe Consultant</span>
              </div>

              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#0A0D0C] sm:text-4xl">
                Personal Fiduciary Stewardship by Principal Broker Munir Pathan
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[#0A0D0C]/80">
                In high-stakes real estate and capital advisory, delegating negotiations to junior associates dilutes execution quality and compromises confidentiality. At{' '}
                <strong className="font-semibold text-[#0A0D0C]">Deluxe Consultant</strong>, every mandate is personally originated, structured, and negotiated by Founder and Principal Broker{' '}
                <strong className="font-semibold text-[#062C21]">{PRINCIPAL_BROKER.name}</strong>.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#0A0D0C]/80">
                Trusted by industrialist families, institutional funds, and sovereign wealth principals, Munir Pathan combines forensic valuation rigor with direct access to off-market inventory that never circulates on public brokerage channels.
              </p>

              {/* Key Pillars Grid */}
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-[#0A0D0C]/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-xs font-semibold text-[#062C21]">
                    01. Off-Market Origination
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#0A0D0C]/70">
                    Direct bilateral access to unadvertised commercial towers, coastal estates, and corporate land banks.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-[#062C21]">
                    02. Forensic Due Diligence
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#0A0D0C]/70">
                    40-point title, zoning, covenant, and discounted cash flow validation before term sheet execution.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-[#062C21]">
                    03. Direct Principal Desk
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#0A0D0C]/70">
                    Uninterrupted access to Munir Pathan at{' '}
                    <a
                      href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                      className="font-mono font-semibold text-[#062C21] underline tabular-nums"
                    >
                      {PRINCIPAL_BROKER.phoneRaw}
                    </a>{' '}
                    from mandate inception to closing.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 border border-[#0A0D0C] bg-[#0A0D0C] px-5 py-3 text-xs font-semibold tracking-wide text-[#F9FAF9] transition-colors duration-150 hover:bg-[#062C21] whitespace-nowrap"
                >
                  <span>Read Munir Pathan’s Full Biography</span>
                  <ArrowRight className="h-4 w-4 text-[#C5A059]" />
                </button>

                <a
                  href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                  className="inline-flex items-center gap-2 border border-[#0A0D0C]/20 bg-white px-5 py-3 font-mono text-xs font-semibold text-[#0A0D0C] transition-colors duration-150 hover:border-[#062C21] hover:text-[#062C21] whitespace-nowrap tabular-nums"
                >
                  <Phone className="h-3.5 w-3.5 text-[#062C21]" />
                  <span>Direct Line: {PRINCIPAL_BROKER.phoneFormatted}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE FEATURED LISTINGS / DEALS SECTION */}
      <section id="featured-mandates" className="border-b border-[#0A0D0C]/10 bg-[#F1F4F2] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#062C21]">
                <span>Active Mandate Portfolio</span>
                <span aria-hidden="true">·</span>
                <span>Curated by Munir Pathan</span>
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0A0D0C] sm:text-4xl">
                Featured Listings &amp; Institutional Deals
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#0A0D0C]/75">
                Inspect representative active mandates currently managed by Deluxe Consultant in Indian Rupees (₹ Crore). Select any asset below to review its financial breakdown and request the watermarked Information Memorandum.
              </p>
            </div>

            {/* Sort Control */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 border border-[#0A0D0C]/15 bg-white px-3.5 py-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[#062C21]" />
                <label htmlFor="deal-sort" className="text-xs text-[#0A0D0C]/65">
                  Sort Mandates:
                </label>
                <select
                  id="deal-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'irr' | 'capRate')}
                  className="bg-transparent text-xs font-semibold text-[#0A0D0C] focus:outline-none"
                >
                  <option value="featured">Principal Priority</option>
                  <option value="irr">Highest Projected IRR</option>
                  <option value="capRate">Highest Cap Rate</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Filter Tabs (Functional Buttons per Constitution) */}
          <div className="mt-8 flex flex-wrap items-center gap-1.5 border-b border-[#0A0D0C]/10 pb-4">
            {DEAL_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isSelected
                      ? 'bg-[#0A0D0C] text-[#C5A059]'
                      : 'bg-white text-[#0A0D0C]/75 hover:bg-[#0A0D0C]/5 hover:text-[#0A0D0C]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Deals Grid */}
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeals.map((deal) => (
              <article
                key={deal.id}
                className="group flex flex-col justify-between border border-[#0A0D0C]/12 bg-white transition-colors duration-150 hover:border-[#062C21]"
              >
                <div>
                  {/* 4:3 Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0D0C]">
                    <ResilientImage
                      src={deal.imageUrl}
                      alt={deal.title}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D0C]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white">
                      <span className="font-mono text-xs text-[#C5A059] tabular-nums">
                        {deal.referenceCode}
                      </span>
                      <span className="font-mono text-lg font-semibold text-white tabular-nums">
                        {deal.priceINR}
                      </span>
                    </div>
                  </div>

                  {/* Card Content — Unboxed Static Metadata per Zero-Pill Discipline */}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#062C21]">
                      <span className="font-medium">{deal.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#0A0D0C]/65">{deal.status}</span>
                    </div>

                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-[#0A0D0C]">
                      {deal.title}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-[#0A0D0C]/60">
                      {deal.location}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-[#0A0D0C]/75">
                      {deal.summary}
                    </p>

                    {/* Tabular Metrics Bar */}
                    <div className="mt-5 grid grid-cols-3 gap-2 border-t border-b border-[#0A0D0C]/10 py-3">
                      <div>
                        <span className="block text-[11px] text-[#0A0D0C]/55">Target IRR</span>
                        <span className="font-mono text-sm font-semibold text-[#062C21] tabular-nums">
                          {deal.projectedIRR}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#0A0D0C]/55">Cap Rate</span>
                        <span className="font-mono text-sm font-semibold text-[#0A0D0C] tabular-nums">
                          {deal.capRate}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#0A0D0C]/55">Scale</span>
                        <span className="font-mono text-xs font-medium text-[#0A0D0C] tabular-nums truncate block">
                          {deal.areaSqFt.split('(')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 pb-6">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenConsultation(`Dossier Request: ${deal.title}`, deal)
                    }
                    className="flex w-full items-center justify-between border border-[#0A0D0C] bg-[#0A0D0C] px-4 py-3 text-xs font-semibold text-[#F9FAF9] transition-colors duration-150 hover:bg-[#062C21] hover:border-[#062C21] whitespace-nowrap"
                  >
                    <span>Inspect Confidential Dossier</span>
                    <ArrowUpRight className="h-4 w-4 text-[#C5A059]" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE ADVISORY & CONSULTING CAPABILITIES (ASYMMETRIC BENTO) */}
      <section className="bg-[#0A0D0C] py-20 text-[#F9FAF9] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-10 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#C5A059]">
                Practice Architecture · Deluxe Consultant
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#F9FAF9] sm:text-4xl">
                Structured Brokerage &amp; Advisory Capabilities
              </h2>
            </div>
            <button
              type="button"
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 border border-[#C5A059] px-5 py-2.5 text-xs font-semibold text-[#C5A059] transition-colors duration-150 hover:bg-[#C5A059] hover:text-[#0A0D0C] whitespace-nowrap"
            >
              <span>Explore All Services &amp; Yield Calculator</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {ADVISORY_SERVICES.map((service, idx) => {
              const isWide = idx === 0 || idx === 3;
              return (
                <div
                  key={service.id}
                  className={`${
                    isWide ? 'lg:col-span-7' : 'lg:col-span-5'
                  } flex flex-col justify-between border border-white/12 bg-[#111715] p-7 transition-colors duration-150 hover:border-[#C5A059]/60`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#C5A059]">
                      <span className="font-mono tabular-nums">Mandate Pillar {service.index}</span>
                      <span className="font-mono font-semibold tabular-nums">{service.proofMetric}</span>
                    </div>

                    <h3 className="mt-3 font-serif text-xl font-semibold text-[#F9FAF9] sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#C5A059]/90">{service.subtitle}</p>

                    <p className="mt-4 text-xs leading-relaxed text-[#F9FAF9]/75">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <span className="text-xs text-[#F9FAF9]/60">
                      Horizon: <strong className="font-normal text-[#F9FAF9]/90">{service.typicalHorizon}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => onOpenConsultation(`Service Inquiry: ${service.title}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A059] hover:underline whitespace-nowrap"
                    >
                      <span>Schedule Mandate Review</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ATTRIBUTABLE CLIENT PROOF & ENDORSEMENTS */}
      <section className="bg-[#F9FAF9] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#062C21]">
              <span>Verified Institutional Track Record</span>
              <span aria-hidden="true">·</span>
              <span>Principal Endorsements</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0A0D0C] sm:text-4xl">
              Quantified Outcomes for High-Net-Worth Principals
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {CLIENT_ENDORSEMENTS.map((item) => (
              <blockquote
                key={item.id}
                className="flex flex-col justify-between border border-[#0A0D0C]/12 bg-white p-7"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#062C21]">
                    <span>{item.mandateCategory}</span>
                  </div>
                  <p className="mt-4 font-serif text-base italic leading-relaxed text-[#0A0D0C]">
                    “{item.quote}”
                  </p>
                </div>

                <footer className="mt-6 border-t border-[#0A0D0C]/10 pt-4">
                  <p className="font-mono text-xs font-semibold text-[#062C21] tabular-nums">
                    {item.outcomeMetric}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#0A0D0C]">
                    {item.clientName}
                  </p>
                  <p className="text-xs text-[#0A0D0C]/65">
                    {item.clientRole} · {item.organization}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Direct Principal Callout Banner */}
          <div className="mt-14 flex flex-col items-start justify-between gap-6 border border-[#062C21] bg-[#062C21] p-8 text-[#F9FAF9] lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <Building2 className="mt-1 h-8 w-8 text-[#C5A059] shrink-0" />
              <div>
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Ready to Discuss an Off-Market Acquisition or Asset Disposition?
                </h3>
                <p className="mt-1 text-sm text-[#F9FAF9]/80">
                  Reach Principal Broker <strong>{PRINCIPAL_BROKER.name}</strong> directly on his private desk at{' '}
                  <span className="font-mono font-semibold text-[#C5A059] tabular-nums">
                    {PRINCIPAL_BROKER.phoneRaw}
                  </span>{' '}
                  or book an encrypted executive consultation.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                className="inline-flex items-center gap-2 border border-white/25 bg-[#0A0D0C] px-5 py-3 font-mono text-xs font-semibold text-[#C5A059] hover:border-[#C5A059] whitespace-nowrap tabular-nums"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call {PRINCIPAL_BROKER.phoneRaw}</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenConsultation('Private Consultation with Munir Pathan')}
                className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#C5A059] px-6 py-3 text-xs font-semibold text-[#0A0D0C] hover:bg-[#DFC286] whitespace-nowrap"
              >
                <span>Schedule a Private Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
