const HASHNODE_ENDPOINT = 'https://gql.hashnode.com';
const TARGET_HOST = 'kmstech.hashnode.dev';

const query = `
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
        const response = await fetch(HASHNODE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { host: TARGET_HOST },
            }),
        });

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
