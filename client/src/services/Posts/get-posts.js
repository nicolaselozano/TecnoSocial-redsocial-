import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const getPosts = async (limit, page, search = "") => {
  const user = JSON.parse(localStorage.getItem("userdata"));

  let route = user
    ? `${APIDOMAIN}${APIDOMAIN_VERSION}/post/me?limit=${limit}&page=${page}`
    : `${APIDOMAIN}${APIDOMAIN_VERSION}/post?limit=${limit}&page=${page}`;

  if (search) {
    route += `&search=${encodeURIComponent(search)}`;
  }

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
    return data;
  } catch (error) {
    console.error("Error al obtener los posts:", error);
    return null;
  }
};
