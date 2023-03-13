import { useState } from "react";
import { ContentWrapper, SwitchTabs, Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
  const [endPoint, setEndPoint] = useState("movie");
  const onTabChange = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  const { data, loading } = useFetch(`/${endPoint}/popular`);

  return (
    <div className="home__carousel-title">
      <ContentWrapper>
        <h1 className="subtitle">What's Popular</h1>
        <SwitchTabs
          data={[
            { name: "Movies", id: 0 },
            { name: "Tv Shows", id: 1 },
          ]}
          onTabChange={onTabChange}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Popular;
