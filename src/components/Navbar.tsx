import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { PageId, PRINCIPAL_BROKER } from '../data/brokerageData';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenConsultationModal: (defaultSubject?: string) => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'insights', label: 'Insights' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenConsultationModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-white/10 bg-[#0A0D0C]/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1360px] items-center justify-between px-4 sm:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-serif text-xl font-semibold tracking-tight text-[#F9FAF9] transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059] whitespace-nowrap"
        >
          Deluxe Consultant
        </button>

        {/* Zone 2: 5 clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A059] ${
                  isActive
                    ? 'text-[#C5A059] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-[#C5A059]'
                    : 'text-[#F9FAF9]/80 hover:text-[#F9FAF9] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#C5A059]/70 hover:after:w-full after:transition-all after:duration-150'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
            className="hidden xl:inline-flex items-center gap-2 px-3 py-2 font-mono text-xs font-medium text-[#F9FAF9]/90 transition-colors duration-150 hover:text-[#C5A059] whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]"
            title="Direct Desk — Principal Broker Munir Pathan"
          >
            <Phone className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>{PRINCIPAL_BROKER.phoneFormatted}</span>
          </a>

          <button
            type="button"
            onClick={() => onOpenConsultationModal('Private Consultation with Munir Pathan')}
            className="hidden sm:inline-flex items-center justify-center border border-[#C5A059] bg-[#062C21] px-4 py-2 text-xs font-semibold tracking-wide text-[#F9FAF9] transition-colors duration-150 hover:bg-[#0A3D2E] hover:border-[#DFC286] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059] whitespace-nowrap shrink-0"
          >
            Schedule a Private Consultation
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center text-[#F9FAF9] md:hidden focus-visible:outline-2 focus-visible:outline-[#C5A059]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-white/15 bg-[#0A0D0C] px-4 pt-3 pb-6 md:hidden">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex w-full items-center justify-between border-b border-white/5 py-3 text-left text-base font-medium transition-colors ${
                    isActive ? 'text-[#C5A059]' : 'text-[#F9FAF9]/85 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="font-mono text-xs text-[#C5A059]">Active</span>}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href={`tel:${PRINCIPAL_BROKER.phoneRaw}`}
              className="flex items-center justify-center gap-2 border border-white/15 bg-[#111715] px-4 py-3 font-mono text-xs font-medium text-[#F9FAF9] tabular-nums"
            >
              <Phone className="h-4 w-4 text-[#C5A059]" />
              <span>Direct Desk (Munir Pathan): {PRINCIPAL_BROKER.phoneFormatted}</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultationModal('Private Consultation with Munir Pathan');
              }}
              className="w-full border border-[#C5A059] bg-[#062C21] px-4 py-3 text-center text-xs font-semibold tracking-wide text-[#F9FAF9] hover:bg-[#0A3D2E] whitespace-nowrap"
            >
              Schedule a Private Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
