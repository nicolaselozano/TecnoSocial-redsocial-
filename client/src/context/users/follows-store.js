import { create } from "zustand";
import { getProfileService } from "../../services/Profile/get-profile";

const userFollowsStore = create((set) => ({
    followers:{
        list:[],
        page:null,
        total_pages:null,
        has_more:false
    },
    followed:{
        list:[],
        page:null,
        total_pages:null,
        has_more:false
    },
    loading: false,
    error: "",
    fetchUserFollowed: async (page =1) => {
        set({ loading: true });
        const data = await getProfileService.getUserFollowed(page);
        console.log(data);
        
        if (data) {
            set((state) => {
                console.log(data);
                
                return {
                    followed:{
                        list:[...state.followed.list,...data.followed],
                        page:data.page,
                        total_pages:data.totalPages,
                        has_more:data.page < data.totalPages
                    },
                    loading:false,
                    error:""
                };
            });
        } else {
            set({ loading: false, error: "Error en la obtencion del usuairo" });
        }
    },
    fetchUserFollowers: async () => {
        set({ loading: true });
        const data = await getProfileService.getUserFollowers();
        if (data) {
            set((state) => {
                console.log(data);

                return {
                    followers:{
                        list:[...state.followers.list,...data.followers],
                        page:data.page,
                        total_pages:data.totalPages,
                        has_more:data.page < data.totalPages
                    },
                    loading:false,
                    error:""
                };
            });
        } else {
            set({ loading: false, error: "Error en la obtencion del usuairo" });
        }
    },
}));

export default userFollowsStore;