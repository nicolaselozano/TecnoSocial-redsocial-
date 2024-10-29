import { create } from "zustand";
import { userServices } from "../../services/user/get_users";

const similarsUserStore = create((set) => ({ 
    similarUsers: [],
    page: -1,
    loading: false,
    error: "",
    fetchUsers: async (page) => {
        set({ loading: true });
        set(async (state) => {

            if(state.page < page || state.page == null) {

                const users = await userServices.getUsers(10, page);
                console.log("Previous user instance:", state.similarUsers);
                console.log("New user data:", users);
                console.log("DATA DEL ZUSTAND", users);
    
                return {
                    similarUsers: [...state.similarUsers, ...users],
                    page,
                    loading: false,
                    error: ""
                };
            }

        });
    },
    reset: () => {
        set(() => {
            return {
                similarUsers: [],
                page: -1,
                loading: false,
                error: ""
            }
        })
    }
}));

export default similarsUserStore;