export interface Game {
  uuid: string;
  players: {
    id: number;
    name: string;
  }[];
  settings: {
    maxX: number;
    maxY: number;
    name: string;
  };
  grid: {
    x: number;
    y: number;
    cellType: string;
    defBonus: number;
    structure: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
}
