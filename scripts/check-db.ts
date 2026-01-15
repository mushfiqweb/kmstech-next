
import * as dotenv from 'dotenv';
import { sql } from 'drizzle-orm';
import path from 'path';

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function checkConnection() {
    try {
        // Dynamic import to ensure env is loaded first
        const { db } = await import('../src/db/index');

        console.log('Attempting to connect via Neon HTTP...');
        const result = await db.execute(sql`SELECT 1`);
        console.log('Database connection successful:', result);
    } catch (error) {
        console.error('Database connection failed:', error);
    } finally {
        process.exit(0);
    }
}

checkConnection();
