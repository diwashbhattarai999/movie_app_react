// import { useParams } from "react-router-dom";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import "./style.scss";

const Details = () => {
  // const { mediaType, id } = useParams();

  return (
    <div className="details">
      <DetailsBanner />
    </div>
  );
};

export default Details;
