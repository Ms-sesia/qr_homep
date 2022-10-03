import React from "react";
import styled from "styled-components";
import colors from "../styles/colors";

const Wrapper = styled.div`
  width: 100%;
  font-size: 20px;
  padding: 54px 100px 146px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px soild ${colors.borderGrayColor};

  @media only screen and (max-width: 768px) {
    height: 300px;
    padding: 0 32px 80px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }
`;
const BoldText = styled.span`
  font-weight: 800;
`;
const MediumText = styled.span`
  cursor: pointer;
`;
const GrayText = styled.span`
  color: ${colors.grayFontColor};
  font-weight: 700;
`;

const Footer = () => {
    return (
        <Wrapper>
            <BoldText>주식회사 방쿡</BoldText>
            <MediumText>이용약관</MediumText>
            <MediumText>개인정보처리방침</MediumText>
            <GrayText>
                © BangCook Corp. All rights reserved.
            </GrayText>
        </Wrapper>
    )
}

export default React.memo(Footer);