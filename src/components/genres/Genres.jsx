import { useSelector } from "react-redux";
import "./style.scss";

const Genres = ({ data }) => {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((g) => {
        return (
          <div className="genre" key={g}>
            {genres[g]?.name}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
