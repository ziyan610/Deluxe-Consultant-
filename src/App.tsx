/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DealListing, PageId } from './data/brokerageData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { InsightsPage } from './pages/InsightsPage';
import { ContactPage } from './pages/ContactPage';

const VALID_PAGES: PageId[] = ['home', 'about', 'services', 'insights', 'contact'];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(() => {
    const hash = window.location.hash.replace('#', '') as PageId;
    return VALID_PAGES.includes(hash) ? hash : 'home';
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState('Private Consultation with Munir Pathan');
  const [modalDeal, setModalDeal] = useState<DealListing | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (VALID_PAGES.includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.history.pushState(null, '', `#${page}`);
  };

  const handleOpenConsultation = (subject?: string, deal?: DealListing) => {
    setModalSubject(subject || 'Private Consultation with Munir Pathan');
    setModalDeal(deal || null);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAF9] text-[#0A0D0C]">
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenConsultationModal={(subject) => handleOpenConsultation(subject)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenConsultation={(subject) => handleOpenConsultation(subject)}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onOpenConsultation={(subject) => handleOpenConsultation(subject)}
          />
        )}

        {activePage === 'insights' && (
          <InsightsPage
            onOpenConsultation={(subject) => handleOpenConsultation(subject)}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenConsultationModal={(subject) => handleOpenConsultation(subject)}
      />

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialSubject={modalSubject}
        selectedDeal={modalDeal}
      />
    </div>
  );
}
