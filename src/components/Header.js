import React, {useCallback} from "react";
import styled, { css } from "styled-components";
import colors from "../styles/colors";
import appLogo from "../assets/icons/appLogo.svg";
import bottomArrow from "../assets/icons/bottomArrow.svg";

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
  position: sticky;
  top: 0;
  z-index: 10;
  transition: 0.5s;

  @media only screen and (max-width: 1024px) {
    padding: 10px 50px;
  }
  
  @media only screen and (max-width: 768px) {
    height: 70px;
    padding: 10px 20px;
  }
`;
const AppDownload = styled.div`
  font-size: 21px;
  font-weight: bold;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 220px;
  cursor: pointer;
  transition: 0.7s;

  @media only screen and (max-width: 768px) {
    font-size: 18px;
    width: 180px;
  }
`;
const LogoImage = styled.img`
  width: 70px;
  height: 70px;
  transition: .4s;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
const ArrowImage = styled.img`
  width: 24px;
  height: 24px;
  transition: .4s;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const Header = () => {
    const scrollToTop = useCallback(() => window.scrollTo(0, 0), []);

    return (
        <Wrapper>
            <LogoImage width={70} height={70} src={appLogo} onClick={scrollToTop} />
            <AppDownload
                // onClick={() => window.open("https://play.google.com/store/search?q=%EC%9E%B0%EB%8B%A4&c=apps")}
            >
                시큐릿 앱 다운로드
                <ArrowImage src={bottomArrow} />
            </AppDownload>
        </Wrapper>
    );
};

export default Header;
