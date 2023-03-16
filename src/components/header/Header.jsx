import { useEffect, useRef, useState } from "react";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/moviz-logo.svg";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    window.scroll(0, 0);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        if (window.scrollY > lastScrollY && !mobileMenu) {
          setShow("hide");
        } else {
          setShow("show");
        }
        setLastScrollY(window.scrollY);
      } else {
        setShow("top");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const openMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const closeMenu = () => {
    setMobileMenu(false);
  };

  const handleMenuItem = (type) => {
    if (type === "movie") {
      navigate(`/explore/movie`);
    } else if (type === "tv") {
      navigate(`/explore/tv`);
    } else {
      navigate("/");
    }

    setMobileMenu(false);
    window.scrollTo(0, 0);
  };

  const handleSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);

    setTimeout(() => {
      inputRef.current.focus();
    }, 1);
  };

  // Click Outside To Close START
  useEffect(() => {
    if (mobileMenu || showSearch) {
      const ClickOutsideToClose = (e) => {
        if (headerRef.current && !headerRef.current.contains(e.target)) {
          setMobileMenu(false);
          setShowSearch(false);
        }
      };

      document.addEventListener("mousedown", ClickOutsideToClose);

      // Clean up
      return () => {
        document.removeEventListener("mousedown", ClickOutsideToClose);
      };
    }
  }, [mobileMenu, showSearch]);
  // Click Outside To Close END

  return (
    <header
      ref={headerRef}
      className={`header ${mobileMenu ? "mobile__view" : ""} ${show}`}
    >
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" onClick={() => handleMenuItem("home")} />
        </div>
        <div className="menu">
          <ul className="menu__items">
            <li className="menu__item" onClick={() => handleMenuItem("home")}>
              Home
            </li>
            <li className="menu__item" onClick={() => handleMenuItem("movie")}>
              Movies
            </li>
            <li className="menu__item" onClick={() => handleMenuItem("tv")}>
              Tv Shows
            </li>
            <li className="menu__item">
              <HiOutlineSearch onClick={() => handleSearch()} />
            </li>
          </ul>
          <div className="mobile__menu">
            <HiOutlineSearch onClick={() => handleSearch()} />
            {mobileMenu ? (
              <VscChromeClose onClick={closeMenu} />
            ) : (
              <SlMenu onClick={openMenu} />
            )}
          </div>
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="search__bar">
          <ContentWrapper>
            <div className="search__input">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for a movie or tv shows..."
                onKeyUp={handleQueryHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
