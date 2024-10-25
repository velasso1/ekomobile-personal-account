import { gql } from "@apollo/client";

export const GET_RECOMMENDED_PAYMENT = gql`
  query Me {
    me {
      account {
        number {
          recommendedPayment {
            amount
            balance
          }
        }
      }
    }
  }
`;

export interface IRecommendedPaymentResponse {
  me: {
    account: {
      number: {
        recommendedPayment: {
          amount: number;
          balance: number;
        };
      };
    };
  };
}
