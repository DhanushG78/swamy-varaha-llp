const Personalize = require('@contentstack/personalize-edge-sdk');

const projectUid = '69faed8e2e9d553897812d69';

async function run() {
  const reqVilla = {
    headers: new Map([
      ['cookie', ''],
      ['user-agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36']
    ]),
    url: 'http://localhost:3000/'
  };
  const sdkVilla = await Personalize.init(projectUid, { request: reqVilla });
  await sdkVilla.set({ visitor_type: 'returning', property_interest: 'villa' });
  
  // Wait for 3 seconds
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  console.log('Villa variantParam:', sdkVilla.getVariantParam());
  console.log('Villa getVariants:', sdkVilla.getVariants());
}

run().catch(console.error);
