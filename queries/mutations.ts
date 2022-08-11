/** ================================================================
 * mutations.ts
 * GraphQL mutations for the API
 * @author yano-kentaro
 * @date 2022-08-10
================================================================= */

// ----------------------------------
// import
import { gql } from '@apollo/client'

/** ----------------------------------------------------------------
 * ユーザーを作成
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const CREATE_USER = gql`
    mutation CreateUser($name: String!) {
        insert_users_one(object: { name: $name }) {
            id
            name
            created_at
        }
    }
`

/** ----------------------------------------------------------------
 * ユーザーを削除
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const DELETE_USER = gql`
    mutation DeleteUser($id: uuid!) {
        delete_users_by_pk(id: $id) {
            id
        }
    }
`

/** ----------------------------------------------------------------
 * ユーザーを更新
 * @author yano-kentaro
 * @date 2022-08-10
----------------------------------------------------------------- */

export const UPDATE_USER = gql`
    mutation UpdateUser($id: uuid!, $name: String!) {
        update_users_by_pk(
            pk_columns: { id: $id }, _set: { name: $name }
        ) {
            id
            name
            created_at
        }
    }
`
