import { gql } from "@apollo/client";

export const GOSUSLUGI_CONFIRM_PASSPORT = gql`
  mutation GuRequestConfirmationPassportRF(
    $correlation: CorrelationInput!
    $params: GURequestConfirmationPassportRFParams!
  ) {
    guRequestConfirmationPassportRF(correlation: $correlation, params: $params) {
      request {
        status
        resultMessage
        processedAt
        name
        type {
          name
        }
        updatedAt
        description
        createdAt
      }
    }
  }
`;
