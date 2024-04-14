export const tournamentTypeDefs = `#graphql

    type Tournament {
        id: ID!
        name: String!
        password: String
        maxPlayers: Int!
    }

    type Subscription {
        tournamentCreated: Tournament
    }

    type Subscription {
        hello: String!    
    }

    type Mutation {
        createTournament(createdTournamentInput : CreatedTournamentInput): Tournament
    }

    input CreatedTournamentInput {
        name: String!
        password: String
        maxPlayers: Int!
    }
`
