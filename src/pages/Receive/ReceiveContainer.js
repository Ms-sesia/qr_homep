import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";
import ReceivePresenter from "./ReceivePresenter";

const ReceiveContainer = () => {
  const [pageState, setPageState] = useState("main"); //띄울 화면
  const [myId, setMyId] = useState(""); // 내 소켓 아이디
  // const [randomStr, setRandomStr] = useState(
  //   Math.random().toString(36).substring(2, 12)
  // ); // 나의 랜덤 subscription id
  // const [roomName, setRoomName] = useState("abc"); // 방 이름
  // const [roomName, setRoomName] = useState(""); // 방 이름
  let myPeerConnection; // 오디오 데이터가 담김
  let myStream; // 내 마이크
  const myAudio = useRef(); // 내 마이크
  const peerAudio = useRef(); // 상대방 마이크
  const navigate = useNavigate();
  const socket = useRef();
  const receiveUrl = useLocation();
  const roomName = receiveUrl.pathname.split("/")[2];

  // useEffect(() => {
  //   // 내 subscription id 랜덤 생성
  //   setRandomStr(Math.random().toString(36).substring(2, 12));
  // }, []);

  // 소켓 생성
  useEffect(() => {
    socket.current = io("https://devapi.seqret.co.kr", {
      cors: {
        origin: "*",
        credentials: true,
      },
    });
  }, []);

  useEffect(
    () =>
      console.log("myPeerConnection", myPeerConnection, "myStream", myStream),
    [myPeerConnection, myStream]
  );

  // useEffect(() => console.log("receive socket>>>", socket), [socket]);

  // 내 스트림 가져오기 (오디오만)
  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({ audio: true }); //내 오디오 세팅
      myAudio.current.srcObject = myStream;
      // myAudio.current.pause();
    } catch (e) {
      console.log(e);
    }
  };

  //
  const makeConnection = async () => {
    myPeerConnection = new RTCPeerConnection(); //나(peer)와 원격의 상대방(peer)과의 연결 만들기

    // 인터넷 연결 생성 (Internet Connectivity Establishment)
    // 이 연결을 해줘야 브라우저끼리 소통이 가능
    // peer에서 ice 이벤트를 보냄
    myPeerConnection.addEventListener("icecandidate", handleIce);
    socket.current.emit("join_room", roomName, "receive"); //룸 입장 -> 서버에서 welcome 에밋 보내줌 (144번째줄)
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
    peerAudio.current.srcObject = data.streams;
    peerAudio.current.pause();
  };

  const handleTrack = (data) => {
    console.log("handleTrack>>>", data);
    peerAudio.current.srcObject = data.streams[0]; //상대방 오디오 데이터가 넘어옴
    peerAudio.current.pause(); //일단 소리 끔
  };

  const initCall = async () => {
    await getMedia(); // 내 마이크 가져오기
    makeConnection(); // socket.current.io 연결시 필수 코드
    // console.log("연결됨");
  };

  // 전화 종료
  const handleCallEnd = async () => {
    socket.current.emit("end", roomName);
    // myAudio.current.pause(); //일단 소리 끔
    peerAudio.current.pause();
    // navigate("/");
  };

  // 전화 받기
  const handleCallReceive = async () => {
    setPageState("calling");
    socket.current.emit("received", roomName);
    peerAudio.current.play();
    // myAudio.current.play();
  };

  useEffect(() => {
    initCall();

    socket.current.on("myId", (id) => {
      setMyId(id);
      // console.log("myId:", id);
    });

    socket.current.on("welcome", async () => {
      const offer = await myPeerConnection.createOffer(); //WebRTC 연결 시작
      // console.log("offer", offer);
      myPeerConnection.setLocalDescription(offer); //연결에 관련된 내용
      socket.current.emit("offer", offer, roomName); // offer 에밋 보내면 서버에서 offer 다시 보냄 방에 있는 사람들 WebRTC 연결 다 됨
    });

    socket.current.on("offer", async (offer) => {
      myPeerConnection.setRemoteDescription(offer);
      const answer = await myPeerConnection.createAnswer();
      myPeerConnection.setLocalDescription(answer); //현재 peer에서 생성한 answer을 myPeerConnection의 LocalDescription으로 등록
      socket.current.emit("answer", answer, roomName); //에밋 보내면 상대방도 answer 에밋 받음
    });

    socket.current.on("answer", (answer) => {
      myPeerConnection.setRemoteDescription(answer); //상대방 연결 내용 저장
    });

    socket.current.on("ice", (ice) => {
      myPeerConnection.addIceCandidate(ice);
    });

    // 수신자 접속 확인
    socket.current.on("receiverJoin", () => {
      handleCallReceive();
      // // 전화 연결
      socket.current.emit("received");
    });
    // 전화가 왔을 경우
    socket.current.on("receiveCall", () => {
      console.log("전화 옴");
    });

    // 전화 종료
    socket.current.on("close", () => {
      myPeerConnection.close();
      // myAudio.current.pause(); //일단 소리 끔
      peerAudio.current.pause();
      // navigate("/");
    });
  }, []);

  return (
    <ReceivePresenter
      pageState={pageState}
      handleCallReceive={handleCallReceive}
      myAudio={myAudio}
      peerAudio={peerAudio}
      handleCallEnd={handleCallEnd}
    />
  );
};

export default ReceiveContainer;
