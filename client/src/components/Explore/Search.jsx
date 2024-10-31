import { BiSearchAlt } from "react-icons/bi";
import { useState, useEffect } from "react";
import usePostStore from "../../context/posts/posts-store";

export const Search = () => {
  const { setSearch, fetchPosts, search } = usePostStore();
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  const handleSearch = () => {
    setSearch(searchTerm);
    fetchPosts(1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-secondBlack-700 text-white p-6 rounded-lg shadow-md my-4">
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Buscar posteo"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-secondBlack-400 border-none rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primaryGreen-400 w-full"
        />
        <button
          onClick={handleSearch}
          className="border border-primaryGreen-400 text-primaryGreen-400 ring-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white"
        >
          <BiSearchAlt size={20} />
        </button>
      </div>
    </div>
  );
};
