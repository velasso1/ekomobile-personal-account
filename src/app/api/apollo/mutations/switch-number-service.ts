// this mutations needed for enable/disable services
import { gql } from "@apollo/client";

export const ENABLE_SERVICE = gql`
  mutation BillingNumberServiceEnable(
    $correlationId: ID!
    $actionId: ID!
    $availableServiceId: ID!
    $targetMsisdn: Msisdn
  ) {
    billingNumberServiceEnable(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: { availableServiceId: $availableServiceId, targetMsisdn: $targetMsisdn }
    ) {
      correlation {
        correlationId
        actionId
      }
    }
  }
`;

export const DISABLE_SERVICE = gql`
  mutation BillingNumberServiceDisable(
    $correlationId: ID!
    $actionId: ID!
    $enabledServiceId: ID!
    $targetMsisdn: Msisdn
  ) {
    billingNumberServiceDisable(
      correlation: { correlationId: $correlationId, actionId: $actionId }
      params: { targetMsisdn: $targetMsisdn, enabledServiceId: $enabledServiceId }
    ) {
      correlation {
        correlationId
        actionId
      }
    }
  }
`;

// response types for this mutations:

export interface IEnableServiceResponse {
  data: {
    billingNumberServiceEnable: {
      correlation: {
        actionId: string;
        correlationId: string;
      };
    };
  };
}

export interface IDisableServiceResponse {
  data: {
    billingNumberServiceDisable: {
      correlation: {
        actionId: string;
        correlationId: string;
      };
    };
  };
}
