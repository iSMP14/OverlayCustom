let streamerName = document.getElementById("camOverlayText");
let camText = document.getElementById("cam_text");
let button = document.getElementById("button");
let camContainer = document.getElementById("camContainer");
let styles;
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

fetch("./src/skinstyle.css")
  .then((response) => response.text())
  .then((data) => {
    styles = `<style>${data}</style>`;
  });

window.onload = function () {
  if (getURLParams().textOverlay === localStorage.getItem("camText")) {
    document.body.innerHTML = localStorage.getItem("newHTMLDocument");
  }
};

let newPage = () => {
  let camTextContent = localStorage.getItem("camText");
  let newHTMLDocument = `
            <!DOCTYPE html>
            <html>
            <head>
              ${styles}
            </head>
            <body>
              ${camContainer.outerHTML}
            </body>
            </html>
          `;

  localStorage.setItem("newHTMLDocument", newHTMLDocument);

  let url = new URL(HOST_URL);
  url.searchParams.set("textOverlay", camTextContent);

  localStorage.setItem("newURL", url.toString());

  let newWindow = window.open(url.toString());

  let urlFromLocalStorage = localStorage.getItem("newURL");
  console.log(urlFromLocalStorage);
};

button.addEventListener("click", newPage);

button.addEventListener("click", newPage);
