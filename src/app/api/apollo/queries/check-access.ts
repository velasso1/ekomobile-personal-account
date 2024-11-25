// Проверка наличия у абонента разрешений для доступа к функционалу личного кабинета.
import { gql } from "@apollo/client";

export const CHECK_ACCESS = gql`
  query AccessCheck($token: ID!) {
    accessCheck(authorities: $token) {
      results {
        authority
        hasAccess
      }
    }
  }
`;
