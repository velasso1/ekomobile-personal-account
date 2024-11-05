// queries for change password;
import { gql } from "@apollo/client";

export const CREATE_CHANGING_PASSWORD = gql`
  mutation PasswordChangeCreate($correlationId: ID!, $actionId: ID!, $passwordChangeId: ID!, $msisdn: Msisdn!) {
    passwordChangeCreate(
      correlation: { actionId: $actionId, correlationId: $correlationId }
      params: { passwordChangeId: $passwordChangeId, msisdn: $msisdn }
    ) {
      deadline
      verificationId
    }
  }
`;

export const CHANGE_PASSWORD_SUBMIT = gql`
  mutation PasswordChangeSubmit($correlationId: ID!, $actionId: ID!, $passwordChangeId: ID!, $newPassword: String!) {
    passwordChangeSubmit(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: { passwordChangeId: $passwordChangeId, newPassword: $newPassword }
    ) {
      passwordChangedAt
    }
  }
`;
