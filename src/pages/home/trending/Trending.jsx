import { useState } from "react";
import { ContentWrapper, SwitchTabs, Carousel } from "../../../components";
import useFetch from "../../../hooks/useFetch";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const onTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  const { data, loading } = useFetch(`/trending/all/${endPoint}`);

  return (
    <div className="home__carousel-title">
      <ContentWrapper>
        <h1 className="subtitle">Trending</h1>
        <SwitchTabs
          data={[
            { name: "Day", id: 0 },
            { name: "Week", id: 1 },
          ]}
          onTabChange={onTabChange}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
    </div>
  );
};

export default Trending;
