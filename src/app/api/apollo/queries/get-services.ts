// get services
import { gql } from "@apollo/client";

// query for getting enbaled servieces
export const GET_SERVICES = gql`
  query Me($msisdn: Msisdn) {
    me {
      account {
        billingNumber(msisdn: $msisdn) {
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

// query for getting disabled services

export const GET_AVAILABLE_SERVICES = gql`
  query Me($msisdn: Msisdn) {
    me {
      account {
        billingNumber(msisdn: $msisdn) {
          services {
            ... on BillingNumberServiceAvailable {
              serviceId
              name
              description
              feeToEnable
              category {
                id
                name
              }
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
