import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';

export const schema = makeExecutableSchema({ typeDefs, resolvers });