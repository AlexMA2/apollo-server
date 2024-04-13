import { users } from '../mock/data.js'
import { v4 as uuid } from 'uuid'

export const UserResolvers = {
	Query: {
		users() {
			return users
		},
		/**
		 * parent:
		 *
		 */
		getUser: (parent, args, contextValue, info) => {
			const { id } = args
			return users.find((user) => user.id === id)
		}
	},
	Mutation: {
		deleteUser: (_, args) => {
			const { id } = args
			const userIndex = users.findIndex((user) => user.id === id)
			if (userIndex === -1) {
				throw new Error('User not found')
			}
			const deletedUser = users.splice(userIndex, 1)
			return deletedUser[0]
		},
		createUser: (_, args) => {
			const { user } = args
			const newUser = {
				id: uuid(),
				username: user.username
			}
			users.push(newUser)
			return newUser
		},
		updateUser: (_, args) => {
			const { id, updatedUser } = args
			const userIndex = users.findIndex((user) => user.id === id)
			if (userIndex === -1) {
				throw new Error('User not found')
			}
			const newUser = {
				...users[userIndex],
				...updatedUser
			}

			users[userIndex] = newUser
			return updatedUser
		}
	}
}
