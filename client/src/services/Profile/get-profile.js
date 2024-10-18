import { mock_user } from "../../data/profile/mockusers";

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
const getUserLikedProyects = async (page) => {
    try {

        const { projects, page, totalPages, totalPosts, ...userData } = mock_user

        return {
            projects,
            page,
            totalPages,
            totalPosts
        }

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }
}
const getUserFollowed = async (page) => {

    try {

        const followedUsers = await import(`../../data/profile/mock-followed-profile.json`);

        return followedUsers.default;

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }

}

const getUserFollowers = async (page) => {

    try {


        const followersUsers = await import(`../../data/profile/mock-followers-profile.json`);

        return followersUsers.default;

    } catch (error) {
        error("Error en la peticion del perfil del usuario :" + error.message);
    }

}
export const getProfileService = {
    getUserProfile,
    getUserFollowers,
    getUserFollowed,
    getUserLikedProyects
}
