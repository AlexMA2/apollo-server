export const gameTypeDefs = `#graphql
  type Game {
    id: ID!
    puntuation: Float!
    time: Time    
    date: String!
    user: User!
  }

  type Query {
    games(order: Order): [Game]
    getGame(id: ID!): Game
  }

  type Mutation {
    createGame(userId: ID!, createdGame: CreateGameInput): Game
    deleteGame(id: ID!): Game
  } 

  input CreateGameInput {
    puntuation: Int!
    time: Time!
    date: String!
  }

  input Order {
    field: String!
    direction: Direction
  }

  enum Time {
    SLOW
    MEDIUM
    FAST
  }

  enum Direction {
    ASC
    DESC
  }
`
