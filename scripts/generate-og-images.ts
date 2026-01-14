
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../src/lib/hashnode';

// Configurations
const BASE_URL = 'http://localhost:3000'; // Make sure your app is running here
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'og-images');
const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'og-map.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load existing mapping
let ogMap: Record<string, string> = {};
if (fs.existsSync(DATA_FILE)) {
    try {
        ogMap = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch (error) {
        console.warn('Could not parse existing mapping file, starting fresh.');
    }
}

async function generateImages() {
    console.log('Fetching all posts from Hashnode...');
    const { posts } = await getAllPosts();
    console.log(`Found ${posts.length} posts.`);

    const browser = await puppeteer.launch({
        headless: true, // Set to false if you want to see the browser
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 }); // 2x for high DPI screenshot

    let processedCount = 0;
    let errorCount = 0;

    for (const post of posts) {
        const slug = post.slug;
        const imagePath = `/og-images/${slug}.png`;
        const fullOutputPath = path.join(OUTPUT_DIR, `${slug}.png`);

        // Check if we need to generate this image
        // You can add logic here to force regenerate if needed, e.g. based on file mtime vs post update time
        if (fs.existsSync(fullOutputPath) && ogMap[slug] === imagePath) {
            console.log(`[SKIP] OG image for "${post.title}" already exists.`);
            continue;
        }

        console.log(`[PROCESS] Generating OG image for "${post.title}" (${slug})...`);

        try {
            const url = `${BASE_URL}/blog/${slug}`;

            // Navigate to page
            // Using 'networkidle0' to wait until network is idle (no more than 0 connections for at least 500 ms)
            // This helps ensure images and styles are loaded.
            const response = await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });

            if (!response || !response.ok()) {
                throw new Error(`Failed to load page: ${response?.status()} ${response?.statusText()}`);
            }

            // Sanity check: ensure the title is visible to confirm rendering
            await page.waitForSelector('h1', { timeout: 10000 });

            // Take screenshot
            await page.screenshot({ path: fullOutputPath, type: 'png' });

            // Update map
            ogMap[slug] = imagePath;
            processedCount++;

            // Save map periodically just in case
            fs.writeFileSync(DATA_FILE, JSON.stringify(ogMap, null, 2));

        } catch (error) {
            console.error(`[ERROR] Failed to generate image for "${post.title}":`, error);
            errorCount++;
        }
    }

    await browser.close();

    // Final save
    fs.writeFileSync(DATA_FILE, JSON.stringify(ogMap, null, 2));

    console.log('-----------------------------------');
    console.log(`Generation complete.`);
    console.log(`Processed: ${processedCount}`);
    console.log(`Skipped: ${posts.length - processedCount - errorCount}`);
    console.log(`Errors: ${errorCount}`);
}

generateImages().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
