import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogFooter } from '@/components/blog/BlogFooter';
import { SVGLayer } from '@/components/SVGLayer';
import styles from '@/components/blog/blog.module.css';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.blogLayout}>
            <SVGLayer />
            <BlogHeader />
            <main className={styles.blogMain}>
                {children}
            </main>
            <BlogFooter />
        </div>
    );
}
