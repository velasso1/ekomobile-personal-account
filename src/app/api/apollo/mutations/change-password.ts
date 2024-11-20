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

// NEEDS TYPES FOR RESPONSE (TYPES WRITE TO CHANGE-PASSWORF-TYPES.TS FILE)
export const SUBMIT_CHANGING_PASSWORD = gql`
  mutation PasswordChangeSubmit($correlationId: ID!, $actionId: ID!, $passwordChangeId: ID!, $newPassword: String!) {
    passwordChangeSubmit(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: { passwordChangeId: $passwordChangeId, newPassword: $newPassword }
    ) {
      passwordChangedAt
    }
  }
`;

// NEEDS TYPES FOR RESPONSE (TYPES WRITE TO CHANGE-PASSWORF-TYPES.TS FILE)
export const SUBMIT_SECRET_KEY = gql`
  mutation VerificationSubmit($correlationId: ID!, $actionId: ID!, $verificationId: ID!, $secret: String!) {
    verificationSubmit(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: { verificationId: $verificationId, secret: $secret }
    ) {
      result {
        notice
        isSuccess
      }
    }
  }
`;
