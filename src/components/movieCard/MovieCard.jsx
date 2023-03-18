import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Img from "../lazyLoadImage/Img";
import FallBackImage from "../../assets/no-poster.png";
import dayjs from "dayjs";

import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

import "./style.scss";

const MovieCard = ({ data, fromSearch, mediaType }) => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const posterUrl = data?.poster_path
    ? url.movieImg + data.poster_path
    : FallBackImage;
  return (
    <div
      className="movie__card"
      onClick={() => {
        navigate(`/${data.media_type || mediaType}/${data.id}`);
        window.scrollTo(0, 0);
      }}
    >
      <div className="poster__block">
        <Img src={posterUrl} />
        {!fromSearch && (
          <React.Fragment>
            <CircleRating rating={data.vote_average.toFixed(1)} />
            <Genres data={data.genre_ids.slice(0, 2)} />
          </React.Fragment>
        )}
      </div>
      <div className="text__block">
        <span className="title">{data.title || data.name}</span>
        <span className="date">
          {dayjs(data.release_date).format("MM D, YYYY")}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
