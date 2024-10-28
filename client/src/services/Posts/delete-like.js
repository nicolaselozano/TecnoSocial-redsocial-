import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const deleteLike = async (id) => {
  try {
    const response = await fetch(
      `${APIDOMAIN}${APIDOMAIN_VERSION}/post/${id}/like`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: 'include',
      }
    );

    if (response.status === 204) {      
      return true;
    }

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    return true;
  } catch (error) {
    console.error("Error al eliminar el like:", error);
    return false;
  }
};