import React, { useContext } from "react";
import callingImage from "../../assets/callingImage/callingImage.svg";
import styled from "styled-components";
import colors from "../../styles/colors";
import MessageModal from "../../components/Calling/MessageModal";
import Calling from "../../components/Calling/Calling";
import appIcon from "../../assets/icons/appIcon.svg";
import Call from "../../components/Calling/Call";
import Receive from "../../components/Calling/Receive";
import CallLoading from "../../components/Calling/CallLoading";
import { CallingContext } from "./CallingContainer";
import goBackIcon from "../../assets/icons/goBack.svg";

const Wrapper = styled.div`
  padding: 60px 20px 0;
`;
const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: calc(90vh - 80px);
  max-height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  padding: 0 20px;
  margin: auto;
`;

const Text = styled.div`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin: ${({ margin }) => margin};
  line-height: ${({ TITLE }) => TITLE && 25}px;
  cursor: ${({ CURSOR }) => CURSOR && "pointer"};
`;

const Image = styled.img``;

const RowBox = styled.div`
  //width: 100%;
  display: flex;
  align-items: center; 
`;

const Button = styled.div`
  width: 80vw;
  max-width: 350px;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ BG }) => BG && 15}px;
  border-radius: 26px;
  color: ${({ BG }) =>
    BG ? `${colors.whiteColor}` : `${colors.lightGrayFontColor}`};
  font-weight: bold;
  background-color: ${({ BG }) => BG && `${colors.blackColor}`};
  cursor: pointer;
`;

const Audio = styled.video`
  width: 0;
  height: 0;
  position: fixed;
  top: -1000px;
  left: -1000px;
`;

const ColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const GoBackButton = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CallingPresenter = ({ handleGoBack }) => {
  const { message, setMessage, setPageState, myAudio, peerAudio, pageState } =
    useContext(CallingContext);
  return (
    <Wrapper>
        <GoBackButton onClick={handleGoBack}>
            <Image src={goBackIcon} />
        </GoBackButton>
      <Container>
        {pageState === "main" && (
          <>
            <RowBox>
              <Image src={appIcon} />
              <Text fontSize={20} fontWeight="bold" TITLE>
                번호가 보이지 않는 QR 카드 <br /> 안심 전화 솔루션, 시크릿
              </Text>
            </RowBox>
            <ColumnBox>
              <Image src={callingImage} />
              <Text fontSize={14} CURSOR margin="10px 0 0 auto">
                <a target="_blank" href="https://www.google.com">
                  앱 보러가기
                </a>
              </Text>
            </ColumnBox>
            <ColumnBox>
              <Button BG onClick={() => setPageState("call")}>
                전화하기
              </Button>
              <Button onClick={() => setMessage(true)}>메세지 보내기</Button>
            </ColumnBox>
          </>
        )}

        {/* 전화하기 버튼 눌렀을 때 */}
        {pageState === "call" && <Call handleGoBack={handleGoBack} />}

        {message && <MessageModal setMessage={setMessage} />}

        {/* 상대방이 내가 건 전화를 받은 경우 */}
        {pageState === "calling" && (
          <Calling myAudio={myAudio} peerAudio={peerAudio} />
        )}

        {/* 상대방으로부터 전화가 왔을 때 */}
        {pageState === "receive" && <Receive />}

        {/* 전화 발신 중 중 화면 */}
        {pageState === "callLoading" && <CallLoading />}
      </Container>
      <Audio ref={myAudio} autoPlay playsInline />
      <Audio ref={peerAudio} autoPlay playsInline />
    </Wrapper>
  );
};

export default CallingPresenter;
