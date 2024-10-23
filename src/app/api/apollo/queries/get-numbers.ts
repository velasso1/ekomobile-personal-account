import { gql } from "@apollo/client";

export const GET_GU_DATA = gql(/* GraphQL */
`
  query getGroupsWithClientAndConfirmationInfoAndHints {
    me {
      account {
        number {
          groups {
            numbers {
              mark {
                name
              }
              msisdn
              guConfirmationInfo {
                status {
                  id
                  name
                }
                client {
                  id
                  nameFamily
                  nameGiven
                  namePatronymic
                  guConfirmationLimit
                  guConfirmationCount
                }
              }
            }
          }
        }
      }
    }
    info {
      guConfirmation {
        aboutConfirmation
        hints {
          confirmationNeeded
          confirmationNotNeeded
          confirmationRequested
        }
        pdAgreement
        requestReady
        requestSent
      }
    }
  }
`);
