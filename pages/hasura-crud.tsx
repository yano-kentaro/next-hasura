/** ================================================================
 * hasura-crud.tsx
 * Hasura CRUDの挙動確認用ページ
 * @author yano-kentaro
 * @date 2022-08-14
================================================================= */

// ----------------------------------
// import
import { FC, useState, FormEvent } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { GET_ALL_USERS } from "../queries/queries"
import {
	CREATE_USER, UPDATE_USER, DELETE_USER
} from "../queries/mutations"
import {
	GetAllUsersQuery, CreateUserMutation,
	UpdateUserMutation, DeleteUserMutation
} from "../types/generated/graphql"
import { Layout } from "../components/Layout"
import { UserItem } from "../components/UserItem"

// ----------------------------------
// export
const HasuraCRUD: FC = () => {
	const [editedUser, setEditedUser] = useState({ id: "", name: "" })
	const { data, loading, error } = useQuery<GetAllUsersQuery>(GET_ALL_USERS, {
		fetchPolicy: "cache-and-network"
	})
	const [updateUser] = useMutation<UpdateUserMutation>(UPDATE_USER)

	// createとdeleteは、自力でcacheを変更する処理を書く必要がある
	const [createUser] = useMutation<CreateUserMutation>(CREATE_USER, {
		update(cache, { data: { insert_users_one } }) {
			const cacheID = cache.identify(insert_users_one)
			cache.modify({
				fields: {
					users(existingUsers, { toReference }) {
						return [toReference(cacheID), ...existingUsers]
					}
				}
			})
		}
	})
	const [deleteUser] = useMutation<DeleteUserMutation>(DELETE_USER, {
		update(cache, { data: { delete_users_by_pk } }) {
			const cacheID = cache.identify(delete_users_by_pk)
			cache.modify({
				fields: {
					users(existingUsers, { readField }) {
						return existingUsers.filter(
							user => delete_users_by_pk.id !== readField("id", user)
						)
					}
				}
			})
		}
	})

	// 送信ボタン押下時の処理
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (editedUser.id) {
			try {
				await updateUser({
					variables: {
						id: editedUser.id,
						name: editedUser.name
					}
				})
			} catch (error) {
				alert(error.message)
			}
		} else {
			try {
				await createUser({
					variables: {
						name: editedUser.name
					}
				})
			} catch (error) {
				alert(error.message)
			}
		}
		setEditedUser({ id: "", name: "" })
	}

	if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>

	return(
		<Layout title="Hasura CRUD">
			<p className="mb-3 font-bold">Hasura CRUD</p>
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					className="px-3 py-2 border border-gray-300"
					placeholder="New User ?"
					value={editedUser.name}
					onChange={e => setEditedUser({
						...editedUser, name: e.target.value
					})}
				/>
				<button
					type="submit"
					className="
						disabled:opacity-40 hover:bg-indigo-700
						my-3 py-1 px-2 px-3 text-white bg-indigo-600
						rounded-2xl focus:outline-none
					"
					disabled={!editedUser.name}
					data-testid="submit-button"
				>
					{editedUser.id ? "Update" : "Create"}
				</button>
			</form>

			{
				data?.users.map(user => {
					return(
						<UserItem
							key={user.id}
							user={user}
							setEditedUser={setEditedUser}
							deleteUser={deleteUser}
						/>
					)
				})
			}
		</Layout>
	)
}
export default HasuraCRUD