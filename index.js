let streamerName = document.getElementById("camOverlayText");
let camText = document.getElementById("cam_text");
let button = document.getElementById("button");
let styles = "";
const HOST_URL = "https://ismp14.github.io/OverlayCustom/";

function getURLParams() {
  const url = new URL(document.location.href.replace("#", "?"));
  const params = {};
  url.searchParams.forEach((value, name) => (params[name] = value));
  return params;
}

let streamerNameInput = () => {
  let streamerNameValue = streamerName.value.toString();
  console.log(streamerNameValue);
  camText.textContent = streamerNameValue;
  localStorage.setItem("camText", streamerNameValue);
};

streamerName.addEventListener("input", streamerNameInput);

fetch("https://ismp14.github.io/OverlayCustom/src/skinstyle.css") // Fetching CSS from hosted location
  .then((response) => response.text())
  .then((data) => {
    styles = `<style>${data}</style>`;
  });

window.onload = function () {
  let params = getURLParams();
  if (params["Overlay"]) {
    let cam_text = document.getElementById("cam_text");
    cam_text.textContent = params["Overlay"];
  }
};

let generateURL = () => {
  let camTextContent = localStorage.getItem("camText");
  let url = new URL("./overlay/index.html", HOST_URL);
  url.searchParams.set("Overlay", camTextContent);

  let overlayUrl = document.querySelector(".overlayUrl");
  overlayUrl.value = url.toString();

  localStorage.setItem("newURL", url.toString());
};

button.addEventListener("click", generateURL);
