import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFileContract } from 'react-icons/fa';

export const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-card">
        <h3 className="company-name">KMS Tech</h3>
          <div className="contact-details">
            <a 
              href="https://wa.me/8801711741953" 
              className="contact-item" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp with +880 1711 741 953"
            >
              <FaWhatsapp className="icon whatsapp-icon" />
              <p>+880 1711 741 953</p>
            </a>
            
            <a 
              href="tel:+8801911256358" 
              className="contact-item"
              aria-label="Call +880 1911 256 358"
            >
              <FaPhone className="icon phone-icon" />
              <p>+880 1911 256 358</p>
            </a>
            
            <a 
              href="mailto:info@kmstech.co" 
              className="contact-item"
              aria-label="Email info@kmstech.co"
            >
              <FaEnvelope className="icon email-icon" />
              <p>info@kmstech.co</p>
            </a>
            
            <a 
              href="https://maps.app.goo.gl/2L7NCNNJH9XowiMcA" 
              className="contact-item" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View location on Google Maps"
            >
              <FaMapMarkerAlt className="icon location-icon" />
              <p className="address">House# 231, Ward# 38, Satarkul Road, North Badda, Dhaka, Bangladesh</p>
            </a>

            <div className="contact-item" style={{ cursor: 'default' }}>
              <FaFileContract className="icon" />
              <p>Trade License: TRAD/DNCC/131256/2022</p>
            </div>
          </div>
      </div>
    </section>
  );
};
