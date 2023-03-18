import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CircleRating,
  ContentWrapper,
  Img,
  VideoPopup,
} from "../../../components";
import useFetch from "../../../hooks/useFetch"; // Importing the custom hook useFetch for making API calls
import dayjs from "dayjs"; // Importing the dayjs library for formatting dates

import PosterFallBack from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayIcon";

import "./style.scss";

const DetailsBanner = ({ video, crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams(); // Destructuring the mediaType and id parameters from the URL
  const { data, loading } = useFetch(`/${mediaType}/${id}`); // Calling the useFetch hook with the mediaType and id to get the data from the API

  const { url } = useSelector((state) => state.home); // Using the useSelector hook to access the home state and get the API URL

  const director = crew?.filter((c) => c.job === "Director");
  const writer = crew?.filter(
    (c) => c.job === "Screenplay" || c.job === "Story" || c.job === "Writer"
  );

  const playTrailer = () => {
    video?.forEach((v) => {
      if (v.name.includes("Trailer")) {
        setVideoId(v.key);
      }
    });
  };

  return (
    <div className="details__banner">
      {!loading ? ( // If the data is not loading, render the banner
        <>
          {!!data && ( // If there is data, render the banner info
            <div className="details__banner-info">
              <div className="backdrop__img">
                {/* Render the backdrop image */}
                <Img src={url.movieImg + data?.backdrop_path} />
              </div>

              {/* Render the backdrop */}
              <div className="backdrop__overlay"></div>

              <ContentWrapper>
                <div className="details__content">
                  <div className="content__img">
                    {data.poster_path ? ( // If there is a poster image, render it
                      <Img
                        className="poster__img"
                        src={url.movieImg + data?.poster_path}
                      />
                    ) : (
                      // If there is no poster image, render the fallback image
                      <Img className="poster__img" src={PosterFallBack} />
                    )}
                  </div>

                  {/* Render the "content__info" */}
                  <div className="content__info">
                    <h1 className="title">
                      {data?.original_title || data?.name} (
                      {dayjs(data?.release_date).format("YYYY")})
                    </h1>

                    <h3 className="subtitle">{data?.tagline}</h3>

                    {/* Render the "genres" */}
                    <div className="genres">
                      {data?.genres.map((item) => {
                        // Map through the genres array and render each genre
                        return (
                          <div className="genre" key={item.id}>
                            {item.name}
                          </div>
                        );
                      })}
                    </div>

                    {/* Render the "row" */}
                    <div className="row">
                      {/* Render the media rating using the CircleRating component */}
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div
                        className="play__btn"
                        onClick={() => {
                          setShow(true);
                          setVideoId(playTrailer);
                        }}
                      >
                        {/* Render the PlayIcon component */}
                        <PlayIcon />
                        <span className="text">Watch Trailor</span>
                      </div>
                    </div>

                    {/* Render the "Overview" */}
                    <div className="overview">
                      <h2 className="heading">Overview</h2>
                      <p className="description">{data?.overview}</p>
                    </div>

                    {/* Render the "info" */}
                    <div className="info">
                      {/* If the data has a "status" property, render a div with classname "info__item" */}
                      {data.status && (
                        <div className="info__item">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}

                      {/* If the data has a "release_date" property, render a div with classname "info__item" */}
                      {data.release_date && (
                        <div className="info__item">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data.release_date).format("MMM DD, YYYY")}
                          </span>
                        </div>
                      )}

                      {/* If the data has a "runtime" property, render a div with classname "info__item" */}
                      {data.runtime && (
                        <div className="info__item">
                          <span className="text bold">Runtime: </span>
                          <span className="text">{`${Math.floor(
                            data.runtime / 60
                          )} hr  ${Math.floor(data.runtime % 60)} min`}</span>
                        </div>
                      )}
                    </div>

                    {director?.length > 0 && (
                      /* Render the director information only if there is at least one director */
                      <div className="info">
                        <span className="text bold">Director: </span>
                        <span className="text">
                          {/* Iterate over the director array and display the director names */}
                          {director
                            // Use the Set object to remove duplicate writers based on their ID
                            .filter(
                              (d, i, arr) =>
                                arr.findIndex((t) => t.id === d.id) === i
                            )
                            .map((d, i, arr) => {
                              return (
                                /* Display each director name and add a comma and space after each one (except for the last one) */
                                <span key={d.id}>
                                  {d.original_name || d.name}
                                  {i !== arr.length - 1 && ", "}
                                </span>
                              );
                            })}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      /* Render the writer information only if there is at least one writer */
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {/* Iterate over the writer array and display the writer names */}
                          {writer
                            // Use the Set object to remove duplicate writers based on their ID
                            .filter(
                              (w, i, arr) =>
                                arr.findIndex((t) => t.id === w.id) === i
                            )
                            .map((w, i, arr) => {
                              return (
                                /* Display each writer name and add a comma and space after each one (except for the last one) */
                                <span key={w.id}>
                                  {w.original_name || w.name}
                                  {i !== arr.length - 1 && ", "}
                                </span>
                              );
                            })}
                        </span>
                      </div>
                    )}

                    {data.created_by?.length > 0 && (
                      /* Render the writer information only if there is at least one writer */
                      <div className="info">
                        <span className="text bold">Creator: </span>
                        <span className="text">
                          {/* Iterate over the writer array and display the writer names */}
                          {data?.created_by
                            // Use the Set object to remove duplicate writers based on their ID
                            .filter(
                              (w, i, arr) =>
                                arr.findIndex((t) => t.id === w.id) === i
                            )
                            .map((w, i, arr) => {
                              return (
                                /* Display each writer name and add a comma and space after each one (except for the last one) */
                                <span key={w.id}>
                                  {w.name}
                                  {i !== arr.length - 1 && ", "}
                                </span>
                              );
                            })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
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
