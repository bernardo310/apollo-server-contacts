import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { startStandaloneServer } from '@apollo/server/standalone';

import { resolvers, typeDefs } from "./schemas/contact";
import { MongoClient } from 'mongodb';
import ContactsDataSource from './data-sources/Contacts';


const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers })
});

async function connectMongodb() {
    const client = new MongoClient(process.env.MONGO_URI);
    const connection = await client.connect();

    console.log("Connected to database successfully");
    return connection;
};

(async () => {
  const dbConnection = await connectMongodb();

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
           contactsDb: new ContactsDataSource(dbConnection),
        },
      };
    },
  });
  console.log(`Server running at ${url}`)
})()
