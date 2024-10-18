import PropTypes from "prop-types";
import { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineHeart,
} from "react-icons/ai";
import { BiSend } from "react-icons/bi";
import { getRoleColor } from "../../helpers/get-role-color";
import { PostModal } from "./PostModal";

export const PostCard = ({ post }) => {
  const [showComment, setShowComment] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleComment = () => {
    if (!showComment) {
      setShowComment(true);
    }
  };

  return (
    <div className="w-full bg-secondBlack-700 text-white p-6 rounded-lg shadow-md mb-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center mb-4">
          <img
            className="w-16 h-16 rounded-xl mr-4"
            src={post?.user?.avatar || "https://via.placeholder.com/150"}
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
                  style={{ backgroundColor: getRoleColor(role) }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <button className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent p-1 rounded-md hover:bg-primaryGreen-400 hover:text-white self-end">
            <AiOutlineHeart size={16} />
          </button>
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
              className="w-full rounded-xl"
              src={post.images[0].url}
              alt={post.images[0].alt || "Imagen"}
            />
          </figure>
        )}
      </div>

      <hr className="border-t border-primaryGreen-400 my-4" />

      {/* Footer */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          <button className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white">
            <div className="flex gap-2 items-center">
              <AiOutlineLike size={20} />
              <span>{post?.likeCount ?? 0}</span>
            </div>
          </button>
          <button
            onClick={handleComment}
            className="border border-primaryGreen-400 text-[#43AA8B] bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
          >
            <div className="flex gap-2 items-center">
              <AiOutlineComment size={20} />
              <span>{post?.commentsCount ?? 0}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComment && (
        <>
          <div className="flex items-center justify-between mt-4">
            <input
              type="text"
              placeholder="Añadir un comentario..."
              className="bg-secondBlack-400 border-none rounded-2xl px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primaryGreen-400 w-full"
            />
            <button className="border border-primaryGreen-400  text-primaryGreen-400 ring-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white">
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
  }),
};
