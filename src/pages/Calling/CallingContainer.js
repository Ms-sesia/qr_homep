import React, { useEffect, useRef, useState, createContext } from "react";
import CallingPresenter from "./CallingPresenter";
import io from "socket.io-client";
import { useQuery } from "@apollo/client";
import { SEND_CALL_NOTI } from "../../graphql/calling/subscription";
import { useSubscription } from "@apollo/client";
import { GET_RECEIVER_INFO } from "../../graphql/calling/query";
import { useNavigate, useLocation } from "react-router-dom";
import eruda from "eruda";

export const CallingContext = createContext();

const CallingContainer = () => {
  const [message, setMessage] = useState(false); //메세지 모달
  const [call, setCall] = useState(false); //전화 걸었을 때 true
  const [pageState, setPageState] = useState("main"); //띄울 화면
  const [myId, setMyId] = useState(""); // 내 소켓 아이디
  let myPeerConnection; // 오디오 데이터가 담김
  let myStream; // 내 마이크
  const [roomName, setRoomName] = useState(
    Math.random().toString(36).substring(2, 12)
  ); // 방 이름
  const myAudio = useRef(); // 내 마이크
  const peerAudio = useRef(); // 상대방 마이크
  const [userId, setUserId] = useState(null);
  const [qrId, setQrId] = useState(null);
  const [getDevices, setGetDevices] = useState(null);
  const navigate = useNavigate();
  const socket = useRef();
  // 상대방 정보 가져오기

  const goBack = () => {
    console.info("??? : ", window.ReactNativeWebView);
    // if (window.ReactNativeWebView) {
    //   // web
    //   console.info("web : ", window.ReactNativeWebView);
    // } else {
    //   console.info("app : ", window.ReactNativeWebView);
    // }
  };

  // useEffect(() => {
  //   goBack();
  // }, []);

  // Edward
  const location = useLocation();
  const qrCode = useRef();

  React.useEffect(() => {
    let initialCode = location.pathname.split("/")[2];

    if (initialCode) {
      localStorage.setItem("qrCode", initialCode);
      navigate("/calling");
    }
  }, [location]);

  React.useEffect(() => {
    if (localStorage.getItem("qrCode")) {
      qrCode.current = localStorage.getItem("qrCode");
    }
  }, []);

  useEffect(
    () =>
      console.log("myPeerConnection", myPeerConnection, "myStream", myStream),
    [myPeerConnection, myStream]
  );

  // React.useEffect(() => {
  //   console.info("qrCode", qrCode);
  // }, [qrCode]);

  const {
    data: receiverData,
    loading: receiverLoading,
    refetch: receiverRefetch,
  } = useQuery(GET_RECEIVER_INFO, {
    variables: {
      // qrSerial: randomStr,
      qrSerial: "230118194845C0019_00010",
    },
  });

  // subscription 연결
  const {
    data: subData,
    loading: subLoading,
    error: subError,
  } = useSubscription(SEND_CALL_NOTI, {
    variables: {
      userId: userId,
    },
  });

  // useEffect(() => {
  //   console.log(subData, receiverData);
  // }, [subData, receiverData]);

  useEffect(() => {
    eruda.init();

    // 소켓 생성
    socket.current = io("https://devapi.seqret.co.kr", {
      cors: {
        origin: "*",
        credentials: true,
      },
    });
  }, []);

  useEffect(() => {
    if (receiverData?.getReceiverInfo?.result) {
      setUserId(receiverData.getReceiverInfo.user_id);
      setQrId(receiverData.getReceiverInfo.qr_id);
    }
  }, [receiverData]);

  useEffect(() => {
    if (subData?.sendCallNoti) {
    }
    if (subError) {
      // console.log("subError>>>", subError);
    }
  }, [subData]);

  // 내 스트림 가져오기 (오디오만)
  const getMedia = async () => {
    try {
      // const devices = await navigator.mediaDevices.enumerateDevices();
      // console.log("device list =>>", devices);

      myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      }); //내 오디오 세팅
    } catch (e) {
      console.log(e);
    }
  };

  //
  const makeConnection = async () => {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    }); //나(peer)와 원격의 상대방(peer)과의 연결 만들기

    // 인터넷 연결 생성 (Internet Connectivity Establishment)
    // 이 연결을 해줘야 브라우저끼리 소통이 가능
    // peer에서 ice 이벤트를 보냄
    myPeerConnection.addEventListener("icecandidate", handleIce);

    // 전달 매개변수는 roomName, 수신단(receive)or발신단(call)
    socket.current.emit("join_room", roomName, "call"); //룸 입장 -> 서버에서 welcome 에밋 보내줌 (144번째줄)

    // console.log("roomName", roomName);
    myPeerConnection.addEventListener("addstream", handleAddStream); //아래 코드와 같은데 addstream은 이제 사용되지 않음 그래도 일단 코드는 넣어 놓고
    myPeerConnection.addEventListener("track", handleTrack);
    myStream.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, myStream);
    });
  };

  const handleIce = (data) => {
    // 이벤트 감지 됐을 때 에밋 보냄
    socket.current.emit("ice", data.candidate, roomName);
    // 상대방이 ice에밋 받으면 나한테도 ice에밋 보냄 (161번째줄)
  };

  const handleAddStream = (data) => {
    console.log("Peer's Stream : ", data.stream);
    console.log("My Stream : ", myStream);
    // peerAudio.current.type = "screen";
    peerAudio.current.srcObject = data.streams; //상대방 오디오 데이터가 넘어옴
    peerAudio.current.pause();
  };

  const handleTrack = (data) => {
    console.log("handleTrack>>>", data);
    peerAudio.current.srcObject = data.streams[0]; //상대방 오디오 데이터가 넘어옴
    peerAudio.current.pause();
  };

  const initCall = async () => {
    await getMedia(); // 내 마이크 가져오기
    makeConnection(); // socket.current.io 연결시 필수 코드
  };

  // 전화 걸기
  const handleCallSend = async () => {
    setPageState("callLoading");
    socket.current.emit("sendCall", {
      roomName: roomName,
      user_id: userId,
      qr_id: qrId,
    });
  };

  // 전화 종료
  const handleCallEnd = async () => {
    setPageState("main");
    socket.current.emit("end", roomName);
    peerAudio.current.pause();
    // navigate("/");
  };

  useEffect(() => {
    initCall();
    // setRoomName(randomStr);
    // console.log("roomName :", roomName);

    socket.current.on("myId", (id) => {
      setMyId(id);
      // console.log("myId:", id);
    });

    socket.current.on("welcome", async (id) => {
      console.log("myId :", id);
      const offer = await myPeerConnection.createOffer(); //WebRTC 연결 시작
      // console.log("offer", offer);
      myPeerConnection.setLocalDescription(offer); //연결에 관련된 내용
      socket.current.emit("offer", offer, roomName); // offer 에밋 보내면 서버에서 offer 다시 보냄 방에 있는 사람들 WebRTC 연결 다 됨
    });

    socket.current.on("offer", async (offer) => {
      myPeerConnection.setRemoteDescription(offer); // 다른 peer의 위치를 myPeerConnection에 연결해주는 과정
      const answer = await myPeerConnection.createAnswer(); //잘 받았음을 확인하기 위해 Answer 만듦
      myPeerConnection.setLocalDescription(answer); //현재 peer에서 생성한 answer을 myPeerConnection의 LocalDescription으로 등록
      socket.current.emit("answer", answer, roomName); //에밋 보내면 상대방도 answer 에밋 받음
    });

    socket.current.on("answer", (answer) => {
      myPeerConnection.setRemoteDescription(answer); //상대방 연결 내용 저장
    });

    socket.current.on("ice", async (ice) => {
      myPeerConnection.addIceCandidate(ice);
    });

    // 전화가 왔을 경우
    socket.current.on("receiveCall", () => {
      navigate("/receive");
      console.log("전화 옴");
    });

    // 내가 건 전화에 상대방이 받았을 경우
    socket.current.on("received", () => {
      setPageState("calling");
      peerAudio.current.play();
    });

    // 전화 종료
    socket.current.on("close", () => {
      myPeerConnection.close();
      peerAudio.current.pause();
      setPageState("main");
    });
    // 더이상 방에 입장 불가
    socket.current.on("cannotJoinRoom", (msg) => {
      // console.log(msg);
    });
  }, []);

  return (
    <CallingContext.Provider
      value={{
        message,
        setMessage,
        call,
        setCall,
        myAudio,
        peerAudio,
        pageState,
        setPageState,
        handleCallSend,
        handleCallEnd,
        userId,
      }}
    >
      <CallingPresenter />
    </CallingContext.Provider>
  );
};

export default CallingContainer;
