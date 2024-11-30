// Запрос всех данных аккаунта
import { gql } from "@apollo/client";

export const GET_FULL_DATA = gql`
  query Me($year: Int!, $month: Int!) {
    fullUserInfo: me {
      account {
        msisdn
        email
        birthday
        gender
        contactPhone
        contactName
        isEmailVerified
        number {
          msisdn
          role
          isActive
          balance
          payMethodType
          pricePlan {
            id
            name
            description
            monthFee
            isArchive
          }
          remains {
            full {
              measure
              balance
              size
              isUnlimited
              isLocal
              isRoaming
            }
          }

          expenses {
            month(year: $year, month: $month) {
              amount {
                total
                parts {
                  type
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
