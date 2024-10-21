import { create } from "zustand";
import { getPosts } from "../../services/Posts/get-posts";

const usePostsStore = create((set) => ({
  posts: [],
  loading: false,
  page: 1,
  hasMore: true,
  
  // Fetch posts
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
          page: data.currentPage,
          hasMore: data.currentPage < data.totalPages,
        };
      });
    } else {
      set({ loading: false, hasMore: false });
    }
  },

  // Function to like a post
  likePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLike: true,
            likeCount: post.likeCount + 1,
          };
        }
        return post;
      }),
    }));
  },

  // Function to unlike a post
  unlikePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLike: false,
            likeCount: post.likeCount > 0 ? post.likeCount - 1 : 0,
          };
        }
        return post;
      }),
    }));
  },
}));

export default usePostsStore;
