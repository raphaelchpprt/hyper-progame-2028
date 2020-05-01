const clickFilter = () => {
  let items = document.getElementsByClassName("dropdown-item");
  for (let i = 0; i < items.length; i++) {
    items[i].onclick = function () {
      let cards = document.getElementsByClassName("card");
      if (items[i].id === "any") {
        for (let j = 0; j < cards.length; j++) {
          cards[j].parentNode.style.display = "block";
          cards[j].style.display = "block";
        }
      } else {
        for (let j = 0; j < cards.length; j++)
          if (!cards[j].classList.contains(items[i].id))
            cards[j].parentNode.style.display = "none";
          else {
            cards[j].style.display = "block";
            cards[j].parentNode.style.display = "block";
          }
      }
      document.getElementById("show-more").style.display = "none";
      document.getElementById(
        "dropdown"
      ).innerHTML = `Platform: <strong>${items[i].id}</strong>`;
    };
  }
};

export { clickFilter };
