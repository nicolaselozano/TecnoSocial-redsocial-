import { create } from "zustand";
import { getPostById } from "../../services/Posts/get-post-by-id";

const usePostStore = create((set) => ({
  post: null,
  postId: null,
  isLoading: false, 
  fetchPost: async (id) => {
    set((state) => {
      if (state.postId === id) {
        return {}; 
      }
      return { isLoading: true };
    });

    const postData = await getPostById(id);
    set({ post: postData, postId: id, isLoading: false });
  },
}));

export default usePostStore;
