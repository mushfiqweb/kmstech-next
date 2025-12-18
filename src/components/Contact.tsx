import React from 'react';

interface ContactProps {
  onClose: () => void;
}

export const Contact = ({ onClose }: ContactProps) => {
  return (
    <section>
      <div className="contact-card">
        <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); onClose(); }}>
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
          <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-submit">Send</button>
          </div>
        </form>
      </div>
    </section>
  );
};
