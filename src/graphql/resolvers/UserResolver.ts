import {
  EntityResult,
  MutationLoginArgs,
  MutationLogoutArgs,
  MutationRegisterArgs,
  UserResult,
} from './../generated';
import {
  currentSessionUserService,
  loginService,
  logoutService,
  registerService
} from '../../services/auth.service';

import { GqlContext } from "../../types/interfaces";
import { IResolvers } from "@graphql-tools/utils";
import { QueryOneResult } from '../../types/classes';
import { User } from "../../entities/User";

const STANDARD_ERROR = "An error has occurred";

const UserResolver: IResolvers = {
  UserResult: {
    __resolveType(obj: any, ctx: GqlContext, info: any) {
      if (obj.messages) {
        return "EntityResult";
      }
      return "User";
    },
  },

  Query: {
    currentSessionUser: async (
      obj: any,
      args: null,
      ctx: GqlContext,
      info: any,
    ): Promise<UserResult> => {
      let user: QueryOneResult<User>;
      try {
        if (!ctx.req.session?.userId) {
          return { messages: ["User not logged in"] }
        }

        user = await currentSessionUserService(ctx.req.session?.userId);

        if (user && user.entity) {
          return user.entity;
        }

        return { messages: user && user.messages ? user.messages : [STANDARD_ERROR]};
      } catch (e: any) {
        throw e;
      }
    },
  },

  Mutation: {
    register: async (
      obj: any,
      args: MutationRegisterArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> => {
      let user: QueryOneResult<User>;

      try {
        user = await registerService(args);

        if (user && user.entity) {
          return { messages: ["Registration successful."] };
        }

        return { messages: user && user.messages ? user.messages : [STANDARD_ERROR]};
      } catch (e: any) {
        throw e;
      }
    },

    login: async (
      obj: any,
      args: MutationLoginArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> => {
      let user: QueryOneResult<User>;

      try {
        user = await loginService(args);
        if (user && user.entity) {
          ctx.req.session!.userId = user.entity.id;

          return { messages: [`Login successful for user ${user.entity.userName}.`] };
        }
        ctx.req.session?.save();

        return { messages: user && user.messages ? user.messages : [STANDARD_ERROR]};
      } catch (e: any) {
        throw e;
      }
    },

    logout: async (
      obj: any,
      args: MutationLogoutArgs,
      ctx: GqlContext,
      info: any,
    ): Promise<EntityResult> => {
      try {
        let result = await logoutService(args.userName);

        ctx.req.session?.destroy((err: any) => {
          if (err) {
            console.log("destroy session failed");
            return;
          }
          console.log("session destroyed", ctx.req.session?.userId);
        });

        return { messages: [result] };
      } catch (e: any) {
        throw e;
      }
    }
  },
}

export default UserResolver;
