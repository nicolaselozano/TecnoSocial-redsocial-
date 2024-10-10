export const getPosts = async (page) => {
  try {
    const data = await import(`../../data/posts/post-page${page}.json`);

    return data.default;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    return null;
  }
};
