
async function testFetch() {
    try {
        console.log('Fetching google.com...');
        await fetch('https://www.google.com');
        console.log('Success: google.com');

        console.log('Fetching Neon DB host (HTTPS handshake only)...');
        await fetch('https://ep-patient-sound-a5nck8m0-pooler.us-east-2.aws.neon.tech');
        // Expect 404 or similar, but NOT fetch failed
        console.log('Success: neon host reachable');
    } catch (err) {
        console.error('Fetch failed:', err);
    }
}
testFetch();
