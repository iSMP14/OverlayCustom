class URLParamsComponent extends HTMLElement {
  constructor() {
    super();

    // Definir el shadow DOM para encapsular el estilo y el comportamiento
    this.attachShadow({ mode: "open" });

    // Obtener parámetros de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const overlayParam = queryParams.get("Overlay");

    // Crear elementos en el shadow DOM
    const style = document.createElement("style");
    style.textContent = `
        html,
        body {
        height: 100vh;
        }

        .cam_overlayContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        }

        #box {
        display: flex;
        align-items: end;
        justify-content: center;
        width: 600px;
        height: 400px;
        color: white;
        font-family: "Raleway";
        font-size: 2.5rem;
        }
        .gradient-border {
        --borderWidth: 15px;
        background: #13b449;
        position: relative;
        border-radius: var(--borderWidth);
        }
        .gradient-border:after {
        content: "";
        position: absolute;
        top: calc(-1 * var(--borderWidth));
        left: calc(-1 * var(--borderWidth));
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: linear-gradient(
            60deg,
            #f79533,
            #f37055,
            #ef4e7b,
            #a166ab,
            #5073b8,
            #1098ad,
            #07b39b,
            #6fba82
        );
        border-radius: calc(2 * var(--borderWidth));
        z-index: -1;
        animation: animatedgradient 3s ease alternate infinite;
        background-size: 300% 300%;
        }

        @keyframes animatedgradient {
        0% {
            background-position: 0% 50%;
        }

        25% {
            background-position: 50% 50%;
        }

        50% {
            background-position: 100% 50%;
        }

        75% {
            background-position: 50% 50%;
        }

        100% {
            background-position: 0% 50%;
        }
        }

        .p_cam {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(
            60deg,
            #f79533,
            #f37055,
            #ef4e7b,
            #a166ab,
            #5073b8,
            #1098ad,
            #07b39b,
            #6fba82
        );
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: animatedgradient 3s ease alternate infinite;
        background-size: 300% 300%;
        font-family: sans-serif;
        margin: 1rem;
        }

      `;

    const camText = document.createElement("div");
    camText.id = "cam_text";
    camText.textContent = overlayParam || ""; // Mostrar el valor del parámetro en el componente

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(camText);
  }

  // Métodos para manejar actualizaciones de parámetros, si es necesario
  connectedCallback() {
    // Event listeners o lógica adicional
  }

  disconnectedCallback() {
    // Limpiar recursos si es necesario
  }

  // Otros métodos del ciclo de vida del componente
}

customElements.define("url-params-component", URLParamsComponent);

// Resto de tu código JavaScript

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
  let params = getURLParams();
  if (params["Overlay"]) {
    let cam_text = document.getElementById("cam_text");
    cam_text.textContent = params["Overlay"];
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

  let url = new URL("./overlay/index.html", HOST_URL);
  url.searchParams.set("Overlay", camTextContent);

  localStorage.setItem("newURL", url.toString());

  let overlayUrl = document.querySelector(".overlayUrl");
  overlayUrl.value = url.toString();
};

button.addEventListener("click", newPage);
