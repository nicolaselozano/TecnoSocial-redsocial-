import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const getPosts = async (limit, page) => {
  const user = JSON.parse(localStorage.getItem("userdata"));

  const route = user
    ? `${APIDOMAIN}${APIDOMAIN_VERSION}/post/me?limit=${limit}&page=${page}`
    : `${APIDOMAIN}${APIDOMAIN_VERSION}/post?limit=${limit}&page=${page}`;

  try {
    const response = await fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return null;
  }
};
