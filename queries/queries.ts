/** ================================================================
 * queries.ts
 * GraphQL queries for the API
 * @author yano-kentaro
 * @date 2022-08-10
================================================================= */

// ----------------------------------
// import
import { gql } from '@apollo/client'

/** ----------------------------------------------------------------
 * Get all users
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            id
            name
            created_at
        }
    }
`

/** ----------------------------------------------------------------
 * Get all users local
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const GET_ALL_USERS_LOCAL = gql`
    query GetAllUsersLocal {
        users(order_by: { created_at: desc }) @client {
            id
            name
            created_at
        }
    }
`

/** ----------------------------------------------------------------
 * Get User IDs
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const GET_USER_IDS = gql`
    query GetUserIds {
        users(order_by: { created_at: desc }) {
            id
        }
    }
`

/** ----------------------------------------------------------------
 * Get User by ID
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const GET_USER_BY_ID = gql`
    query GetUserById($id: uuid!) {
        users_by_pk(id: $id) {
            id
            name
            created_at
        }
    }
`
