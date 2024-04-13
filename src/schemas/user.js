export const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!   
    playedGames: [Game!]
  }

  type Query {
    getUser(id: ID!): User
    users: [User]
  }

  type Mutation {
    createUser(user: CreateUserInput): User
    updateUser(id: ID!, updatedUser: UpdateUserInput): User
    deleteUser(id: ID!): User
  }

  input CreateUserInput {
    username: String!
  }

  input UpdateUserInput {
    username: String!
  }
`
