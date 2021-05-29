export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Game {
  uuid: string;
  players: Player[];
  settings: Settings;
  grid: Cell[];
}

export interface Player {
  id: number;
  uuid: string;
  name: string;
  resources: Resources;
}

export interface Resources {
  actions: number;
  gold: number;
}

export interface Settings {
  maxX: number;
  maxY: number;
  name: string;
  started?: boolean;
}

export interface Cell {
  x: number;
  y: number;
  cellType: "Plains" | "Mountain" | "Forest";
  defBonus: number;
  structure: string;
}
