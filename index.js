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

  let blob = new Blob([newHTMLDocument], { type: "text/html" });
  let url = URL.createObjectURL(blob);

  let newWindow = window.open(url);
};

button.addEventListener("click", newPage);
