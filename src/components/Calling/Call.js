import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import callingImage from "../../assets/callingImage/callingImage.svg";
import phoneIcon from "../../assets/callingImage/phoneIcon.svg";
import messageIcon from "../../assets/callingImage/messageIcon.svg";
import colors from "../../styles/colors";
import MessageModal from "./MessageModal";
import Calling from "./Calling";
import {CallingContext} from "../../pages/SendbirdCalling/CallingContainer";

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 90vh;
  max-height: 844px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //position: absolute;
  padding: 0 20px;
  margin: auto;
  background-color: ${colors.whiteColor};
  z-index: 1;
  //border: 1px solid red;
`;
const Text = styled.div`
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight};
  margin: ${({margin}) => margin};
  color: ${({color}) => color};
`;

const Image = styled.img``;

const CallButton = styled.div`
  width: 155px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 88px;
  border-radius: 30px;
  background-color: ${colors.blackColor};
  flex-shrink: 0;
  cursor: pointer;
`;

const MessageButton = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  cursor: pointer;
`;

const MessageBox = styled.div`
  width: 171px;
  height: 67px;
  position: absolute;
  bottom: 63px;
  padding: 10px 12px;
  border-radius: 4px;
  background-color: ${colors.blueColor};
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 13px solid ${colors.blueColor};
  margin-top: 14px;
  margin-left: -7px;
`;

const Call = () => {
    const [display, setDisplay] = useState(true);

    const {pageState, handleSendCall, setMessage, message} = useContext(CallingContext);

    useEffect(() => {
        setTimeout(() => {
            setDisplay(false);
        }, 3000);
    }, []);

    return (
        <Wrapper>
            <Container>
                <Text fontSize={20} fontWeight="bold">
                    ????????????
                </Text>
                <Text fontSize={26} fontWeight="bold" margin="20px 0 54px 0 ">
                    BMW X5 ??????
                </Text>
                <Image src={callingImage}/>
                <CallButton onClick={() => handleSendCall()}>
                    <Image src={phoneIcon}/>
                    {display && (
                        <MessageBox>
                            <Text
                                fontSize={14}
                                color={colors.whiteColor}
                                fontWeight="bold"
                                margin="0 0 10px 0"
                            >
                                ?????? ????????? ?????? ?????????
                            </Text>
                            <Text fontSize={14} color={colors.whiteColor} fontWeight="bold">
                                ???????????????
                            </Text>
                            <Triangle/>
                        </MessageBox>
                    )}
                </CallButton>
                <MessageButton>
                    <Image src={messageIcon}/>
                    <Text
                        fontWeight={300}
                        color={colors.grayFontColor}
                        margin="0 0 0 10px"
                        onClick={() => setMessage(true)}
                    >
                        ????????? ?????????
                    </Text>
                </MessageButton>
                {message && <MessageModal/>}
                {pageState === "calling" && <Calling/>}
            </Container>
        </Wrapper>
    );
};

export default Call;
