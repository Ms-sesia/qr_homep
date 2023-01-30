import gql from "graphql-tag";

export const GET_RECEIVER_INFO = gql`
  query getReceiverInfo($qrSerial: String) {
    getReceiverInfo(qr_serial: $qrSerial) {
      user_id
      result
    }
  }
`;
