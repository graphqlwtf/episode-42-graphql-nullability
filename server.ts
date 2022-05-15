import { createServer, GraphQLYogaError } from "@graphql-yoga/node";

type User = {
  id: string;
  name: string;
  favoriteNumber?: number;
};

const typeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }

  type User {
    id: ID!
    name: String!
    favoriteNumber: Int
  }

  input CreateUserInput {
    name: String!
    favoriteNumber: Int
  }
`;

const users: User[] = [
  {
    id: String(1),
    name: "Jamie Barton",
    favoriteNumber: Math.floor(Math.random() * 100),
  },
  {
    id: String(2),
    name: "Sophie Barton",
  },
];

const resolvers = {
  Query: {
    users: (): User[] => users,
    user: (_, { id }): User => {
      const user = users.find((u) => u.id === id);

      if (!user) throw new GraphQLYogaError("No user found");

      return user;
    },
  },
  Mutation: {
    createUser: (_, { input: { name, favoriteNumber } }): User => ({
      id: String(Math.floor(Math.random() * 100)),
      name,
      favoriteNumber,
    }),
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
});

server.start();
