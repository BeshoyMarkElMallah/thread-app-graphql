import { ApolloServer } from "@apollo/server";
import { prismaClient } from "../lib/db";
import { User } from "./user";
async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
    type Query {
        hello: String
        say(name:String):String
    }
    type Mutation {
        ${User.mutations}
    }
    `, //Schema
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }, //functions will be exectued
        }
    });

    //Start Server
    await gqlServer.start();

    return gqlServer;
}

export default createApolloGraphqlServer;