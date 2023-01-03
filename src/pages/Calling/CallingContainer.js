import React, { useEffect, useRef, useState, createContext } from "react";
import CallingPresenter from "./CallingPresenter";
import io from "socket.io-client";

export const CallingContext = createContext();

const CallingContainer = () => {
  const [message, setMessage] = useState(false);
  const [send, setSend] = useState(false);
  const [call, setCall] = useState(false);
  const [pageState, setPageState] = useState("main");
  const [myId, setMyId] = useState("");
  let myPeerConnection;
  let myStream;
  const [roomName, setRoomName] = useState("abc");
  const myAudio = useRef();
  const peerAudio = useRef();

  //TODO:: 배포된 서버로 바꾸기
  const socket = io("http://localhost:8080", {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      console.log(e);
    }
  };

  const makeConnection = async () => {
    myPeerConnection = new RTCPeerConnection();
    myPeerConnection.addEventListener("icecandidate", handleIce);
    socket.emit("join_room", roomName);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    myPeerConnection.addEventListener("track", handleTrack);
    myStream.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, myStream);
    });
  };

  const handleIce = (data) => {
    socket.emit("ice", data.candidate, roomName);
  };

  const handleAddStream = (data) => {
    console.log("Peer's Stream : ", data.stream);
    console.log("My Stream : ", myStream);
  };

  const handleTrack = (data) => {
    peerAudio.current.srcObject = data.streams[0];
    peerAudio.current.pause();
  };

  const initCall = async () => {
    await getMedia();
    makeConnection();
    console.log("연결됨");
  };

  // 전화 걸기
  const handleCallSend = async () => {
    setPageState("callLoading");
    socket.emit("sendCall", myId);
    console.log("전화 걺");
  };

  // 전화 종료
  const handleCallEnd = async () => {
    setPageState("main");
    socket.emit("end", roomName);
  };

  // 전화 받기
  const handleCallReceive = async () => {
    setPageState("calling");
    socket.emit("received", roomName);
    peerAudio.current.play();
  };

  useEffect(() => {
    initCall();

    socket.on("myId", (id) => {
      setMyId(id);
    });

    socket.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer();
      myPeerConnection.setLocalDescription(offer);
      socket.emit("offer", offer, roomName);
    });

    socket.on("offer", async (offer) => {
      myPeerConnection.setRemoteDescription(offer); // 다른 peer의 위치를 myPeerConnection에 연결해주는 과정
      const answer = await myPeerConnection.createAnswer(); //잘 받았음을 확인하기 위해 Answer 만듦
      myPeerConnection.setLocalDescription(answer); //현재 peer에서 생성한 answer을 myPeerConnection의 LocalDescription으로 등록
      socket.emit("answer", answer, roomName);
    });

    socket.on("answer", (answer) => {
      myPeerConnection.setRemoteDescription(answer);
    });

    socket.on("ice", async (ice) => {
      myPeerConnection.addIceCandidate(ice);
    });

    // 전화가 왔을 경우
    socket.on("receiveCall", () => {
      setPageState("receive");
      console.log("전화 옴");
    });

    // 내가 건 전화에 상대방이 받았을 경우
    socket.on("received", () => {
      setPageState("calling");
      peerAudio.current.play();
    });

    // 전화 종료
    socket.on("close", () => {
      myPeerConnection.close();
      setPageState("main");
    });
  }, []);

  return (
    <CallingContext.Provider
      value={{
        message,
        setMessage,
        send,
        setSend,
        call,
        setCall,
        myAudio,
        peerAudio,
        pageState,
        setPageState,
        handleCallSend,
        handleCallEnd,
        handleCallReceive,
      }}
    >
      <CallingPresenter />
    </CallingContext.Provider>
  );
};

export default CallingContainer;
