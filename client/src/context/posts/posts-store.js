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
        const newPosts = data.results.filter(
          (post) => !existingIds.has(post.id)
        );

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
          //TODO: Add like a post for endpoint backend
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
          //TODO: Remove like a post for endpoint backend
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

  // Function to follow a user
  followUser: (userId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.user.id === userId) {
          //TODO: Add follow a user for endpoint backend
          return {
            ...post,
            user: {
              ...post.user,
              isFollower: true,
            },
          };
        }
        return post;
      }),
    }));
  },

  // Function to unfollow a user
  unfollowUser: (userId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.user.id === userId) {
          //TODO: Remove follow a user for endpoint backend
          return {
            ...post,
            user: {
              ...post.user,
              isFollower: false,
            },
          };
        }
        return post;
      }),
    }));
  },

  // Function to add quickly a comment
  addQuicklyComment: (postId, comment, user) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          //TODO: Add comment for endpoint backend
          console.log({
            postId: postId,
            comment: comment,
            user: user,
          });
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
          };
        }
        return post;
      }),
    }));
  },
}));

export default usePostsStore;
