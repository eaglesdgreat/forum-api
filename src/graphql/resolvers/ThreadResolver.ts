import {
  EntityResult,
  MutationCreateThreadArgs,
  MutationUpdateThreadPointArgs,
  QueryGetThreadByCategoryIdArgs,
  QueryGetThreadByIdArgs,
  ThreadArrayResult,
  ThreadResult,
} from "../generated";
import { QueryArrayResult, QueryOneResult } from "../../types/classes";
import {
  createThreadService,
  getThreadByCategoryIdService,
  getThreadByIdService,
} from "../../services/thread.service";

import { GqlContext } from "../../types/interfaces";
import { IResolvers } from "@graphql-tools/utils";
import { Thread } from "../../entities/Thread";
import { ThreadPoint } from "../../entities/ThreadPoint"
import { updateThreadPointService } from '../../services/thread.points.service';

const ThreadResolver: IResolvers = {
  ThreadResult: {
    __resolveType(obj: any, ctx: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }

      return "Thread";
    },
  },

  ThreadArrayResult: {
    __resolveType(obj: any, ctx: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }

      return "ThreadArray";
    }
  },

  Query: {
    getThreadById: async (
      obj: any,
      args: QueryGetThreadByIdArgs,
      ctx: GqlContext,
      info: any
    ): Promise<ThreadResult> => {
      let thread: QueryOneResult<Thread>;

      try {
        thread = await getThreadByIdService(args.id);
        
        if (thread.entity) {
          return thread.entity;
        }

        return {
            messages: thread.messages ? thread.messages : ["An error has occurred"],
        };
      } catch(e: any) {
        throw e;
      }
    },

    getThreadByCategoryId: async (
      obj: any,
      args: QueryGetThreadByCategoryIdArgs,
      ctx: GqlContext,
      info: any
    ): Promise<ThreadArrayResult> => {
      let threads: QueryArrayResult<Thread>;

      try {
        threads = await getThreadByCategoryIdService(args.categoryId);

        if (threads.entities) {
          return {
            threads: threads.entities,
          }
        }

        return {
          messages: threads.messages ? threads.messages : ["An error has occurred"],
        }
      } catch (e: any) {
        throw e;
      }
    }
  },

  Mutation: {
    createThread: async (
      obj: any,
      args: MutationCreateThreadArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> => {
      let result: QueryOneResult<Thread>;

      try {
        result = await createThreadService(args);

        return {
          messages: result.messages
            ? result.messages
            : ["An error has occurred"],
        };
      } catch (e: any) {
        throw e;
      }
    },

    updateThreadPoint: async (
      obj: any,
      args: MutationUpdateThreadPointArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> => {
      let result: QueryOneResult<ThreadPoint>;

      try {
        result = await updateThreadPointService(args);

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

export default ThreadResolver;
