import gql from "graphql-tag";

export const SEND_CALL_NOTI = gql`
  subscription sendCallNoti($userId: Int) {
    sendCallNoti(user_id: $userId) {
      msg
      receiveUrl
      user_id
    }
  }
`;
