import { gql } from "@apollo/client";

export const UPDATE_ACCOUNT_INFO = gql`
  mutation AccountUpdate(
    $contactName: String
    $contactPhone: Msisdn
    $email: String!
    $birthday: Date
    $gender: AccountGender
  ) {
    accountUpdate(
      data: {
        contactName: { value: $contactName }
        contactPhone: { value: $contactPhone }
        email: { value: $email }
        birthday: { value: $birthday }
        gender: { value: $gender }
      }
    ) {
      contactName
      contactPhone
      email
      birthday
      gender
    }
  }
`;
