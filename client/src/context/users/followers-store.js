import { create } from "zustand";
import { getProfileService } from "../../services/Profile/get-profile";

const userFollowersStore = create((set) => ({
    follower: {
        list: [],
        page: null,
        total_pages: null,
        has_more: false,
        totalUsers: null
    },
    followed: {
        list: [],
        page: null,
        total_pages: null,
        has_more: false,
        totalUsers: null
    },
    error: "",
    loading: false,
    getFolloweds: async (page = 1) => {
        set({ loading: true })
        try {
            const { followed, currentPage, totalUsers, totalPages } = await getProfileService.getUserFollowed(page);
            set(() => {
                return {
                    followed: {
                        list: followed,
                        page: currentPage,
                        total_pages: totalPages,
                        has_more: totalPages == currentPage,
                        totalUsers: totalUsers
                    },
                    error: "",
                    loading: false
                }
            });


        } catch (error) {
            console.log(error);

            set({ loading: false, error: "Error en la obtencion de los seguidores" });
        }

    },
    getFollowers: async (page = 1) => {
        set({ loading: true })
        try {
            const { followers, currentPage, totalUsers, totalPages } = await getProfileService.getUserFollowers(page);
            set(() => {
                return {
                    follower: {
                        list: followers,
                        page: currentPage,
                        total_pages: totalPages,
                        has_more: totalPages == currentPage,
                        totalUsers: totalUsers
                    },
                    error: "",
                    loading: false
                }
            });


        } catch (error) {
            console.log(error);

            set({ loading: false, error: "Error en la obtencion de los seguidores" });
        }

    },
    reset: () => {
        set(() => {
            return {
                follower: {
                    list: [],
                    page: null,
                    total_pages: null,
                    has_more: false,
                    totalUsers: null
                },
                error: "",
                loading: false,
            }
        })
    }
}));

export default userFollowersStore;