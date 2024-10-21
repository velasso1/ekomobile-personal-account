// получение информации об остатках пакетов
import { gql } from "@apollo/client";

export const GET_REMAINDERS = gql`
  query Me {
    onlyRemainder: me {
      account {
        number {
          remains {
            simple {
              measure
              balance
              size
              isUnlimited
            }
          }
        }
      }
    }
  }
`;
