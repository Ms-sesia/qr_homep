import React from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import callingImage from "../../assets/callingImage/callingImage.svg";
import phoneIcon from "../../assets/callingImage/phoneIcon.svg";

const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 0 20px;
  margin: auto;
  background-color: ${colors.whiteColor};
  z-index: 1;
  /* border: 1px solid red; */
`;

const Text = styled.div`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin: ${({ margin }) => margin};
  color: ${({ color }) => color};
  cursor: ${({ CURSOR }) => CURSOR && "pointer"};
`;

const Image = styled.img`
  ${({ ROTATE }) =>
    ROTATE &&
    css`
      transform: rotate(135deg);
    `}
`;

const CallButton = styled.div`
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 88px;
  border-radius: 50%;
  background-color: ${colors.redColor};
  cursor: pointer;
`;

const Send = ({ setSend }) => {
  return (
    <Container>
      <Text fontSize={20} fontWeight="bold" margin="0 0 15px 0">
        {"BMW X5"} 차주에게 전화 거는중
      </Text>
      <Text margin="0 0 77px 0" fontSize={14}>
        {"00"}:{"30"}
      </Text>
      <Image src={callingImage} />
      <Text fontSize={14} margin="15px 0 0 85px" CURSOR>
        앱 보러가기
      </Text>
      <CallButton onClick={() => setSend(false)}>
        <Image src={phoneIcon} ROTATE />
      </CallButton>
    </Container>
  );
};

export default Send;
