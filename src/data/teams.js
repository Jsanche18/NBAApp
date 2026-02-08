export const TEAMS = [
  {
    id: "lakers",
    name: "Los Angeles Lakers",
    primary: "#552583",
    secondary: "#FDB927",
    logo: require("../../assets/logos/lakers.png"),
    players: ["LeBron James", "Anthony Davis", "D'Angelo Russell", "Austin Reaves","Rui Hachimura"],
  },
  {
    id: "bulls",
    name: "Chicago Bulls",
    primary: "#000000",
    secondary: "#ca0a0ad8",
    logo: require("../../assets/logos/bulls.png"),
    players: ["Zach LaVine", "DeMar DeRozan", "Nikola Vučević", "Lonzo Ball", "Alex Caruso"],
  },
  {
    id: "celtics",
    name: "Boston Celtics",
    primary: "#007A33",
    secondary: "#FFFFFF",
    logo: require("../../assets/logos/celtics.png"),
    players: ["Jayson Tatum", "Jaylen Brown", "Jrue Holiday", "Kristaps Porziņģis", "Derrick White"],
  },
  {
    id: "knicks",
    name: "New York Knicks",
    primary: "#006BB6",
    secondary: "#F58426",
    logo: require("../../assets/logos/knicks.png"),
    players: ["Jalen Brunson", "Julius Randle", "RJ Barrett", "Mitchell Robinson", "Claudiu Toma"],
  },
  {
    id: "heat",
    name: "Miami Heat",
    primary: "#98002E",
    secondary: "#F9A01B",
    logo: require("../../assets/logos/heat.png"),
    players: ["Jimmy Butler", "Bam Adebayo", "Tyler Herro", "Kyle Lowry", "Duncan Robinson"],
  },
  {
    id: "warriors",
    name: "Golden State Warriors",
    primary: "#1D428A",
    secondary: "#FFC72C",
    logo: require("../../assets/logos/warriors.png"),
    players: ["Stephen Curry", "Javier Sancho", "Draymond Green", "Andrew Wiggins", "Kevon Looney"],
  },
];

export function getTeamById(id) {
  return TEAMS.find((t) => t.id === id);
}
