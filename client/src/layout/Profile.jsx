import React, { Suspense, useEffect, useState } from "react";
import userProfileStore from "../context/users/user-store";
import { Routes, Route } from "react-router-dom";
import ProfileDetail from "../components/Profile/ProfileDetail/ProfileDetail";
import ProfileNav from "../components/Profile/ProfileNav";
const UserList = React.lazy(() => import('../components/Profile/UserList'));
import { PostsGrid } from "../components/Posts/PostsGrid";
import { checkAuth } from "../services/Auth/checkAuth";
import SimilarProfilesPage from "../components/Profile/SimilarProfilesPage";
import NotificationBar from "../components/Notification_bar/NotificationBar";
import userFollowersStore from "../context/users/followers-store";
const EditProfileModal = React.lazy(() => import("../components/Profile/EditProfile/ModalEditProfile"));

const Profile = () => {
    const { fetchUserDetail, userInstance } = userProfileStore();
    const { getFollowers,getFolloweds,follower,followed } = userFollowersStore();
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {

        const fetchUserData = async () => {
            setIsLoading(true);
            await fetchUserDetail();
            await getFollowers();
            await getFolloweds();
            setIsLoading(false);
        };
        fetchUserData();

    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            const checkUserAuth = async () => {
                setIsLoading(true);
                await checkAuth();
                setIsLoading(false);
            };

            checkUserAuth();
        }

    }, [isModalOpen]);



    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const handleSubmitModal = async () => {
        await fetchUserDetail();
        setIsModalOpen(false);
        console.log("User after modal submit:", userInstance.user);
    };

    return (
        <section className="flex flex-row mx-12 my-6">
            <div>
                <div className="mx-2">
                    {isLoading ?
                        (
                            <div className="bg-secondBlack-700 min-w-[153vh] min-h-[50vh] rounded-t-lg">
                                <header className="relative">
                                    {/* Imagen ejemplo de fondo del perfil */}
                                    <div
                                        className="bg-gray-500 rounded-t-lg w-full h-52"
                                    />
                                    {/* Imagen ejemplo de perfil del usuario */}
                                    <div className="absolute top-36 left-4 rounded-full border-4 border-gray-800">

                                        <div
                                            className="bg-gray-500 w-24 h-24 rounded-full object-cover" />



                                    </div>
                                </header>
                            </div>

                        ) :
                        (
                            <ProfileDetail user={userInstance.user}
                                redes={userInstance.redes}
                                onEditProfile={handleOpenModal}
                                followers={follower}
                                followeds={followed}
                            />
                        )}
                </div>

                <div >
                    <ProfileNav user={userInstance.user} />
                </div>
                <Suspense fallback={<span>Loading...</span>}>
                    {/* EDITAR PERFIL */}
                    {
                        isModalOpen &&
                        <EditProfileModal show={isModalOpen}
                            handleClose={handleCloseModal}
                            handleSubmitModal={handleSubmitModal}
                            userData={userInstance} />
                    }


                </Suspense>

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
                {/* ejemplo de los componentes de notificaciones y perfiles  */}
            </div>
            <div className="flex flex-col mx-4">
            <section className=" flex flex-col gap-y-5 ">
                {/*card de perfiles similares*/}
                <SimilarProfilesPage />
                {/*card de notificaciones*/}
                <NotificationBar />
            </section>
            </div>

        </section>
    );
};

export default Profile;
