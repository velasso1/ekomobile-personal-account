// запрос для получения истории пополнения баланса
import { gql } from "@apollo/client";

export const GET_BALANCE_HISTORY = gql`
  query Me {
    me {
      account {
        billingNumber {
          balanceTopUpList(page: 1, pageSize: 1) {
            nodes {
              amount
              timestamp
              methodName
            }
          }
        }
      }
    }
  }
`;

// mutation PaymentCreate {
//     paymentCreate(
//         correlation: {
//             correlationId: "263a9708-ab15-4260-bfdc-9e54cdd4da31"
//             actionId: "fc5224f2-df0a-48f7-92d0-08cec5db217a"
//         }
//         params: {
//             paymentId: "e3a3fd69-f372-4a07-ac2e-3391f74b4b1f"
//             methodId: "SBP"
//             targetMsisdn: "9663740842"
//             amount: 25000
//         }
//     ) {
//         paymentId
//         payment {
//             id
//             createdAt
//             orderNumber
//             amount
//         }
//     }
// }
