import { mock_user } from "../../data/mockusers";

const getUserProfile = async () =>{
    try {
        
        const {projects,redes,...userData} = mock_user
        return {userData,projects,redes};

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }
}

export const ProfileService = {
    getUserProfile
}