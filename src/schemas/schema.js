import { typeDefs as User } from './user.js'
import { gameTypeDefs as Game } from './game.js'
import { tournamentTypeDefs } from './tournament.js'

export const typeDefs = [User, Game, tournamentTypeDefs]
