import { create } from "zustand";
import { getPostById } from "../../services/Posts/get-post-by-id";
import { getPosts } from "../../services/Posts/get-posts";

const usePostStore = create((set) => ({
  posts: [],
  post: null,
  postId: null,
  isLoading: false,
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

  // Fetch a specific post by ID
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

  // Add a new comment to the post
  addComment: (textComment, user) => {
    set((state) => {
      if (state.post) {
        //TODO: Add comment to post endpoint backend
        console.log({
          postId: state.post.id,
          comment: textComment,
          user: user,
        });
        const newComment = {
          id: state.post.comments.length + 1,
          content: textComment,
          created_at: new Date().toISOString(),
          user: { ...user, name: user.user },
        };

        return {
          post: {
            ...state.post,
            comments: [newComment, ...state.post.comments],
          },
          posts: state.posts.map((post) => {
            if (post.id === state.postId) {             
              return {
                ...post,
                commentsCount: post.commentsCount + 1,
              };
            }
            return post;
          }),
        };
      }
      return state;
    });
  },

  // Add a comment quickly to a post
  addQuicklyComment: (postId, textComment, user) => {
    set((state) => {
      return {
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            //TODO: Add comment to post endpoint backend
            console.log({
              postId: postId,
              comment: textComment,
              user: user,
            });

            return {
              ...post,
              commentsCount: post.commentsCount + 1,
            };
          }
          return post;
        }),
      };
    });
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
