
'use client';

import { useEffect, useRef } from 'react';
import { useViewCounter } from '@/hooks/useViewCounter';

interface ViewCountLabelProps {
    slug: string;
    initialViews?: number;
    increment?: boolean;
}

export default function ViewCountLabel({ slug, initialViews = 0, increment = false }: ViewCountLabelProps) {
    const { views, increment: incrementView } = useViewCounter(slug);
    const hasIncremented = useRef(false);

    useEffect(() => {
        if (increment && !hasIncremented.current) {
            incrementView();
            hasIncremented.current = true;
        }
    }, [increment, incrementView, slug]);

    // Show live views if available (client-side), otherwise usage/server-side initial
    const displayViews = views > 0 ? views : initialViews;

    return <span style={{ marginLeft: 4 }}>{displayViews} views</span>;
}
