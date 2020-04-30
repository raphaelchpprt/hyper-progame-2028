import { GameList } from "./GameList";

const selectFilter = () => {
  document.getElementById("page-list").insertAdjacentHTML(
    "afterbegin",
    ` 
      <div id="welcome-container"> 
        <p class="display-3 mt-5 font-weight-bold">Welcome,</p>
        <p class="mt-3 text-justify">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
        the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
        brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies,
        groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
        with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure.</p><hr class="trans--grow">
      </div>
      <div class="btn-group mt-5">
        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Platform: any
        </button>
        <div class="dropdown-menu mt-2">
          <a class="dropdown-item" href="#gamelist/?platforms=">Any</a>
          <a class="dropdown-item" href="#gamelist/?platforms=3,21">Mobile</a>
          <a class="dropdown-item" href="#gamelist/?platforms=6">Linux</a>
          <a class="dropdown-item" href="#gamelist/?platforms=7">Switch</a>
          <a class="dropdown-item" href="#gamelist/?platforms=16,18">Playstation</a>
          <a class="dropdown-item" href="#gamelist/?platforms=1,14">Xbox</a>
          <a class="dropdown-item" href="#gamelist/?platforms=4">Windows</a>
        </div>
      </div>
    `
  );
  let items = document.getElementsByClassName("dropdown-item");
  /* for (let i = 1; i < items.length; i++) {
    items[i].onclick = function () {
      GameList(items[i].textContent);
    };
  } */
};

export { selectFilter };
