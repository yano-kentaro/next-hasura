/** ================================================================
 * Child.tsx
 * useMemoなどの効果測定用コンポーネント
 * @author yano-kentaro
 * @date 2022-08-15
================================================================= */

// ----------------------------------
// import
import { ChangeEvent, FormEvent, memo, FC } from "react"

// ----------------------------------
// export
interface Props {
	consoleMessage: () => void
}

// eslint-disable-next-line react/display-name
export const Child: FC<Props> = memo(({consoleMessage}) => {
	return(
		<>
			{console.log("Child rendered")}
			<p>Child Component</p>
			<button
				onClick={consoleMessage}
				className="
					disabled:opacity-40 hover:bg-indigo-700
					my-3 py-1 px-2 px-3 text-white bg-indigo-600
					rounded-2xl focus:outline-none
				"
			>
				click
			</button>
		</>
	)
})