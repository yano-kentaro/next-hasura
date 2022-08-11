/** ================================================================
 * local-state-b.tsx
 * 動作検証用のページB
 * @author yano-kentaro
 * @date 2022-08-11
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import { LocalStateB } from "../components/LocalStateB"
import { Layout } from "../components/Layout"

// ----------------------------------
// export
const LocalStatePageB: FC = () => {
	return(
		<Layout title="Local State B">
			<LocalStateB />
		</Layout>
	)
}
export default LocalStatePageB