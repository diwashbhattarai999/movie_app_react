import ContentWrapper from "../contentWrapper/ContentWrapper";
import "./style.scss";
import logo from "../../assets/moviz-logo.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="footer__logo">
          <img src={logo} alt="" />
        </div>
        <div className="footer__content">
          <ul className="menu__items">
            <li className="menu__item">Terms Of Use</li>
            <li className="menu__item">Privacy-Policy</li>
            <li className="menu__item">About</li>
            <li className="menu__item">Blog</li>
            <li className="menu__item">FAQ</li>
          </ul>
          <div className="info">
            <p>Copyright &copy; 2023 Moviz. All Rights Reserved</p>
            <p>
              Moviz - Find movies online, here you can discover movies online
              for free without annoying advertisement, just come and find your
              favorite movie.
            </p>
          </div>
          <div className="social">
            <span className="icon">
              <FaFacebookF />
            </span>
            <span className="icon">
              <FaInstagram />
            </span>
            <span className="icon">
              <FaTwitter />
            </span>
            <span className="icon">
              <FaLinkedin />
            </span>
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
