import { gql } from "@apollo/client";

export const GET_NUMBERS = gql(`
    query Numbers {
    me {
        account {
        msisdn
        number {
            groups {
            numbers {
                msisdn
                guConfirmationInfo {
                status {
                    name
                    id
                }
                }
                description
                mark {
                name
                }
            }
            }
        }
        }
    }
    }
`);
