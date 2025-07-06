class LoginComponent extends HTMLElement {
  constructor() {
    super();
    this.container = document.createElement("div");
    this.container.classList.add("w3-container", "w3-half", "w3-margin-top");

    this.form = document.createElement("form");
    this.form.classList.add("w3-container", "w3-card-4");

    this.pName = document.createElement("p");
    this.inputName = document.createElement("input");
    this.inputName.classList.add("w3-input");
    this.labelName = document.createElement("label");
    this.labelName.innerText = "Name";

    this.pPassword = document.createElement("p");
    this.inputPassword = document.createElement("input");
    this.inputPassword.classList.add("w3-input");
    this.labelPassword = document.createElement("label");
    this.labelPassword.innerText = "Password";

    this.pMale = document.createElement("p");
    this.inputMale = document.createElement("input");
    this.inputMale.classList.add("w3-radio");
    this.labelMale = document.createElement("label");
    this.labelMale.innerText = "Male";

    this.pFemale = document.createElement("p");
    this.inputFemale = document.createElement("input");
    this.inputFemale.classList.add("w3-radio");
    this.labelFemale = document.createElement("label");
    this.labelFemale.innerText = "Female";
    this.pDontKnow = document.createElement("p");
    this.inputDontKnow = document.createElement("input");
    this.inputDontKnow.classList.add("w3-radio");
    this.labelDontKnow = document.createElement("label");
    this.labelDontKnow.innerText = "Don't know (Disabled)";

    this.pCheckbox = document.createElement("p");
    this.inputCheckbox = document.createElement("input");
    this.inputCheckbox.classList.add("w3-check");
    this.labelCheckbox = document.createElement("label");
    this.labelCheckbox.innerText = "Stay logged in";

    this.pButton = document.createElement("p");
    this.loginButton = document.createElement("button");
    this.loginButton.classList.add(
      "w3-button",
      "w3-section",
      "w3-teal",
      "w3-ripple"
    );
    this.loginButton.innerText = "Log in";

    /* Agregue aca los atributos que me olvide de poner arriba. Copie textual los nombres de los atributos 
    que uso el html de w3, pero me da la impresion que deberia haberlo puesto en attributeChangedCallback o en 
    observableAttributes. De la forma que lo hice ignore esos dos metodos. La proxima sera*/


    this.inputName.type = "text";
    this.inputName.name = "name";
    this.inputName.required = true;
    this.inputName.style.width = "90%";

  
    this.inputPassword.type = "password";
    this.inputPassword.name = "password";
    this.inputPassword.required = true;
    this.inputPassword.style.width = "90%";

 
    this.inputMale.type = "radio";
    this.inputMale.name = "gender";
    this.inputMale.value = "male";
    this.inputMale.checked = true;

  
    this.inputFemale.type = "radio";
    this.inputFemale.name = "gender";
    this.inputFemale.value = "female";

    this.inputDontKnow.type = "radio";
    this.inputDontKnow.name = "gender";
    this.inputDontKnow.value = "";
    this.inputDontKnow.disabled = true;

    this.inputCheckbox.type = "checkbox";
    this.inputCheckbox.name = "stayLoggedIn";
    this.inputCheckbox.checked = true;

    this.loginButton.type = "submit";
  }

  connectedCallback() {
    this.pButton.appendChild(this.loginButton);
    this.pCheckbox.appendChild(this.inputCheckbox);
    this.pCheckbox.appendChild(this.labelCheckbox);
    this.pDontKnow.appendChild(this.inputDontKnow);
    this.pDontKnow.appendChild(this.labelDontKnow);
    this.pFemale.appendChild(this.inputFemale);
    this.pFemale.appendChild(this.labelFemale);
    this.pMale.appendChild(this.inputMale);
    this.pMale.appendChild(this.labelMale);
    this.pPassword.appendChild(this.inputPassword);
    this.pPassword.appendChild(this.labelPassword);
    this.pName.appendChild(this.inputName);
    this.pName.appendChild(this.labelName);
    this.form.appendChild(this.pName);
    this.form.appendChild(this.pPassword);
    this.form.appendChild(this.pMale);
    this.form.appendChild(this.pFemale);
    this.form.appendChild(this.pDontKnow);
    this.form.appendChild(this.pCheckbox);
    this.form.appendChild(this.pButton);
    this.container.appendChild(this.form);
    this.appendChild(this.container);
  }

  disconnectedCallback() {}
}

customElements.define("x-login", LoginComponent);

export { LoginComponent };


//No tuve en cuenta el header de arriba, en cualquier caso es agregar el login example