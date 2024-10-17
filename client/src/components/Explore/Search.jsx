import { BiSearchAlt } from "react-icons/bi";

export const Search = () => {
  return (
    <div className="w-full bg-secondBlack-700 text-white p-6 rounded-lg shadow-md my-4">
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Buscar posteo"
          className="bg-secondBlack-400 border-none rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-primaryGreen-400 w-full"
        />
        <button className="border border-primaryGreen-400  text-primaryGreen-400 ring-primaryGreen-400 bg-transparent px-4 py-2 rounded-md hover:bg-primaryGreen-400 hover:text-white">
          <BiSearchAlt size={20} />
        </button>
      </div>
    </div>
  );
};
