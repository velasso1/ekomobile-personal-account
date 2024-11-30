// registration full cycle;
import { gql } from "@apollo/client";

// create registration
export const CREATE_REGISTRATION = gql`
  mutation RegistrationCreate(
    $correlation: ID!
    $actionId: ID!
    $registrationId: ID!
    $msisdn: Msisdn!
    $sim: String!
    $email: String!
    $contactName: String!
    $contactPhone: Msisdn!
  ) {
    registrationCreate(
      correlation: { correlationId: $correlation, actionId: $actionId }
      params: {
        registrationId: $registrationId
        msisdn: $msisdn
        sim: $sim
        email: $email
        contactName: $contactName
        contactPhone: $contactPhone
      }
    ) {
      denyReason
    }
  }
`;

// registration verify
export const REGISTRATION_VERIFY = gql`
  mutation RegistrationVerify($correlation: ID!, $actionId: ID!, $registrationId: ID!) {
    registrationVerify(
      correlation: { correlationId: $correlation, actionId: $actionId }
      params: { registrationId: $registrationId }
    ) {
      verificationId
    }
  }
`;

// registration submit
export const REGISTRATION_SUBMIT = gql`
  mutation RegistrationSubmit($correlationId: ID!, $actionId: ID!, $registrationId: ID!) {
    registrationSubmit(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: { registrationId: $registrationId }
    ) {
      denyReason
    }
  }
`;
