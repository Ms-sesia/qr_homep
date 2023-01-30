import gql from "graphql-tag";

export const GET_RECEIVER_INFO = gql`
  query getReceiverInfo($qrSerial: String) {
    getReceiverInfo(qrSerial: $qrSerial) {
      qr_id
      result
      user_id
    }
  }
`;
