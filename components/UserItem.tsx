/** ================================================================
 * UserItem.tsx
 * ユーザー一覧表示用コンポーネント
 * @author yano-kentaro
 * @date 2022-08-14
================================================================= */

// ----------------------------------
// import
import { FC, memo, Dispatch, SetStateAction } from "react"
import { Users, DeleteUserMutationFn } from "../types/generated/graphql"

// ----------------------------------
// export
interface Props {
	user: {
		__typename?: "users"
	} & Pick<Users, "id" | "name" | "created_at">
	deleteUser: DeleteUserMutationFn
	setEditedUser: Dispatch<SetStateAction<{
		id: string, name: string
	}>>
}

// eslint-disable-next-line react/display-name
export const UserItem: FC<Props> = memo(({
	user, deleteUser, setEditedUser
}) => {
			console.log("UserItem rendered")
	return(
		<div className="my-1">
			<span className="mr-2">{user.name}</span>
			<span className="mr-2">{user.created_at}</span>
			<button
				className="
					mr-1 py-1 px-3 bg-green-600 rounded-2xl
					text-white hover:bg-green-700 focus:outline-none
				"
				data-testid={`edit-${user.id}`}
				onClick={() => {setEditedUser(user)}}
			>
				Edit
			</button>
			<button
				className="
					py-1 px-3 bg-red-600 rounded-2xl
					text-white hover:bg-red-700 focus:outline-none
				"
				data-testid={`delete-${user.id}`}
				onClick={async() => {
					await deleteUser({
						variables: {
							id: user.id
						}
					})
				}}
			>
				Delete
			</button>
		</div>
	)
})