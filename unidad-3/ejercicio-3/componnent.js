class PricingTablesComponent extends HTMLElement {
  constructor() {
    super();

    this.container = document.createElement("div");
    this.container.classList.add("w3-container");


    this.row = document.createElement("div");
    this.row.classList.add("w3-row-padding");

    // ---------- Basic ----------
    this.basicThird = document.createElement("div");
    this.basicThird.classList.add("w3-third", "w3-margin-bottom");
    this.basicUl = document.createElement("ul");
    this.basicUl.classList.add("w3-ul", "w3-border", "w3-center", "w3-hover-shadow");
    this.basicHeader = document.createElement("li");
    this.basicHeader.classList.add("w3-black", "w3-xlarge", "w3-padding-32");
    this.basicHeader.innerText = "Basic";

    this.basicStorage = document.createElement("li");
    this.basicStorage.classList.add("w3-padding-16");
    this.basicStorageB = document.createElement("b");
    this.basicStorageB.innerText = "10GB";
    this.basicStorage.appendChild(this.basicStorageB);
    this.basicStorage.appendChild(document.createTextNode(" Storage"));

    this.basicEmails = document.createElement("li");
    this.basicEmails.classList.add("w3-padding-16");
    this.basicEmailsB = document.createElement("b");
    this.basicEmailsB.innerText = "10";
    this.basicEmails.appendChild(this.basicEmailsB);
    this.basicEmails.appendChild(document.createTextNode(" Emails"));

    this.basicDomains = document.createElement("li");
    this.basicDomains.classList.add("w3-padding-16");
    this.basicDomainsB = document.createElement("b");
    this.basicDomainsB.innerText = "10";
    this.basicDomains.appendChild(this.basicDomainsB);
    this.basicDomains.appendChild(document.createTextNode(" Domains"));

    this.basicSupport = document.createElement("li");
    this.basicSupport.classList.add("w3-padding-16");
    this.basicSupportB = document.createElement("b");
    this.basicSupportB.innerText = "Endless";
    this.basicSupport.appendChild(this.basicSupportB);
    this.basicSupport.appendChild(document.createTextNode(" Support"));

    this.basicPrice = document.createElement("li");
    this.basicPrice.classList.add("w3-padding-16");
    this.basicPriceH2 = document.createElement("h2");
    this.basicPriceH2.classList.add("w3-wide");
    this.basicPriceH2.innerText = "$ 10";
    this.basicPriceSpan = document.createElement("span");
    this.basicPriceSpan.classList.add("w3-opacity");
    this.basicPriceSpan.innerText = "per month";

    this.basicButtonLi = document.createElement("li");
    this.basicButtonLi.classList.add("w3-light-grey", "w3-padding-24");
    this.basicButton = document.createElement("button");
    this.basicButton.classList.add("w3-button", "w3-green", "w3-padding-large");
    this.basicButton.innerText = "Sign Up";

    // ---------- Pro ----------
    this.proThird = document.createElement("div");
    this.proThird.classList.add("w3-third", "w3-margin-bottom");
    this.proUl = document.createElement("ul");
    this.proUl.classList.add("w3-ul", "w3-border", "w3-center", "w3-hover-shadow");
    this.proHeader = document.createElement("li");
    this.proHeader.classList.add("w3-green", "w3-xlarge", "w3-padding-32");
    this.proHeader.innerText = "Pro";

    this.proStorage = document.createElement("li");
    this.proStorage.classList.add("w3-padding-16");
    this.proStorageB = document.createElement("b");
    this.proStorageB.innerText = "25GB";
    this.proStorage.appendChild(this.proStorageB);
    this.proStorage.appendChild(document.createTextNode(" Storage"));

    this.proEmails = document.createElement("li");
    this.proEmails.classList.add("w3-padding-16");
    this.proEmailsB = document.createElement("b");
    this.proEmailsB.innerText = "25";
    this.proEmails.appendChild(this.proEmailsB);
    this.proEmails.appendChild(document.createTextNode(" Emails"));

    this.proDomains = document.createElement("li");
    this.proDomains.classList.add("w3-padding-16");
    this.proDomainsB = document.createElement("b");
    this.proDomainsB.innerText = "25";
    this.proDomains.appendChild(this.proDomainsB);
    this.proDomains.appendChild(document.createTextNode(" Domains"));

    this.proSupport = document.createElement("li");
    this.proSupport.classList.add("w3-padding-16");
    this.proSupportB = document.createElement("b");
    this.proSupportB.innerText = "Endless";
    this.proSupport.appendChild(this.proSupportB);
    this.proSupport.appendChild(document.createTextNode(" Support"));

    this.proPrice = document.createElement("li");
    this.proPrice.classList.add("w3-padding-16");
    this.proPriceH2 = document.createElement("h2");
    this.proPriceH2.classList.add("w3-wide");
    this.proPriceH2.innerText = "$ 25";
    this.proPriceSpan = document.createElement("span");
    this.proPriceSpan.classList.add("w3-opacity");
    this.proPriceSpan.innerText = "per month";

    this.proButtonLi = document.createElement("li");
    this.proButtonLi.classList.add("w3-light-grey", "w3-padding-24");
    this.proButton = document.createElement("button");
    this.proButton.classList.add("w3-button", "w3-green", "w3-padding-large");
    this.proButton.innerText = "Sign Up";

    // ---------- Premium ----------
    this.premiumThird = document.createElement("div");
    this.premiumThird.classList.add("w3-third", "w3-margin-bottom");
    this.premiumUl = document.createElement("ul");
    this.premiumUl.classList.add("w3-ul", "w3-border", "w3-center", "w3-hover-shadow");
    this.premiumHeader = document.createElement("li");
    this.premiumHeader.classList.add("w3-black", "w3-xlarge", "w3-padding-32");
    this.premiumHeader.innerText = "Premium";

    this.premiumStorage = document.createElement("li");
    this.premiumStorage.classList.add("w3-padding-16");
    this.premiumStorageB = document.createElement("b");
    this.premiumStorageB.innerText = "50GB";
    this.premiumStorage.appendChild(this.premiumStorageB);
    this.premiumStorage.appendChild(document.createTextNode(" Storage"));

    this.premiumEmails = document.createElement("li");
    this.premiumEmails.classList.add("w3-padding-16");
    this.premiumEmailsB = document.createElement("b");
    this.premiumEmailsB.innerText = "50";
    this.premiumEmails.appendChild(this.premiumEmailsB);
    this.premiumEmails.appendChild(document.createTextNode(" Emails"));

    this.premiumDomains = document.createElement("li");
    this.premiumDomains.classList.add("w3-padding-16");
    this.premiumDomainsB = document.createElement("b");
    this.premiumDomainsB.innerText = "50";
    this.premiumDomains.appendChild(this.premiumDomainsB);
    this.premiumDomains.appendChild(document.createTextNode(" Domains"));

    this.premiumSupport = document.createElement("li");
    this.premiumSupport.classList.add("w3-padding-16");
    this.premiumSupportB = document.createElement("b");
    this.premiumSupportB.innerText = "Endless";
    this.premiumSupport.appendChild(this.premiumSupportB);
    this.premiumSupport.appendChild(document.createTextNode(" Support"));

    this.premiumPrice = document.createElement("li");
    this.premiumPrice.classList.add("w3-padding-16");
    this.premiumPriceH2 = document.createElement("h2");
    this.premiumPriceH2.classList.add("w3-wide");
    this.premiumPriceH2.innerText = "$ 50";
    this.premiumPriceSpan = document.createElement("span");
    this.premiumPriceSpan.classList.add("w3-opacity");
    this.premiumPriceSpan.innerText = "per month";

    this.premiumButtonLi = document.createElement("li");
    this.premiumButtonLi.classList.add("w3-light-grey", "w3-padding-24");
    this.premiumButton = document.createElement("button");
    this.premiumButton.classList.add("w3-button", "w3-green", "w3-padding-large");
    this.premiumButton.innerText = "Sign Up";
  }

  connectedCallback() {


    this.basicPrice.appendChild(this.basicPriceH2);
    this.basicPrice.appendChild(this.basicPriceSpan);
    this.basicButtonLi.appendChild(this.basicButton);
    this.basicUl.appendChild(this.basicHeader);
    this.basicUl.appendChild(this.basicStorage);
    this.basicUl.appendChild(this.basicEmails);
    this.basicUl.appendChild(this.basicDomains);
    this.basicUl.appendChild(this.basicSupport);
    this.basicUl.appendChild(this.basicPrice);
    this.basicUl.appendChild(this.basicButtonLi);
    this.basicThird.appendChild(this.basicUl);

    this.proPrice.appendChild(this.proPriceH2);
    this.proPrice.appendChild(this.proPriceSpan);
    this.proButtonLi.appendChild(this.proButton);
    this.proUl.appendChild(this.proHeader);
    this.proUl.appendChild(this.proStorage);
    this.proUl.appendChild(this.proEmails);
    this.proUl.appendChild(this.proDomains);
    this.proUl.appendChild(this.proSupport);
    this.proUl.appendChild(this.proPrice);
    this.proUl.appendChild(this.proButtonLi);
    this.proThird.appendChild(this.proUl);

    this.premiumPrice.appendChild(this.premiumPriceH2);
    this.premiumPrice.appendChild(this.premiumPriceSpan);
    this.premiumButtonLi.appendChild(this.premiumButton);
    this.premiumUl.appendChild(this.premiumHeader);
    this.premiumUl.appendChild(this.premiumStorage);
    this.premiumUl.appendChild(this.premiumEmails);
    this.premiumUl.appendChild(this.premiumDomains);
    this.premiumUl.appendChild(this.premiumSupport);
    this.premiumUl.appendChild(this.premiumPrice);
    this.premiumUl.appendChild(this.premiumButtonLi);
    this.premiumThird.appendChild(this.premiumUl);

    this.row.appendChild(this.basicThird);
    this.row.appendChild(this.proThird);
    this.row.appendChild(this.premiumThird);

    this.appendChild(this.container);
    this.appendChild(this.row);
  }

  disconnectedCallback() {}
}

customElements.define("x-pricing-tables", PricingTablesComponent);

export { PricingTablesComponent };
