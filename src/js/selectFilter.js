const selectFilter = () => {
  console.log("yo");
  document.getElementById("page-list").insertAdjacentHTML(
    "afterbegin",
    `
      <div class="btn-group mt-5">
        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Platform: any
        </button>
        <div class="dropdown-menu mt-2">
          <a class="dropdown-item" href="#">Android</a>
          <a class="dropdown-item" href="#">iOs</a>
          <a class="dropdown-item" href="#">Linux</a>
          <a class="dropdown-item" href="#">Nintendo Switch</a>
          <a class="dropdown-item" href="#">Playstation 3</a>
          <a class="dropdown-item" href="#">Playstation 4</a>
          <a class="dropdown-item" href="#">Xbox</a>
          <a class="dropdown-item" href="#">Windows</a>
        </div>
      </div>
    `
  );
};

export { selectFilter };
