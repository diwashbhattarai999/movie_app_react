import React, { useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";

const Carousel = ({ data, loading }) => {
  const { url } = useSelector((state) => state.home);

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
        <BsFillArrowLeftCircleFill className="arrow leftarrow" />
        <BsFillArrowRightCircleFill className="arrow rightarrow" />
        {!loading ? (
          <div className="carousel__items">
            {data?.map((item) => {
              const posterUrl = item.poster_path
                ? url.movieImg + item.poster_path
                : PosterFallback;
              return (
                <div className="carousel__item" key={item.id}>
                  <div className="poster__block">
                    <Img src={posterUrl} />
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <div className="original_lang">
                      {item.original_language}
                    </div>
                  </div>
                  <div className="text__block">
                    <span className="title">{item.title || item.name}</span>
                    <span className="date">
                      {dayjs(item.release_date).format("MMM D , YYYY")}
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
