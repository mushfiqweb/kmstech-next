import { GraphQLClient, gql } from 'graphql-request';

const HASHNODE_ENDPOINT = 'https://gql.hashnode.com';
const TARGET_HOST = 'kmstech.hashnode.dev';

const client = new GraphQLClient(HASHNODE_ENDPOINT);

const QUERY_BACKWARD = gql`
  query GetPostsBackward($host: String!, $last: Int!, $before: String) {
    publication(host: $host) {
      posts(last: $last, before: $before) {
        edges {
          node {
            title
          }
        }
        pageInfo {
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;

async function test() {
    console.log(`Testing backward pagination on ${TARGET_HOST}`);
    // First get a cursor
    const fwdQuery = gql`
        query GetFirst($host: String!) {
            publication(host: $host) {
                posts(first: 5) {
                    pageInfo { endCursor }
                }
            }
        }
    `;
    try {
        const fwdData: any = await client.request(fwdQuery, { host: TARGET_HOST });
        const cursor = fwdData.publication.posts.pageInfo.endCursor;
        console.log('Got cursor:', cursor);

        if (!cursor) {
            console.log('No cursor found (not enough posts?), cannot test backward.');
            return;
        }

        const data: any = await client.request(QUERY_BACKWARD, {
            host: TARGET_HOST,
            last: 5,
            before: cursor
        });
        console.log('Backward Success:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Backward Failed:', e);
    }
}

test();
