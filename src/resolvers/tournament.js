import { PubSub } from 'graphql-subscriptions'
import { TOURNAMENT_CREATED } from '../utils/ws.js'
import { tournaments } from '../mock/data.js'
import { v4 as uuid } from 'uuid'
const pubsub = new PubSub()

export const TournamentResolvers = {
	Subscription: {
		hello: {
			// Example using an async generator

			subscribe: async function* () {
				for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
					yield { hello: word }
				}
			}
		},
		tournamentCreated: {
			// Pubsub is only used for development purposes. Use PubSubEngine for production.
			subscribe: () => {
				return pubsub.asyncIterator([TOURNAMENT_CREATED])
			}
		}
	},
	Mutation: {
		createTournament: (_, args) => {
			const { createdTournamentInput } = args

			const newTournament = {
				...createdTournamentInput,
				id: uuid()
			}
			tournaments.push(newTournament)

			pubsub.publish(TOURNAMENT_CREATED, { tournamentCreated: newTournament })
			return newTournament
		}
	}
}
