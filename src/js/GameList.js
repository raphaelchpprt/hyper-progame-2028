import { showMore } from "./showMore";
import { displayPlatforms } from "./platforms";
import { selectFilter } from "./selectFilter";
import { Overlay } from "./overlay";

const GameList = (argument) => {
  window.scroll(0, 30);
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      selectFilter();
      let finalURL = url;
      document.getElementById("welcome-container").remove();
      if (argument.substring(0, 8) == "?genres=") {
        finalURL = finalURL + argument;
      } else if (argument.substring(0, 11) == "?platforms=") {
        finalURL = finalURL + argument;
      } else if (argument.substring(0, 12) == "?developers=") {
        finalURL = finalURL + argument;
      } else if (argument.substring(0, 6) == "?tags=") {
        finalURL = finalURL + argument;
      } else if (argument.substring(0, 12) == "?publishers=") {
        finalURL = finalURL + argument;
      } else {
        finalURL = url + "?search=" + argument;
      }
      finalURL = finalURL + "&page_size=27";
      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let games = response.results;
          let gameId = 0;
          if (games.length === 0) {
            articles += `<p class="mt-5 ml-md-5">Navré, aucun résultat ne correspond à votre recherche.</p>`;
          }
          games.forEach((article) => {
            articles += `
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
          });
          document.querySelector(".page-list .row").innerHTML = articles;
          let cards = document.getElementsByClassName("cardGame");
          for (let i = 9; i < cards.length; i++)
            cards[i].style.display = "none";
          if (document.getElementById("show-more"))
            document.getElementById("show-more").remove();
          document
            .querySelector(".page-list")
            .insertAdjacentHTML(
              "beforeend",
              `<div class="col text-center mb-5"><button class="btn btn-primary btn-light font-weight-bold pr-4 pl-4" id="show-more">Voir plus</button></div>`
            );
          let count = 0;
          let cardsShown = 9;
          if (games.length <= cardsShown) {
            document.getElementById("show-more").remove();
          }
          if (document.getElementById("show-more")) {
            document.getElementById("show-more").onclick = function () {
              showMore(count, cardsShown, cards, games);
              if (cardsShown === games.length) {
                document.getElementById("show-more").display = "none";
              }
              count++;
            };
          }

          games.forEach((article) => {
            if (article.platforms) {
              displayPlatforms(article, gameId);
              gameId++;
            }
            Overlay(article.id);
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
