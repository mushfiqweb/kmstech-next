import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const explainersDirectory = path.join(process.cwd(), 'src/content/explainers');

export interface ExplainerData {
    slug: string;
    title: string;
    description: string;
    date: string;
    topics: string[];
    visualization?: string;
    content: string;
}

export function getExplainerSlugs() {
    if (!fs.existsSync(explainersDirectory)) {
        return [];
    }
    return fs.readdirSync(explainersDirectory);
}

export function getExplainerData(slug: string): ExplainerData {
    const realSlug = slug.replace(/\.md$/, '');
    const fullPath = path.join(explainersDirectory, `${realSlug}.md`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Explainer not found: ${fullPath}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title,
        description: data.description,
        date: data.date,
        topics: data.topics || [],
        visualization: data.visualization,
        content,
    };
}

export function getAllExplainers(): ExplainerData[] {
    const slugs = getExplainerSlugs();
    const explainers = slugs
        .map((slug) => getExplainerData(slug))
        // sort explainers by date in descending order
        .sort((a, b) => (a.date > b.date ? -1 : 1));
    return explainers;
}
