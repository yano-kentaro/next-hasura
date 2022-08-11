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
 * 全ユーザー情報を取得
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
 * 全ユーザー情報をキャッシュから取得
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
 * 全ユーザーのIDを取得
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
 * IDを基にユーザー情報を取得
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
