import "graphql-import-node";

import * as emptyTypeDefs from "./schemas/Empty.graphql";
import * as scalarTypeDefs from "./schemas/Scalar.graphql"
import * as threadCategoryTypeDefs from  "./schemas/ThreadCategory.graphql";
import * as threadItemTypeDefs from "./schemas/ThreadItem.graphql";
import * as threadTypeDefs from "./schemas/Thread.graphql";
import * as userTypeDefs from "./schemas/User.graphql";

import {GraphQLSchema} from "graphql";
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from "./resolversMap";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [
    emptyTypeDefs,
    scalarTypeDefs,
    userTypeDefs,
    threadTypeDefs,
    threadItemTypeDefs,
    threadCategoryTypeDefs,
  ],
  resolvers,
});

export default schema;