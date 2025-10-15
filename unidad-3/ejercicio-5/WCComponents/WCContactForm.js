class WCContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const form = document.createElement("form");
    form.classList.add("w3-container");

    // Campos del formulario
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Nombre";
    const nameInput = document.createElement("input");
    nameInput.classList.add("w3-input", "w3-border");
    nameInput.type = "text";
    nameInput.required = true;

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "Email";
    const emailInput = document.createElement("input");
    emailInput.classList.add("w3-input", "w3-border");
    emailInput.type = "email";
    emailInput.required = true;

    const messageLabel = document.createElement("label");
    messageLabel.textContent = "Mensaje";
    const messageInput = document.createElement("textarea");
    messageInput.classList.add("w3-input", "w3-border");
    messageInput.rows = 4;
    messageInput.required = true;

    form.append(
      nameLabel,
      nameInput,
      emailLabel,
      emailInput,
      messageLabel,
      messageInput
    );

    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "https://www.w3schools.com/w3css/5/w3.css";

    this.shadowRoot.append(styles, form);
  }
}

customElements.define("wc-contact-form", WCContactForm);
export { WCContactForm };
