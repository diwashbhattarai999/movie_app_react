import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Cast from "./cast/Cast";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import VideoSection from "./videoSection/VideoSection";
import Similar from "./similar/Similar";
import Recommendation from "./recommendations/Recommendation";
import "./style.scss";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div className="details">
      <DetailsBanner video={data?.results} crew={credits?.crew} />
      <Cast casts={credits?.cast} loading={creditsLoading} />
      <VideoSection videos={data?.results} loading={loading} />
      <Similar />
      <Recommendation />
    </div>
  );
};

export default Details;
