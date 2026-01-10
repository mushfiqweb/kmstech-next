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

export async function getPosts(first: number = 9, after: string | null = null): Promise<PostsResponse['publication']['posts'] | null> {
  try {
    const data = await client.request<PostsResponse>(GET_POSTS_QUERY, {
      host: TARGET_HOST,
      first,
      after,
    });
    return data.publication?.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return null;
  }
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
