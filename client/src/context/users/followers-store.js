import { create } from "zustand";

const userFollowsStore = create((set) => ({
    followed:{
        list:[],
        page:null,
        total_pages:null,
        has_more:false
    },
    error:"",
    loading:false,
    getFollowers: async (page = 1) => {
        set({loading:true})
        try {
            
            const response = await fetch()
            
        } catch (error) {
            
        }

    }
}));

export default userFollowsStore;