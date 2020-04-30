import { Home } from "./Home";
import { GameList } from "./GameList";
import { GameDetail } from "./GameDetail";

const routes = {
  "": Home,
  gamelist: GameList,
  game: GameDetail,
};

export { routes };
