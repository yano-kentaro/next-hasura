/** ================================================================
 * hasura-main.tsx
 * Hasuraの挙動確認用ページ
 * @author yano-kentaro
 * @date 2022-08-11
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import { useQuery } from "@apollo/react-hooks"
import Link from "next/link"
import { GET_ALL_USERS } from "../queries/queries"
import { GetAllUsersQuery } from "../types/generated/graphql"
import { Layout } from "../components/Layout"

// ----------------------------------
// export
const FetchMain: FC = () => {
	const { data, loading, error } = useQuery<GetAllUsersQuery>(GET_ALL_USERS)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error :(</p>
	return(
		<Layout title="Hasura fetchpolicy">
			<p className="mb-6 font-bold">Hasura main page</p>
			{
				data?.users.map(user => (
					<p className="my-1" key={user.id}>
						{user.name}
					</p>
				))
			}
			<Link href="/hasura-sub">
				<a className="mt-6">Next</a>
			</Link>
		</Layout>
	)
}
export default FetchMain