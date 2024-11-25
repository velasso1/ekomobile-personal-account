import { gql } from "@apollo/client";

export const CHANGE_NUMBER_MARK = gql`
  mutation MarkSetNumberName($msisdn: Msisdn!, $value: String!) {
    markSetNumberName(msisdn: $msisdn, data: { value: $value }) {
      name
    }
  }
`;
