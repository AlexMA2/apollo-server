import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers/resolver.js'
import { typeDefs } from './schemas/schema.js'
import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'
import { PubSub } from 'graphql-subscriptions'

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const app = express()
const schema = makeExecutableSchema({ typeDefs, resolvers })
// This `app` is the returned value from `express()`.
const httpServer = createServer(app)
// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' })
// Get the recently created server to shutdown when the server later

const serverCleanup = useServer(
	{
		schema
	},
	wsServer
)

const pubsub = new PubSub()
// Apollo Server setup
const server = new ApolloServer({
	schema,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		{
			async serverWillStart() {
				return {
					// Called when the server is about to shut down.
					async drainServer() {
						serverCleanup.dispose()
					}
				}
			}
		}
	]
})

await server.start()

app.use(
	'/graphql',
	cors({
		origin: '*', // Permitir acceso desde cualquier origen
		allowedHeaders: ['Content-Type', 'Authorization'] // Permitir solo estos encabezados
	}),
	express.json(),
	expressMiddleware(server)
)

const PORT = 4000

// Now that our HTTP server is fully set up, we can listen to it.

httpServer.listen(PORT, () => {
	console.log(`Server is now running on http://localhost:${PORT}/graphql`)

	console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`)
})

// const { url } = await startStandaloneServer(server, {
// 	listen: { port: 4000 }
// })

// console.log(`🚀  Server ready at: ${url}`)
