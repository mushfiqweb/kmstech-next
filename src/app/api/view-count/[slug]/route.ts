
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const stats = await prisma.stats.findUnique({
            where: {
                type_slug: {
                    type: 'blog',
                    slug,
                },
            },
        });

        return NextResponse.json({ views: stats?.views ?? 0 });
    } catch (error) {
        console.warn(`[ViewCounter] Failed to fetch views for ${slug}: ${(error as Error).message}`);
        return NextResponse.json({ views: 0 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    try {
        const stats = await prisma.stats.upsert({
            where: {
                type_slug: {
                    type: 'blog',
                    slug,
                },
            },
            update: {
                views: {
                    increment: 1,
                },
            },
            create: {
                type: 'blog',
                slug,
                views: 1,
            },
        });

        return NextResponse.json({ views: stats.views });
    } catch (error) {
        console.warn(`[ViewCounter] Failed to increment views for ${slug}: ${(error as Error).message}`);
        return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
    }
}
