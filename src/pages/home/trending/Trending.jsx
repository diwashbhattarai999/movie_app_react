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
    <div className="trending">
      <ContentWrapper>
        <h1 className="trending__title">Trending</h1>
        <SwitchTabs
          data={[
            { name: "Day", id: 0 },
            { name: "Week", id: 1 },
          ]}
          onTabChange={onTabChange}
        />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
