import { create } from "zustand";
import { getPostById } from "../../services/Posts/get-post-by-id";
import { getPosts } from "../../services/Posts/get-posts";
import { createComment } from "../../services/Comment/post-comment";

const usePostStore = create((set) => ({
  posts: [],
  post: null,
  postId: null,
  isLoading: false,
  loading: false,
  commentLoading: false,
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

  // Fetch a specific post by ID
  fetchPost: async (id) => {
    set((state) => {
      if (state.postId === id) {
        return {};
      }
      return { isLoading: true };
    });

    const postData = await getPostById(id);

    // Sort comments
    if (postData.comments) {
      postData.comments.sort((a, b) => b.id - a.id);
    }

    set({ post: postData, postId: id, isLoading: false });
  },

  // Add a new comment to the post
  addComment: async (postId, textComment, user) => {
    set((state) => ({
      ...state,
      commentLoading: true,
    }));

    try {
      const resp = await createComment(postId, textComment);
      if (!resp) throw new Error("Error al crear el comentario");

      const newComment = {
        id: resp.id,
        content: textComment,
        created_at: resp.created_at,
        user: user,
      };

      set((state) => ({
        post: {
          ...state.post,
          comments: [newComment, ...state.post.comments],
        },
        posts: state.posts.map((post) => {
          if (post.id === state.post.id) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
            };
          }
          return post;
        }),
      }));
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    } finally {
      set((state) => ({
        ...state,
        commentLoading: false,
      }));
    }
  },

  // Add a comment quickly to a post
  addQuicklyComment: async (postId, textComment) => {
    set((state) => ({
      ...state,
      commentLoading: true,
    }));

    try {
      const resp = await createComment(postId, textComment);
      if (!resp) throw new Error("Error al crear el comentario");

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              commentsCount: post.commentsCount + 1,
            };
          }
          return post;
        }),
      }));
    } catch (error) {
      console.error("Error al agregar el comentario:", error);
    } finally {
      set((state) => ({
        ...state,
        commentLoading: false,
      }));
    }
  },

  // Follow a user
  followUser: (userId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.user.id === userId) {
          // TODO: Add follow a user for endpoint backend
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
      post:
        state.post && state.post.user.id === userId
          ? { ...state.post, user: { ...state.post.user, isFollower: true } }
          : state.post,
    }));
  },

  // Unfollow a user
  unfollowUser: (userId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.user.id === userId) {
          // TODO: Remove follow a user for endpoint backend
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
      post:
        state.post && state.post.user.id === userId
          ? { ...state.post, user: { ...state.post.user, isFollower: false } }
          : state.post,
    }));
  },

  // Function to like a post
  likePost: (postId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          // TODO: Add like a post for endpoint backend
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
          // TODO: Remove like a post for endpoint backend
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

export default usePostStore;
