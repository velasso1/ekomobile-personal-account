// получение данных о группах номера
import { gql } from "@apollo/client";

export const GET_NUMBERS_GROUP = gql`
  query Me {
    me {
      account {
        contactName
        number {
          groups {
            id
            balance
            defaultName
            isBalancerEnabled
            numbers {
              mark {
                name
              }
              msisdn
              isActive
              balance
              payMethodType
              description
              access
              hasFullAccess
              pricePlan {
                id
                name
                description
                monthFee
                isArchive
              }
            }
          }
          pricePlan {
            id
            name
            description
            monthFee
            isArchive
          }
        }
      }
    }
  }
`;
