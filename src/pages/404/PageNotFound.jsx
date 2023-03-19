import React from "react";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Error from "../../assets/no-results.png";
import { Img } from "../../components";
import "./style.scss";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWrapper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
        <Img src={Error} />
      </ContentWrapper>
    </div>
  );
};

export default PageNotFound;
