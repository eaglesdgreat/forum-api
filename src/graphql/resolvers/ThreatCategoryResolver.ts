import {
  EntityResult,
  MutationCreateThreadCategoryArgs,
  ThreadCategoriesArrayResult
} from "../generated";
import { QueryArrayResult, QueryOneResult } from "../../types/classes";
import { createThreadCategoryService, getThreadCategoriesService } from "../../services/thread.service";

import { GqlContext } from "../../types/interfaces";
import { IResolvers } from "@graphql-tools/utils";
import { ThreadCategory } from './../../entities/ThreadCategory';

const STANDARD_ERROR = "An error has occurred";

const ThreadCategoryResolver: IResolvers = {
  ThreadCategoriesArrayResult: {
    __resolveType(obj: any, ctx: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "ThreadCategoryArray";
    },
  },

  Query: {
    getAllCategories: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any,
    ): Promise<ThreadCategoriesArrayResult> => {
      let categories: QueryArrayResult<ThreadCategory>;

      try {
        categories = await getThreadCategoriesService();

        if (categories.entities) {
          return { categories: categories.entities };
        }

        return { messages: categories.messages ? categories.messages : [STANDARD_ERROR] };
      } catch (e: any) {
        throw e;
      }
    }
  },

  Mutation: {
    createThreadCategory: async (
      obj: any,
      args: MutationCreateThreadCategoryArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> => {
      let result: QueryOneResult<ThreadCategory>;

      try {
        result = await createThreadCategoryService(args);
  
        return {
          messages: result.messages
            ? result.messages
            : ["An error has occurred"],
        };
      } catch (e: any) {
        throw e;
      }
    }
  }
}

export default ThreadCategoryResolver;
