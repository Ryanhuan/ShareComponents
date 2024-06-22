import { clsx } from "clsx";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { Button } from "@share/ui/Button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/slices/authSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  projectName: string;
};

export default function Topbar({ projectName }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <TopbarStyled className={clsx("")}>
        <div className={"wrapper"}>
          <div className={"topLeft"}>
            <Link to="/" className={"Link"}>
              <div className={"logo"}>
                <span className={"logoTitle"}>{projectName}</span>
              </div>
            </Link>
          </div>

          <div className="topright">
            <Button className="mr-2 mt-2 min-w-unit-0" size="sm" onClick={handleLogout}>
              Logout
            </Button>
            <ThemeSwitcher />
          </div>
        </div>
      </TopbarStyled>
    </>
  );
}

const LogoStyled = styled.div`
  margin: 10px;
  .Link {
    text-decoration: none;
    color: inherit;
  }
  .logoTitle {
    font-family: "Outfit", sans-serif;

    font-size: 40px;
    margin-left: 10px;
    font-weight: 500;
    text-spacing: 1.5px;
  }
`;

const TopbarStyled = styled.div`
  width: 100%;
  height: 100px;
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: transparent;

  .wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .topLeft {
    }

    .topRight {
      display: flex;
      align-items: center;

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;
