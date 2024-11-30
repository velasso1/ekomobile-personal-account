// query for order details for number
import { gql } from "@apollo/client";

export const ORDER_DETAILS = gql`
  mutation DetailsOrderByEmail(
    $correlationId: ID!
    $actionId: ID!
    $requestId: ID!
    $year: Int!
    $month: Int!
    $formatId: ID!
    $email: String!
    $targetMsisdn: Msisdn
  ) {
    detailsOrderByEmail(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: {
        requestId: $requestId
        month: { year: $year, month: $month }
        formatId: $formatId
        email: $email
        targetMsisdn: $targetMsisdn
      }
    ) {
      requestId
      correlation {
        correlationId
        actionId
      }
    }
  }
`;
