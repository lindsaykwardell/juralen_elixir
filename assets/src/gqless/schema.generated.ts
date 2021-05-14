/**
 * GQLESS AUTO-GENERATED CODE: PLEASE DO NOT MODIFY MANUALLY
 */

import { ScalarsEnumsHash } from "gqless";

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  ID: true,
  String: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    allUsers: { __type: "[User!]!" },
    login: {
      __type: "String",
      __args: { email: "String!", password: "String!" },
    },
    profile: { __type: "User" },
  },
  mutation: {
    __typename: { __type: "String!" },
    register: {
      __type: "User!",
      __args: { email: "String!", name: "String!", password: "String!" },
    },
  },
  subscription: {},
  User: {
    __typename: { __type: "String!" },
    email: { __type: "String" },
    id: { __type: "ID" },
    name: { __type: "String" },
  },
} as const;

export interface Query {
  __typename: "Query" | undefined;
  allUsers: Array<User>;
  login: (args: {
    email: Scalars["String"];
    password: Scalars["String"];
  }) => Maybe<ScalarsEnums["String"]>;
  profile?: Maybe<User>;
}

export interface Mutation {
  __typename: "Mutation" | undefined;
  register: (args: {
    email: Scalars["String"];
    name: Scalars["String"];
    password: Scalars["String"];
  }) => User;
}

export interface Subscription {
  __typename: "Subscription" | undefined;
}

export interface User {
  __typename: "User" | undefined;
  email?: Maybe<ScalarsEnums["String"]>;
  id?: Maybe<ScalarsEnums["ID"]>;
  name?: Maybe<ScalarsEnums["String"]>;
}

export interface SchemaObjectTypes {
  Query: Query;
  Mutation: Mutation;
  Subscription: Subscription;
  User: User;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "User";

export interface GeneratedSchema {
  query: Query;
  mutation: Mutation;
  subscription: Subscription;
}

export type MakeNullable<T> = {
  [K in keyof T]: T[K] | undefined;
};

export interface ScalarsEnums extends MakeNullable<Scalars> {}
