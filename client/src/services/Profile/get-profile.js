import { mock_user } from "../../data/mockusers";

const getUserProfile = async () => {
    try {

        const { projects, redes, page, totalPages, totalPosts, ...userData } = mock_user
        return {
            userData,
            projects,
            redes,
            page,
            totalPages,
            totalPosts
        };

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }
}

export const ProfileService = {
    getUserProfile
}