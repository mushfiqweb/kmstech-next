import { getPost, Post } from '@/lib/hashnode';
import BlogContent from '@/components/blog/BlogContent';
import ShareLinks from '@/components/blog/ShareLinks';
import styles from '@/components/blog/blog.module.css';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | KMS Tech Blog`,
        description: post.brief,
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.brief,
            images: post.coverImage?.url ? [{ url: post.coverImage.url }] : [],
            publishedTime: post.publishedAt,
            authors: [post.author.name],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.brief,
            images: post.coverImage?.url ? [post.coverImage.url] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.singlePostContainer}>
            <header className={styles.postHeader}>
                <h1 className={styles.postTitle}>{post.title}</h1>

                <div className={styles.postMeta}>
                    <div className={styles.metaHeader}>
                        <Link href="/blogs" className={styles.backLink} aria-label="Back to Blogs">
                            <ArrowLeft size={16} />
                            <span>Back to Blogs</span>
                        </Link>

                        <div className={styles.authorInfo}>
                            {post.author.profilePicture && (
                                <Image
                                    src={post.author.profilePicture}
                                    alt={post.author.name}
                                    width={32}
                                    height={32}
                                    className={styles.authorAvatar}
                                />
                            )}
                            <span>{post.author.name}</span>
                        </div>
                    </div>

                    <div className={styles.metaStats}>
                        <div className={styles.readTime}>
                            <Calendar size={16} />
                            <span style={{ marginRight: 8, marginLeft: 4 }}>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
                        </div>

                        <div className={styles.readTime}>
                            <Clock size={16} />
                            <span style={{ marginLeft: 4 }}>{post.readTimeInMinutes} min read</span>
                        </div>

                        <div className={styles.readTime}>
                            <Eye size={16} />
                            <span style={{ marginLeft: 4 }}>{post.views} views</span>
                        </div>
                    </div>
                </div>
            </header>

            {
                post.coverImage?.url && (
                    <div className={styles.coverImageWrapper} style={{ marginBottom: '40px', borderRadius: '16px' }}>
                        <Image
                            src={post.coverImage.url}
                            alt={post.title}
                            fill
                            className={styles.coverImage}
                            sizes="(max-width: 1200px) 100vw, 800px"
                            priority
                        />
                    </div>
                )
            }

            <BlogContent content={post.content.html} markdown={post.content.markdown} />

            {
                post.tags && post.tags.length > 0 && (
                    <div style={{ marginTop: '40px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {post.tags.map(tag => (
                            <span key={tag.slug} style={{
                                background: 'rgba(255,255,255,0.1)',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                color: '#ccc'
                            }}>
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                )
            }

            <ShareLinks
                title={post.title}
                url={`https://kmstech.co/blog/${post.slug}`}
            />
        </article >
    );
}
