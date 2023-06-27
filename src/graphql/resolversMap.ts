import { IResolvers } from "@graphql-tools/utils";
import ThreadCategoryResolver from "./resolvers/ThreatCategoryResolver";
import ThreadItemResolver from "./resolvers/ThreatItemResolver";
import ThreadResolver from "./resolvers/ThreadResolver"
import UserResolver from "./resolvers/UserResolver";
import { merge } from "lodash"

const resolversMap: IResolvers = merge(
  UserResolver,
  ThreadResolver,
  ThreadCategoryResolver,
  ThreadItemResolver,
);

export default resolversMap;
