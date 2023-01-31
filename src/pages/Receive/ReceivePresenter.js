import React from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import callingIcon from "../../assets/callingImage/callingIcon.png";

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
  overflow: hidden;
`;

const View = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${colors.whiteColor};
  position: relative;
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
  background-color: ${colors.greenColor};
  cursor: pointer;
`;
const ReceivePresenter = ({ pageState, handleCallReceive }) => {
  return (
    <View>
      <Text fontSize={20} fontWeight="bold" margin="0 0 15px 0">
        전화 왔습니다
      </Text>

      <Text fontSize={20} fontWeight="bold" margin="0 0 15px 0">
        {"BMW X5"} 차주
      </Text>

      <Image src={callingIcon} />
      <CallButton onClick={() => handleCallReceive()}>
        <Image src={phoneIcon} ROTATE />
      </CallButton>
    </View>
  );
};

export default ReceivePresenter;
