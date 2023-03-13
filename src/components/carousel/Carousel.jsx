import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { CircleRating, Genres, ContentWrapper } from "../../components";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";

const Carousel = ({ data, loading, endPoint }) => {
  const carouselRef = useRef();
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const scrollCarousel = (dir) => {
    const container = carouselRef.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const skItem = () => {
    return (
      <div className="skeleton__item">
        <div className="poster__block skeleton"></div>
        <div className="text__block">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="arrow leftarrow"
          onClick={() => scrollCarousel("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow rightarrow"
          onClick={() => scrollCarousel("right")}
        />
        {!loading ? (
          <div className="carousel__items" ref={carouselRef}>
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.movieImg + item.poster_path
                : PosterFallback;

              const releaseDate = item.release_date
                ? item.release_date
                : item.first_air_date;
              return (
                <div
                  className="carousel__item"
                  key={item.id}
                  onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}
                >
                  <div className="poster__block">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                    <div className="original_lang">
                      {item.original_language}
                    </div>
                  </div>
                  <div className="text__block">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(releaseDate).format("MMM D , YYYY")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loading__skeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
