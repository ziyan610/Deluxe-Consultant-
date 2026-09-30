import React from 'react';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND_IMAGES, PageId, PRINCIPAL_BROKER } from '../data/brokerageData';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (subject?: string) => void;
}

const CAREER_MILESTONES = [
  {
    index: '01',
    period: 'Foundation & Institutional Origination',
    title: '01. Mastering Bilateral Real Asset Structuring',
    description:
      'Munir Pathan established his reputation advising industrialist promoters and corporate treasuries on high-value commercial land aggregations and Clear-Title SPV transfers, identifying early that high-net-worth principals were underserved by volume-driven retail brokerages.',
  },
  {
    index: '02',
    period: 'Establishment of Deluxe Consultant',
    title: '02. Founding Deluxe Consultant as a Principal-Only Practice',
    description:
      'Founded Deluxe Consultant with an uncompromising mandate: restrict active engagements to a curated roster of high-conviction mandates at any given time so every client receives Munir Pathan’s direct table presence and negotiation stewardship.',
  },
  {
    index: '03',
    period: 'Sovereign & Family Office Expansion',
    title: '03. Cross-Border Capital & Trophy Asset Advisory',
    description:
      'Expanded the firm’s advisory scope to encompass Grade-A LEED-Platinum office towers, structured Joint Development Agreements (JDAs), and generational sky residences for domestic and international family offices.',
  },
  {
    index: '04',
    period: '2026 Landmark Milestone',
    title: '04. Surpassing ₹79.5 Crore in Cumulative Mandate Volume',
    description:
      'Recognized for executing 42 confidential off-market closings between 2023 and 2026 with a 96.4% repeat principal retention rate and zero litigation or post-closing title disputes.',
  },
];

const EXCELLENCE_BENCHMARKS = [
  {
    dimension: 'Mandate Origination Channel',
    conventionalBrokerage: 'Public listing portals & multi-broker syndication',
    deluxeStandard: '78% off-market bilateral principal-to-principal desk',
  },
  {
    dimension: 'Negotiation Representation',
    conventionalBrokerage: 'Delegated to junior account managers after pitch',
    deluxeStandard: '100% led personally by Principal Broker Munir Pathan',
  },
  {
    dimension: 'Pre-Marketing Due Diligence',
    conventionalBrokerage: 'Reliance on seller-provided brochure representations',
    deluxeStandard: 'Independent 40-point title, FSI, covenant & DCF audit',
  },
  {
    dimension: 'Confidentiality & Data Room Control',
    conventionalBrokerage: 'Unrestricted circulation of property teasers',
    deluxeStandard: 'Watermarked dossiers released strictly post-NDA verification',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  return (
    <div>
      {/* 1. EDITORIAL HERO */}
      <section className="border-b border-white/10 bg-[#0A0D0C] py-16 text-[#F9FAF9] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#C5A059]">
              <span>About Deluxe Consultant</span>
              <span aria-hidden="true">·</span>
              <span>Principal Leadership</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">Direct: {PRINCIPAL_BROKER.phoneRaw}</span>
            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#F9FAF9] sm:text-5xl">
              An Institutional Standard of Discretion, Precision, and Principal Stewardship
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[#F9FAF9]/80 sm:text-lg">
              Deluxe Consultant was founded on a singular conviction: ultra-high-net-worth individuals, family offices, and institutional asset owners deserve a brokerage partner who thinks like a fiduciary principal rather than a commissioned intermediary.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROMINENT BIOGRAPHY OF PRINCIPAL BROKER MUNIR PATHAN */}
      <section className="border-b border-[#0A0D0C]/10 bg-[#F9FAF9] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
            {/* Left Column: Executive Portrait / Suite Card & Direct Contact */}
            <div className="lg:col-span-5">
              <div className="border border-[#0A0D0C]/15 bg-[#0A0D0C] p-4 text-[#F9FAF9]">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={BRAND_IMAGES.executiveOffice}
                    alt="Executive Suite of Principal Broker Munir Pathan at Deluxe Consultant"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-5 border-t border-white/10 pt-5 px-2 pb-2">
                  <p className="text-xs font-medium text-[#C5A059]">
                    Founder &amp; Principal Broker
                  </p>
                  <h2 className="mt-1 font-serif text-2xl font-semibold tracking-tight text-white">
                    {PRINCIPAL_BROKER.name}
                  </h2>
                  <p className="mt-1 text-xs text-[#F9FAF9]/70">
                    Deluxe Consultant · Private Client &amp; Institutional Mandates
                  </p>

                  <div className="mt-5 space-y-2.5 border-t border-white/10 pt-4 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#F9FAF9]/60">Owner Direct Line:</span>
                      <a
                        href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                        className="inline-flex items-center gap-1.5 font-mono font-semibold text-[#C5A059] hover:underline tabular-nums"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        <span>{PRINCIPAL_BROKER.phoneFormatted} ({PRINCIPAL_BROKER.phoneRaw})</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#F9FAF9]/60">Executive Desk Email:</span>
                      <a
                        href={`mailto:${PRINCIPAL_BROKER.email}`}
                        className="inline-flex items-center gap-1.5 text-[#F9FAF9] hover:text-[#C5A059]"
                      >
                        <Mail className="h-3.5 w-3.5 text-[#C5A059]" />
                        <span>{PRINCIPAL_BROKER.email}</span>
                      </a>
                    </div>
                    <div className="flex items-start justify-between gap-4 pt-1">
                      <span className="text-[#F9FAF9]/60 shrink-0">Executive Address:</span>
                      <span className="inline-flex items-start gap-1.5 text-right text-[#F9FAF9]/90">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                        <span>{PRINCIPAL_BROKER.headquarters}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenConsultation('Direct Principal Consultation — Munir Pathan')
                      }
                      className="flex w-full items-center justify-center gap-2 border border-[#C5A059] bg-[#C5A059] px-5 py-3 text-xs font-semibold text-[#0A0D0C] transition-colors duration-150 hover:bg-[#DFC286] whitespace-nowrap"
                    >
                      <span>Connect with Munir Pathan</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Comprehensive Biography & Leadership Philosophy */}
            <div className="lg:col-span-7 lg:pl-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#062C21]">
                <span>Executive Biography</span>
                <span aria-hidden="true">·</span>
                <span>Leadership Profile</span>
              </div>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0A0D0C] sm:text-4xl">
                Munir Pathan: Architecting High-Conviction Real Asset Mandates
              </h2>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#0A0D0C]/80">
                <p>
                  As Founder and Principal Broker of{' '}
                  <strong className="font-semibold text-[#0A0D0C]">Deluxe Consultant</strong>,{' '}
                  <strong className="font-semibold text-[#062C21]">{PRINCIPAL_BROKER.name}</strong> has spent his career redefining how landmark real estate and structured commercial transactions are executed for private wealth and institutional balance sheets.
                </p>
                <p>
                  Where traditional brokerage firms prioritize listing volume and public marketing exposure, Munir Pathan built Deluxe Consultant around an entirely different premise: the most valuable assets in prime metropolitan corridors change hands quietly, between thoroughly vetted principals, backed by institutional-grade financial underwriting.
                </p>
                <p>
                  Known among family office CIOs and industrialist promoters for his clinical command of valuation mechanics, Floor Space Index (FSI) regulations, Joint Development waterfalls, and sovereign lease covenants, Munir personally leads every mandate from initial underwriting to definitive deed registration.
                </p>
              </div>

              {/* Personal Principal Quote */}
              <blockquote className="mt-8 border-l-2 border-[#062C21] bg-[#F1F4F2] p-6">
                <p className="font-serif text-lg italic leading-relaxed text-[#0A0D0C]">
                  “When a family office or corporate principal entrusts Deluxe Consultant with a ₹200 Crore acquisition or a generational estate disposition, they are not hiring a marketing agency—they are retaining my personal judgment, my private network, and my unyielding commitment to protecting their capital.”
                </p>
                <footer className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#062C21]">
                    — {PRINCIPAL_BROKER.name}, Founder &amp; Principal Broker
                  </span>
                  <span className="font-mono text-[#0A0D0C]/65 tabular-nums">
                    Direct: {PRINCIPAL_BROKER.phoneRaw}
                  </span>
                </footer>
              </blockquote>

              {/* Core Areas of Mastery */}
              <div className="mt-8">
                <h3 className="font-serif text-lg font-semibold text-[#0A0D0C]">
                  Areas of Direct Principal Specialization
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    'Bilateral Off-Market Commercial Tower & Floor Plate Transfers',
                    'Ultra-Prime Sky Residences & Coastal Sanctuary Dispositions',
                    'Joint Development Agreements (JDA) & Land Monetization',
                    'Triple-Net (NNN) REIT-Grade Leased Asset Sourcing',
                    'Family Office Real Estate Portfolio Yield Optimization',
                    'Cross-Border NRI & Sovereign Wealth Real Asset Structuring',
                  ].map((specialty) => (
                    <div
                      key={specialty}
                      className="flex items-start gap-2.5 border border-[#0A0D0C]/10 bg-white p-3.5 text-xs text-[#0A0D0C]/85"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#062C21] shrink-0" />
                      <span>{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEADERSHIP TRAJECTORY & MILESTONES */}
      <section className="border-b border-[#0A0D0C]/10 bg-[#F1F4F2] py-20 lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#062C21]">
              Institutional Pedigree
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0A0D0C] sm:text-4xl">
              Leadership Trajectory &amp; Firm Milestones
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {CAREER_MILESTONES.map((item) => (
              <div
                key={item.index}
                className="border border-[#0A0D0C]/12 bg-white p-7"
              >
                <div className="flex items-center justify-between text-xs text-[#062C21]">
                  <span className="font-mono font-semibold tabular-nums">Chapter {item.index}</span>
                  <span>{item.period}</span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold text-[#0A0D0C]">
                  {item.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#0A0D0C]/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE DELUXE CONSULTANT STANDARD OF EXCELLENCE (COMPARATIVE TABLE) */}
      <section className="bg-[#0A0D0C] py-20 text-[#F9FAF9] lg:py-24">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-[#C5A059]">
              <ShieldCheck className="h-4 w-4" />
              <span>The Deluxe Consultant Standard</span>
            </div>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#F9FAF9] sm:text-4xl">
              Why High-Net-Worth Principals Choose Deluxe Consultant
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#F9FAF9]/75">
              A transparent comparison between conventional volume brokerage and our principal-led advisory protocol.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto border border-white/15 bg-[#111715]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/15 bg-[#062C21]/50 text-xs font-semibold text-[#C5A059]">
                  <th className="py-4 px-6">Advisory Dimension</th>
                  <th className="py-4 px-6 text-[#F9FAF9]/70">Conventional Brokerage</th>
                  <th className="py-4 px-6 text-[#C5A059]">
                    Deluxe Consultant (Munir Pathan)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs">
                {EXCELLENCE_BENCHMARKS.map((row) => (
                  <tr key={row.dimension} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#F9FAF9]">
                      {row.dimension}
                    </td>
                    <td className="py-4 px-6 text-[#F9FAF9]/60">
                      {row.conventionalBrokerage}
                    </td>
                    <td className="py-4 px-6 font-medium text-[#C5A059]">
                      {row.deluxeStandard}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
            <div className="text-xs text-[#F9FAF9]/75">
              Direct Principal Inquiries:{' '}
              <a
                href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                className="font-mono font-semibold text-[#C5A059] hover:underline tabular-nums"
              >
                {PRINCIPAL_BROKER.phoneFormatted} ({PRINCIPAL_BROKER.phoneRaw})
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  onNavigate('services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="border border-white/25 px-5 py-3 text-xs font-semibold text-[#F9FAF9] hover:border-[#C5A059] whitespace-nowrap"
              >
                Review Our Advisory Services
              </button>
              <button
                type="button"
                onClick={() => onOpenConsultation('Schedule a Private Consultation with Munir Pathan')}
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
