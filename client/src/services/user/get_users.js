import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

const getUsers = async (userCount = 10, page = 0) => {

    try {

        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/user?limit=${userCount}&page=${page}`, {
            method: 'POST',
            credentials: 'include'
        });

        const responseData = await response.json();
        console.log(responseData.data);

        const { users } = response.data;

        return users;

    } catch (error) {
        console.error(error);
    }

}
export const userServices = {
    getUsers
}