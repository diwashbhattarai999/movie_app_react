import React, { useState } from "react";
import { ContentWrapper, Img, VideoPopup } from "../../../components";
import { PlayIcon } from "../PlayIcon";
import "./style.scss";

const VideoSection = ({ videos, loading }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="video__section">
      <ContentWrapper>
        <h2 className="title">Related Videos</h2>
        {!loading ? (
          <div className="videos">
            {videos?.map((video) => {
              return (
                <div
                  className="video"
                  key={video.id}
                  onClick={() => {
                    setShow(true);
                    setVideoId(video.key);
                  }}
                >
                  <div className="video__thumbnail">
                    <Img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                    />
                    <PlayIcon />
                  </div>
                  <div className="video__title">{video.name}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="video__skeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default VideoSection;
