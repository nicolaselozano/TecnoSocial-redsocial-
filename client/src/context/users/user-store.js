import { create } from "zustand";
import { ProfileService } from "../../services/Profile/get-profile";

const userProfileStore = create((set) => ({
    userInstance: {
        user: {},
        proyects: [],
        redes: [],
        page:0
    },
    loading: false,
    error: "",
    fetchUserDetail: async () => {
        set({ loading: true });
        const data = await ProfileService.getUserProfile();
        if (data) {
            set(() => {
                console.log(data);
                
                return {
                    userInstance: {
                        user: data.userData,
                        proyects: data.projects,
                        redes: data.redes,
                        page:data.page
                    },
                    loading: false,
                    error:""
                };
            });
        } else {
            set({ loading: false, error: "Error en la obtencion del usuairo" });
        }
    },
}));

export default userProfileStore;