import { GameList } from "./GameList";

const selectFilter = () => {
  document.getElementById("page-list").insertAdjacentHTML(
    "afterbegin",
    `
      <div class="btn-group mt-5">
        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Platform: any
        </button>
        <div class="dropdown-menu mt-2">
          <a class="dropdown-item" href="#">Any</a>
          <a class="dropdown-item" href="#">Mobile</a>
          <a class="dropdown-item" href="#">Linux</a>
          <a class="dropdown-item" href="#">Switch</a>
          <a class="dropdown-item" href="#">Playstation</a>
          <a class="dropdown-item" href="#">Xbox</a>
          <a class="dropdown-item" href="#">Windows</a>
        </div>
      </div>
    `
  );
  let items = document.getElementsByClassName("dropdown-item");
  for (let i = 0; i < items.length; i++) {
    items[i].onclick = function () {
      GameList(items[i].textContent);
    };
  }
};

export { selectFilter };
