import gql from "graphql-tag";

export const SEND_CALL_NOTI = gql`
  subscription SendCallNoti($userId: Int) {
    sendCallNoti(user_id: $userId) {
      receiverId
      receiveUrl
      roomName
      msg
    }
  }
`;
