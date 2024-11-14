import { gql } from "@apollo/client";

export const GOSUSLUGI_CONFIRM_CLIENT = gql`
  mutation GuRequestConfirmationClient($correlation: CorrelationInput!, $params: GURequestConfirmationClientParams!) {
    guRequestConfirmationClient(correlation: $correlation, params: $params) {
      id
      request {
        status
        resultMessage
        processedAt
        name
        type {
          name
        }
      }
    }
  }
`;
