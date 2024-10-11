import { useEffect, useState } from "react";
import userProfileStore from "../../context/users/user-store";
import ProfileDetail from "./ProfileDetail/ProfileDetail";

const Profile = () => {
    const { fetchUserDetail, userInstance, loading } = userProfileStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(loading);
        console.log(userInstance);
    }, [loading]);

    useEffect(() => {
        const fetchUserData = async () => {
            await fetchUserDetail();
        };
        fetchUserData();
    }, [fetchUserDetail]);

    return (
        <div>
            <div></div>
            {isLoading ? (
                <span>isLoading...</span>
            ) : (
                <ProfileDetail user={userInstance.user} redes={userInstance.redes} />
            )}
        </div>
    );
};

export default Profile;
