import LayouteMain from "../layout/LayouteMain";
import { useEffect, useState } from "react";
import usePostsStore from "../context/posts/posts-store";
import { PostsGrid } from "../components/Posts/PostsGrid";

const HomePage = () => {
  const {
    posts,
    page,
    hasMore,
    loading: isLoading,
    fetchPosts,
  } = usePostsStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <LayouteMain>
      <section className="h-full w-full flex flex-col gap-y-5">
        <article className=" w-full h-[100px] bg-secondBlack-700 flex items-center rounded-xl px-4 gap-x-3">
          <div className="size-[50px] rounded-xl bg-red-50 overflow-hidden">
            <img
              src="images/image-useroerfil.png"
              className="size-full object-cover"
              alt="imagen-perfil"
            />
          </div>
          <button
            type="text"
            className="w-full bg-secondBlack-400 h-[50px] rounded-xl px-2 py-3 text-left text-secondBlack-100"
          >
            ¿Quieres compartir algo?
          </button>
        </article>
        <article>
          <PostsGrid
            posts={posts}
            page={page}
            isLoading={loading}
            fetchPosts={fetchPosts}
            hasMore={hasMore}
            isTwoColumns={false}
          />
        </article>
      </section>
    </LayouteMain>
  );
};

export default HomePage;
