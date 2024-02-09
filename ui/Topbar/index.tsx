import { clsx } from "clsx";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function Topbar() {
  return (
    <>
      <TopbarStyled className={clsx("")}>
        <div className={"wrapper"}>
          <div className={"topLeft"}>
            <Link to="/" className={"Link"}>
              <div className={"logo"}>
                <span className={"logoTitle"}>Bot Game CMS</span>
              </div>
            </Link>
          </div>
          <div className={"topright"}>
            <ThemeSwitcher />
          </div>
        </div>
      </TopbarStyled>
    </>
  );
}

const TopbarStyled = styled.div`
  width: 100%;
  height: 40px;
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
      .Link {
        text-decoration: none;
        color: inherit;
      }

      .logoTitle {
        font-size: 20px;
        margin-left: 10px;
        font-weight: 500;
        text-spacing: 1.5px;
        color: #77969a;
      }
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
