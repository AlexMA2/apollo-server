import { games, users } from '../mock/data.js'
import { v4 as uuid } from 'uuid'

export const GameResolvers = {
	Query: {
		games: (_, args) => {
			const { order } = args
			if (!order) return games

			const { field, direction } = order
			console.log('🚀 ~ field, direction:', field, direction)
			if (field === 'date' && direction === 'ASC') {
				games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
			}
			if (field === 'date' && direction === 'DESC') {
				games.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
			}

			if (field === 'puntuation' && direction === 'ASC') {
				console.log('0here')
				games.sort((a, b) => a.puntuation - b.puntuation)
			}

			if (field === 'puntuation' && direction === 'DESC') {
				games.sort((a, b) => b.puntuation - a.puntuation)
			}

			const timeValue = {
				SLOW: 1,
				MEDIUM: 2,
				FAST: 3
			}

			if (field === 'time' && direction === 'ASC') {
				games.sort((a, b) => timeValue[a.time] - timeValue[b.time])
			}

			if (field === 'time' && direction === 'DESC') {
				games.sort((a, b) => timeValue[b.time] - timeValue[a.time])
			}

			return games
		},
		getGame: (_, args) => {
			const { id } = args
			return games.find((game) => game.id === id)
		}
	},
	Mutation: {
		deleteGame: (_, args) => {
			const { id } = args

			const gameIndex = games.findIndex((game) => game.id === id)

			if (gameIndex === -1) {
				throw new Error('game not found')
			}

			const userIndex = users.findIndex((user) => user.id === games[gameIndex].user.id)

			const newPlayedGames = users[userIndex].playedGames.filter((game) => game.id !== id)

			const newUser = {
				...users[userIndex],
				playedGames: newPlayedGames
			}
			const deletedGame = games.splice(gameIndex, 1)
			users[userIndex] = newUser
			return deletedGame[0]
		},
		createGame: (_, args) => {
			const { userId, createdGame } = args
			const userIndex = users.findIndex((user) => user.id === userId)
			if (userIndex === -1) {
				throw new Error('User not found')
			}
			const newGame = {
				id: uuid(),
				...createdGame,
				user: users[userIndex]
			}

			games.push(newGame)

			const newUser = {
				...users[userIndex],
				playedGames: [...(users[userIndex].playedGames ?? []), newGame]
			}

			users[userIndex] = newUser

			return newGame
		}
	}
}
