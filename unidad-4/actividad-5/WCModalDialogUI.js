class WCModalDialogUI extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.dialog = document.createElement("dialog");
    this.container = document.createElement("div");
    this.titleElem = document.createElement("h2");
    this.content = document.createElement("pre");
    this.closeBtn = document.createElement("button");

    this.container.classList.add("w3-container", "w3-padding");
    this.titleElem.textContent = "Detalles del Usuario";
    this.closeBtn.textContent = "Cerrar";
    this.closeBtn.classList.add("w3-button", "w3-red", "w3-margin-top");

    this.container.appendChild(this.titleElem);
    this.container.appendChild(this.content);
    this.container.appendChild(this.closeBtn);
    this.dialog.appendChild(this.container);
    this.shadowRoot.appendChild(this.dialog);
  }

  connectedCallback() {
    this.closeBtn.addEventListener("click", this.onCloseClick.bind(this));
  }

  disconnectedCallback() {
    this.closeBtn.removeEventListener("click", this.onCloseClick.bind(this));
  }

  onCloseClick() {
    this.dialog.close();
  }

  show(data) {
    this.content.textContent = JSON.stringify(data, null, 2);
    this.dialog.showModal();
  }
}

customElements.define("wc-modal-dialogui", WCModalDialogUI);
export { WCModalDialogUI };
