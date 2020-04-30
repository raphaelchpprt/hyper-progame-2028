const Youtube = (id) => {
  let url = `https://api.rawg.io/api/games/${id}/youtube`;
  fetch(`${url}`)
    .then((response) => response.json())
    .then((response) => {
      let videos = response.results;
      videos.forEach((video) => {
        document.querySelector(".youtube").innerHTML += `
        <div class="col-md-4 col-sm-6 mt-3"><iframe class="mr-5 rounded w-100 youtube-videos" src="https://www.youtube.com/embed/${video.external_id}"></iframe></div>`;
      });
      let iframes = document.getElementsByTagName("iframe");
      for (let i = 3; i < iframes.length; i++)
        if (iframes[i]) iframes[i].style.display = "none";
    });
};

export { Youtube };
