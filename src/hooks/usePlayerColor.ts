export default (color: string): string => {
  switch (color) {
    case "red":
      return "bg-player-red";
    case "blue":
      return "bg-player-blue";
    case "green":
      return "bg-player-green";
    case "orange":
      return "bg-player-orange";
    case "teal":
      return "bg-player-teal";
    case "yellow":
      return "bg-player-yellow";
    case "purple":
      return "bg-player-purple";
    case "gray":
      return "bg-player-gray";
    default:
      return "";
  }
};
