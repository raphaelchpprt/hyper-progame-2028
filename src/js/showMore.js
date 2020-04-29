const showMore = (count, cardsShown, cards, games) => {
  if (count === 0) {
    for (let i = 9; i < 18; i++)
      if (cards[i]) {
        cards[i].style.display = "block";
        cardsShown++;
      }
    if (cardsShown === games.length) {
      document.getElementById("show-more").remove();
    }
  } else {
    cardsShown = 18;
    for (let i = 18; i < 27; i++)
      if (cards[i]) {
        cards[i].style.display = "block";
        cardsShown++;
      }
    if (cardsShown === games.length) {
      document.getElementById("show-more").remove();
    }
  }
};

export { showMore };
