import React, { useEffect, useState } from "react";
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
  overflow: hidden;
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

const Audio = styled.audio`
  width: 0;
  height: 0;
  position: fixed;
  top: -1000px;
  left: -1000px;
`;

const Send = ({ setSend, myAudio, peerAudio }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(40);

  useEffect(() => {
    const time = setTimeout(() => {
      if (seconds < 59) setSeconds(seconds + 1);
      if (seconds === 59) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
      if (minutes === 59 && seconds === 59) {
        setMinutes(0);
        setHours(hours + 1);
      }
    }, 1000);

    return () => clearTimeout(time);
  }, [seconds, minutes]);

  return (
    <Container>
      <Text fontSize={20} fontWeight="bold" margin="0 0 15px 0">
        {"BMW X5"} 차주에게 전화 거는중
      </Text>
      <Text margin="0 0 77px 0" fontSize={14}>
        {hours !== 0 && `${hours} : `}
        {hours !== 0
          ? minutes < 10
            ? `0${minutes}`
            : minutes
          : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </Text>
      <Image src={callingImage} />
      <Text fontSize={14} margin="15px 0 0 85px" CURSOR>
        앱 보러가기
      </Text>
      <CallButton onClick={() => setSend(false)}>
        <Image src={phoneIcon} ROTATE />
      </CallButton>
      <Audio ref={myAudio} autoPlay playsInline />
      <Audio ref={peerAudio} autoPlay playsInline />
    </Container>
  );
};

export default Send;
