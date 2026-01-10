'use client';

import { Twitter, Facebook, Linkedin, Link as LinkIcon, Check } from 'lucide-react';
import { useState } from 'react';
import styles from './blog.module.css';

interface ShareLinksProps {
    title: string;
    url: string; // Absolute URL
}

export default function ShareLinks({ title, url }: ShareLinksProps) {
    const [copied, setCopied] = useState(false);

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnLinkedin = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className={styles.shareSection}>
            <h3>Share this post</h3>
            <div className={styles.shareButtons}>
                <button onClick={shareOnTwitter} className={styles.shareButton} aria-label="Share on Twitter">
                    <Twitter size={20} />
                </button>
                <button onClick={shareOnFacebook} className={styles.shareButton} aria-label="Share on Facebook">
                    <Facebook size={20} />
                </button>
                <button onClick={shareOnLinkedin} className={styles.shareButton} aria-label="Share on LinkedIn">
                    <Linkedin size={20} />
                </button>
                <button onClick={copyLink} className={styles.shareButton} aria-label="Copy Link">
                    {copied ? <Check size={20} /> : <LinkIcon size={20} />}
                </button>
            </div>
        </div>
    );
}
