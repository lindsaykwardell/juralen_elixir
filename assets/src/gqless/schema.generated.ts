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

export interface InputSettings {
  maxX?: Maybe<Scalars["Int"]>;
  maxY?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
}

export const scalarsEnumsHash: ScalarsEnumsHash = {
  Boolean: true,
  ID: true,
  Int: true,
  String: true,
};
export const generatedSchema = {
  query: {
    __typename: { __type: "String!" },
    allUsers: { __type: "[User!]!" },
    getGame: { __type: "Game", __args: { uuid: "String!" } },
    login: {
      __type: "String",
      __args: { email: "String!", password: "String!" },
    },
    profile: { __type: "User" },
  },
  mutation: {
    __typename: { __type: "String!" },
    addPlayer: { __type: "Game", __args: { userId: "Int!", uuid: "String!" } },
    createGame: { __type: "Game", __args: { name: "String" } },
    joinGame: { __type: "Game", __args: { uuid: "String!" } },
    leaveGame: { __type: "Game", __args: { uuid: "String!" } },
    register: {
      __type: "User!",
      __args: { email: "String!", name: "String!", password: "String!" },
    },
    removePlayer: {
      __type: "Game",
      __args: { userId: "Int!", uuid: "String!" },
    },
    startGame: { __type: "Game", __args: { uuid: "String!" } },
    updateGameSettings: {
      __type: "Game",
      __args: { settings: "InputSettings!", uuid: "String!" },
    },
  },
  subscription: {
    __typename: { __type: "String!" },
    newGameCreated: { __type: "String", __args: { uuid: "String" } },
  },
  Cell: {
    __typename: { __type: "String!" },
    cellType: { __type: "String!" },
    controlledBy: { __type: "Int" },
    defBonus: { __type: "Int!" },
    farms: { __type: "Int!" },
    structure: { __type: "String" },
    towers: { __type: "Int!" },
    x: { __type: "Int!" },
    y: { __type: "Int!" },
  },
  Game: {
    __typename: { __type: "String!" },
    grid: { __type: "[Cell]" },
    players: { __type: "[Player]" },
    settings: { __type: "Settings!" },
    uuid: { __type: "String!" },
  },
  InputSettings: {
    maxX: { __type: "Int" },
    maxY: { __type: "Int" },
    name: { __type: "String" },
  },
  Player: {
    __typename: { __type: "String!" },
    analyzer: { __type: "String" },
    color: { __type: "String" },
    hasLost: { __type: "Boolean!" },
    id: { __type: "ID!" },
    isHuman: { __type: "Boolean!" },
    name: { __type: "String!" },
    resources: { __type: "Resources!" },
    score: { __type: "Int!" },
    techTree: { __type: "String" },
    uuid: { __type: "String!" },
  },
  Resources: {
    __typename: { __type: "String!" },
    actions: { __type: "Int!" },
    gold: { __type: "Int!" },
  },
  Settings: {
    __typename: { __type: "String!" },
    maxX: { __type: "Int!" },
    maxY: { __type: "Int!" },
    name: { __type: "String!" },
  },
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
  getGame: (args: { uuid: Scalars["String"] }) => Maybe<Game>;
  login: (args: {
    email: Scalars["String"];
    password: Scalars["String"];
  }) => Maybe<ScalarsEnums["String"]>;
  profile?: Maybe<User>;
}

export interface Mutation {
  __typename: "Mutation" | undefined;
  addPlayer: (args: {
    userId: Scalars["Int"];
    uuid: Scalars["String"];
  }) => Maybe<Game>;
  createGame: (args?: { name?: Maybe<Scalars["String"]> }) => Maybe<Game>;
  joinGame: (args: { uuid: Scalars["String"] }) => Maybe<Game>;
  leaveGame: (args: { uuid: Scalars["String"] }) => Maybe<Game>;
  register: (args: {
    email: Scalars["String"];
    name: Scalars["String"];
    password: Scalars["String"];
  }) => User;
  removePlayer: (args: {
    userId: Scalars["Int"];
    uuid: Scalars["String"];
  }) => Maybe<Game>;
  startGame: (args: { uuid: Scalars["String"] }) => Maybe<Game>;
  updateGameSettings: (args: {
    settings: InputSettings;
    uuid: Scalars["String"];
  }) => Maybe<Game>;
}

export interface Subscription {
  __typename: "Subscription" | undefined;
  newGameCreated: (args?: {
    uuid?: Maybe<Scalars["String"]>;
  }) => Maybe<ScalarsEnums["String"]>;
}

export interface Cell {
  __typename: "Cell" | undefined;
  cellType: ScalarsEnums["String"];
  controlledBy?: Maybe<ScalarsEnums["Int"]>;
  defBonus: ScalarsEnums["Int"];
  farms: ScalarsEnums["Int"];
  structure?: Maybe<ScalarsEnums["String"]>;
  towers: ScalarsEnums["Int"];
  x: ScalarsEnums["Int"];
  y: ScalarsEnums["Int"];
}

export interface Game {
  __typename: "Game" | undefined;
  grid?: Maybe<Array<Maybe<Cell>>>;
  players?: Maybe<Array<Maybe<Player>>>;
  settings: Settings;
  uuid: ScalarsEnums["String"];
}

export interface Player {
  __typename: "Player" | undefined;
  analyzer?: Maybe<ScalarsEnums["String"]>;
  color?: Maybe<ScalarsEnums["String"]>;
  hasLost: ScalarsEnums["Boolean"];
  id: ScalarsEnums["ID"];
  isHuman: ScalarsEnums["Boolean"];
  name: ScalarsEnums["String"];
  resources: Resources;
  score: ScalarsEnums["Int"];
  techTree?: Maybe<ScalarsEnums["String"]>;
  uuid: ScalarsEnums["String"];
}

export interface Resources {
  __typename: "Resources" | undefined;
  actions: ScalarsEnums["Int"];
  gold: ScalarsEnums["Int"];
}

export interface Settings {
  __typename: "Settings" | undefined;
  maxX: ScalarsEnums["Int"];
  maxY: ScalarsEnums["Int"];
  name: ScalarsEnums["String"];
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
  Cell: Cell;
  Game: Game;
  Player: Player;
  Resources: Resources;
  Settings: Settings;
  User: User;
}
export type SchemaObjectTypesNames =
  | "Query"
  | "Mutation"
  | "Subscription"
  | "Cell"
  | "Game"
  | "Player"
  | "Resources"
  | "Settings"
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
