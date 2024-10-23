import { useEffect } from "react";
import { PropTypes } from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { getRoleColor } from "../../helpers/get-role-color";
import { IoMdClose } from "react-icons/io";
import usePostStore from "../../context/posts/posts-store";
import { PostSliderImages } from "./PostSliderImages";
import { useState } from "react";

export const PostModal = ({ setIsOpenModal, postId }) => {
  const {
    post,
    fetchPost,
    isLoading,
    addComment,
    commentLoading,
    unfollowUser,
    followUser,
  } = usePostStore();
  const user = JSON.parse(localStorage.getItem("userdata"));
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchPost(postId);
  }, [fetchPost, postId]);

  const handleAddComment = () => {
    if (commentText.trim()) {
      addComment(postId, commentText, user);
      setCommentText("");
    }
  };

  const handleFollow = () => {
    if (post.user.isFollower) {
      unfollowUser(post.user.id);
    } else {
      followUser(post.user.id);
    }
  };

  const Skeleton = () => (
    <div className="animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/2 flex items-center justify-center bg-black p-4 mb-4 sm:mb-0">
          <div className="bg-neutral-700 w-full h-48 rounded-md"></div>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center mb-2">
              <div className="w-16 h-16 rounded-xl bg-neutral-700 mr-4"></div>
              <div className="flex flex-col">
                <div className="bg-neutral-700 h-4 w-32 mb-2 rounded"></div>
                <div className="bg-neutral-700 h-4 w-24 rounded"></div>
                <div className="flex gap-2 mt-1">
                  <div className="bg-neutral-700 h-4 w-12 rounded"></div>
                  <div className="bg-neutral-700 h-4 w-12 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 overflow-y-auto max-h-64">
            <hr className="border-t border-gray-600 my-4" />
            <div className="mt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-700 mr-4"></div>
                  <div className="flex flex-col">
                    <div className="bg-neutral-700 h-4 w-32 mb-1 rounded"></div>
                    <div className="bg-neutral-700 h-4 w-24 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className="border-t border-gray-600 my-4 -ml-4 -mr-4" />
          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span className="bg-neutral-700 h-4 w-24 rounded"></span>
            <span className="bg-neutral-700 h-4 w-24 rounded"></span>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="bg-neutral-700 h-10 w-full rounded-2xl"></div>
            <div className="bg-neutral-700 h-10 w-10 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-md z-20"
      onClick={() => setIsOpenModal(false)}
    >
      <div
        className="bg-secondBlack-700 text-white w-full max-w-4xl sm:max-w-lg md:max-w-3xl lg:max-w-4xl rounded-lg relative overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white z-30"
          onClick={() => setIsOpenModal(false)}
        >
          <IoMdClose size={24} />
        </button>

        {isLoading ? (
          <Skeleton />
        ) : !post ? (
          /* Message if post is not found */
          <div className="p-6 text-center text-gray-400">
            <h2 className="text-2xl mb-4">Post no encontrado</h2>
            <p>Lo sentimos, no pudimos encontrar el post solicitado.</p>
          </div>
        ) : (
          /* Modal Content */
          <div className="flex flex-col sm:flex-row">
            <div
              className={`${
                post?.images?.length > 0 ? "sm:w-1/2" : "w-full hidden"
              } flex items-center justify-center bg-black p-4 mb-4 sm:mb-0`}
            >
              {post?.images && (
                <figure className="w-full h-auto flex items-center">
                  <PostSliderImages images={post.images} />
                </figure>
              )}
            </div>

            <div className={`${post?.images ? "w-full" : "w-full"} p-4`}>
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center mb-2">
                  <img
                    className="w-16 h-16 rounded-xl mr-4"
                    src={
                      post?.user?.avatar ||
                      "/images/not-found/avatar-not-found.svg"
                    }
                    alt={post?.user?.name}
                  />
                  <div>
                    <h2 className="text-md font-bold">
                      {post?.user?.name || "Usuario desconocido"}
                    </h2>{" "}
                    <p className="text-gray-400 text-sm">
                      {post?.user?.username || "@usuario"}
                    </p>{" "}
                    <div className="flex gap-3 mt-1">
                      {post?.user?.roles?.map((role) => (
                        <span
                          key={role}
                          className="text-sm px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize"
                          style={{ backgroundColor: getRoleColor(role) }}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {post?.user?.isFollower !== undefined &&
                  post?.user?.isFollower !== null && (
                    <button
                      onClick={() => handleFollow(post?.user?.id)}
                      className={`border border-primaryGreen-400 p-1 rounded-md ${
                        post?.user?.isFollower
                          ? "bg-primaryGreen-400 text-white"
                          : "text-primaryGreen-400 bg-transparent hover:bg-primaryGreen-400 hover:text-white"
                      }`}
                    >
                      {post?.user?.isFollower ? (
                        <AiFillHeart size={16} className="text-white" />
                      ) : (
                        <AiOutlineHeart
                          size={16}
                          className="text-primaryGreen-400"
                        />
                      )}
                    </button>
                  )}
              </div>

              <div className="mt-4 overflow-y-auto max-h-64">
                {/* Content post and comments */}
                <h3 className="text-sm font-semibold">{post?.title || ""}</h3>
                <p className="mb-4">{post?.content || ""}</p>

                <hr className="border-t border-primaryGreen-400 my-4" />

                {/* Comments */}
                <div className="mt-4">
                  {post?.comments?.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex mb-4 transition-opacity duration-500 opacity-0 animate-fade-in"
                    >
                      <img
                        className="w-12 h-12 rounded-xl mr-4"
                        src={
                          comment?.user?.avatar ||
                          "/images/not-found/avatar-not-found.svg"
                        }
                        alt={`${comment?.user?.name || "Desconocido"} avatar`}
                      />
                      <div className="flex flex-col">
                        <strong className="text-sm">
                          {comment?.user?.name || "Usuario desconocido"}
                        </strong>
                        <p className="text-sm">{comment?.content || " "} </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <hr className="border-t border-primaryGreen-400 my-4 -ml-4 -mr-4" />

              {/* Interactions */}
              <div className="flex gap-4 mt-4 text-sm text-gray-400">
                <span>{post?.likes?.length || 0} Recomendados</span>{" "}
                {/* Likes */}
                <span>{post?.comments?.length || 0} Comentarios</span>{" "}
                {/* Comentarios */}
              </div>

              {/* Send comment */}
              {user?.authId && (
                <div className="flex items-center justify-between mt-4">
                  <input
                    type="text"
                    value={commentText}
                    disabled={commentLoading}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddComment();
                      }
                    }}
                    placeholder="¿Quieres compartir algo?"
                    className={`bg-secondBlack-400 border-none rounded-2xl px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primaryGreen-400 w-full 
                    ${commentLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={commentLoading}
                    className={`border border-primaryGreen-400 text-primaryGreen-400 ring-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white 
                    ${commentLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <BiSend size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

PostModal.propTypes = {
  setIsOpenModal: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
