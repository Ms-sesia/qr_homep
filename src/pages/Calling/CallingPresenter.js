import React from "react";
import callingImage from "../../assets/callingImage/callingImage.svg";
import phoneIcon from "../../assets/callingImage/phoneIcon.svg";
import messageIcon from "../../assets/callingImage/messageIcon.svg";
import styled from "styled-components";
import colors from "../../styles/colors";
import MessageModal from "../../components/Calling/MessageModal";
import Send from "../../components/Calling/Send";
import appIcon from "../../assets/icons/appIcon.svg";
import Receive from "../../components/Calling/Receive";

const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 20px;
  margin: auto;
  /* border: 1px solid red; */
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
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 62px;
`;

const Button = styled.div`
  width: 100%;
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

const CallingPresenter = ({
  message,
  setMessage,
  send,
  setSend,
  receive,
  setReceive,
}) => {
  return (
    <>
      <Container>
        <RowBox>
          <Image src={appIcon} />
          <Text fontSize={20} fontWeight="bold" TITLE>
            번호가 보이지 않는 QR 카드 <br /> 안심 전화 솔루션, 시크릿
          </Text>
        </RowBox>
        <Image src={callingImage} />
        <Text fontSize={14} margin="15px 0 66px 85px" CURSOR>
          앱 보러가기
        </Text>
        <Button BG onClick={() => setReceive(true)}>
          전화하기
        </Button>
        <Button onClick={() => setMessage(true)}>메세지 보내기</Button>
        {receive && (
          <Receive
            send={send}
            setSend={setSend}
            message={message}
            setMessage={setMessage}
          />
        )}
        {message && <MessageModal setMessage={setMessage} />}
        {send && <Send setSend={setSend} />}
      </Container>
    </>
  );
};

export default CallingPresenter;
