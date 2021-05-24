export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Game {
  uuid: string;
  players: Player[];
  settings: {
    maxX: number;
    maxY: number;
    name: string;
    started: boolean;
  };
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

export interface Cell {
  x: number;
  y: number;
  cellType: string;
  defBonus: number;
  structure: string;
}
