/** ================================================================
 * LocalStateB.tsx
 * 動作検証用のコンポーネントB
 * @author yano-kentaro
 * @date 2022-08-11
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import Link from "next/link"
import { useReactiveVar } from "@apollo/client"
import { tasksVar } from "../cache"

// ----------------------------------
// export
export const LocalStateB: FC = () => {
	const tasks = useReactiveVar(tasksVar)

	return(
		<>
			{
				tasks.map((task, index) => (
					<p className="mb-3" key={index}>
						{task.title}
					</p>
				))
			}
			<Link href="/local-state-a">
				<a>Back</a>
			</Link>
		</>
	)
}