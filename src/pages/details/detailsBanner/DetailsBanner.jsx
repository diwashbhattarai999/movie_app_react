import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircleRating, ContentWrapper, Img } from "../../../components";
import useFetch from "../../../hooks/useFetch";
import dayjs from "dayjs";

import PosterFallBack from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon";

import "./style.scss";

const DetailsBanner = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { url } = useSelector((state) => state.home);

  return (
    <div className="details__banner">
      {!loading ? (
        <>
          {!!data && (
            <div className="details__banner-info">
              <div className="backdrop__img">
                <Img src={url.movieImg + data?.backdrop_path} />
              </div>
              <div className="backdrop__overlay"></div>
              <ContentWrapper>
                <div className="details__content">
                  <div className="content__img">
                    {data.poster_path ? (
                      <Img
                        className="poster__img"
                        src={url.movieImg + data?.poster_path}
                      />
                    ) : (
                      <Img className="poster__img" src={PosterFallBack} />
                    )}
                  </div>
                  <div className="content__info">
                    <h1 className="title">
                      {data?.original_title || data?.original_name} (
                      {dayjs(data?.release_date).format("YYYY")})
                    </h1>
                    <h3 className="subtitle">{data?.tagline}</h3>
                    <div className="genres">
                      {data?.genres.map((item) => {
                        return (
                          <div className="genre" key={item.id}>
                            {item.name}
                          </div>
                        );
                      })}
                    </div>
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div className="play__btn">
                        <PlayIcon />
                        <span className="text">Watch Trailor</span>
                      </div>
                    </div>
                    <div className="overview">
                        <h2 className="heading">Overview</h2>
                        <p className="description">{data?.overview}</p>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </div>
          )}
        </>
      ) : (
        <div className="details__banner-skeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
