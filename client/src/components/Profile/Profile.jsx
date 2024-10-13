import React, { Suspense, useEffect, useState } from "react";
import userProfileStore from "../../context/users/user-store";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import ProfileNav from "./ProfileNav";
const Followers = React.lazy(() => import("./Followers"));

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
            <div>

            </div>
            {isLoading ? (
                <span>isLoading...</span>
            ) : (
                <ProfileDetail user={userInstance.user} redes={userInstance.redes} />
            )}
            <div >
                <ProfileNav user={userInstance.user} />
            </div>
            {isLoading ? (
                <span>isLoading...</span>
            ) : (
                <Suspense fallback={<span>Loading...</span>}>
                    <Routes>
                        {/* Ruta para mostrar los seguidores */}
                        <Route
                            path="followers"
                            element={
                                <Followers
                                    users={[userInstance.user]}
                                />
                            }
                        />
                    </Routes>
                </Suspense>
            )}
        </div>
    );
};

export default Profile;
