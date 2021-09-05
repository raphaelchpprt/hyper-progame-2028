console.log("test");
import "bootstrap";
import "../sass/styles.scss";
import moment from "moment";
import { routes } from "./routes";

let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);

  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());
document.getElementById("search-form").onsubmit = (e) => {
  e.preventDefault();
  if (document.getElementById("search-input").value !== "")
    window.location.hash =
      "#gamelist/" +
      document.getElementById("search-input").value.replace(/\s+/g, "+");
  else window.location.hash = "#";
};

//test
