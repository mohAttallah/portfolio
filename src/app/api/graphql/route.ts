'use server'

import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { NextRequest } from "next/server";
import { typeDefs } from "src/lib/graphql/schema/typeDefs";
import { resolvers } from "src/lib/graphql/resolvers";

const schema = makeExecutableSchema({ typeDefs, resolvers });

interface YogaContext {
  req: NextRequest;
}

const yoga = createYoga<YogaContext>({
  schema,
  graphqlEndpoint: "/api/graphql",
  context: ({ request }: { request: NextRequest }) => ({ req: request }),
});

export const GET = async (req: NextRequest) => {
  return yoga.handleRequest(req, { req });
};

export const POST = async (req: NextRequest) => {
  return yoga.handleRequest(req, { req });
};