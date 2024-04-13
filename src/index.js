import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers/resolver.js'
import { typeDefs } from './schemas/schema.js'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers
})

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`)