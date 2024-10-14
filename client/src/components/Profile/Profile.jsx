import React, { Suspense, useEffect, useState } from "react";
import userProfileStore from "../../context/users/user-store";
import { Routes, Route } from "react-router-dom";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import ProfileNav from "./ProfileNav";
const UserList = React.lazy(() => import('./UserList'));
import { PostsGrid } from "../Posts/PostsGrid";
import EditProfileModal from "./ModalEditProfile";

const Profile = () => {
    const { fetchUserDetail, userInstance, loading } = userProfileStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(loading);
        console.log(userInstance);
    }, [loading]);

    useEffect(() => {
        const fetchUserData = async () => {
            await fetchUserDetail();
        };
        fetchUserData();

        console.log(userInstance);

    }, [fetchUserDetail]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    return (
        <div>
            <div className="mx-2">
                {isLoading ? (
                    <span>isLoading...</span>
                ) : (
                    <ProfileDetail user={userInstance.user} 
                    redes={userInstance.redes}
                    onEditProfile={handleOpenModal}
                    />
                )}
            </div>

            <div >
                <ProfileNav user={userInstance.user} />
            </div>
            {/* EDITAR PERFIL */}
            <EditProfileModal show={isModalOpen} handleClose={handleCloseModal} />

            {/* RUTAS DE LA NAVBAR */}
            {isLoading ? (
                <span>isLoading...</span>
            ) : (
                <Suspense fallback={<span>Loading...</span>}>
                    <Routes>
                        {/* Ruta para mostrar los seguidores */}
                        <Route
                            path="followers"
                            element={
                                <UserList
                                    users={[userInstance.user]}
                                />
                            }
                        />
                        <Route path="follows"
                            element={
                                <UserList
                                    users={[userInstance.user]}
                                />
                            }
                        />
                        <Route path="likes"
                            element={
                                <div className="m-2">
                                    <PostsGrid
                                        posts={userInstance.proyects}
                                        page={userInstance.page}
                                        fetchPosts={fetchUserDetail}
                                        hasMore={false}
                                        isLoading={isLoading}
                                        isTwoColumns={true}
                                    />
                                </div>
                            }
                        />
                        <Route path=""
                            element={
                                <div className="m-2">
                                    <PostsGrid
                                        posts={userInstance.proyects}
                                        page={userInstance.page}
                                        fetchPosts={fetchUserDetail}
                                        hasMore={false}
                                        isLoading={isLoading}
                                        isTwoColumns={true}
                                    />
                                </div>
                            }
                        />
                    </Routes>
                </Suspense>
            )}
        </div>
    );
};

export default Profile;
