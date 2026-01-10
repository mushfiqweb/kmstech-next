'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './blog.module.css';
import { Home } from 'lucide-react';

export function BlogHeader() {
    const pathname = usePathname();

    return (
        <header className={styles.blogHeader}>
            <div className={styles.headerContent}>
                <Link href="/" className={styles.headerLogo}>
                    <Image
                        src="/KMS.png"
                        alt="KMS Tech"
                        width={400}
                        height={40}
                        style={{ width: 'auto', height: '40px' }}
                        priority
                    />
                </Link>
            </div>
        </header>
    );
}
