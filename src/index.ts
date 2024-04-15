import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/CountryResolver";
import { initializeDataSources } from "./database";
import { IncomingMessage, ServerResponse } from "http";

const PORT = 4000;

const startApolloServer = async () => {
  await initializeDataSources();

  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: true,
  });

  const server = new ApolloServer({
    schema,
  });

  await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({
      req,
      res,
    }): Promise<{ req: IncomingMessage; res: ServerResponse }> => {
      return { req, res };
    },
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}`);
};

startApolloServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
