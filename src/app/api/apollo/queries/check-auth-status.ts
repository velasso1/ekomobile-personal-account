import { gql } from "@apollo/client";

export const CHECK_AUTH_STATUS = gql`
  query Me {
    loginStatus: me {
      email
      contactPhone
    }
  }
`;
