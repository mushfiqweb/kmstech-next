import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, Clock, User, Eye } from 'lucide-react';
import styles from './blog.module.css';
import { Post } from '@/lib/hashnode';

interface BlogCardProps {
    post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className={styles.blogCard}>
            <div className={styles.coverImageWrapper}>
                {post.coverImage?.url ? (
                    <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        className={styles.coverImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <Image
                        src="/kmstech-next.png"
                        alt={post.title}
                        fill
                        className={styles.coverImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>

            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardBrief}>{post.brief}</p>

                <div className={styles.cardMeta}>
                    <div className={styles.authorInfo}>
                        {post.author.profilePicture && (
                            <Image
                                src={post.author.profilePicture}
                                alt={post.author.name}
                                width={24}
                                height={24}
                                className={styles.authorAvatar}
                            />
                        )}
                        <span>{post.author.name}</span>
                    </div>

                    <div className={styles.readTime}>
                        <Calendar size={14} />
                        <span style={{ marginRight: 8 }}>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                        <Clock size={14} />
                        <span>{post.readTimeInMinutes} min read</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '6px' }}>
                            <Eye size={14} />
                            <span>{post.views}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
