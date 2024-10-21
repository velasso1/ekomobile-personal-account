// get expenses for month
import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query Me ($year: Int!, $month: Int!) {
    me {
      account {
        number {
          expenses {
            availableMonths {
              year
              month
            }
            month(year: $year, month: $month) {
              amount {
                total
              }
              transactionList(page: 1, pageSize: 20) {
                total
                nodes {
                  timestamp
                  name
                  type
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;
