import { gql } from "@apollo/client";

export const GET_PROFILE_DATA = gql`
    query Me {
    userInfo: me {
        account {
            msisdn
            email
            birthday
            gender
            contactPhone
            contactName
            isContactPhoneVerified
            isEmailVerified
        }
    }
}`