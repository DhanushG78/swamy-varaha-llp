const Contentstack = require('contentstack');
const fs = require('fs');

// Simple parser for .env.local
const envFile = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
});

const apiKey = env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || 'blt7b9fa2da753772e4';
const deliveryToken = env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || 'cs6d17407090b2087bdae99a00';
const environment = env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || 'development';
const previewToken = env.CONTENTSTACK_PREVIEW_TOKEN || 'cs506a1bf7a628edab6a7bd2fb';

const stack = Contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment: environment,
  live_preview: {
    enable: true,
    preview_token: previewToken,
    host: 'rest-preview.contentstack.com'
  }
});

async function fetchForVariant(variantAlias) {
  try {
    const Query = stack.ContentType('home_page').Query();
    Query.includeReference([
      'page_sections.categories_section.categories',
      'page_sections.featured_properties_section.properties',
      'page_sections.achievement_section.achievements'
    ]);
    
    if (variantAlias) {
      Query.variants([variantAlias]);
    }
    
    const result = await Query.toJSON().find();
    const entry = result[0]?.[0];
    if (!entry) {
      console.log(`No entry found for ${variantAlias}`);
      return;
    }
    
    console.log(`\n======================================`);
    console.log(`VARIANT: ${variantAlias || 'BASE'}`);
    console.log(`======================================`);
    
    const heroSec = entry.page_sections?.find(s => s.hero_section)?.hero_section;
    const ctaSec = entry.page_sections?.find(s => s.cta_banner_section)?.cta_banner_section;
    
    console.log('Hero Section:', JSON.stringify(heroSec, null, 2));
    console.log('CTA Banner Section:', JSON.stringify(ctaSec, null, 2));
  } catch (err) {
    console.error(`Failed for ${variantAlias}:`, err);
  }
}

async function run() {
  await fetchForVariant('cs_personalize_3_1'); // Villa CTA
  await fetchForVariant('cs_personalize_3_0'); // Beachfront CTA
  await fetchForVariant('cs_personalize_3_2'); // Ultraluxury CTA
}

run();
