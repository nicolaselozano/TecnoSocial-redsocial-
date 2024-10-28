import PropTypes from "prop-types";
import { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { getRoleColor } from "../../helpers/get-role-color";
import { PostModal } from "./PostModal";
import usePostsStore from "../../context/posts/posts-store";

export const PostCard = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  const {
    likePost,
    unlikePost,
    followUser,
    unfollowUser,
    addQuicklyComment,
    commentLoading,
    likeLoading,
  } = usePostsStore();

  const user = JSON.parse(localStorage.getItem("userdata"));

  const handleLike = () => {
    if (post.isLike) {
      unlikePost(post.id);
    } else {
      likePost(post.id);
    }
  };

  const handleFollow = () => {
    if (post.user.isFollower) {
      unfollowUser(post.user.id);
    } else {
      followUser(post.user.id);
    }
  };

  const handleComment = () => {
    if (!showComment) {
      setShowComment(true);
    }
  };

  const handleAddQuicklyComment = () => {
    if (commentText.trim()) {
      addQuicklyComment(post.id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="w-full bg-secondBlack-700 text-white p-6 rounded-lg shadow-md mb-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-xl mr-4"
            src={post?.user?.avatar || "/images/not-found/avatar-not-found.svg"}
            alt="User avatar"
          />
          <div>
            <h2 className="text-lg font-bold">
              {post?.user?.name || "Usuario desconocido"}
            </h2>
            <div className="flex gap-3 mt-1">
              {post?.user?.roles?.map((role, index) => (
                <span
                  key={index}
                  className={`text-sm px-2 py-1 rounded-md border-l-2 border-white border-opacity-30 capitalize`}
                  style={{ backgroundColor: getRoleColor(role.name) }}
                >
                  {role.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          {post?.user?.isFollower !== undefined &&
            post?.user?.isFollower !== null && (
              <button
                onClick={() => handleFollow(post?.user?.id)}
                className={`border border-primaryGreen-400 p-1 rounded-md ${
                  post?.user?.isFollower
                    ? "bg-primaryGreen-400 text-white"
                    : "text-primaryGreen-400 bg-transparent hover:bg-primaryGreen-400 hover:text-white transition-all"
                }`}
              >
                {post?.user?.isFollower ? (
                  <AiFillHeart size={16} className="text-white" />
                ) : (
                  <AiOutlineHeart
                    size={16}
                    className="text-primaryGreen-400 hover:text-white "
                  />
                )}
              </button>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="cursor-pointer" onClick={() => setIsOpenModal(true)}>
        <h3 className="text-sm font-semibold">{post?.title || ""}</h3>
        <p className="text-sm mb-4">{post?.content || ""}</p>

        {/* Image */}
        {post?.images?.[0]?.url && (
          <figure>
            <img
              className="w-full rounded-xl opacity-0 translate-y-4 transition-all duration-700 ease-in-out"
              src={post.images[0].url}
              alt={post.images[0].alt || "Imagen"}
              onLoad={(e) => {
                e.target.style.opacity = 1;
                e.target.style.transform = "translateY(0)";
              }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </figure>
        )}
      </div>

      <hr className="border-t border-primaryGreen-400 my-4" />

      {/* Footer */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          {user?.id && post?.isLike !== undefined && post?.isLike !== null && (
            <button
              onClick={handleLike}
              disabled={likeLoading}
              className={`border border-primaryGreen-400 px-4 py-2 rounded-md 
              ${post?.isLike ? "bg-primaryGreen-400 text-white" : "text-primaryGreen-400 bg-transparent hover:bg-primaryGreen-400 hover:text-white"} 
              ${likeLoading ? "opacity-50" : ""}`}
            >
              <div className="flex gap-2 items-center">
                <AiOutlineLike size={20} />
                <span>{post?.likeCount ?? 0}</span>
              </div>
            </button>
          )}
          {user?.id && (
            <button
              onClick={handleComment}
              className="border border-primaryGreen-400 text-[#43AA8B] bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
            >
              <div className="flex gap-2 items-center">
                <AiOutlineComment size={20} />
                <span>{post?.commentsCount ?? 0}</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Comments */}
      {showComment && (
        <>
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              value={commentText}
              disabled={commentLoading}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddQuicklyComment();
                }
              }}
              placeholder="Añadir un comentario..."
              className={`bg-secondBlack-400 border-none rounded-2xl px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primaryGreen-400 w-full 
              ${commentLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <button
              onClick={handleAddQuicklyComment}
              disabled={commentLoading}
              className={`border border-primaryGreen-400 text-primaryGreen-400 ring-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white 
              ${commentLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <BiSend size={20} />
            </button>
          </div>
        </>
      )}

      {isOpenModal && (
        <PostModal setIsOpenModal={setIsOpenModal} postId={post?.id || 1} />
      )}
    </div>
  );
};

// PropTypes
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number,
      avatar: PropTypes.string,
      name: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
      isFollower: PropTypes.bool,
    }),
    content: PropTypes.string,
    title: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        url: PropTypes.string,
        alt: PropTypes.string,
      })
    ),
    likeCount: PropTypes.number,
    commentsCount: PropTypes.number,
    isLike: PropTypes.bool,
  }),
};
