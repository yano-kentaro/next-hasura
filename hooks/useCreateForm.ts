/** ================================================================
 * useCreateForm.ts
 * ユーザーを作成するためのHook
 * @author yano-kentaro
 * @date 2022-08-15
================================================================= */

// ----------------------------------
// import
import { useState, useCallback, ChangeEvent, FormEvent } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_USER } from "../queries/mutations"
import { CreateUserMutation } from "../types/generated/graphql"

// ----------------------------------
// export
export const useCreateForm = () => {
    const [text, setText] = useState("")
    const [userName, setUserName] = useState("")
	const [createUser] = useMutation<CreateUserMutation>(CREATE_USER, {
		update(cache, { data: { insert_users_one } }) {
			const cacheID = cache.identify(insert_users_one)
			cache.modify({
				fields: {
					users(existingUsers, { toReference }) {
						return [toReference(cacheID), ...existingUsers]
					}
				}
			})
		}
	})
    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await createUser({
                variables: {
                    name: userName
                }
            })
        } catch (error) {
            alert(error.message)
        }
        
        setText("")
        setUserName("")
    }
    const consoleMessage = useCallback(() => {
        console.log("Hello")
    }, [])
    return {
        text,
        userName,
        handleTextChange,
        handleUserNameChange,
        handleSubmit,
        consoleMessage
    }
}