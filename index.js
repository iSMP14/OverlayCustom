let streamerName = document.getElementById("camOverlayText");
let camText = document.getElementById("cam_text");
let button = document.getElementById("button");
let camContainer = document.getElementById("camContainer");
let styles;

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

  let url = new URL(window.location.href);
  url.searchParams.set("newPage", "true");

  let newWindow = window.open(url.toString());
};

if (window.location.search.includes("newPage=true")) {
  document.body.innerHTML = localStorage.getItem("newHTMLDocument");
}

button.addEventListener("click", newPage);
