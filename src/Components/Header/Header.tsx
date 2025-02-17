import s from "./Header.module.css";
import futureLogo from "../.././../public/futureLogo.svg";

const Header = () => {
  return (
    <header>
      <div className={s.wrapper}>
        <div className={s.title__block}>
          <h1 className={s.title}>Hi future!</h1>
          <img className={s.logo} src={futureLogo} alt="future logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;
