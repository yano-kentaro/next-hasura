/** ================================================================
 * hooks-memo.tsx
 * Custom Hook 挙動確認用ページ
 * @author yano-kentaro
 * @date 2022-08-15
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import { Layout } from "../components/Layout"
import { CreateUser } from "../components/CreateUser"

// ----------------------------------
// export
const HooksMemo: FC = () => {
	return (
		<Layout title="Hooks memo">
			<CreateUser />
		</Layout>
	)
}
export default HooksMemo