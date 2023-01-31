import React from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import callingIcon from "../../assets/callingImage/callingIcon.png";
import phoneIcon from "../../assets/callingImage/phoneIcon.svg";

const View = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
  background-color: ${colors.whiteColor};
  position: relative;
  border: 1px solid red;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
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
  position: absolute;
  width: 100%;
  bottom: 0px;
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
  width: 0;
  height: 0;
  position: fixed;
  top: -1000px;
  left: -1000px;
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

const ReceivePresenter = ({
  pageState,
  handleCallReceive,
  myAudio,
  peerAudio,
  handleCallEnd,
  hours,
  minutes,
  seconds,
  TimeRecord,
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
            <Image src={callingIcon} />
            <BottonBox>
              <BottomHalfNavButton
                onClick={() => {
                  handleCallReceive();
                  TimeRecord();
                }}
              >
                받기
              </BottomHalfNavButton>
              <BottomHalfNavButton>거절</BottomHalfNavButton>
            </BottonBox>
          </>
        ) : (
          pageState === "calling" && (
            <>
              <BoldText>BMW X5 걸려온 전화</BoldText>
              <Text margin="0 0 77px 0" fontSize={14}>
                {hours !== 0 && `${hours} : `}
                {hours !== 0
                  ? minutes < 10
                    ? `0${minutes}`
                    : minutes
                  : minutes}{" "}
                : {seconds < 10 ? `0${seconds}` : seconds}
              </Text>
              <Text>
                안심하세요,
                <br />
                상대방은 전화번호를 알 수 없습니다.
              </Text>
              <CallButton onClick={() => handleCallEnd()}>
                <Image src={phoneIcon} ROTATE />
              </CallButton>
            </>
          )
        )}
      </View>
      <Audio ref={myAudio} autoPlay playsInline />
      <Audio ref={peerAudio} autoPlay playsInline />
    </>
  );
};

export default ReceivePresenter;
