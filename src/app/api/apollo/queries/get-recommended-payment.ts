import { gql } from "@apollo/client";

export const GET_RECOMMENDED_PAYMENT = gql`
  query Me($msisdn: Msisdn) {
    me {
      account {
        billingNumber(msisdn: $msisdn) {
          recommendedPayment {
            parts {
              type
              amount
              link {
                ... on RecommendedPaymentLinkService {
                  name
                }
                ... on RecommendedPaymentLinkPricePlan {
                  name
                }
                ... on RecommendedPaymentLinkNumber {
                  msisdn
                }
              }
            }
            amount
            balance
          }
        }
      }
    }
  }
`;

// response type for this query;

interface Ipart {
  type: string;
  amount: number;
  link: string;
}

export interface IRecommendedPaymentResponse {
  me: {
    account: {
      billingNumber: {
        recommendedPayment: {
          parts: Ipart[];
          amount: number;
          balance: number;
        };
      };
    };
  };
}
