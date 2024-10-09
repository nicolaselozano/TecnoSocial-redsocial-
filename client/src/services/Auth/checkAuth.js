import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const checkAuth = async () => {
    try {
      const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const userData = await response.json();
        console.log('Usuario autenticado:', userData);

        // Guardo los datos en el localstorage
        localStorage.setItem("userdata",JSON.stringify(userData));

        return true;
      } else {
        console.log('No autenticado');
        return false;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
}
  
export const logOut = async () => {
    try {
      const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/auth/me?clearCookies=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log('Usuario desloagueado');
        return true;
      } else {
        console.log('No autenticado ' + response);
        return false;
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
    }
}
  