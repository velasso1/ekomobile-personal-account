// this request is needed to update auth session
// if we get null from response, it means the user is not authoreized;
// and if we get a info about acc, it means the is logged;

import { gql } from "@apollo/client";

export const CHECK_AUTH_USER = gql`
  query Me {
    me {
      account {
        msisdn
        email
      }
    }
  }
`;

interface IResponseData {
  account: {
    msisdn: string;
    email: string;
  };
}

export interface ICheckUserAuth {
  me: IResponseData | null;
}
