import "./PageNotFound.scss";
import errorImg from "../images/error404.png";

const PageNotFound = () => {
  return (
    <div className="error404">
      <h1>Error 404!</h1>
      <hr />
      <h2 className="errorMsg">Page not found!!</h2>
      <img src={errorImg} alt="" />
    </div>
  );
};

export default PageNotFound;
