class URLParamsComponent extends HTMLElement {
  constructor() {
    super();

    // Definir el shadow DOM para encapsular el estilo y el comportamiento
    this.attachShadow({ mode: "open" });

    // Crear elementos en el shadow DOM
    this.shadowRoot.innerHTML = `
    <style>
    html, body { height: 100vh; } .cam_overlayContainer { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; } #box { display: flex; align-items: end; justify-content: center; width: 600px; height: 400px; color: white; font-family: "Raleway"; font-size: 2.5rem; } .gradient-border { --borderWidth: 15px; background: #13b449; position: relative; border-radius: var(--borderWidth); } .gradient-border:after { content: ""; position: absolute; top: calc(-1 * var(--borderWidth)); left: calc(-1 * var(--borderWidth)); height: calc(100% + var(--borderWidth) * 2); width: calc(100% + var(--borderWidth) * 2); background: linear-gradient( 60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82 ); border-radius: calc(2 * var(--borderWidth)); z-index: -1; animation: animatedgradient 3s ease alternate infinite; background-size: 300% 300%; } @keyframes animatedgradient { 0% { background-position: 0% 50%; } 25% { background-position: 50% 50%; } 50% { background-position: 100% 50%; } 75% { background-position: 50% 50%; } 100% { background-position: 0% 50%; } } .p_cam { font-size: 2rem; font-weight: 700; background: linear-gradient( 60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82 ); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: animatedgradient 3s ease alternate infinite; background-size: 300% 300%; font-family: sans-serif; margin: 1rem; }

    </style>
    
    <div class="cam_overlayContainer" id="camContainer">
      <div class="gradient-border" id="box">
        <p class="p_cam" id="cam_text">Example</p>
      </div>
    </div>
  `;

    // Obtener parámetros de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const overlayParam = queryParams.get("Overlay");

    // Mostrar el valor del parámetro en el componente
    const camText = this.shadowRoot.getElementById("cam_text");
    camText.textContent = overlayParam || "";

    this.HOST_URL = "https://ismp14.github.io/OverlayCustom/";
  }

  connectedCallback() {
    // Obtener elementos de la página principal
    this.streamerName = document.getElementById("camOverlayText");
    this.button = document.getElementById("button");
    this.camContainer = document.getElementById("camContainer");

    // Asegúrate de que streamerName es un elemento de entrada
    if (this.streamerName && this.streamerName.tagName === "INPUT") {
      // Agrega un manejador de eventos para actualizar el valor de streamerName
      this.streamerName.addEventListener("input", () => {
        let streamerNameValue = this.streamerName.value;
        let camText = document.getElementById("cam_text");
        if (camText) {
          camText.textContent = streamerNameValue;
        }
      });
    }

    // Event listener para el botón
    this.button.addEventListener("click", () => {
      let camTextContent = document.getElementById("cam_text").textContent;

      let newHTMLDocument = `
            <!DOCTYPE html>
            <html>
            <head>
              ${this.styles}
            </head>
            <body>
              ${this.camContainer.outerHTML}
            </body>
            </html>
          `;

      localStorage.setItem("newHTMLDocument", newHTMLDocument);

      let url = new URL("./overlay/index.html", this.HOST_URL);
      url.searchParams.set("Overlay", camTextContent);

      localStorage.setItem("newURL", url.toString());

      let overlayUrl = document.querySelector(".overlayUrl");
      if (overlayUrl) {
        overlayUrl.value = url.toString();
      }
    });
  }

  disconnectedCallback() {
    // Limpiar recursos si es necesario
  }
}

customElements.define("url-params-component", URLParamsComponent);
