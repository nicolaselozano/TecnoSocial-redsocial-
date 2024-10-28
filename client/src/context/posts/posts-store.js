import { create } from "zustand";
import { getPostById } from "../../services/Posts/get-post-by-id";
import { getPosts } from "../../services/Posts/get-posts";
import { createComment } from "../../services/Comment/post-comment";
import { postLike } from "../../services/Posts/post-like";
import { deleteLike } from "../../services/Posts/delete-like";

const usePostStore = create((set) => ({
  posts: [],
  post: null,
  postId: null,
  isLoading: false,
  loading: false,
  commentLoading: false,
  likeLoading: false,
  page: 1,
  hasMore: true,
  search: '',

  setSearch: (newSearch) => set((state) => {
    if (state.search !== newSearch) {
      return {
        search: newSearch,
        posts: [],
        page: 1,
        hasMore: true,
      };
    }
    return state;
  }),

  // Fetch posts
  fetchPosts: async (page) => {
    set({ loading: true });
    const { search } = usePostStore.getState(); 
    const data = await getPosts(10, page, search);
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
  likePost: async (postId) => {
    set((state) => ({
      ...state,
      likeLoading: true,
    }));
    try {
      const data = await postLike(postId);
      if (!data) throw new Error("Error al dar like al post");
      if (data) {
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
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    } finally {
      set((state) => ({
        ...state,
        likeLoading: false,
      }));
    }
  },

  // Function to unlike a post
  unlikePost: async (postId) => {
    set((state) => ({
      ...state,
      likeLoading: true,
    }));
    try {
      const data = await deleteLike(postId);
      if (!data) throw new Error("Error al dar dislike al post");
      if (data) {
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
      }
    } catch (error) {
      console.error("Error disliking the post:", error);
    } finally {
      set((state) => ({
        ...state,
        likeLoading: false,
      }));
    }
  },
}));

export default usePostStore;
