import { APIDOMAIN, APIDOMAIN_VERSION } from "../../../vars";

const updateProfile = async (updatedUserData) => {
    try {
        const {
            name,
            username,
            roles,
            avatar,
            location,
            job
        } = updatedUserData;

        console.log(updatedUserData);

        const response = await fetch(`${APIDOMAIN}${APIDOMAIN_VERSION}/user`, {
            method: 'PUT',
            credentials: 'include', // If you need to send cookies or session data
            headers: {
                'Content-Type': 'application/json' // Make sure to set the content type to JSON
            },
            body: JSON.stringify({
                name,
                username,
                role: roles[0], // Assuming you're sending the first role
                avatar,
                location,
                job,
            }) // Convert the object to a JSON string
        });

        const responseData = await response.json();
        console.log(responseData);
        
        return true;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const SetProfileService = {
    updateProfile

}