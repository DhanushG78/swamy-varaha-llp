const Personalize = require('@contentstack/personalize-edge-sdk');

const projectUid = '69faed8e2e9d553897812d69';

async function run() {
  const req = {
    headers: new Map([
      ['cookie', ''],
      ['user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36']
    ]),
    url: 'http://localhost:3000/'
  };
  const sdk = await Personalize.init(projectUid, { request: req });
  console.log('Manifest Data:', JSON.stringify(sdk._manifestData, null, 2));
}

run().catch(console.error);
