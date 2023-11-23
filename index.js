let streamerName = document.getElementById("camOverlayText");
let camText = document.getElementById("cam_text");
let button = document.getElementById("button");
let camContainer = document.getElementById("camContainer");
let styles;

let streamerNameInput = () => {
  let streamerNameValue = streamerName.value.toString();
  console.log(streamerNameValue);
  camText.textContent = streamerNameValue;
};

streamerName.addEventListener("input", streamerNameInput);

fetch("./src/skinstyle.css")
  .then((response) => response.text())
  .then((data) => {
    styles = `<style>${data}</style>`;
  });

let newPage = () => {
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
  let newWindow = window.open(
    "https://ismp14.github.io/OverlayCustom/src/skin.html"
  );
  newWindow.document.write(newHTMLDocument);
};

button.addEventListener("click", newPage);
