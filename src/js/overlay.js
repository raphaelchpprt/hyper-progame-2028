import { GameList } from "./GameList";

const Overlay = (argument) => {
  fetch(`https://api.rawg.io/api/games/${argument.toString()}`)
    .then((response) => response.json())
    .then((response) => {
      let game = response;
      document.getElementById("overlay-" + game.id).innerHTML = `
          <div class="mt-md-3" >Release date: <strong>${game.released}</strong></div>
          <div class="mt-2" >Developer: <strong>${game.developers[0].name}</strong></div>
          <div class="mt-2" id="genres-${game.id}">Genres: </div>
          <div class="mt-2" >Rating: <strong>${game.rating}</strong> (${game.ratings_count} ratings)</div>
      `;
      game.genres.forEach(
        (genre) =>
          (document.getElementById(`genres-${game.id}`).innerHTML += `
          <strong>${genre.name}</strong>
        `)
      );
    });
};

export { Overlay };
