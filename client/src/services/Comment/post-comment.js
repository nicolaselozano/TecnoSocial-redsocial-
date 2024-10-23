import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const createComment = async (postId, commentContent) => {
  try {
    const response = await fetch(
      `${APIDOMAIN}${APIDOMAIN_VERSION}/comment/post/${postId}`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          content: commentContent  
        }),
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear el comentario:", error);
    return null;
  }
};
