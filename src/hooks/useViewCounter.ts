
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useViewCounter(slug: string) {
    const { data, error, mutate, isLoading } = useSWR<{ views: number }>(
        `/api/view-count/${slug}`,
        fetcher
    );

    const increment = async () => {
        const storageKey = `viewed-${slug}`;

        if (typeof window !== 'undefined') {
            if (localStorage.getItem(storageKey)) {
                return;
            }
            // Lock immediately to prevent double-fire in Strict Mode
            localStorage.setItem(storageKey, 'true');
        }

        // Optimistic update
        mutate(
            { views: (data?.views || 0) + 1 },
            false // do not revalidate
        );

        try {
            await fetch(`/api/view-count/${slug}`, {
                method: 'POST',
            });

            // Revalidate to get the actual server count
            mutate();
        } catch (err) {
            console.error('Failed to increment view count', err);
            // Rollback on error
            if (typeof window !== 'undefined') {
                localStorage.removeItem(storageKey);
            }
            mutate();
        }
    };

    return {
        views: data?.views ?? 0,
        isLoading,
        isError: error,
        increment,
    };
}
