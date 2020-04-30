import { displayPlatforms } from "./platforms";
import { Overlay } from "./overlay";

const Suggested = (id) => {
  let url = `https://api.rawg.io/api/games/${id}/suggested`;
  fetch(`${url}`)
    .then((response) => response.json())
    .then((response) => {
      let games = response.results;
      let gameId = 0;
      games.forEach((article) => {
        document.querySelector(".suggestions").innerHTML += `
        <div class="col-md-4 col-sm-6 mb-2">
          <div class="cardGame card mr-md-4 mt-5">
          <a href = "#game/${article.slug}" ><div class="container-hover">
              <img class="card-img-top" src=${article.background_image} />
              <div class="overlay" id="overlay-${article.id}">
              </div>
            </div></a>
            <div class="card-body">
              <p class="platforms mb-2"></p>
              <h1><a href = "#game/${article.slug}" class="game-name">${article.name}</a></h1>
            </div>
          </div>
        </div>
      `;
        if (article.platforms.length > 0) {
          displayPlatforms(article, gameId);
          gameId++;
        }
        Overlay(article.id);
      });
      let cards = document.getElementsByClassName("card");
      for (let i = 3; i < cards.length; i++)
        if (cards[i]) cards[i].style.display = "none";
    });
};

export { Suggested };
