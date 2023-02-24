export interface Game {
  name: string;
  maxNum: number;
  drawnNum: number;
  color: string;
  keepSomeNums?: boolean;
}

export const GAMES: Game[] = [
  {
    name: "Mega Sena",
    maxNum: 60,
    drawnNum: 6,
    color: "#209869",
  },
  {
    name: "Lotofácil",
    maxNum: 25,
    drawnNum: 15,
    color: "#930089",
    keepSomeNums: true,
  },
  {
    name: "Quina",
    maxNum: 80,
    drawnNum: 5,
    color: "#260085",
  },
  {
    name: "Lotománia",
    maxNum: 100,
    drawnNum: 50,
    color: "#f78100",
  },
  {
    name: "Timemánia",
    maxNum: 80,
    drawnNum: 10,
    color: "#00ff48",
  },
  {
    name: "Dupla Sena",
    maxNum: 50,
    drawnNum: 6,
    color: "#a61324",
  },
];
