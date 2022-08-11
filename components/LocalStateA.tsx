/** ================================================================
 * LocalStateA.tsx
 * 動作検証用のコンポーネントA
 * @author yano-kentaro
 * @date 2022-08-11
================================================================= */

// ----------------------------------
// import
import { ChangeEvent, FormEvent, useState, FC } from "react"
import Link from "next/link"
import { useReactiveVar } from "@apollo/client"
import { tasksVar } from "../cache"

// ----------------------------------
// export
export const LocalStateA: FC = () => {
	const [input, setInput] = useState("")
	const tasks = useReactiveVar(tasksVar)
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		tasksVar([...tasksVar(), { title: input }])
		setInput("")
	}

	return(
		<>
			<p className="mb-3 font-bold">makeVar</p>
			{
				tasks.map((task, index) => (
					<p className="mb-3 y-1" key={index}>
						{task.title}
					</p>
				))
			}
			<form
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit}
			>
				<input
					className="mb-3 px-3 py-2 border border-gray-300"
					placeholder="New task?"
					value={input}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
				/>
				<button
					type="submit"
					disabled={!input}
					className="
						disabled:opacity-50 mb-3 py-1 px-3 text-white bg-indigo-600
						hover:bg-indigo-700 rounded-2xl focus:outline-none
					"
				>
					Add new Task
				</button>
			</form>
			<Link href="/local-state-b">
				<a>Next</a>
			</Link>
		</>
	)
}