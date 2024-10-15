import { Link } from "react-router-dom";

const FilterOptions = ({ link, name, index, isIndex }) => {
  return (
    <li
      className={`${
        isIndex === index ? "text-primaryGreen-400" : "text-white"
      }  font-normal text-base z-10`}
    >
      <Link to={`/notificate/${link}`}>{name}</Link>
    </li>
  );
};

export default FilterOptions;
