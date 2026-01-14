import { getAllExplainers, getExplainerData } from '@/lib/explainers';
import { ExplainerLayout } from '@/components/explainers/ExplainerLayout';
import { HowInternetWorksVisualization } from '@/components/explainers/visualizations/how-internet-works';
import ShareLinks from '@/components/blog/ShareLinks';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Metadata } from 'next';
import styles from '@/components/explainers/explainers.module.css';

interface ExplainerPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const explainers = getAllExplainers();
    return explainers.map((explainer) => ({
        slug: explainer.slug,
    }));
}

export async function generateMetadata({ params }: ExplainerPageProps): Promise<Metadata> {
    const { slug } = await params;
    const data = getExplainerData(slug);

    return {
        title: `${data.title} | KMS Tech Explainers`,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            type: 'article',
            publishedTime: data.date,
            tags: data.topics
        }
    };
}

export default async function ExplainerPage({ params }: ExplainerPageProps) {
    const { slug } = await params;
    const data = getExplainerData(slug);

    const getVisualization = () => {
        switch (data.visualization) {
            case 'how-internet-works':
                return <HowInternetWorksVisualization />;
            default:
                return null;
        }
    };

    return (
        <ExplainerLayout>
            <article className={styles.pageArticle}>
                <header className={styles.pageHeader}>
                    <div className={styles.topics}>
                        {data.topics.map(topic => (
                            <span key={topic} className={styles.topicTag}>
                                {topic}
                            </span>
                        ))}
                    </div>
                    <h1 className={styles.title}>
                        {data.title}
                    </h1>
                    <p className={styles.description}>
                        {data.description}
                    </p>
                    <div className={styles.date}>
                        Published on {new Date(data.date).toLocaleDateString()}
                    </div>
                </header>

                {/* Visualization Playground */}
                {data.visualization && (
                    <div className={styles.visualizationWrapper}>
                        <div className={styles.visualizationContainer}>
                            {getVisualization()}
                        </div>
                        <p className={styles.interactionHint}>
                            Interact with the diagram above to explore the concepts
                        </p>
                    </div>
                )}

                {/* Content */}
                <div className={styles.content}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (
                                    <SyntaxHighlighter
                                        // @ts-ignore
                                        style={dracula}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {data.content}
                    </ReactMarkdown>
                </div>

                <div className="mt-16 border-t border-slate-200 pt-8" style={{ marginTop: '4rem', borderTop: '1px solid #334155', paddingTop: '2rem' }}>
                    <ShareLinks
                        title={data.title}
                        url={`https://kmstech.co/explainers/${slug}`}
                    />
                </div>
            </article>
        </ExplainerLayout>
    );
}

