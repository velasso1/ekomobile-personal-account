// get services
import { gql } from "@apollo/client";

export const GET_SERVICES = gql`
  query Me {
    me {
      account {
        number {
          services {
            ... on BillingNumberServiceEnabled {
              category {
                id
                name
              }
              id
              serviceId
              name
              description
              state
              isReadonly
              enabledAt
              fee {
                amount
                type
              }
            }
          }
        }
      }
    }
  }
`;
