'use client';

import styles from './blog.module.css';

export function BlogFooter() {
    return (
        <footer className={styles.blogFooter}>
            <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                    <p>&copy; {new Date().getFullYear()} KMS Tech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
