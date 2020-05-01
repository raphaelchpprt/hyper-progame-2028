import ps4 from "../images/ps4.svg";
import xbox from "../images/xbox.svg";
import linux from "../images/linux.svg";
import mobile from "../images/mobile.svg";
import windows from "../images/windows.svg";
import Switch from "../images/switch.svg";

const displayPlatforms = (game, gameId) => {
  let mobileCount = 0;
  let playstationCount = 0;
  let xboxCount = 0;
  let selector = document.getElementsByClassName("platforms")[gameId];
  let cards = document.getElementsByClassName("card");
  game.platforms.forEach((platform) => {
    if (platform.platform.slug == "pc") {
      selector.innerHTML += `<img class="mr-2 img-platform" src="dist/${windows}" />`;
      cards[gameId].classList.add("pc");
    }
    if (
      platform.platform.slug == "xbox" ||
      platform.platform.slug == "xbox-one" ||
      platform.platform.slug == "xbox360"
    ) {
      if (xboxCount === 0) {
        selector.innerHTML += `<img class="mr-2 img-platform" src="dist/${xbox}" />`;
        cards[gameId].classList.add("xbox");
        xboxCount++;
      }
    }
    if (
      platform.platform.slug == "playstation4" ||
      platform.platform.slug == "playstation3"
    ) {
      if (playstationCount === 0) {
        selector.innerHTML += `<img class="mr-2 img-platform" src="dist/${ps4}" />`;
        cards[gameId].classList.add("playstation");
        playstationCount++;
      }
    }
    if (platform.platform.slug == "linux") {
      selector.innerHTML += `<img class="mr-2 img-platform" src="dist/${linux}" />`;
      cards[gameId].classList.add("linux");
    }
    if (
      (platform.platform.slug == "android" && mobileCount === 0) ||
      (platform.platform.slug == "ios" && mobileCount === 0)
    ) {
      selector.innerHTML += `<img class="mr-2 img-platform" src="dist/${mobile}" />`;
      cards[gameId].classList.add("mobile");
      mobileCount++;
    }
    if (platform.platform.slug == "nintendo-switch") {
      selector.innerHTML += `<img class="mr-2 img-platform" src="dist/${Switch}" />`;
      cards[gameId].classList.add("switch");
    }
  });
};

export { displayPlatforms };
