// check the format is avialable for order
import { gql } from "@apollo/client";

export const CHECK_DETAILS_FORMAT = gql`
  query Me {
    me {
      account {
        number {
          details {
            orderAvailableMonths {
              year
              month
            }
            lastOrderInfo {
              orderTime
              orderTimeout
            }
          }
        }
      }
    }
    detailsFormats {
      id
      name
    }
  }
`;
