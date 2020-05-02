const Screenshots = (id) => {
  let url = `https://api.rawg.io/api/games/${id}/screenshots`;
  fetch(`${url}`)
    .then((response) => response.json())
    .then((response) => {
      let screens = response.results;
      screens.forEach((screen) => {
        if (screen.is_deleted === false)
          document.querySelector(".screenshots").innerHTML += `
            <div class="col-md-4 col-sm-6 mt-4"><img src="${screen.image}" class="img-fluid mb-5 rounded"></img></div>
            `;
      });
    });
};

export { Screenshots };
