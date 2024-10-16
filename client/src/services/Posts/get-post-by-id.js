export const getPostById = async (id) => {
    try {
      const data = await import(`../../data/posts/post/post-${id}.json`);
  
      return data.default;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return null;
    }
  };
  