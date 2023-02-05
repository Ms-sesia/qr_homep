import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SendBirdCall from "sendbird-calls";
// import SendBirdCall from "../../libs/Sendbirdcallinfo";
import ReceivePresenter from "./ReceivePresenter";
import eruda from "eruda";
import { APP_ID, TOKEN, CALLER_SB_ID, RECEIVER_SB_ID } from "../../constants";
// import { AskBrowserPermission, authOption, AuthorizeUser, WaitForCalls } from "../../libs/Sb_method";

const ReceiveContainer = () => {
  const navigate = useNavigate();
  const [pageState, setPageState] = useState("main"); //띄울 화면
  const myAudio = useRef(); // 내 마이크
  const peerAudio = useRef(); // 상대방 마이크
  let myStream;
  let currentCall;

  // const RECEIVER_SB_ID = Math.random().toString(36).substring(2, 12);

  /** 수신자 로직
   * noti(subscription) 통해서 접속하자마자
   * 1. sendbird 초기화
   * 2. 브라우저 미디어 디바이스 허용 권한 받기
   * 3. query통해서 userId 수신
   * 4. sendbird user 인증
   * 5. sendbird listener 진행
   * 6. established and call
   */
  // query 통해 받아온 userId (렌더링 되기 전에 받아와야할 듯?)
  const userId = "user2";

  useEffect(() => {
    eruda.init();
    SendBirdCall.init(APP_ID);

    // 미디어 장치 가져옴
    AskBrowserPermission();

    // 웹소켓 연결
    AuthorizeUser();
    console.info("RECEIVER_SB_ID:", RECEIVER_SB_ID);
  }, []);

  // 웹 미디어장치 받아오기
  const AskBrowserPermission = () => {
    SendBirdCall.useMedia({ audio: true, video: false });
    console.info("브라우저 미디어 가져오기 완료.");
  };

  // sendbird 등록 사용자 인증
  const AuthorizeUser = async () => {
    const authOption = { userId, accessToken: TOKEN };
    await SendBirdCall.authenticate(authOption, async (res, error) => {
      if (error) console.info("인증 에러 :", error);
      else {
        console.log("SB 연결완료.");
        connectToWebsocket();
        //   try {
        //     await SendBirdCall.connectWebSocket();
        //     console.info(`'${authOption.userId}'소켓 연결 성공!!`);
        //     WaitForCalls();
        //   } catch (e) {
        //     console.info(`'${authOption.userId}'소켓 연결 실패 :`, e);
        //   }
      }
    });
  };

  const connectToWebsocket = () => {
    SendBirdCall.connectWebSocket()
      .then(() => {
        WaitForCalls();
      })
      .catch((err) => {
        console.log("웹 소켓 연결 에러 : ", err);
        alert("Failed to connect to Socket server");
      });
  };

  const WaitForCalls = () => {
    SendBirdCall.addListener(RECEIVER_SB_ID, {
      // 전화옮!
      onRinging: (call) => {
        console.log("전화가 왔다?? call정보:", call);
        currentCall = call;
        // 통화 성사
        call.onEstablished = (call) => {
          console.log("수신자 통화 성사");
          currentCall = call;
        };

        call.onConnected = (call) => {
          console.log("전화 연결.");
          currentCall = call;
        };

        call.onEnded = (call) => {
          console.log("전화 종료.");
          currentCall = call;
        };
        console.log("call info in wait for calls:", call);
        const acceptParams = {
          callOption: {
            localMediaView: document.getElementById("local_video_element_id"),
            remoteMediaView: document.getElementById("remote_video_element_id"),
            audioEnabled: true,
            videoEnabled: false,
          },
        };
        call.accept(acceptParams);
      },

      // 현재 연결된 device, 연결 가능한 device에서 선택해서 변경
      onAudioInputDeviceChanged: async (current, availables) => {
        const wannaUseMicInfo = availables.find((available) => available.label === "Headset earpiece");

        // 안드로이드 Headset earpiece 로 변경함.
        if (wannaUseMicInfo) SendBirdCall.selectAudioInputDevice(wannaUseMicInfo);
        console.info("전화대기! RECEIVER_ID:", RECEIVER_SB_ID);
      },
    });
  };
  // const authOption = (userId, accessToken) => ({
  //   userId,
  //   accessToken,
  // });

  const handleReceiveCall = useCallback(async () => {
    console.info("전화 받기!");
    console.info(RECEIVER_SB_ID);
    SendBirdCall.addListener(RECEIVER_SB_ID, {
      // 전화옮!
      onRinging: (call) => {
        console.log("전화가 왔다?? call정보:", call);
        currentCall = call;
        // 통화 성사
        call.onEstablished = (call) => {
          console.log("수신자 통화 성사");
          currentCall = call;
        };

        call.onConnected = (call) => {
          console.log("전화 연결.");
          currentCall = call;
        };

        call.onEnded = (call) => {
          console.log("전화 종료.");
          currentCall = call;
        };
        console.log("발신 정보:", call);
        const acceptParams = {
          callOption: {
            localMediaView: document.getElementById("local_video_element_id"),
            remoteMediaView: document.getElementById("remote_video_element_id"),
            audioEnabled: true,
            videoEnabled: false,
          },
        };
        call.accept(acceptParams);
      },
    });
  }, []);

  const handleRejectCall = useCallback(() => {
    // 수신거부
    if (window.ReactNativeWebView) {
      // React Native
      window.ReactNativeWebView.postMessage("GO_BACK");
    }
  }, []);

  return (
    <ReceivePresenter
      pageState={pageState}
      myAudio={myAudio}
      peerAudio={peerAudio}
      handleReceiveCall={handleReceiveCall}
      handleRejectCall={handleRejectCall}
    />
  );
};

export default ReceiveContainer;
