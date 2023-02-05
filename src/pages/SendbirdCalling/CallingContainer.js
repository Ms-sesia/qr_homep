import React, { useEffect, useRef, useState, createContext, useCallback } from "react";
import CallingPresenter from "./CallingPresenter";
import { useNavigate } from "react-router-dom";
import eruda from "eruda";
import SendBirdCall from "sendbird-calls";
// import SendBirdCall from "../../libs/Sendbirdcallinfo";
import { APP_ID, TOKEN, CALLER_SB_ID } from "../../constants";
import { AskBrowserPermission, authOption, AuthorizeUser, WaitForCalls } from "../../libs/Sb_method";

export const CallingContext = createContext(null);

const CallingContainer = () => {
  const navigate = useNavigate();

  let currentCall;
  const myAudio = useRef(); // 내 마이크
  const peerAudio = useRef(); // 상대방 마이크

  const [message, setMessage] = useState(false); //메세지 모달
  // const [callSate, setCallState] = useState(false); //전화 걸었을 때 true
  const [pageState, setPageState] = useState("main"); //띄울 화면

  // userId는 접속하자마자 Query에 QRserial넣어서 받아옴
  const userId = "user1";
  const handleGoBack = useCallback(() => {
    // React Native 환경 일 때 뒤로가기 함수 전달
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage("GO_BACK");
    } else {
      setPageState("main");
    }
  }, []);

  useEffect(() => {
    eruda.init();

    SendBirdCall.init(APP_ID);
    AskBrowserPermission();

    if (AuthorizeUser(authOption(userId, TOKEN))) {
      console.info("CALLER_SB_ID:", CALLER_SB_ID);
      SendBirdCall.addListener(CALLER_SB_ID, {
        onRinging: (call) => {
          console.info("전화왔다!", call);
        },
        // 현재 연결된 device, 연결 가능한 device에서 선택해서 변경
        onAudioInputDeviceChanged: async (current, availables) => {
          const wannaUseMicInfo = availables.find((available) => available.label === "Headset earpiece");

          // 안드로이드 Headset earpiece 로 변경함.
          if (wannaUseMicInfo) SendBirdCall.selectAudioInputDevice(wannaUseMicInfo);
          // console.info("변경되서 사용중인 마이크:", SendBirdCall.getCurrentAudioInputDevice());
          console.info("전화대기!");
        },
      });
    }
  }, []);

  const handleSendCall = useCallback(async () => {
    console.info("SendBird make Call");
    // 전화걸기
    makeCall();
  }, []);

  const makeCall = () => {
    // 나중에 query로 전화걸 상대 Id받아오기
    const receiverId = "user2";
    if (!receiverId) {
      console.log("전화 할 상대방 Id가 없음.");
      return;
    }

    // 전화 옵션
    const dialParams = {
      userId: receiverId,
      isVideoCall: false,
      callOption: {
        audioEnabled: true,
        videoEnabled: false,
      },
    };

    const call = SendBirdCall.dial(dialParams, (call, error) => {
      if (error) {
        console.info("발신 실패!!", error);
      } else {
        console.info("발신 성공 device: 발신자 in dial =>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      }
    });
    console.log("call 정보:", call);

    // 상대방과 통화가 연결
    call.onEstablished = (call) => {
      console.info("발신자 통화 성사");
      currentCall = call;
      // 여기에 소리 전달
    };

    call.onConnected = (call) => {
      console.log("전화 연결");
    };

    call.onEnded = (call) => {
      console.log("전화 종료");
      currentCall = null;
      // 여기에 소리 종료
    };
  };

  return (
    <CallingContext.Provider
      value={{
        message,
        setMessage,
        pageState,
        setPageState,
        myAudio,
        peerAudio,
        handleSendCall,
      }}
    >
      <CallingPresenter handleGoBack={handleGoBack} />
    </CallingContext.Provider>
  );
};

export default CallingContainer;
