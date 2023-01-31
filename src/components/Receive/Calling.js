import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import callingImage from "../../assets/callingImage/callingImage.svg";
import phoneIcon from "../../assets/callingImage/phoneIcon.svg";
import { CallingContext } from "../../pages/Calling/CallingContainer";

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

const Image = styled.img`
  ${({ ROTATE }) =>
    ROTATE &&
    css`
      transform: rotate(135deg);
    `}
`;

const Calling = ({ handleCallEnd }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
  }, [seconds, minutes, hours]);

  return (
    <>
      <BoldText>BMW X5 걸려온 전화</BoldText>
      <Text margin="0 0 77px 0" fontSize={14}>
        {hours !== 0 && `${hours} : `}
        {hours !== 0
          ? minutes < 10
            ? `0${minutes}`
            : minutes
          : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
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
  );
};

export default Calling;
