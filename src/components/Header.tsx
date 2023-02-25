import rocket from "../images/rocket.png";
import unicode from "../images/unicode.png";

const Header = () => {
  return (
    <div className="header">
      <div className="first-header">
        <img src={rocket} alt="" />
      </div>
      <div className="second-header">
        <img src={unicode} alt="" />
      </div>
    </div>
  );
};

export default Header;
