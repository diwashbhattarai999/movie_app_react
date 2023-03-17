import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { ContentWrapper, Img } from "../../../components";
import FallBackImage from "../../../assets/avatar.png";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import "./style.scss";

const Cast = ({ casts, loading }) => {
  const { url } = useSelector((state) => state.home);
  const castRef = useRef();

  const scrollCarousel = (dir) => {
    const container = castRef.current;

    const scrollAmount = dir === "left" ? -300 : 300;
    container.scrollTo({
      left: container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="rect skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="cast__container">
      <ContentWrapper>
        <BsFillArrowLeftCircleFill
          className="arrow leftarrow"
          onClick={() => scrollCarousel("left")}
        />
        <BsFillArrowRightCircleFill
          className="arrow rightarrow"
          onClick={() => scrollCarousel("right")}
        />
        <h2 className="title">Top Cast</h2>
        {!loading ? (
          <div className="casts" ref={castRef}>
            {casts?.map((cast) => {
              const castImgUrl = cast?.profile_path
                ? url.movieImg + cast?.profile_path
                : FallBackImage;

              return (
                <div className="cast" key={cast?.id}>
                  <div className="cast__img">
                    <Img src={castImgUrl} />;
                  </div>
                  <div className="cast__text">
                    <h3 className="cast__name">{cast?.name}</h3>
                    <h3 className="cast__role-name">{cast?.character}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="cast__skeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
