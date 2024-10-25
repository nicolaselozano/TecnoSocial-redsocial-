import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

export const checkAuth = async () => {
  const lastCheck = localStorage.getItem("lastAuthCheck");
  const now = Date.now();
  const FIVE_MINUTES = 300000;

  if (lastCheck && now - parseInt(lastCheck) < FIVE_MINUTES) {
      console.log('La verificación de autenticación fue realizada recientemente.');
      return JSON.parse(localStorage.getItem("userdata") || "false");
  }

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
  
          // Guarda los datos en el localStorage y la marca de tiempo actual
          localStorage.setItem("userdata", JSON.stringify(userData));
          localStorage.setItem("lastAuthCheck", now.toString());

          return true;
      } else {
          console.log('No autenticado');
          localStorage.removeItem("userdata");
          localStorage.removeItem("lastAuthCheck");
          return false;
      }
  } catch (error) {
      console.error('Error verificando autenticación:', error);
      return false;
  }
}

export const logOut = async () => {
    try {
      const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/auth/me?clear=true`, {
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
  