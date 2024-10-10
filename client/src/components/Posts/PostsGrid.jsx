import { useEffect, useRef, useCallback } from "react";
import usePostsStore from "../../context/posts/posts-store";
import { PostCard } from "./PostCard";

export const PostsGrid = () => {
  const { posts, page, hasMore, isLoading, fetchPosts } = usePostsStore();

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, page, fetchPosts]
  );

  useEffect(() => {
    fetchPosts(1);
  }, [fetchPosts]);

  return (
    <div className="flex flex-col items-center justify-center">
      {posts.map((post, index) => {
        const isLastPost = index === posts.length - 1;
        return (
          <div
            ref={isLastPost ? lastPostElementRef : null}
            key={`${post.id}-${page}`}
            className="w-full"
          >
            <PostCard post={post} />
          </div>
        );
      })}

      {isLoading && (
        <div className="flex flex-col w-full space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col p-4 bg-[#25252A] border border-neutral-700 rounded-md shadow-md"
            >
              {/* Placeholder for title */}
              <div className="h-8 bg-neutral-700 animate-pulse rounded-md mb-2 w-1/2" />
              {/* Placeholder for description */}
              <div className="h-4 bg-neutral-700 animate-pulse rounded-md mb-2 w-full" />
              <div className="h-4 bg-neutral-700 animate-pulse rounded-md mb-2 w-5/6" />
              <div className="h-4 bg-neutral-700 animate-pulse rounded-md w-4/5 mb-4" />
              {/* Placeholder for image */}
              <div className="h-32 bg-neutral-700 animate-pulse rounded-md mb-4" />
            </div>
          ))}
        </div>
      )}

      {!hasMore && !isLoading && (
        <p className="col-span-full text-center text-gray-500">No hay más publicaciones.</p>
      )}
    </div>
  );
};
