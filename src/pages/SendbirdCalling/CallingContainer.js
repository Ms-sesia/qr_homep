import React, {useEffect, useRef, useState, createContext, useCallback} from "react";
import CallingPresenter from "./CallingPresenter";
import { useNavigate } from "react-router-dom";
import eruda from "eruda";
import SendBirdCall from 'sendbird-calls';
import { APP_ID, TOKEN, SB_ID } from "../../constants";

export const CallingContext = createContext(null);

const CallingContainer = () => {
    const navigate = useNavigate();

    const myAudio = useRef(); // 내 마이크
    const peerAudio = useRef(); // 상대방 마이크
    const [message, setMessage] = useState(false); //메세지 모달
    // const [callSate, setCallState] = useState(false); //전화 걸었을 때 true
    const [pageState, setPageState] = useState("main"); //띄울 화면
    const authOption = { userId: 'user1', accessToken: TOKEN };

    const dialParams = {
        userId: 'user2',
        isVideoCall: false,
        callOption: {
            localMediaView: myAudio.current,
            audioEnabled: true,
        }
    }

    const handleGoBack = useCallback(() => { // React Native 환경 일 때 뒤로가기 함수 전달
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage("GO_BACK");
        } else {
            setPageState('main');
        }
    }, []);

    const call = useCallback(() => {
        SendBirdCall.dial(dialParams, (call, error) => {
            if (error) {
                console.info("전화 연결 실패 : ", error);
            }
            console.info("전화 연결 성공 : ");
        });
    }, [SendBirdCall]);

    const AskBrowserPermission = () => {
        console.info("브라우저 미디어 가져오기 완료.");
        const res = SendBirdCall.useMedia({ audio: true, video: false });
        console.info(res);
    }

    useEffect(() => {
        eruda.init();
        SendBirdCall.init(APP_ID);
        AskBrowserPermission();
        SendBirdCall.authenticate(authOption, (result, error) => {
            if (error) {
                alert("인증 실패");
                console.info("사용자 인증 실패 :", error);
            } else {
                // console.info("사용자 인증 성공", result);
            }
        }).then(() => {
            SendBirdCall.connectWebSocket()
                .then().catch(e => console.info("소켓 연결 실패", e));
        });
    }, []);

    const handleSendCall = useCallback( async () => {

        console.info("SendBirdCall", SendBirdCall);

        SendBirdCall.addListener('user2', {
            onRinging: (call) => {
                console.info("call : ", call);
            }
        });
    }, [SendBirdCall]);

    useEffect(() => {
        // call.setLocalMediaView(myAudio.current);
        call.onEstablished = (call) => console.info("onEstablished : ", call);
        call.onConnected = (call) => console.info("onConnected : ", call);
        call.onEnded = (call) => console.info("onEnded : ", call);
        call.onRemoteAudioSettingsChanged = (call) => console.info("onRemoteAudioSettingsChanged : ", call);
        call.onRemoteVideoSettingsChanged = (call) => console.info("onRemoteVideoSettingsChanged : ", call);
    }, [call]);

    useEffect(() => {
        SendBirdCall.addListener(SB_ID, {
            onRinging: (call) => {
                call.onEstablished = (call) => {
                    //...
                };

                call.onConnected = (call) => {
                    //...
                };

                call.onEnded = (call) => {
                    //...
                };

                call.onRemoteAudioSettingsChanged = (call) => {
                    //...
                };

                call.onRemoteVideoSettingsChanged = (call) => {
                    //...
                };

                const acceptParams = {
                    callOption: {
                        localMediaView: document.getElementById('local_video_element_id'),
                        remoteMediaView: document.getElementById('remote_video_element_id'),
                        audioEnabled: true,
                        videoEnabled: true
                    }
                };

                call.accept(acceptParams);
            }
        });
    }, [SendBirdCall]);

    // React.useEffect(() => {
    //     console.info("pageState", pageState);
    // }, [pageState]);

    return (
        <CallingContext.Provider value={{
            message,
            setMessage,
            pageState,
            setPageState,
            myAudio,
            peerAudio,
            handleSendCall
        }}>
            <CallingPresenter
                handleGoBack={handleGoBack}
            />
        </CallingContext.Provider>
    );
};

export default CallingContainer;
