import { UserResolvers } from './user.js'
import { GameResolvers } from './game.js'
import { TournamentResolvers } from './tournament.js'

export const resolvers = [UserResolvers, GameResolvers, TournamentResolvers]
