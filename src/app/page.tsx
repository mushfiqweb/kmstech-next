'use client';

import React, { useState } from 'react';
import { MainLogo } from '@/components/MainLogo';
import { SVGLayer } from '@/components/SVGLayer';
import { Modal } from '@/components/Modal';

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeModal, setActiveModal] = useState('');
  const [currentYear] = useState(new Date().getFullYear());

  const closeModal = () => setActiveModal('');

  // Content for modals
  const renderModalContent = () => {
    switch (activeModal) {
      case 'about':
        return (
          <>
            <section className="about-section">
              <h2>Brief Insight</h2>
              <p><strong>KMS Tech</strong> is like a blessing to us, a mercy from The Almighty (SWT) for the sake of His Holy Prophet (SAW), Sacred Progeny (AS), and His Beloveds (RA), we believe!</p>
              <p>There is a divine story behind its naming and formation.</p>
              <p>The full-form of <strong>K</strong> <strong>M</strong> <strong>S</strong> is actually the Core part of the name of a great Sufi saint of this sub-continent: 'Hazrat Allama Shah Sufi <strong>K</strong>hwaja <strong>M</strong>ohammad <strong>S</strong>ayefuddin Naqshebondi Mujaddedi Enayetpuri Shamvugonji (R.)!' The founder of KMS Tech is a direct descendant and disciple of Him.</p>
            </section>
            <section className="about-section">
              <h2>Our Principles</h2>
              <h3>Mission</h3>
              <ul>
                <li>To be honest with our beliefs and work accordingly</li>
                <li>Prospect with integrity, motto with morality</li>
                <li>Your satisfaction is our priority, and our success relies on your success</li>
                <li>Secure, reliable & optimized IT solutions</li>
              </ul>
            </section>
          </>
        );
      case 'blog':
        return (
          <section className="about-section">
            <h2>Recent Articles</h2>
            <ul>
                <li><a href="#" style={{color: '#00d466'}}>Introducing KMS Tech</a></li>
                <li><a href="#" style={{color: '#00d466'}}>PWA Offline Capabilities</a></li>
                <li><a href="#" style={{color: '#00d466'}}>Performance and Accessibility</a></li>
            </ul>
          </section>
        );
      case 'services':
        return (
            <section className="about-section">
                <h2>What We Offer</h2>
                <ul>
                    <li>Technology Consulting — Strategy, architecture, and roadmaps</li>
                    <li>Marketplace Platform — Design, development, and optimization</li>
                    <li>Custom Software — Web apps, APIs, integrations</li>
                    <li>Performance & Accessibility — Audits and improvements</li>
                    <li>PWA Enablement — Offline capabilities and installable apps</li>
                </ul>
            </section>
        );
      case 'concerns':
        return (
            <section className="about-section">
                <h2>Common Questions</h2>
                <ul>
                    <li>How do you ensure security? We apply strict headers, audits, and best practices.</li>
                    <li>Do you support offline use? Yes, full PWA with service worker caching.</li>
                    <li>Can you integrate with existing systems? Yes, via APIs and custom connectors.</li>
                    <li>What about performance? Continuous profiling and Web Vitals monitoring.</li>
                </ul>
            </section>
        );
      case 'contact':
        return (
            <section>
                <div className="contact-card">
                    <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); closeModal(); }}>
                        <div className="form-row">
                            <label htmlFor="contact-name">Name</label>
                            <input id="contact-name" name="name" type="text" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="contact-email">Email</label>
                            <input id="contact-email" name="email" type="email" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="contact-message">Message</label>
                            <textarea id="contact-message" name="message" rows={4} required></textarea>
                        </div>
                        <div className="form-actions" style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <button type="submit" className="btn-submit">Send</button>
                        </div>
                    </form>
                </div>
            </section>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch(activeModal) {
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
        <div className="top-quote-container">
            <p className="top-quote-text">God, His angels and all those in heavens and on earth</p>
            <p className="top-quote-text">even ants in their hills and fish in the water</p>
            <p className="top-quote-text">call down blessings on those who instruct others in beneficial knowledge</p>
            <p className="top-quote-text" style={{ textAlign: 'right', marginTop: '4px' }}>~ (Holy Prophet, The Merciful SAW)</p>
        </div>

        <div className="center-group">
            <MainLogo />

            {/* Content Stack: Nav Links + Footer Info */}
            <div className="content-stack">
                <button className="nav-link" onClick={() => setActiveModal('about')}>About Us</button>
                <button className="nav-link" onClick={() => setActiveModal('blog')}>Blog</button>
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
        >
            {renderModalContent()}
        </Modal>

      </main>
    </>
  );
}
