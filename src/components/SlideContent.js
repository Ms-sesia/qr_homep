import React, {useState, useCallback, useEffect} from "react";
import styled, {css} from "styled-components";
import colors from "../styles/colors";
import prevArrow from "../assets/icons/prevArrow.svg";
import nextArrow from "../assets/icons/nextArrow.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  z-index: 1;
  transition: opacity 0.5s ease-in;

  ${({visible}) =>
    visible &&
    css`
            opacity: 1;
            z-index: 3;
          `};

  @media only screen and (max-width: 768px) {
    padding-top: 10px;
    position: relative;
    opacity: 1;
    ${({bgColor}) => bgColor && css`
      background-color: ${bgColor};
    `}
  }
`;
const PositionBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    flex-direction: column-reverse;
  }

  @media only screen and (max-width: 768px) {
    margin-top: 50px;
    display: block;
  };
`;

const Box = styled.div`
  width: 480px;
  min-height: 300px;
  word-break: keep-all;
  padding: 20px;

  @media only screen and (max-width: 1024px) {
    width: 100%;
    text-align: center;
    margin-top: 50px;
  }

  @media only screen and (max-width: 768px) {
    padding: 0 10px;
    margin-top: 10px;
  }
`;

const Text = styled.div`
  font-size: ${({fontSize}) => fontSize}px;
  font-weight: ${({fontWeight}) => fontWeight};
  color: ${({fontColor}) => (fontColor ? fontColor : colors.black)};
  margin: ${({margin}) => margin};
  word-break: keep-all;

  ${({lineHeight}) =>
    lineHeight &&
    css`
            line-height: ${({lineHeight}) => lineHeight};
          `};

  @media only screen and (max-width: 1440px) {
    font-size: ${({tabletFontSize}) => tabletFontSize}px;
  }

  @media only screen and (max-width: 768px) {
    font-size: ${({mobileFontSize}) => mobileFontSize}px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;
const ImageSlide = styled.div`
  width: 270px;
  position: relative;
  margin: 0 auto;
`;
const SlideBox = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  overflow-x: hidden;
`;
const SlideList = styled.div`
  width: 1500px;
  overflow: hidden;
  transform: translate3d(${({imgCurrentNo}) => imgCurrentNo * -270}px,
  0px,
  0px);
  transition: all 300ms ease 0s;

  @media only screen and (max-width: 768px) {
    transform: translate3d(${({imgCurrentNo}) => imgCurrentNo * -270}px,
    0px,
    0px);
  }
`;
const Content = styled.div`
  height: auto;
  display: table;
  float: left;
  max-width: 270px;
`;
const ImageBox = styled.picture`
  width: 270px;
  height: 530px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;
const Image = styled.img`
  width: ${({width}) => width}%;
  ${({height}) =>
    height && css`
    height: ${height}%;
  `};
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: 24px;

  @media only screen and (max-width: 768px) {
    font-size: 18px;
  }
`;
const SlideButton = styled.div`
  width: 44px;
  height: 44px;
  padding: 10px;
  border-radius: 22px;
  text-align: center;
  background-color: ${colors.borderGrayColor};
  margin: 40px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    width: 34px;
    height: 34px;
  }
`;

const SlideContent = ({title, subTitle, imageArr = [], visible, bgColor}) => {
    let [imgCurrentNo, setImgCurrentNo] = useState(0);

    const onChangeImage = useCallback(
        (idx) => {
            if (imageArr.length <= idx) idx = 0;
            if (idx < 0) idx = imageArr.length - 1;

            setImgCurrentNo(idx);
        },
        [imageArr]
    );

    useEffect(() => {
        let intervalId;

        if (imgCurrentNo + 1 > imageArr.length) {
            setImgCurrentNo(0);
            return;
        }
        intervalId = setInterval(() => {
            if (imgCurrentNo < 0) {
                setImgCurrentNo(imageArr.length - 1);
                return;
            }

            setImgCurrentNo(imgCurrentNo + 1);
        }, 3000);
        return () => clearTimeout(intervalId);
    }, [imgCurrentNo, imageArr]);

    return (
        <Wrapper visible={visible} bgColor={bgColor}>
            <PositionBox>
                <Box>
                    <Text
                        fontSize={36}
                        fontWeight={700}
                        tabletFontSIze={32}
                        mobileFontSize={26}
                        margin="0 0 24px 0"
                    >
                        {title}
                    </Text>
                    <Text
                        fontSize={16}
                        fontWeight={600}
                        lineHeight={1.75}
                        fontColor={!!bgColor ? colors.black : colors.gray}
                    >
                        {subTitle.split("/n").map((line, index) => (
                            <div key={index}>
                                {line}
                                <br/>
                            </div>
                        ))}
                    </Text>
                </Box>
                <Box>
                    <ImageSlide>
                        <SlideBox>
                            <SlideList imgCurrentNo={imgCurrentNo}>
                                {imageArr.map((img) => (
                                    <Content key={img}>
                                        <ImageBox>
                                            <Image width={100} src={img}/>
                                        </ImageBox>
                                    </Content>
                                ))}
                            </SlideList>
                        </SlideBox>
                    </ImageSlide>
                    <ButtonGroup>
                        <SlideButton onClick={() => onChangeImage(imgCurrentNo - 1)}>
                            <Image height={100} src={prevArrow}/>
                        </SlideButton>
                        {imgCurrentNo + 1} / {imageArr.length}
                        <SlideButton onClick={() => onChangeImage(imgCurrentNo + 1)}>
                            <Image height={100} src={nextArrow}/>
                        </SlideButton>
                    </ButtonGroup>
                </Box>
            </PositionBox>
        </Wrapper>
    );
};

export default React.memo(SlideContent);
