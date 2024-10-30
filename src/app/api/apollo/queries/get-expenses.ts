// get expenses for month
import { gql } from "@apollo/client";

export const GET_EXPENSES = gql`
  query Me($year: Int!, $month: Int!) {
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

export const GET_CURRENT_EXPENSES = gql`
query Me ($msisdn: Msisdn! $year: Int! $month: Int!) {
    me {
        account {
            billingNumber(msisdn: $msisdn) {
                expenses {
                    availableMonths {
                        year
                        month
                    }
                    month(year: $year, month: $month) {
                        month {
                            year
                            month
                        }
                        amount {
                            total
                            parts {
                                type
                                amount
                            }
                        }
                        transactionList(page: 1, pageSize: 20) {
                            total
                            nodes {
                                timestamp
                                type
                                name
                                amount
                            }
                        }
                    }
                }
            }
        }
    }
}
`
