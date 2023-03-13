import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ContentWrapper, Img } from "../../../components";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);

  const handleQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const handleClick = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  const { data, loading } = useFetch("/movie/upcoming");
  useEffect(() => {
    const bg =
      url.movieImg +
      data?.results[Math.floor(Math.random() * 20)].backdrop_path;
    setBackground(bg);
  }, [data]);

  return (
    <div className="hero__banner">
      {!loading && (
        <div className="hero__backdrop-img">
          <Img src={background} />
        </div>
      )}

      <div className="hero__overlay"></div>

      <ContentWrapper>
        <div className="hero__wrapper">
          <div className="hero__content">
            <span className="title">Find Movies, TV shows and more</span>
            <span className="subtitle">
              Millions of movies, TV shows and people to discover.Explore Now
            </span>
          </div>
          <div className="hero__search">
            <input
              type="text"
              placeholder="Search for a movie or tv shows..."
              onKeyUp={handleQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleClick}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
