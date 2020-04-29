import { showMore } from "./showMore";
import { displayPlatforms } from "./platforms";
import { selectFilter } from "./selectFilter";

const GameList = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let games = response.results;
          let gameId = 0;
          selectFilter();
          games.forEach((article) => {
            articles += `
                <div class="col-md-4 col-sm-6 mb-2">
                  <div class="cardGame card mr-md-4 mt-5">
                  <a href = "#gamedetail/${article.id}" ><div class="container-hover">
                      <img class="card-img-top" src=${article.background_image} />
                      <div class="overlay"><br>Release date: <strong>${article.released}</strong>
                      <br><br>Genres: <strong>${article.genres[0].name}</strong>
                      <br><br>Rating: <strong>${article.rating}</strong> (${article.ratings_count} ratings)
                      </div>
                    </div></a>
                    <div class="card-body">
                      <p class="platforms mb-2"></p>
                      <h1><a href = "#gamedetail/${article.id}" class="game-name">${article.name}</a></h1>
                    </div>
                  </div>
                </div>
              `;
          });
          document.querySelector(".page-list .row").innerHTML = articles;
          let cards = document.getElementsByClassName("cardGame");
          for (let i = 9; i < cards.length; i++)
            cards[i].style.display = "none";
          document
            .querySelector(".page-list")
            .insertAdjacentHTML(
              "beforeend",
              `<div class="col text-center mb-5"><button class="btn btn-primary btn-light font-weight-bold pr-4 pl-4" id="show-more">Voir plus</button></div>`
            );
          let count = 0;
          let cardsShown = 9;
          if (cardsShown >= games.length) {
            document.getElementById("show-more").display = "none";
          }
          document.getElementById("show-more").onclick = function () {
            showMore(count, cardsShown, cards, games);
            if (cardsShown === games.length) {
              document.getElementById("show-more").display = "none";
            }
            count++;
          };
          games.forEach((article) => {
            displayPlatforms(article, gameId);
            gameId++;
          });
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list" id="page-list">
        <div class="row"><div class="mt-5 ml-5">...loading</div></div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { GameList };
