import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import colors from "../../styles/colors";
import logoStyleText from "../../assets/icons/logoStyleText.svg";
import Header from "../../components/Header";
import TopImages from "../../components/TopImages";
import SlideContent from "../../components/SlideContent";
// import ScrollToTop from "./components/layout/ScrollToTop";
// SlideImages
import slideImg1_1 from "../../assets/slideImages/slideImg1_1.png";
import slideImg1_2 from "../../assets/slideImages/slideImg1_2.png";
import slideImg1_3 from "../../assets/slideImages/slideImg1_3.png";
import slideImg1_4 from "../../assets/slideImages/slideImg1_4.png";

import slideImg2_1 from "../../assets/slideImages/slideImg2_1.png";
import slideImg2_2 from "../../assets/slideImages/slideImg2_2.png";
import slideImg2_3 from "../../assets/slideImages/slideImg2_3.png";

import slideImg3_1 from "../../assets/slideImages/slideImg3_1.png";
import slideImg3_2 from "../../assets/slideImages/slideImg3_2.png";
import slideImg3_3 from "../../assets/slideImages/slideImg3_3.png";

import slideImg4_1 from "../../assets/slideImages/slideImg4_1.png";
import slideImg4_2 from "../../assets/slideImages/slideImg4_2.png";
import slideImg4_3 from "../../assets/slideImages/slideImg4_3.png";

import slideImg5_1 from "../../assets/slideImages/slideImg5_1.png";
import slideImg5_2 from "../../assets/slideImages/slideImg5_2.png";
import slideImg5_3 from "../../assets/slideImages/slideImg5_3.png";
import Bottom from "../../components/Bottom";
import Footer from "../../components/Footer";

const logoBoxAnimation = keyframes`
  0% {
    width: 36%;
    transform: scale(1.2);
    opacity: 0.5;
  }
  40% {
    width: 32%;
    transform: scale(1);
    opacity: 1;
  }
  55% {
    width: 32%;
    transform: scale(1);
    opacity: 1;
  }
  100% {
    width: 40%;
    opacity: 0;
    transform: scale(2.2);
  }
`;
const Wrapper = styled.div`
  max-width: 1920px;
  margin: 0 auto;
`;
const AnimateLogo = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.whiteColor};
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${logoBoxAnimation} 1.6s;
`;
const Text = styled.span`
  font-size: 80px;
  font-family: "Helvetica-Bold", "Helvetica", "Apple SD Gothic Neo", serif;
  margin: 0 10px;
`;
const ImgText = styled.img``;
const ContentWrapper = styled.div`
  height: 9500px;
  position: relative;
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
`;
const ContentBox = styled.div`
  width: 100%;
  position: sticky;
  top: 140px;
  @media only screen and (max-width: 768px) {
    position: relative;
  }
`;
const ScrollWrapper = styled.div`
  height: calc(100vh - 140px);

  @media only screen and (max-width: 768px) {
    height: 100%;
    margin-bottom: 140px;
  }
`;
const ScrollBox = styled.div`
  height: 100%;
  position: relative;
`;

const HomePresenter = () => {
  const [display, setDisplay] = useState(true);
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [calcWidth, setCalcWidth] = useState(window.innerWidth);
  const [visible_1, setVisible_1] = useState(true);
  const [visible_2, setVisible_2] = useState(false);
  const [visible_3, setVisible_3] = useState(false);
  const [visible_4, setVisible_4] = useState(false);
  const [visible_5, setVisible_5] = useState(false);

  const onScroll = () => setScrollYPosition(window.scrollY);
  const getWidth = () => setCalcWidth(window.innerWidth);

  useEffect(() => {
    if (scrollYPosition < 4000) {
      setVisible_1(true);
      setVisible_2(false);
      setVisible_3(false);
      setVisible_4(false);
      setVisible_5(false);
    } else if (scrollYPosition > 4000 && scrollYPosition < 5500) {
      setVisible_1(false);
      setVisible_2(true);
      setVisible_3(false);
      setVisible_4(false);
      setVisible_5(false);
    } else if (scrollYPosition > 5500 && scrollYPosition < 7000) {
      setVisible_1(false);
      setVisible_2(false);
      setVisible_3(true);
      setVisible_4(false);
      setVisible_5(false);
    } else if (scrollYPosition > 7000 && scrollYPosition < 8500) {
      setVisible_1(false);
      setVisible_2(false);
      setVisible_3(false);
      setVisible_4(true);
      setVisible_5(false);
    } else if (scrollYPosition > 8500 && scrollYPosition < 9500) {
      setVisible_1(false);
      setVisible_2(false);
      setVisible_3(false);
      setVisible_4(false);
      setVisible_5(true);
    }
  }, [scrollYPosition]);

  useEffect(() => {
    setTimeout(() => setDisplay(false), 1550);
    window.addEventListener("scroll", onScroll);
    // window.addEventListener("resize", getWidth);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {display ? (
        <AnimateLogo>
          <LogoBox>
            <Text>S</Text>
            <ImgText src={logoStyleText} />
            <Text>Q</Text>
            <Text>R</Text>
            <Text>E</Text>
            <Text>T</Text>
          </LogoBox>
        </AnimateLogo>
      ) : (
        <>
          <Header />
          <TopImages />
          <ContentWrapper>
            <ContentBox>
              <ScrollWrapper>
                <ScrollBox>
                  <SlideContent
                    title="연락 수신화면"
                    subTitle="등록된 주차카드의 QR코드를 스캔하여 /n 개인정보 노출없이 `시큐릿 앱` 을 통해 /n 연락을 받을 수 있습니다."
                    imageArr={[
                      slideImg1_1,
                      slideImg1_2,
                      slideImg1_3,
                      slideImg1_4,
                    ]}
                    visible={visible_1}
                  />
                  <SlideContent
                    title="연락 발신화면"
                    subTitle="주차번호판 QR코드를 스캔하여 /n 해당 차량 주인에게 전화 및 메세지를 /n 전송할 수 있습니다."
                    imageArr={[slideImg2_1, slideImg2_2, slideImg2_3]}
                    visible={visible_2}
                    bgColor={colors.activeColor}
                  />
                  <SlideContent
                    title="주차카드 등록"
                    subTitle="여러대의 차량에도 `시큐릿 앱` 으로 /n QR코드 등록 및 주차카드를 관리 할 수 있으며, /n 전화번호 교체없이 여러 공유자를 /n 등록하여 사용할 수 있습니다."
                    imageArr={[slideImg3_1, slideImg3_2, slideImg3_3]}
                    visible={visible_3}
                  />
                  <SlideContent
                    title="주차카드 상품"
                    subTitle="내 차량의 실내와 잘 어울리는 디자인의 /n 주차카드를 볼 수 있는 스토어가 있으며 /n `시큐릿 앱`을 통하여 한번에 구매하실 수 있습니다."
                    imageArr={[slideImg4_1, slideImg4_2, slideImg4_3]}
                    visible={visible_4}
                    bgColor={colors.activeColor}
                  />
                  <SlideContent
                    title="긴급상황 대처"
                    subTitle="긴급상황 발생 시 구조요청 및 /n 각 보험사에 바로 전화연결이 가능하며 /n 사고 상황 대처 메뉴얼도 확인 할 수 있습니다."
                    imageArr={[slideImg5_1, slideImg5_2, slideImg5_3]}
                    visible={visible_5}
                    bgColor={colors.activeColor}
                  />
                </ScrollBox>
              </ScrollWrapper>
            </ContentBox>
          </ContentWrapper>
          <Wrapper>
            <Bottom />
            <Footer />
          </Wrapper>
        </>
      )}
      {/*<ScrollToTop />*/}
    </>
  );
};

export default HomePresenter;
