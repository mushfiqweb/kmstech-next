'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MainLogo } from '@/components/MainLogo';
import { SVGLayer } from '@/components/SVGLayer';
import { Modal } from '@/components/Modal';
import { TopQuote } from '@/components/TopQuote';
import { About } from '@/components/About';
import { Blog } from '@/components/Blog';
import { Services } from '@/components/Services';
import { Concerns } from '@/components/Concerns';
import { Contact } from '@/components/Contact';
import { TransitionLink } from '@/components/TransitionLink';
// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeModal, setActiveModal] = useState('');
  const [currentYear] = useState(new Date().getFullYear());

  const closeModal = () => setActiveModal('');

  // Content for modals
  const renderModalContent = () => {
    switch (activeModal) {
      case 'about':
        return <About />;
      case 'blog':
        return <Blog />;
      case 'services':
        return <Services />;
      case 'concerns':
        return <Concerns />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (activeModal) {
      case 'about': return 'About Us';
      case 'blog': return 'Blog';
      case 'services': return 'Services';
      case 'concerns': return 'Concerns';
      case 'contact': return 'Contact';
      default: return '';
    }
  };

  return (
    <>
      <main>
        <SVGLayer />

        {/* Top Quote Section - Aligned with Logo */}
        <TopQuote />

        <div className="center-group">
          <MainLogo />

          {/* Content Stack: Nav Links + Footer Info */}
          <div className="content-stack">
            <button className="nav-link" onClick={() => setActiveModal('about')}>About</button>
            <TransitionLink href="/blogs" className="nav-link">Blogs</TransitionLink>
            <button className="nav-link" onClick={() => setActiveModal('concerns')}>Concerns</button>
            <button className="nav-link" onClick={() => setActiveModal('contact')}>Contact</button>
            <button className="nav-link" onClick={() => setActiveModal('services')}>Services</button>

            {/* Footer Content moved inside stack for equal spacing */}
            <span className="footer-copyright">
              {currentYear} © KMS Tech
            </span>

            <div className="trade-license">
              <span>Trade License: TRAD/DNCC/131256/2022</span>
            </div>
          </div>
        </div>

        <Modal
          isOpen={!!activeModal}
          onClose={closeModal}
          title={getModalTitle()}
          className={activeModal === 'services' ? 'services-modal' : activeModal === 'about' ? 'about-modal' : ''}
        >
          {renderModalContent()}
        </Modal>

      </main>
    </>
  );
}
