import { GraphQLClient, gql } from 'graphql-request';

const HASHNODE_ENDPOINT = 'https://gql.hashnode.com';
const HASHNODE_ACCESS_TOKEN = process.env.HASHNODE_ACCESS_TOKEN;
const TARGET_HOST = 'kmstech.hashnode.dev';

const client = new GraphQLClient(HASHNODE_ENDPOINT, {
    headers: {
        Authorization: HASHNODE_ACCESS_TOKEN ? `Bearer ${HASHNODE_ACCESS_TOKEN}` : '',
    },
});

const GET_POSTS_QUERY = gql`
  query GetPosts($host: String!) {
    publication(host: $host) {
      posts(first: 1) {
        edges {
          node {
            title
            views
          }
        }
      }
    }
  }
`;

async function main() {
    try {
        const data: any = await client.request(GET_POSTS_QUERY, {
            host: TARGET_HOST,
        });
        console.log('Posts data:', JSON.stringify(data, null, 2));
    } catch (error: any) {
        console.error('Error fetching posts:', error.message);
        if (error.response) {
            console.error('GraphQL Error:', JSON.stringify(error.response, null, 2));
        }
    }
}

main();
