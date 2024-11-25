// получение списка заявок клиента
import { gql } from "@apollo/client";

export const GET_APPLICATIONS = gql`
  query Me {
    me {
      account {
        requestList {
          total
          nodes {
            id
            createdAt
            typeId
            status
            name
            description
            resultMessage
          }
        }
      }
    }
  }
`;
