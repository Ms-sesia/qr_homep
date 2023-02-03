import React, {useCallback, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import SendBirdCall from 'sendbird-calls';
import ReceivePresenter from "./ReceivePresenter";
import eruda from "eruda";
import {APP_ID, TOKEN} from "../../constants";

const ReceiveContainer = () => {
    const navigate = useNavigate();
    const [pageState, setPageState] = useState("main"); //띄울 화면
    const myAudio = useRef(); // 내 마이크
    const peerAudio = useRef(); // 상대방 마이크
    let myStream;
    const authOption = {userId: 'user1', accessToken: TOKEN};
    const dialParams = {
        userId: 'user2',
        isVideoCall: false,
        callOption: {
            localMediaView: myAudio.current,
            audioEnabled: true,
        }
    }
    // 내 스트림 가져오기 (오디오만)
    const getMedia = async () => {
        try {
            myStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            }); //내 오디오 세팅
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getMedia();
        eruda.init();
        SendBirdCall.init(APP_ID);

        connectionSendBird().then(() => {
            SendBirdCall.addListener('user1', {
                onRinging: (call) => {
                    console.info("call : ", call);
                }
            });
        }).catch(e => console.info(e));

        // SendBirdCall.addListener('user1', {
        //     onRinging: (call) => {
        //         console.info("call : ", call);
        //     }
        // });
    }, []);

    const connectionSendBird = useCallback(async () => {
        try {
            await SendBirdCall.authenticate(authOption, (result, error) => {
                if (error) {
                    alert("인증 실패");
                    console.info("사용자 인증 실패 :", error);
                } else {
                    // console.info("사용자 인증 성공");
                }
            });
            await SendBirdCall.connectWebSocket();
        } catch (e) {
            console.info(e);
        }
    }, [SendBirdCall, authOption]);

    const call = useCallback(() => {
        SendBirdCall.dial(dialParams, (call, error) => {
            if (error) {
                console.info("전화 연결 실패 : ", error);
            }
            console.info("전화 연결 성공 : ");
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
        SendBirdCall.addListener('user1', {
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

    const handleRejectCall = useCallback(() => { // 수신거부
        if (window.ReactNativeWebView) { // React Native
            window.ReactNativeWebView.postMessage("GO_BACK");
        }
    }, []);

    const handleReceiveCall = useCallback(async () => {
        try {

        } catch (e) {

        }
    }, []);


    useEffect(() => {
        console.info("",)
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
