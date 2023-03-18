import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { ContentWrapper, MovieCard, Spinner } from "../../components";
import { fetchDataFromApi } from "../../utils/api";
import "./style.scss";

const SearchResult = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prevPageNum) => prevPageNum + 1);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  const fetchNextData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data.results) {
          setData((prevData) => {
            return {
              ...prevData,
              results: [...prevData.results, ...res?.results],
            };
          });
        } else {
          setData(res);
        }
        setPageNum((prevPageNum) => prevPageNum + 1);
      }
    );
  };

  return (
    <div className="search-result__section">
      {loading && <Spinner initial="true" />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="title">
                Search {data?.total_results > 1 ? "results" : "result"} for "
                {query}"
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results.length || []}
                next={fetchNextData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results.map((item) => {
                  if (item.media_type === "Person") return;
                  return (
                    <MovieCard key={item.id} fromSearch="true" data={item} />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="title">Sorry, result not found for "{query}"</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResult;
