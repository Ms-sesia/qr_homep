import React from "react";
import styled, {keyframes} from "styled-components";
import logoImage from "../assets/icons/logo.svg";
import appLogo from "../assets/icons/appLogo.svg";
import mainImages from "../assets/mainImages/mainImages.png";
import image1 from "../assets/mainImages/image1.png";
import image2 from "../assets/mainImages/image2.png";
import image3 from "../assets/mainImages/image3.png";
import image4 from "../assets/mainImages/image4.png";
import image5 from "../assets/mainImages/image5.png";

const TextAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const ImageBoxAnimation = keyframes`
  0% {
    clip-path: circle(10% at center);
    margin-bottom: 1500px;
  }
  56% {
    clip-path: circle(35% at center);
  }
  100% {
    clip-path: circle(100% at center);
  }
`;
const Wrapper = styled.div`
  min-height: 100vh;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 168px 0 216px;

  @media only screen and (max-width: 768px) {
    margin: 100px 0 150px;
  }
`;
const Title = styled.div`
  font-size: 66px;
  font-weight: 700;
  animation: ${TextAnimation} 1.2s;

  @media only screen and (max-width: 768px) {
    font-size: 42px;
  }
`;
const Logo = styled.div`
  width: 160px;
  height: 100px;
  margin: 0 auto 28px;
  background: url(${logoImage}) no-repeat;
  background-size: 100% 100%;
  animation: ${TextAnimation} .8s;

  @media only screen and (max-width: 768px) {
    width: 140px;
    height: 80px;
  }
`;
const Text = styled.span`
  font-size: 42px;
  font-weight: 600;
  margin: ${({margin}) => margin ? margin : 0};

  @media only screen and (max-width: 768px) {
    font-size: 32px;
  }
`;
const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  animation: ${ImageBoxAnimation} 1.5s linear;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const AppLogo = styled.div`
  width: 150px;
  height: 150px;
  margin: 300px auto 120px;

  @media only screen and (max-width: 768px) {
    width: 120px;
    height: 120px;
    margin: 180px auto 80px;
  }
`;
const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;
const Description = styled.div`
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 0 300px;

  @media only screen and (max-width: 768px) {
    margin: 0 0 150px;
  }
`;

const TopImages = () => {
    return (
        <Wrapper>
            <TitleBox>
                <Logo/>
                <Title>안심 주차 번호판, 시큐릿</Title>
            </TitleBox>

            <ImageBox>
                <Image src={mainImages}/>
            </ImageBox>

            <AppLogo>
                <LogoImage src={appLogo}/>
            </AppLogo>
            <Description>
                <Text>간편한 QR코드로</Text>
                <Text>전화번호를 노출하지 않고</Text>
                <Text>나에게 연락 할 수 있는,</Text>
                <Text margin="40px 0 0">하나의 QR카드로</Text>
                <Text>여럿이서 사용 가능한,</Text>
                <Text>나의 소중한 정보를 지켜주는</Text>
                <Text margin="40px 0 0">안심 전화 솔루션!</Text>
            </Description>
        </Wrapper>
    )
}

export default React.memo(TopImages);