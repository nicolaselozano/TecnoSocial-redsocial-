import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

const getUsers = async (userCount = 10, page = 0) => {

    try {

        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/user?limit=${userCount}&page=${page}`, {
            method: 'GET',
            credentials: 'include'
        });

        const data = await response.json();

        const { users, currentPage, totalPages, totalUser } = data;

        return {
            users,
            currentPage,
            totalPages,
            totalUser
        };

    } catch (error) {
        console.error(error);
    }

}
export const userServices = {
    getUsers
}