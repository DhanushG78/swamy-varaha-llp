async function run() {
  const url = 'https://personalize-edge.contentstack.com/v1/manifest/69faed8e2e9d553897812d69';
  console.log('Fetching manifest from:', url);
  const res = await fetch(url);
  const text = await res.text();
  console.log('Manifest Raw text:', text);
}

run().catch(console.error);
