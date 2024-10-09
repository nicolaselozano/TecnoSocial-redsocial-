import { create } from "zustand";
import { getPosts } from "../../services/Posts/get-post";

const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  page: 1,
  hasMore: true,
  fetchPosts: async (page) => {
    set({ loading: true });
    const data = await getPosts(page);
    if (data) {
      set((state) => {
        const existingIds = new Set(state.posts.map((post) => post.id));

        const newPosts = data.posts.filter((post) => !existingIds.has(post.id));

        return {
          posts: [...state.posts, ...newPosts],
          loading: false,
          page: data.page,
          hasMore: data.page < data.totalPages,
        };
      });
    } else {
      set({ loading: false, hasMore: false });
    }
  },
}));

export default usePostsStore;
