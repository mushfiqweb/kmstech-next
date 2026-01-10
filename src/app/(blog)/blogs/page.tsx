/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPosts, Post } from '@/lib/hashnode';
import BlogCard from '@/components/blog/BlogCard';
import styles from '@/components/blog/blog.module.css';
import Pagination from '@/components/blog/Pagination';

interface BlogsPageProps {
    searchParams: Promise<{ after?: string; page?: string }>;
}

export const metadata = {
    title: 'Blog | KMS Tech',
    description: 'Latest insights, tutorials, and updates from KMS Tech.',
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
    const params = await searchParams;
    const afterCursor = params.after || undefined;
    const currentPage = params.page ? parseInt(params.page) : 1;

    const postsData = await getPosts(6, afterCursor);

    if (!postsData) {
        return (
            <main className={styles.singlePostContainer} style={{ textAlign: 'center' }}>
                <h1 className={styles.postTitle}>Blog</h1>
                <p>Failed to load posts. Please try again later.</p>
            </main>
        );
    }

    const { edges, pageInfo } = postsData;
    const posts = edges.map((edge) => edge.node);

    return (
        <main>
            {/* Simple Header for grid view */}
            {/* Simple Header for grid view */}
            <div className={styles.blogPageHeader}>
                <h3 className={styles.blogPageSubtitle}>
                    Latest updates and technical insights
                </h3>
            </div>

            <div className={styles.blogGrid}>
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>

            <Pagination
                hasNextPage={pageInfo.hasNextPage}
                endCursor={pageInfo.endCursor}
                currentPage={currentPage}
            />
        </main>
    );
}
