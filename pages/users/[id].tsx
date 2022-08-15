/** ================================================================
 * /users/[id].tsx
 * 各ユーザーの詳細ページ
 * @author yano-kentaro
 * @date 2022-08-14
================================================================= */

// ----------------------------------
// import
import { FC } from "react"
import Link from "next/link"
import { GetStaticProps, GetStaticPaths } from "next"
import { ChevronDoubleLeftIcon } from "@heroicons/react/solid"
import { initializeApollo } from "../../lib/apolloClient"
import { GET_USER_IDS, GET_USER_BY_ID } from "../../queries/queries"
import {
	GetUserIdsQuery, GetUserByIdQuery, Users
} from "../../types/generated/graphql"
import { Layout } from "../../components/Layout"

// ----------------------------------
// export
export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query<GetUserIdsQuery>({
		query: GET_USER_IDS
	})
	const paths = data.users.map((user) => ({
		params: {
			id: user.id
		}
	}))
	return {
		paths,
		fallback: true // 動的に詳細ページを生成する
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const apolloClient = initializeApollo()
	const { data } = await apolloClient.query<GetUserByIdQuery>({
		query: GET_USER_BY_ID,
		variables: {
			id: params.id
		}
	})
	return {
		props: {
			user: data.users_by_pk
		},
		revalidate: 1
	}
}

interface Props {
	user: {
		__typename?: "users",
	} & Pick<Users, "id" | "name" | "created_at">
}

const UserDetail: FC<Props> = ({ user }) => {
	if (!user) return <Layout title="loading">Loading...</Layout>
	return (
		<Layout title={user.name}>
			<p className="text-xl font-bold"> User detail</p>
			<p className="m-4">
				{"ID: "}
				{user.id}
			</p>
			<p className="mb-4 text-xl font-bold">{user.name}</p>
			<p className="mb-12">{user.created_at}</p>
			<Link href="/hasura-ssg">
				<div className="flex cursor-pointer mt-12">
					<ChevronDoubleLeftIcon
						className="h-5 w-5 text-blue-500"
						data-testid="auth-to-main"
					/>
					<span data-testid="back-to-main">
						Back to main-ssg-page
					</span>
				</div>
			</Link>
		</Layout>
	)
}
export default UserDetail