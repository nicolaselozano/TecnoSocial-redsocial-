import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const getPostById = async (id) => {
  try {
    const response = await fetch(
      `${APIDOMAIN}${APIDOMAIN_VERSION}/post/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el post por ID:", error);
    return null;
  }
};
