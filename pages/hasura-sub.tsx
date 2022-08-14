/** ================================================================
 * hasura-sub.tsx
 * キャッシュの挙動確認用ページ
 * @author yano-kentaro
 * @date date
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import { useQuery } from "@apollo/react-hooks"
import Link from "next/link"
import { GET_ALL_USERS_LOCAL, GET_ALL_USERS } from "../queries/queries"
import { GetAllUsersQuery } from "../types/generated/graphql"
import { Layout } from "../components/Layout"

// ----------------------------------
// export
const FetchSub: FC = () => {
	const { data, loading, error } = useQuery<GetAllUsersQuery>(GET_ALL_USERS_LOCAL)

	return(
		<Layout title="Hasura fetchpolicy read cache">
			<p className="mb-6 font-bold">
				Direct read out from cache
			</p>
			{
				data?.users.map((user) => (
					<p className="my-1" key={user.id}>
						{user.name}
					</p>
				))
			}
			<Link href="/hasura-main">
				<a className="mt-6">Back</a>
			</Link>
		</Layout>
	)
}
export default FetchSub