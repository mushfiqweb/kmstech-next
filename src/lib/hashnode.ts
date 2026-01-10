import { GraphQLClient, gql } from 'graphql-request';

const HASHNODE_ENDPOINT = process.env.NEXT_PUBLIC_HASHNODE_ENDPOINT || 'https://gql.hashnode.com';
const HASHNODE_ACCESS_TOKEN = process.env.HASHNODE_ACCESS_TOKEN;
// Ideally we should have a host or publication ID. For now, we'll try to query without it or default.
// The new Hashnode API leans heavily on `host` for public queries.
const TARGET_HOST = process.env.NEXT_PUBLIC_HASHNODE_HOST || 'kmstech.hashnode.dev';

const client = new GraphQLClient(HASHNODE_ENDPOINT, {
  headers: {
    Authorization: HASHNODE_ACCESS_TOKEN ? `Bearer ${HASHNODE_ACCESS_TOKEN}` : '',
  },
  fetch: (url, options) => fetch(url, { ...options, next: { revalidate: 60 } } as RequestInit), // Revalidate every 60s
});

export interface Author {
  name: string;
  username: string;
  profilePicture: string;
  bio?: {
    html: string;
    markdown: string;
    text: string;
  };
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  brief: string;
  publishedAt: string;
  updatedAt?: string;
  readTimeInMinutes: number;
  coverImage?: {
    url: string;
  };
  author: Author;
  content: {
    html: string;
    markdown?: string;
    text?: string;
  };
  tags?: {
    name: string;
    slug: string;
  }[];
  views: number;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface PostsResponse {
  publication: {
    posts: {
      totalDocuments: number;
      edges: {
        node: Post;
      }[];
      pageInfo: PageInfo;
    };
  };
}

export interface SinglePostResponse {
  publication: {
    post: Post | null;
  };
}

const GET_POSTS_QUERY = gql`
  query GetPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      posts(first: $first, after: $after) {
        totalDocuments
        edges {
          node {
            id
            title
            slug
            brief
            publishedAt
            readTimeInMinutes
            views
            coverImage {
              url
            }
            author {
              name
              username
              profilePicture
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const GET_POST_QUERY = gql`
  query GetPost($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        slug
        brief
        publishedAt
        updatedAt
        readTimeInMinutes
        views
        coverImage {
          url
        }
        author {
          name
          username
          profilePicture
          bio {
            html
            text
          }
        }
        content {
          html
          markdown
        }
        tags {
          name
          slug
        }
      }
    }
  }
`;

// Helper to fetch all posts recursively
export async function getAllPosts(cursor: string | null = null, accumulatedPosts: Post[] = []): Promise<{ posts: Post[], totalDocuments: number }> {
  try {
    const data = await client.request<PostsResponse>(GET_POSTS_QUERY, {
      host: TARGET_HOST,
      first: 50, // Max limit
      after: cursor,
    });

    const newPosts = data.publication?.posts.edges.map(edge => edge.node) || [];
    const allPosts = [...accumulatedPosts, ...newPosts];
    const pageInfo = data.publication?.posts.pageInfo;
    const totalDocuments = data.publication?.posts.totalDocuments || 0;

    if (pageInfo?.hasNextPage && pageInfo.endCursor) {
      return getAllPosts(pageInfo.endCursor, allPosts);
    }

    return { posts: allPosts, totalDocuments };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return { posts: accumulatedPosts, totalDocuments: 0 };
  }
}

export async function getPosts(page: number = 1, limit: number = 6): Promise<{ posts: Post[], totalDocuments: number, hasNextPage: boolean, endCursor: string | null } | null> {
  const { posts, totalDocuments } = await getAllPosts();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return {
    posts: paginatedPosts,
    totalDocuments,
    hasNextPage: endIndex < posts.length,
    endCursor: null // Cursor not relevant for offset pagination
  };
}

export async function getPost(slug: string) {
  try {
    const data = await client.request<SinglePostResponse>(GET_POST_QUERY, {
      host: TARGET_HOST,
      slug,
    });
    return data.publication?.post;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}
