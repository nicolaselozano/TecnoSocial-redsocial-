import { create } from "zustand";
import { userServices } from "../../services/user/get_users";

const similarsUserStore = create((set) => ({
  similarUsers: [],
  page: -1,
  loading: false,
  error: "",

  fetchUsers: async (page) => {
    set({ loading: true });

    try {
      set((state) => {
        if (state.page >= page) return state;

        return state;
      });

      const { users, currentPage } = await userServices.getUsers(10, page);

      set((state) => {
        const newUsers = users.filter(
          (user) =>
            !state.similarUsers.some(
              (existingUser) => existingUser.id === user.id
            )
        );

        return {
          similarUsers: [...state.similarUsers, ...newUsers],
          page: currentPage,
          loading: false,
          error: "",
        };
      });
    } catch (error) {
      set({ loading: false, error: error.message || "Error fetching users" });
    }
  },

  reset: () => {
    set({
      similarUsers: [],
      page: -1,
      loading: false,
      error: "",
    });
  },
}));

export default similarsUserStore;
