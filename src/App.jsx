import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice"; // importing actions from Redux store
import { fetchDataFromApi } from "./utils/api"; // importing utility function to fetch data from API
import { Header, Footer } from "./components";
import { Home, Details, SearchResult, Explore, PageNotFound } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url); // selecting URL from Redux store

  useEffect(() => {
    fetchApiConfig(); // fetching API configuration when component mounts
    fetchGenres(); // fetching genres when component mounts
  }, []);

  const fetchApiConfig = () => {
    // fetching API configuration
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        movieImg: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url)); // dispatching action to update URL in Redux store
    });
  };

  const fetchGenres = async () => {
    // fetching genres for both movies and TV shows
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`)); // pushing promises to array
    });

    const data = await Promise.all(promises); // waiting for all promises to resolve

    data?.map(({ genres }) => {
      return genres.map((item) => {
        allGenres[item.id] = item;
      });
    });
    dispatch(getGenres(allGenres)); // dispatching action to update genres in Redux store
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        {/* rendering page not found component for all other routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
