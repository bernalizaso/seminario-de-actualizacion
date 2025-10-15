class WCModalDialogController {
  constructor(ui) {
    this.ui = ui;
    this.modal = ui.divModal;
  }

  onButtonOpenModalClick(event) {
    this.modal.style.display = "block";
  }

  onButtonCloseClick(event) {
    this.modal.style.display = "none";
  }
}

customElements.define("x-controller", WCModalDialogController);

export { WCModalDialogController };
