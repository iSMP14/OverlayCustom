class LinkGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.styles = "";
    this.hostUrl = "https://ismp14.github.io/OverlayCustom/";
    this.render();
    this.attachEvents();
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
        <p class="input_title">Enter the Streamer Name :</p>
        <div class="config_1">
          <input
            id="nameStreamer"
            class="nameStreamer"
            type="text"
            name="nameStreamer"
            placeholder="Streamer Name" />
        </div>
        <p class="input_title">Enter the Cam Text :</p>
        <div class="config_2">
          <input
            class="camOverlayText"
            id="camOverlayText"
            type="text"
            name="camOverlayText"
            placeholder="Cam Overlay Text" />
        </div>
        <p class="input_title">This is your Obs URL :</p>
        <div class="config_3" id="overlayUrl">
          <textarea
            class="overlayUrl"
            name="overlayUrl"
            placeholder="Overlay Url"></textarea>
        </div>
        <p class="input_title">This is your overlay Style :</p>
        <div class="config_4">
          <input
            class="overlayStyle"
            id="overlayStyle"
            type="text"
            name="overlayStyle"
            placeholder="Overlay Style" />
        </div>
        <button class="button" id="button">Generate</button>
      </div>
    `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.renderStyles();
  }

  attachEvents() {
    const button = this.shadowRoot.getElementById("button");
    const nameStreamer = this.shadowRoot.getElementById("nameStreamer");
    const camOverlayText = this.shadowRoot.getElementById("camOverlayText");
    const overlayUrl = this.shadowRoot.querySelector(".overlayUrl");

    button.addEventListener("click", () => {
      const nameStreamerValue = nameStreamer.value.toString();
      const camTextContent = camOverlayText.value.toString();
      const overlayStyleValue = this.shadowRoot
        .getElementById("overlayStyle")
        .value.toString();

      const url = new URL("./overlay/index.html", this.hostUrl);
      url.searchParams.set("nameStreamer", nameStreamerValue);
      url.searchParams.set("camOverlayText", camTextContent);
      url.searchParams.set("overlayStyle", overlayStyleValue);

      overlayUrl.value = url.toString();
      localStorage.setItem("newURL", url.toString());
    });

    // ... (resto del código para gestionar eventos, si es necesario)
  }
}

customElements.define("link-generator", LinkGenerator);
