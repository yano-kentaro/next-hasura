/** ================================================================
 * hasura-ssg.tsx
 * SSGの挙動確認用ページ
 * @author yano-kentaro
 * @date 2022-08-14
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import Link from "next/link"
import { GetStaticProps } from "next"
import { initializeApollo } from "../lib/apolloClient"
import { GET_ALL_USERS } from "../queries/queries"
import { GetAllUsersQuery, Users } from "../types/generated/graphql"
import { Layout } from "../components/Layout"

// ----------------------------------
// export
interface Props {
	users: ({
		__typename?: "users",
	} & Pick<Users, 'id' | 'name' | 'created_at'>)[]
}

const HasuraSSG: FC<Props> = ({ users }) => {
	return(
		<Layout title="Hasura SSG">
			<p className="mb-3 font-bold">SSG + ISR</p>
			{
				users?.map(user => (
					<Link
						key={user.id}
						href={`/users/${user.id}`}
					>
						<a
							className="my-1 cursor-pointer"
							data-testid={`link-${user.id}`}
						>
							{user.name}
						</a>
					</Link>
				))
			}
		</Layout>
	)
}
export default HasuraSSG

export const getStaticProps: GetStaticProps = async () => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query<GetAllUsersQuery>({
		query: GET_ALL_USERS
	})
	return {
		props: {
			users: data.users,
		},
		revalidate: 1,
	}
}