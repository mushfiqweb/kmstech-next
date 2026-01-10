'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import { ReactNode } from 'react';

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export const TransitionLink = ({ href, children, className }: TransitionLinkProps) => {
    const router = useRouter();

    const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();

        // Target the main content wrapper
        const mainContent = document.querySelector('main');

        if (mainContent) {
            // Elegant fade out + scale down effect
            gsap.to(mainContent, {
                opacity: 0,
                scale: 0.98,
                duration: 0.4,
                ease: 'power2.inOut',
                onComplete: () => {
                    router.push(href);
                },
            });
        } else {
            // Fallback if main not found
            router.push(href);
        }
    };

    return (
        <Link
            href={href}
            className={className}
            onClick={handleTransition}
            passHref
        >
            {children}
        </Link>
    );
};
