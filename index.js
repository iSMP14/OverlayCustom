class LinkGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.styles = "";
    this.hostUrl = "https://ismp14.github.io/OverlayCustom/";
    this.render();
    this.attachEvents();
  }

  getURLParams() {
    const url = new URL(document.location.href.replace("#", "?"));
    const params = {};
    url.searchParams.forEach((value, name) => (params[name] = value));
    return params;
  }

  renderStyles() {
    fetch("./src/skinstyle.css")
      .then((response) => response.text())
      .then((data) => {
        this.styles = `<style>${data}</style>`;
      });
  }

  render() {
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        /* Estilos para el componente */
      </style>
      <div>
        <input id="camOverlayText" type="text">
        <button id="button">Generar Enlace</button>
        <input class="overlayUrl" type="text" readonly>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderStyles();
  }

  attachEvents() {
    const button = this.shadowRoot.getElementById("button");
    const camOverlayText = this.shadowRoot.getElementById("camOverlayText");
    const overlayUrl = this.shadowRoot.querySelector(".overlayUrl");

    button.addEventListener("click", () => {
      const camTextContent = camOverlayText.value.toString();
      const url = new URL("./overlay/index.html", this.hostUrl);
      url.searchParams.set("Overlay", camTextContent);

      overlayUrl.value = url.toString();
      localStorage.setItem("newURL", url.toString());
    });

    window.onload = () => {
      const params = this.getURLParams();
      if (params["Overlay"]) {
        camOverlayText.value = params["Overlay"];
      }
    };

    camOverlayText.addEventListener("input", () => {
      const streamerNameValue = camOverlayText.value.toString();
      localStorage.setItem("camText", streamerNameValue);
    });
  }
}

customElements.define("link-generator", LinkGenerator);
