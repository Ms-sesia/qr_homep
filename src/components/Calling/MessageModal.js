import React, { useState } from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import closeIcon from "../../assets/icons/closeIcon.svg";
import messageTitleIcon from "../../assets/icons/messageTitleIcon.svg";

const Container = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 0 20px;
  margin: auto;
  background-color: ${colors.whiteColor};
  z-index: 1;
`;

const Image = styled.img`
  ${({ CLOSE }) =>
    CLOSE &&
    css`
      position: absolute;
      left: 0;
      cursor: pointer;
    `}
`;

const Text = styled.div`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ color }) => color};
  margin: ${({ margin }) => margin};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 60px 0 10px 0;
`;

const MessageTitle = styled.div`
  width: 100%;
  display: flex;
  padding: 28px 0 21px 0;
  border-bottom: 1px solid ${colors.lightGrayColor};
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 60%;
  display: flex;
  font-size: 14px;
  padding: 12px;
  ::placeholder {
    color: ${colors.grayFontColor};
  }
`;

const SendButton = styled.div`
  width: 100%;
  height: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 0 12px 0;
  border-radius: 26px;
  color: ${colors.whiteColor};
  font-weight: bold;
  background-color: ${colors.blackColor};
  cursor: pointer;
`;

const MessageModal = ({ setMessage }) => {
  const [input, setInput] = useState("");

  return (
    <Container>
      <Header>
        <Image
          src={closeIcon}
          CLOSE
          onClick={() => {
            setMessage(false);
            setInput("");
          }}
        />
        <Text fontWeight="bold">메시지 보내기</Text>
      </Header>
      <MessageTitle>
        <Image src={messageTitleIcon} />
        <Text margin="0 0 0 12px">{"BMW X5"} 차주에게 보내는 메시지</Text>
        <Text margin="0  0 0 auto">({input.length} / 400)</Text>
      </MessageTitle>
      <Input
        placeholder="원하는 메시지를 입력해주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <SendButton>전송하기</SendButton>
    </Container>
  );
};

export default MessageModal;
