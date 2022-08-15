/** ================================================================
 * CreateUser.tsx
 * ユーザー作成用コンポーネント
 * @author yano-kentaro
 * @date 2022-08-15
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import { useCreateForm } from "../hooks/useCreateForm"
import { Child } from "./Child"

// ----------------------------------
// export
export const CreateUser: FC = () => {
	const {
		text,
        userName,
        handleTextChange,
        handleUserNameChange,
        handleSubmit,
        consoleMessage
	} = useCreateForm()

	return (
		<>
			{console.log("CreateUser rendered")}
			<p className="mb-3 font-bold">
				Custom Hook + useCallback + memo
			</p>
			<div className="mb-3 flex flex-col justify-center items-center">
				<label>Text</label>
				<input
					type="text"
					className="px-3 py-2 border border-gray-300"
					value={text}
					onChange={handleTextChange}
				/>
			</div>
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit}
			>
				<label>User Name</label>
				<input
					type="text"
					className="mb-3 px-3 py-2 border border-gray-300"
					placeholder="New User ?"
					value={userName}
					onChange={handleUserNameChange}
				/>
				<button
					type="submit"
					className="
						disabled:opacity-40 hover:bg-indigo-700
						my-3 py-1 px-2 px-3 text-white bg-indigo-600
						rounded-2xl focus:outline-none
					"
				>
					Submit
				</button>
			</form>
			<Child consoleMessage={consoleMessage} />
		</>
	)
}