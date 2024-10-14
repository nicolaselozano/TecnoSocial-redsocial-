import PropTypes from "prop-types";
import { useState } from "react";
import {
  AiOutlineLike,
  AiOutlineComment,
  AiOutlineHeart,
} from "react-icons/ai";
import { HiArrowsExpand } from "react-icons/hi";
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
            src={post.user.avatar}
            alt="User avatar"
          />
          <div>
            <h2 className="text-lg font-bold">{post.user.name}</h2>
            <div className="flex gap-3 mt-1">
              {post.user.roles.map((role, index) => (
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
      <p className="text-sm mb-4">{post.content}</p>

      {/* Image */}
      {post.image && (
        <figure>
          <img
            className="w-full rounded-xl"
            src={post.image}
            alt="Post content"
          />
        </figure>
      )}

      <hr className="border-t border-primaryGreen-400 my-4" />

      {/* Footer */}
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-4">
          <button className="border border-primaryGreen-400 text-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white">
            <div className="flex gap-2 items-center">
              <AiOutlineLike size={20} />
              <span>{post.likes}</span>
            </div>
          </button>
          <button
            onClick={handleComment}
            className="border border-primaryGreen-400 text-[#43AA8B] bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
          >
            <div className="flex gap-2 items-center">
              <AiOutlineComment size={20} />
              <span>{post.comments.length}</span>
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
          <div className="mt-4">
            {post.comments.map((comment) => (
              <div key={`${comment.id}`} className="text-gray-400 text-sm mb-2">
                <strong>{comment.user}:</strong> {comment.comment}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex justify-end">
        <button className="flex items-center justify-center p-2 bg-secondBlack-400 hover:text-primaryGreen-400 text-white rounded-full shadow-md mt-4">
          <HiArrowsExpand size={20} onClick={() => setIsOpenModal(true)} />
        </button>
      </div>

      {isOpenModal && (
        <PostModal
          setIsOpenModal={setIsOpenModal}
          /* postId={post.id} */ postId={1}
        />
      )}
    </div>
  );
};

// PropTypes
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.any.isRequired,
        user: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
