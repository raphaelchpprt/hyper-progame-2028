import { showMore } from "./showMore";
import { displayPlatforms } from "./platforms";
import { selectFilter } from "./selectFilter";
import { Overlay } from "./overlay";

const GameList = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      selectFilter();
      let finalURL = url;
      if (
        argument &&
        argument !== "Mobile" &&
        argument !== "Playstation" &&
        argument !== "Windows" &&
        argument !== "Linux" &&
        argument !== "Switch" &&
        argument !== "Xbox" &&
        argument !== "Any"
      ) {
        finalURL = url + "?search=" + argument;
      } //else finalURL = url + "?search=" + window.location.hash.substring(10);
      if (argument === "Windows") {
        finalURL = finalURL + "?platforms=4";
      } else if (argument === "Playstation") {
        finalURL = finalURL + "?platforms=16,18";
      } else if (argument === "Linux") {
        finalURL = finalURL + "?platforms=6";
      } else if (argument === "Switch") {
        finalURL = finalURL + "?platforms=7";
      } else if (argument === "Mobile") {
        finalURL = finalURL + "?platforms=3,21";
      } else if (argument === "Xbox") {
        finalURL = finalURL + "?platforms=1,14";
      } else {
        finalURL = finalURL;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let games = response.results;
          let gameId = 0;
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
