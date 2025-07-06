class CustomCalculator extends HTMLElement {
  constructor() {
    super();

    this.display = document.createElement("input");
    this.btn0 = document.createElement("button");
    this.btn1 = document.createElement("button");
    this.btn2 = document.createElement("button");
    this.btn3 = document.createElement("button");
    this.btn4 = document.createElement("button");
    this.btn5 = document.createElement("button");
    this.btn6 = document.createElement("button");
    this.btn7 = document.createElement("button");
    this.btn8 = document.createElement("button");
    this.btn9 = document.createElement("button");
    this.btnPlus = document.createElement("button");
    this.btnMin = document.createElement("button");
    this.btnMult = document.createElement("button");
    this.btnDiv = document.createElement("button");
    this.btnDot = document.createElement("button");
    this.btnCalculate = document.createElement("button");

    //Esta medio feo pero no quise usar shadow dom porque en clase aun no lo vimos.
    this.row1 = document.createElement("div");
    this.row2 = document.createElement("div");
    this.row3 = document.createElement("div");
    this.row4 = document.createElement("div");
    this.row5 = document.createElement("div");

    this.display.type = "text";
    this.btn0.innerText = "0";
    this.btn1.innerText = "1";
    this.btn2.innerText = "2";
    this.btn3.innerText = "3";
    this.btn4.innerText = "4";
    this.btn5.innerText = "5";
    this.btn6.innerText = "6";
    this.btn7.innerText = "7";
    this.btn8.innerText = "8";
    this.btn9.innerText = "9";
    this.btnPlus.innerText = "+";
    this.btnMult.innerText = "*";
    this.btnDiv.innerText = "/";
    this.btnMin.innerText = "-";
    this.btnDot.innerText = ".";
    this.btnCalculate.innerText = "=";
  }

  onButton0Click() {
    this.display.value += "0";
  }

  onButtonCalculateClick(event) {
    this.display.value = eval(this.display.value);
  }

  onButton1Click(event) {
    this.display.value += "1";
  }
  onButtonDotClick(event) {
    this.display.value += ".";
  }
  onButton2Click(event) {
    this.display.value += "2";
  }
  onButton3Click(event) {
    this.display.value += "3";
  }
  onButton4Click(event) {
    this.display.value += "4";
  }
  onButton5Click(event) {
    this.display.value += "5";
  }
  onButton6Click(event) {
    this.display.value += "6";
  }
  onButton7Click(event) {
    this.display.value += "7";
  }
  onButton8Click(event) {
    this.display.value += "8";
  }
  onButton9Click(event) {
    this.display.value += "9";
  }

  onButtonPlusClick(event) {
    this.display.value += "+";
  }

  onButtonMultClick(event) {
    this.display.value += "*";
  }

  onButtonDivClick(event) {
    this.display.value += "/";
  }
  onButtonMinClick(event) {
    this.display.value += "-";
  }

  connectedCallback() {
    //Se va a ejecutar siempre cuando el elemento es insertado en el DOM
    //DOM = Arbol de elementos HTML ya como instancias (objetos) de JS.

    this.row1.appendChild(this.btn7);
    this.row1.appendChild(this.btn8);
    this.row1.appendChild(this.btn9);
    this.row1.appendChild(this.btnDiv);

    this.row2.appendChild(this.btn4);
    this.row2.appendChild(this.btn5);
    this.row2.appendChild(this.btn6);
    this.row2.appendChild(this.btnMult);

    this.row3.appendChild(this.btn1);
    this.row3.appendChild(this.btn2);
    this.row3.appendChild(this.btn3);
    this.row3.appendChild(this.btnMin);

    this.row4.appendChild(this.btn0);
    this.row4.appendChild(this.btnDot);
    this.row4.appendChild(this.btnCalculate);
    this.row4.appendChild(this.btnPlus);

    this.appendChild(this.row1);
    this.appendChild(this.row2);
    this.appendChild(this.row3);
    this.appendChild(this.row4);

    this.appendChild(this.display);
    this.appendChild(this.btn0);
    this.appendChild(this.btn1);
    this.appendChild(this.btn2);
    this.appendChild(this.btn3);
    this.appendChild(this.btn4);
    this.appendChild(this.btn5);
    this.appendChild(this.btn6);
    this.appendChild(this.btn7);
    this.appendChild(this.btn8);
    this.appendChild(this.btn9);
    this.appendChild(this.btnPlus);
    this.appendChild(this.btnDiv);
    this.appendChild(this.btnMult);
    this.appendChild(this.btnMin);
    this.appendChild(this.btnCalculate);
    this.appendChild(this.btnDot);

    this.btn0.onclick = this.onButton0Click.bind(this);
    this.btn1.onclick = this.onButton1Click.bind(this);
    this.btn2.onclick = this.onButton2Click.bind(this);
    this.btn3.onclick = this.onButton3Click.bind(this);
    this.btn4.onclick = this.onButton4Click.bind(this);
    this.btn5.onclick = this.onButton5Click.bind(this);
    this.btn6.onclick = this.onButton6Click.bind(this);
    this.btn7.onclick = this.onButton7Click.bind(this);
    this.btn8.onclick = this.onButton8Click.bind(this);
    this.btn9.onclick = this.onButton9Click.bind(this);
    this.btnDot.onclick = this.onButtonDotClick.bind(this);
    this.btnPlus.onclick = this.onButtonPlusClick.bind(this);
    this.btnMin.onclick = this.onButtonMinClick.bind(this);
    this.btnMult.onclick = this.onButtonMultClick.bind(this);
    this.btnDiv.onclick = this.onButtonDivClick.bind(this);
    this.btnCalculate.onclick = this.onButtonCalculateClick.bind(this);

    this.display.classList.add("calc-display");

    [
      this.btn0,
      this.btn1,
      this.btn2,
      this.btn3,
      this.btn4,
      this.btn5,
      this.btn6,
      this.btn7,
      this.btn8,
      this.btn9,
      this.btnPlus,
      this.btnMin,
      this.btnMult,
      this.btnDiv,
      this.btnDot,
      this.btnCalculate,
    ].forEach((btn) => btn.classList.add("calc-button"));
    
    this.row1.classList.add("calc-row");
    this.row2.classList.add("calc-row");
    this.row3.classList.add("calc-row");
    this.row4.classList.add("calc-row");
    this.classList.add("calc-container");
  }

  disconnectedCallback() {
    //Se va a ejecutar siempre que se quite el elemento del documento
  }
}

customElements.define("x-calculator", CustomCalculator);

export { CustomCalculator };
