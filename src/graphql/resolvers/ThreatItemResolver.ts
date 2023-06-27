import {
  EntityResult,
  MutationCreateThreadItemArgs,
  MutationUpdateThreadItemPointArgs,
  QueryGetThreadItemsByThreadIdArgs,
  ThreadItemArrayResult,
} from "../generated";
import { QueryArrayResult, QueryOneResult } from "../../types/classes";
import { createThreadItemService, getThreadItemsByThreadIdService } from '../../services/thread.items.service';

import { GqlContext } from "../../types/interfaces";
import { IResolvers } from "@graphql-tools/utils";
import { ThreadItem } from "../../entities/ThreadItem";
import { ThreadItemPoint } from "../../entities/ThreadItemPoint";
import { updateThreadItemPointService } from "../../services/thread.items.points.service";

const ThreadItemResolver: IResolvers = {
  ThreadItemArrayResult: {
    __resolveType(obj: any, ctx: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }

      return "ThreadItemArray";
    }
  },

  Query: {
    getThreadItemsByThreadId: async (
      obj: any,
      args: QueryGetThreadItemsByThreadIdArgs,
      ctx: GqlContext,
      info: any
    ): Promise<ThreadItemArrayResult> => {
      let threadItems: QueryArrayResult<ThreadItem>;

      try {
        threadItems = await getThreadItemsByThreadIdService(args.threadId);

        if (threadItems.entities) {
          return {
            threadItems: threadItems.entities,
          }
        }

        return {
          messages: threadItems.messages ? threadItems.messages : ["An error has occurred"],
        }
      } catch (e: any) {
        console.log(e)
        throw e;
      }
    }
  },

  Mutation: {
    createThreadItem: async (
      obj: any,
      args: MutationCreateThreadItemArgs,
      ctx: GqlContext,
      info: any
    ): Promise<EntityResult> => {
      let result: QueryOneResult<ThreadItem>;

      try {
        result = await createThreadItemService(args);

        return {
          messages: result.messages
            ? result.messages
            : ["An error has occurred"],
        };
      } catch (e: any) {
        throw e;
      }
    },

    updateThreadItemPoint: async (
      obj: any,
      args: MutationUpdateThreadItemPointArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> =>  {
      let result: QueryOneResult<ThreadItemPoint>;

      try {
        result = await updateThreadItemPointService(args);

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

export default ThreadItemResolver;