import React from "react";
import styled from "styled-components";
import colors from "../../styles/colors";
import appLogo from "../../assets/icons/appLogo.svg";

const Wrapper = styled.div`
  height: 848px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 400px 0 360px;
  background-color: ${colors.bgColor};

  @media only screen and (max-width: 768px) {
    height: 600px;
    margin: 400px 0 100px;
  }
`;
const AppLogo = styled.div`
  width: 160px;
  height: 160px;

  @media only screen and (max-width: 768px) {
    width: 140px;
    height: 140px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Text = styled.div`
  font-size: 46px;
  line-height: 1.2;
  text-align: center;
  margin: 72px 0 88px;

  @media only screen and (max-width: 768px) {
    font-size: 32px;
    margin: 72px 0 0;
  }
`;
const AppDownload = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 64px;
  font-size: 24px;
  font-weight: 600;
  color: ${colors.whiteColor};
  text-align: center;
  line-height: 2.2;
  border-radius: 50px;
  background-color: ${colors.blackColor};
  cursor: pointer;
  padding: 2px 4px;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    line-height: 1.3;
    /* margin: 50px 0 70px; */
    opacity: 0;
  }
`;
const LineButton = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 2px solid ${colors.white};
  border-radius: 50px;
`;

const Bottom = ({ calcWidth = 1000 }) => {
  return (
    <Wrapper>
      <AppLogo>
        <Image src={appLogo} />
      </AppLogo>
      <Text>
        안심 주차 번호판 <br />
        시큐릿
      </Text>
      {calcWidth > 760 && (
        <AppDownload>
          <LineButton
            onClick={() =>
              window.open(
                "https://play.google.com/store/search?q=%EC%9E%B0%EB%8B%A4&c=apps"
              )
            }
          >
            앱 시작하기
          </LineButton>
        </AppDownload>
      )}
    </Wrapper>
  );
};

export default React.memo(Bottom);
