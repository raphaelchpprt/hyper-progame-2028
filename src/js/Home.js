import { showMore } from "./showMore";
import { displayPlatforms } from "./platforms";
import { selectFilter } from "./selectFilter";
import { Overlay } from "./overlay";
import { clickFilter } from "./clickFilter";

const Home = () => {
  const preparePage = () => {
    document.querySelector("footer").innerHTML = "";
    let articles = "";
    document.getElementById("search-input").value = "";
    const fetchList = (url) => {
      var d = new Date();
      let dateUrl =
        url +
        String(d.getFullYear()) +
        "-" +
        String(("0" + (d.getMonth() + 1)).slice(-2)) +
        "-" +
        String(("0" + d.getDate()).slice(-2)) +
        "&ordering=-added&page_size=27";
      fetch(`${dateUrl}`)
        .then((response) => response.json())
        .then((response) => {
          let games = response.results;
          let gameId = 0;
          selectFilter();
          setTimeout(function () {
            document.querySelector(".trans--grow").classList.add("grow");
          }, 275);
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
              `<div class="col text-center mb-5 mt-0"><button class="btn btn-light font-weight-bold pr-4 pl-4" id="show-more">Voir plus</button></div>`
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
          clickFilter();
          games.forEach((article) => {
            if (article.platforms.length > 0) {
              displayPlatforms(article, gameId);
              gameId++;
            }
            Overlay(article.id);
          });
          document.querySelector("footer").innerHTML = `
          <h1>
            <a href="https://github.com/raphaelchpprt/hyper-progame-2028" target="_blank">
              <i class="fab fa-github text-white" href="https://github.com/raphaelchpprt/hyper-progame-2028" target="_blank"></i>
            </a>
          </h1>
          `;
        });
    };

    fetchList("https://api.rawg.io/api/games?key=e7b570bb89e94b06ad126665222223a4&dates=2021-01-01,");
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list" id="page-list">
        <div class="row"><div class="mt-5 ml-5"><div class="fa-3x"><i class="fas fa-spinner fa-pulse text-white"></i></div></div></div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { Home };
