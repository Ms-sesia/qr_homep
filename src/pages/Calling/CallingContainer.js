import React, { useEffect, useRef, useState } from "react";
import CallingPresenter from "./CallingPresenter";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const CallingContainer = () => {
  const [message, setMessage] = useState(false);
  const [send, setSend] = useState(false);
  const [call, setCall] = useState(false);
  const [myId, setMyId] = useState("");
  let myPeerConnection;
  let myStream;
  const [roomName, setRoomName] = useState("abc");
  const navigate = useNavigate();
  const myAudio = useRef();
  const peerAudio = useRef();

  //TODO:: 나중에 서버 바꾸기
  const socket = io("http://localhost:8080");

  const getMedia = async (deviceId) => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      console.log(e);
    }
  };

  const makeConnection = () => {
    myPeerConnection = new RTCPeerConnection();
    myPeerConnection.addEventListener("icecandidate", handleIce);
    socket.emit("join_room", roomName);
    myPeerConnection.addEventListener("addstream", handleAddStream);
    myPeerConnection.addEventListener("track", handleTrack);
  };

  const handleIce = (data) => {
    socket.emit("ice", data.candidate, roomName);
  };

  const handleAddStream = (data) => {
    peerAudio.current.srcObject = data.streams;
    peerAudio.pause();
  };

  const handleTrack = (data) => {
    peerAudio.current.srcObject = data.streams[0];
    peerAudio.current.pause();
  };

  const initCall = async () => {
    await getMedia();
    makeConnection();
  };

  useEffect(() => {
    initCall();

    socket.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer();
      console.log("offer", offer);
      // 이거 에러부터 잡아
      // myPeerConnection.setLocalDescription(offer);
      // socket.emit("offer", offer, roomName);
    });

    socket.on("offer", async (offer) => {
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer);
      socket.emit("answer", answer, roomName);
    });
  }, []);

  return (
    <CallingPresenter
      message={message}
      setMessage={setMessage}
      send={send}
      setSend={setSend}
      call={call}
      setCall={setCall}
      myAudio={myAudio}
      peerAudio={peerAudio}
    />
  );
};

export default CallingContainer;
