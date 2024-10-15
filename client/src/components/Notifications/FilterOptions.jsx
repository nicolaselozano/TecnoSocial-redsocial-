import { Link } from "react-router-dom";

const FilterOptions = ({ link, name, index, isIndex, setIsIndex }) => {
  return (
    <li
      className={`${
        isIndex === index ? "text-primaryGreen-400" : "text-white"
      }  font-normal text-base z-10 cursor-pointer`}
      onClick={() => setIsIndex(index)}
    >
      <h3>{name}</h3>
    </li>
  );
};

export default FilterOptions;
