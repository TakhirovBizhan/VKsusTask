import s from "./Header.module.css";
import futureLogo from "../.././../public/futureLogo.svg";
import { LogoutOptions, useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <header>
      <div className={s.wrapper}>
        <div className={s.title__block}>
          <h1 className={s.title}>Hi future!</h1>
          <img className={s.logo} src={futureLogo} alt="future logo" />
        </div>
        {!isAuthenticated ? (
          <Button
            color="cyan"
            variant="solid"
            onClick={() => loginWithRedirect()}
          >
            Login
          </Button>
        ) : (
          <>
            <Button
              color="cyan"
              variant="outlined"
              onClick={() =>
                logout({ returnTo: window.location.origin } as LogoutOptions)
              }
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
