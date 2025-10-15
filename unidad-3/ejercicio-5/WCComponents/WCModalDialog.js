class WCModalDialogUI extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // Contenedor principal
    this.container = document.createElement("div");
    this.container.classList.add("w3-container");

    // Botón de apertura
    this.openBtn = document.createElement("button");
    this.openBtn.classList.add("w3-button", "w3-blue");
    this.openBtn.textContent = "Contáctenos";

    // Modal principal
    this.modal = document.createElement("div");
    this.modal.classList.add("w3-modal");
    this.modal.style.display = "none";

    // Contenido del modal
    this.modalContent = document.createElement("div");
    this.modalContent.classList.add("w3-modal-content", "w3-animate-top", "w3-card-4");

    // Header
    this.header = document.createElement("header");
    this.header.classList.add("w3-container", "w3-blue");
    const title = document.createElement("h2");
    title.textContent = "Formulario de contacto";
    this.header.appendChild(title);

    // Cuerpo (contenido dinámico)
    this.body = document.createElement("div");
    this.body.classList.add("w3-container");

    // Footer con botones
    this.footer = document.createElement("footer");
    this.footer.classList.add("w3-container", "w3-light-grey", "w3-padding");
    this.cancelBtn = document.createElement("button");
    this.cancelBtn.classList.add("w3-button", "w3-red");
    this.cancelBtn.textContent = "Cancelar";
    this.acceptBtn = document.createElement("button");
    this.acceptBtn.classList.add("w3-button", "w3-green", "w3-right");
    this.acceptBtn.textContent = "Enviar";
    this.footer.append(this.cancelBtn, this.acceptBtn);

    // Armar estructura
    this.modalContent.append(this.header, this.body, this.footer);
    this.modal.appendChild(this.modalContent);
    this.container.append(this.openBtn, this.modal);

    // Estilos
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "https://www.w3schools.com/w3css/5/w3.css";

    this.shadowRoot.append(styles, this.container);
  }

  connectedCallback() {
    this.openBtn.onclick = () => (this.modal.style.display = "block");
    this.cancelBtn.onclick = () => (this.modal.style.display = "none");
    this.acceptBtn.onclick = () => {
      window.alert("Su consulta fue recibida. A la brevedad lo contactaremos. Gracias");
      this.modal.style.display = "none";
    };
  }

  disconnectedCallback() {
    this.openBtn.onclick = null;
    this.cancelBtn.onclick = null;
    this.acceptBtn.onclick = null;
  }

  // Método para insertar contenido (como el formulario)
  setContent(element) {
    this.body.innerHTML = "";
    this.body.appendChild(element);
  }
}

customElements.define("wc-modal", WCModalDialogUI);
export { WCModalDialogUI };
