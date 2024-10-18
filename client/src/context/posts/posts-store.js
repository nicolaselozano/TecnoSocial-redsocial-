import { create } from "zustand";
import { getPosts } from "../../services/Posts/get-posts";

const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  page: 1,
  hasMore: true,
  fetchPosts: async (page) => {
    set({ loading: true });
    const data = await getPosts(10, page);
    if (data) {
      set((state) => {
        const existingIds = new Set(state.posts.map((post) => post.id));
        
        const newPosts = data.results.filter((post) => !existingIds.has(post.id));

        return {
          posts: [...state.posts, ...newPosts],
          loading: false,
          page: data.info.currentPage,
          hasMore: data.info.currentPage < data.info.totalPages,
        };
      });
    } else {
      set({ loading: false, hasMore: false });
    }
  },
}));

export default usePostsStore;
