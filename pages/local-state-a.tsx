/** ================================================================
 * local-state-a.tsx
 * 動作検証用のページA
 * @author yano-kentaro
 * @date 2022-08-11
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import { LocalStateA } from "../components/LocalStateA"
import { Layout } from "../components/Layout"

// ----------------------------------
// export
const LocalStatePageA: FC = () => {
	return(
		<Layout title="Local State A">
			<LocalStateA />
		</Layout>
	)
}
export default LocalStatePageA