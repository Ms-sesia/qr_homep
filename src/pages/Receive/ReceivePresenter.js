import React from "react";
import styled, { css, keyframes } from "styled-components";
import colors from "../../styles/colors";
import callingIcon from "../../assets/callingImage/callingIcon.png";
import Calling from "../../components/Receive/Calling";

const callingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

const View = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 60px 20px 0 20px;
  margin: 0 auto;
  background-color: ${colors.whiteColor};
  position: relative;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  ${({ operAni }) =>
    operAni &&
    css`
      animation: ${callingAnimation} 3s infinite;
    `}

  ${({ ROTATE }) =>
    ROTATE &&
    css`
      transform: rotate(135deg);
    `}
`;

const BoldText = styled.div`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
`;

const BottonBox = styled.div`
  width: 100%;

  padding-bottom: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  & > :first-child {
    background-color: ${colors.blackColor};
    color: ${colors.whiteColor};
  }
`;

const BottomHalfNavButton = styled.div`
  width: 45%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  border: 2px solid ${colors.blackColor};
  cursor: pointer;
`;

const Audio = styled.audio`
  width: 500px;
  height: 500px;
  border: 1px solid red;
  //width: 0;
  //height: 0;
  //position: fixed;
  //top: -1000px;
  //left: -1000px;
`;

const ReceivePresenter = ({
  pageState,
  handleCallReceive,
  myAudio,
  peerAudio,

  handleCallEnd,

  handleRejectCall,
}) => {
  return (
    <>
      <View>
        {pageState === "main" ? (
          <>
            <TextBox>
              <BoldText>전화오는중…</BoldText>

              <Text>
                BMW X5 차량에서 걸려오는 전화입니다
                <br />
                안심하세요, 전화번호는 노출되지않습니다
              </Text>
            </TextBox>
            <Image operAni src={callingIcon} />
            <BottonBox>
              <BottomHalfNavButton
                onClick={() => {
                  handleCallReceive();
                }}
              >
                받기
              </BottomHalfNavButton>
              <BottomHalfNavButton onClick={handleRejectCall}>거절</BottomHalfNavButton>
            </BottonBox>
          </>
        ) : (
          pageState === "calling" && <Calling handleCallEnd={handleCallEnd} />
        )}
      </View>
      <Audio ref={myAudio} autoPlay playsInline />
      <Audio ref={peerAudio} autoPlay playsInline />
    </>
  );
};

export default ReceivePresenter;
