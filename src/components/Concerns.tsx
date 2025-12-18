'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export const Concerns = () => {
  const [kmsError, setKmsError] = useState(false);
  const [bgreenError, setBgreenError] = useState(false);

  return (
    <section className="about-section">
      <h2>Our Other Concerns</h2>
      <div className="concerns-logos">
        
        <a 
          href="https://kmsmarketplace.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="concern-link"
          aria-label="Visit KMS Marketplace"
        >
          {kmsError ? (
             <div className="logo-fallback">KMS Marketplace</div>
          ) : (
            <Image 
                src="/kms-mp.svg" 
                alt="KMS Marketplace Logo" 
                width={200} 
                height={100}
                className="concern-logo"
                onError={() => setKmsError(true)}
            />
          )}
        </a>

        <a 
          href="https://beneathgreen.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="concern-link"
          aria-label="Visit Beneath Green"
        >
          {bgreenError ? (
             <div className="logo-fallback">Beneath Green</div>
          ) : (
            <Image 
                src="/KMS_BG-white.png" 
                alt="Beneath Green Logo" 
                width={250} 
                height={150}
                className="concern-logo"
                onError={() => setBgreenError(true)}
            />
          )}
        </a>
      </div>
    </section>
  );
};
