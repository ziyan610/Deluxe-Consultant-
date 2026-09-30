import React from 'react';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { PageId, PRINCIPAL_BROKER } from '../data/brokerageData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultationModal: (subject?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultationModal,
}) => {
  const handlePageJump = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#0A0D0C] text-[#F9FAF9]">
      {/* Upper Pre-Footer Conversion Band */}
      <div className="border-b border-white/10 bg-[#062C21]/40">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-6 px-4 py-12 sm:px-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-[#C5A059]">
              Principal-Led Discretion · Bilateral Execution
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#F9FAF9] sm:text-3xl">
              Initiate a Confidential Mandate Briefing with Munir Pathan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#F9FAF9]/75">
              Speak directly with Principal Broker Munir Pathan regarding off-market commercial towers, trophy estates, or structured joint ventures.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
              className="inline-flex items-center gap-2.5 border border-white/20 bg-[#111715] px-5 py-3 font-mono text-xs font-medium text-[#F9FAF9] transition-colors duration-150 hover:border-[#C5A059] hover:text-[#C5A059] whitespace-nowrap tabular-nums"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
              <span>Call Direct: {PRINCIPAL_BROKER.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenConsultationModal('Direct Principal Briefing — Munir Pathan')}
              className="inline-flex items-center gap-2 border border-[#C5A059] bg-[#C5A059] px-6 py-3 text-xs font-semibold tracking-wide text-[#0A0D0C] transition-colors duration-150 hover:bg-[#DFC286] whitespace-nowrap"
            >
              <span>Connect with Munir Pathan</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-[1360px] px-4 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Principal Identity */}
          <div className="lg:col-span-5">
            <button
              type="button"
              onClick={() => handlePageJump('home')}
              className="font-serif text-2xl font-semibold tracking-tight text-[#F9FAF9]"
            >
              Deluxe Consultant
            </button>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#F9FAF9]/70">
              An elite private brokerage and strategic capital advisory firm owned and led by Principal Broker{' '}
              <span className="font-semibold text-[#F9FAF9]">{PRINCIPAL_BROKER.name}</span>. Representing sovereign investors, family offices, and high-net-worth principals across landmark real estate and corporate mandates.
            </p>
            <div className="mt-5 space-y-2 text-xs text-[#F9FAF9]/75">
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                <span>Owner & Principal Desk: </span>
                <a
                  href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
                  className="font-mono font-semibold text-[#C5A059] hover:underline tabular-nums"
                >
                  {PRINCIPAL_BROKER.phoneFormatted} ({PRINCIPAL_BROKER.phoneRaw})
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                <a
                  href={`mailto:${PRINCIPAL_BROKER.email}`}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  {PRINCIPAL_BROKER.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-[#C5A059] shrink-0" />
                <span>{PRINCIPAL_BROKER.headquarters}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Mirror */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-sm font-semibold tracking-wide text-[#C5A059]">
              Firm Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F9FAF9]/75">
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('home')}
                  className="hover:text-[#F9FAF9] transition-colors"
                >
                  Home & Featured Mandates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('about')}
                  className="hover:text-[#F9FAF9] transition-colors"
                >
                  About Us & Munir Pathan Biography
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('services')}
                  className="hover:text-[#F9FAF9] transition-colors"
                >
                  Brokerage & Advisory Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('insights')}
                  className="hover:text-[#F9FAF9] transition-colors"
                >
                  Market Insights & Whitepapers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('contact')}
                  className="hover:text-[#F9FAF9] transition-colors"
                >
                  Contact & Calendar Booking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Practice Areas */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-sm font-semibold tracking-wide text-[#C5A059]">
              Primary Practice Mandates
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-[#F9FAF9]/75">
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('services')}
                  className="text-left hover:text-[#F9FAF9] transition-colors"
                >
                  01. Off-Market Trophy Estates & Sky Residences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('services')}
                  className="text-left hover:text-[#F9FAF9] transition-colors"
                >
                  02. Grade-A Commercial Towers & REIT Dispositions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('services')}
                  className="text-left hover:text-[#F9FAF9] transition-colors"
                >
                  03. Joint Development (JDA) & Capital Structuring
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePageJump('services')}
                  className="text-left hover:text-[#F9FAF9] transition-colors"
                >
                  04. Family Office Real Asset Rebalancing
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Attribution Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#F9FAF9]/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Deluxe Consultant. Owned and led by Principal Broker Munir Pathan. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Confidential NDA Protocol</span>
            <span aria-hidden="true">·</span>
            <span>Fiduciary Advisory</span>
            <span aria-hidden="true">·</span>
            <a
              href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
              className="font-mono text-[#C5A059] hover:underline tabular-nums"
            >
              Desk: {PRINCIPAL_BROKER.phoneRaw}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
