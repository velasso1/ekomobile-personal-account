import { gql } from "@apollo/client";

export const GET_PROFILE_DATA = gql`
  query Me {
    userInfo: me {
      account {
        msisdn
        email
        birthday
        gender
        contactPhone
        contactName
        isContactPhoneVerified
        isEmailVerified
      }
    }
  }
`;

export const GET_CURRENT_USER_DATA = gql`
  query Me($msisdn: Msisdn) {
    me {
      account {
        billingNumber(msisdn: $msisdn) {
          msisdn
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
          recommendedPayment {
            amount
            balance
          }
          services {
            ... on BillingNumberServiceEnabled {
              id
              serviceId
              name
              description
              feeToEnable
              state
              enableRequestedAt
              enabledAt
              disableRequestedAt
              disabledAt
              isReadonly
              category {
                id
                name
              }
              fee {
                amount
                type
              }
            }
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
