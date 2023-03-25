import React from "react";
import { useParams } from "react-router-dom";
import { Carousel, ContentWrapper } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Similar = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);

  return (
    <>
      {data?.results.length > 0 && (
        <div className="similar-movies__section">
          <ContentWrapper>
            <h2 className="title">Similar Movies</h2>
          </ContentWrapper>
          <Carousel
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
          />
        </div>
      )}
    </>
  );
};

export default Similar;
