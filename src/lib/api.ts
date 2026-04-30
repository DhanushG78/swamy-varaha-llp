import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY!,
  delivery_token: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN!,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT!,
});

export const getFeaturedProperties = async () => {
  const Query = Stack.ContentType("property").Query();

  Query.where("featured", true).includeReference(["category", "agent"]);

  const result = await Query.toJSON().find();

  return result[0];
};

export const getPropertyBySlug = async (slug: string) => {
  const Query = Stack.ContentType("property").Query();

  Query.where("slug", slug)
    .includeReference(["category", "agent"]);

  const result = await Query.toJSON().find();

  return result[0][0];
};

export const getAllProperties = async () => {
  const Query = Stack.ContentType("property").Query();

  Query.includeReference(["category", "agent"]);

  const result = await Query.toJSON().find();

  return result[0];
};

export const getAllAgents = async () => {
  const Query = Stack.ContentType("agent").Query();

  const result = await Query.toJSON().find();

  return result[0];
};

export const getAllCategories = async () => {
  const Query = Stack.ContentType("category").Query();

  const result = await Query.toJSON().find();

  return result[0];
};

export const getAboutPage = async () => {
  const Query = Stack.ContentType("about_page").Query();

  const result = await Query.toJSON().find();

  return result[0][0];
};

export const getAchievements = async () => {
  const Query = Stack.ContentType("achievement").Query();

  const result = await Query.toJSON().find();

  return result[0];
};

export const getGlobalSettings = async () => {
  const Query = Stack.ContentType("global_settings").Query();

  const result = await Query.toJSON().find();

  return result[0][0];
};

export default Stack;
