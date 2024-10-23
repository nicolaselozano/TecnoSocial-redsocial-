import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const getPosts = async (limit, page) => {
  try {
    const response = await fetch(
      `${APIDOMAIN}${APIDOMAIN_VERSION}/post?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return null;
  }
};
