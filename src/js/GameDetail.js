import { Suggested } from "./suggested";
import { Screenshots } from "./screenshots";
import { Youtube } from "./youtube";

const GameDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    let articleContent = "";

    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {
            name,
            released,
            description,
            background_image,
            developers,
            tags,
            genres,
            publishers,
            platforms,
            website,
            rating,
            ratings,
            clip,
            background_image_additional,
            stores,
            id,
          } = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("img.main-img").src = background_image;
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.rating span.ratings").innerHTML =
            rating + " / 5";
          let ratingsCount = 0;
          for (let i = 0; i < ratings.length; i++) {
            ratingsCount = ratingsCount + ratings[i].count;
          }
          articleDOM.querySelector(
            "p.rating span.font-weight-normal"
          ).innerHTML += ` (${ratingsCount} ratings)`;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
          for (let i = 0; i < developers.length; i++)
            articleDOM.querySelector(
              "p.developers span"
            ).innerHTML += `<a class="link-name ml-2" href="#gamelist/?developers=${developers[i].id}"> ${developers[i].name}</a> `;
          articleDOM.querySelector("p.description").innerHTML += description;
          for (let i = 0; i < tags.length; i++)
            articleDOM.querySelector(
              "p.tags span"
            ).innerHTML += `<a class="link-name ml-2" href="#gamelist/?tags=${tags[i].id}"> ${tags[i].name}</a> `;
          for (let i = 0; i < genres.length; i++)
            articleDOM.querySelector(
              "p.genres span"
            ).innerHTML += `<a class="link-name ml-2" href="#gamelist/?genres=${genres[i].id}"> ${genres[i].name}</a> `;
          for (let i = 0; i < publishers.length; i++)
            articleDOM.querySelector(
              "p.publishers span"
            ).innerHTML += `<a class="link-name ml-2" href="#gamelist/?publishers=${publishers[i].id}"> ${publishers[i].name}</a> `;
          for (let i = 0; i < platforms.length; i++)
            articleDOM.querySelector(
              "p.platforms-details span"
            ).innerHTML += `<a class="link-name ml-2" href="#gamelist/?platforms=${platforms[i].platform.id}"> ${platforms[i].platform.name}</a> `;
          if (website !== "") {
            articleDOM.querySelector("p.link a").href = website;
            articleDOM.querySelector("p.link a").innerHTML = website;
          } else articleDOM.querySelector("p.link").innerHTML = "None";
          if (clip != null) {
            articleDOM.querySelector("video").src = clip.clip;
            articleDOM.querySelector("video").type = "video/mp4";
          } else {
            articleDOM.querySelector(
              "video"
            ).innerHTML = `<p class="text-muted">None</p>`;
          }

          if (stores.length > 0) {
            for (let i = 0; i < stores.length; i++) {
              articleDOM.querySelector(".link-stores").innerHTML = `
              <a class="link-name" href="${stores[i].url}">${stores[i].store.name}</a>
              `;
            }
          } else {
            articleDOM.querySelector(".link-stores").innerHTML = `none`;
          }
          Suggested(id);
          Screenshots(id);
          Youtube(id);
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <img class="main-img img-fluid mt-5 rounded"/>
          <h1 class="title display-1 mt-5"></h1>
          <p class="font-weight-bold rating"><span class="ratings badge badge-danger p-2"></span><span class="font-weight-normal"></span></p>
          <p class="font-weight-bold release-date mt-4">Release date: <span class="font-weight-normal"></span></p>
          <h1 class="mt-5 mb-3 text-danger">Description</h1>
          <p class="description mb-5 mt-4"></p>
          <h1 class="mt-5 mb-3 text-danger">Characteristics</h1>
          <p class="font-weight-bold developers">Developers: <span class="font-weight-normal"></span> </p>
          <p class="font-weight-bold tags">Tags: <span class="font-weight-normal"></span></p>
          <p class="font-weight-bold genres">Genres: <span class="font-weight-normal"></span></p>
          <p class="font-weight-bold publishers">Publishers: <span class="font-weight-normal"></span></p>
          <p class="font-weight-bold platforms-details">Platforms: <span class="font-weight-normal"></span></p>
          <h1 class="mt-5 text-danger">Website</h1>
          <p class="link mt-4"><a class="link-name"></a></p>
          <h1 class="mt-5 mb-3 text-danger">Trailer</h1>
          <video controls width="100%"></video>
          <h1 class="mt-5 mb-3 text-danger">Previews</h1>
          <div class="row screenshots"></div>
          <h1 class="mt-5 mb-3 text-danger">Buy</h1>
          <p class="link-stores mt-4 font-weight-bold"></p>
          <h1 class="mt-5 mb-3 text-danger">Similar Games</h1>
          <div class="row suggestions"></div>
          <h1 class="mt-5 mb-3 text-danger">Youtube</h1>
          <div class="youtube row"></div>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
};

export { GameDetail };
