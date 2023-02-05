import SendBirdCall from "sendbird-calls";
// 웹 미디어장치 받아오기
export const AskBrowserPermission = () => {
  SendBirdCall.useMedia({ audio: true, video: false });
  console.info("브라우저 미디어 가져오기 완료.");
};

// sendbird 등록 사용자 인증
export const AuthorizeUser = async (authOption) =>
  await SendBirdCall.authenticate(authOption, async (res, error) => {
    if (error) console.info("인증 에러 :", error);
    else {
      try {
        await SendBirdCall.connectWebSocket();
        console.info(`'${authOption.userId}'소켓 연결 성공!!`);
      } catch (e) {
        console.info(`'${authOption.userId}'소켓 연결 실패 :`, e);
      }
    }
  });

export const authOption = (userId, accessToken) => ({
  userId,
  accessToken,
});
