import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type EntityResult = {
  __typename?: 'EntityResult';
  messages?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createThread?: Maybe<EntityResult>;
  createThreadCategory?: Maybe<EntityResult>;
  createThreadItem?: Maybe<EntityResult>;
  login?: Maybe<EntityResult>;
  logout?: Maybe<EntityResult>;
  register?: Maybe<EntityResult>;
  updateThreadItemPoint?: Maybe<EntityResult>;
  updateThreadPoint?: Maybe<EntityResult>;
};


export type MutationCreateThreadArgs = {
  body: Scalars['String'];
  categoryId: Scalars['ID'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationCreateThreadCategoryArgs = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateThreadItemArgs = {
  body: Scalars['String'];
  threadId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationLogoutArgs = {
  userName: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  userName: Scalars['String'];
};


export type MutationUpdateThreadItemPointArgs = {
  increment: Scalars['Boolean'];
  threadItemId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationUpdateThreadPointArgs = {
  increment: Scalars['Boolean'];
  threadId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  currentSessionUser?: Maybe<UserResult>;
  getAllCategories?: Maybe<ThreadCategoriesArrayResult>;
  getThreadByCategoryId: ThreadArrayResult;
  getThreadById?: Maybe<ThreadResult>;
  getThreadItemsByThreadId?: Maybe<ThreadItemArray>;
};


export type QueryGetThreadByCategoryIdArgs = {
  categoryId: Scalars['ID'];
};


export type QueryGetThreadByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetThreadItemsByThreadIdArgs = {
  threadId: Scalars['ID'];
};

export type Thread = {
  __typename?: 'Thread';
  body: Scalars['String'];
  category?: Maybe<ThreadCategory>;
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  points: Scalars['Int'];
  threadItems?: Maybe<Array<ThreadItem>>;
  title: Scalars['String'];
  user: User;
  views: Scalars['Int'];
};

export type ThreadArray = {
  __typename?: 'ThreadArray';
  threads?: Maybe<Array<Thread>>;
};

export type ThreadArrayResult = EntityResult | ThreadArray;

export type ThreadCategoriesArrayResult = EntityResult | ThreadCategoryArray;

export type ThreadCategory = {
  __typename?: 'ThreadCategory';
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  name: Scalars['String'];
  threads: Array<Thread>;
};

export type ThreadCategoryArray = {
  __typename?: 'ThreadCategoryArray';
  categories?: Maybe<Array<ThreadCategory>>;
};

export type ThreadItem = {
  __typename?: 'ThreadItem';
  body: Scalars['String'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  points: Scalars['Int'];
  thread: Thread;
  user: User;
  views: Scalars['Int'];
};

export type ThreadItemArray = {
  __typename?: 'ThreadItemArray';
  threadItems?: Maybe<Array<ThreadItem>>;
};

export type ThreadItemArrayResult = EntityResult | ThreadItemArray;

export type ThreadResult = EntityResult | Thread;

export type User = {
  __typename?: 'User';
  confirmed: Scalars['Boolean'];
  createdBy: Scalars['String'];
  createdOn: Scalars['Date'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isDisabled: Scalars['Boolean'];
  lastModifiedBy: Scalars['String'];
  lastModifiedOn: Scalars['Date'];
  password: Scalars['String'];
  threads?: Maybe<Array<Thread>>;
  userName: Scalars['String'];
};

export type UserResult = EntityResult | User;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EntityResult: ResolverTypeWrapper<EntityResult>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Thread: ResolverTypeWrapper<Thread>;
  ThreadArray: ResolverTypeWrapper<ThreadArray>;
  ThreadArrayResult: ResolversTypes['EntityResult'] | ResolversTypes['ThreadArray'];
  ThreadCategoriesArrayResult: ResolversTypes['EntityResult'] | ResolversTypes['ThreadCategoryArray'];
  ThreadCategory: ResolverTypeWrapper<ThreadCategory>;
  ThreadCategoryArray: ResolverTypeWrapper<ThreadCategoryArray>;
  ThreadItem: ResolverTypeWrapper<ThreadItem>;
  ThreadItemArray: ResolverTypeWrapper<ThreadItemArray>;
  ThreadItemArrayResult: ResolversTypes['EntityResult'] | ResolversTypes['ThreadItemArray'];
  ThreadResult: ResolversTypes['EntityResult'] | ResolversTypes['Thread'];
  User: ResolverTypeWrapper<User>;
  UserResult: ResolversTypes['EntityResult'] | ResolversTypes['User'];
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Date: Scalars['Date'];
  EntityResult: EntityResult;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Thread: Thread;
  ThreadArray: ThreadArray;
  ThreadArrayResult: ResolversParentTypes['EntityResult'] | ResolversParentTypes['ThreadArray'];
  ThreadCategoriesArrayResult: ResolversParentTypes['EntityResult'] | ResolversParentTypes['ThreadCategoryArray'];
  ThreadCategory: ThreadCategory;
  ThreadCategoryArray: ThreadCategoryArray;
  ThreadItem: ThreadItem;
  ThreadItemArray: ThreadItemArray;
  ThreadItemArrayResult: ResolversParentTypes['EntityResult'] | ResolversParentTypes['ThreadItemArray'];
  ThreadResult: ResolversParentTypes['EntityResult'] | ResolversParentTypes['Thread'];
  User: User;
  UserResult: ResolversParentTypes['EntityResult'] | ResolversParentTypes['User'];
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type EntityResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['EntityResult'] = ResolversParentTypes['EntityResult']> = {
  messages?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createThread?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationCreateThreadArgs, 'body' | 'categoryId' | 'title' | 'userId'>>;
  createThreadCategory?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationCreateThreadCategoryArgs, 'name'>>;
  createThreadItem?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationCreateThreadItemArgs, 'body' | 'threadId' | 'userId'>>;
  login?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'userName'>>;
  logout?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationLogoutArgs, 'userName'>>;
  register?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'userName'>>;
  updateThreadItemPoint?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationUpdateThreadItemPointArgs, 'increment' | 'threadItemId' | 'userId'>>;
  updateThreadPoint?: Resolver<Maybe<ResolversTypes['EntityResult']>, ParentType, ContextType, RequireFields<MutationUpdateThreadPointArgs, 'increment' | 'threadId' | 'userId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  currentSessionUser?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType>;
  getAllCategories?: Resolver<Maybe<ResolversTypes['ThreadCategoriesArrayResult']>, ParentType, ContextType>;
  getThreadByCategoryId?: Resolver<ResolversTypes['ThreadArrayResult'], ParentType, ContextType, RequireFields<QueryGetThreadByCategoryIdArgs, 'categoryId'>>;
  getThreadById?: Resolver<Maybe<ResolversTypes['ThreadResult']>, ParentType, ContextType, RequireFields<QueryGetThreadByIdArgs, 'id'>>;
  getThreadItemsByThreadId?: Resolver<Maybe<ResolversTypes['ThreadItemArray']>, ParentType, ContextType, RequireFields<QueryGetThreadItemsByThreadIdArgs, 'threadId'>>;
};

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  category?: Resolver<Maybe<ResolversTypes['ThreadCategory']>, ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDisabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastModifiedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModifiedOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  threadItems?: Resolver<Maybe<Array<ResolversTypes['ThreadItem']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadArrayResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadArray'] = ResolversParentTypes['ThreadArray']> = {
  threads?: Resolver<Maybe<Array<ResolversTypes['Thread']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadArrayResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadArrayResult'] = ResolversParentTypes['ThreadArrayResult']> = {
  __resolveType: TypeResolveFn<'EntityResult' | 'ThreadArray', ParentType, ContextType>;
};

export type ThreadCategoriesArrayResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadCategoriesArrayResult'] = ResolversParentTypes['ThreadCategoriesArrayResult']> = {
  __resolveType: TypeResolveFn<'EntityResult' | 'ThreadCategoryArray', ParentType, ContextType>;
};

export type ThreadCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadCategory'] = ResolversParentTypes['ThreadCategory']> = {
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastModifiedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModifiedOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  threads?: Resolver<Array<ResolversTypes['Thread']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadCategoryArrayResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadCategoryArray'] = ResolversParentTypes['ThreadCategoryArray']> = {
  categories?: Resolver<Maybe<Array<ResolversTypes['ThreadCategory']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadItem'] = ResolversParentTypes['ThreadItem']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDisabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastModifiedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModifiedOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  thread?: Resolver<ResolversTypes['Thread'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  views?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadItemArrayResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadItemArray'] = ResolversParentTypes['ThreadItemArray']> = {
  threadItems?: Resolver<Maybe<Array<ResolversTypes['ThreadItem']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadItemArrayResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadItemArrayResult'] = ResolversParentTypes['ThreadItemArrayResult']> = {
  __resolveType: TypeResolveFn<'EntityResult' | 'ThreadItemArray', ParentType, ContextType>;
};

export type ThreadResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ThreadResult'] = ResolversParentTypes['ThreadResult']> = {
  __resolveType: TypeResolveFn<'EntityResult' | 'Thread', ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  confirmed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDisabled?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  lastModifiedBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastModifiedOn?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  threads?: Resolver<Maybe<Array<ResolversTypes['Thread']>>, ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType: TypeResolveFn<'EntityResult' | 'User', ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  EntityResult?: EntityResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
  ThreadArray?: ThreadArrayResolvers<ContextType>;
  ThreadArrayResult?: ThreadArrayResultResolvers<ContextType>;
  ThreadCategoriesArrayResult?: ThreadCategoriesArrayResultResolvers<ContextType>;
  ThreadCategory?: ThreadCategoryResolvers<ContextType>;
  ThreadCategoryArray?: ThreadCategoryArrayResolvers<ContextType>;
  ThreadItem?: ThreadItemResolvers<ContextType>;
  ThreadItemArray?: ThreadItemArrayResolvers<ContextType>;
  ThreadItemArrayResult?: ThreadItemArrayResultResolvers<ContextType>;
  ThreadResult?: ThreadResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};

