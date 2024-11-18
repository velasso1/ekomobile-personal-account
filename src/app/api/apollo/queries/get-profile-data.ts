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

// this query need for change info when changed a select in header;
export const GET_CURRENT_USER_DATA = gql`
  query Me($msisdn: Msisdn, $year: Int!, $month: Int!) {
    me {
      account {
        msisdn
        email
        birthday
        gender
        contactPhone
        contactName
        isContactPhoneVerified
        isEmailVerified
        number {
          msisdn
          role
          isActive
          balance
          expenses {
            availableMonths {
              year
              month
            }
            month(year: $year, month: $month) {
              month {
                year
                month
              }
              amount {
                total
                parts {
                  type
                  amount
                }
              }
            }
          }
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
          expenses {
            availableMonths {
              year
              month
            }
            month(year: $year, month: $month) {
              month {
                year
                month
              }
              amount {
                total
                parts {
                  type
                  amount
                }
              }
              transactionList(page: 0, pageSize: 99) {
                total
                nodes {
                  timestamp
                  type
                  name
                  amount
                  balanceAfter
                }
              }
            }
          }
        }
      }
    }
  }
`;
