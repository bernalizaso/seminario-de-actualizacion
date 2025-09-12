       class XMLHttpRequestExample extends HTMLElement
      {
          constructor(){
              super();

              this.requestBtn = document.createElement('button');
              this.clearBtn = document.createElement('button');
              this.outputTextArea = document.createElement('textarea');

              this.requestBtn.innerText = 'Efectuar peticion';
              this.clearBtn.innerText = "Borrar peticion";

              this.appendChild(this.requestBtn);
              this.appendChild(this.clearBtn);
              this.appendChild(this.outputTextArea);

          }

          onClearButtonClick(event){
            this.outputTextArea.value ='' ;
          }

          onRequestButtonClick(event){
            
          fetch('https://jsonplaceholder.typicode.com/posts/1 ').then(response=>response.json()).then(data => this.outputTextArea.value=JSON.stringify(data))  

          };


      connectedCallback(){
              this.requestBtn.onclick = this.onRequestButtonClick.bind(this);
              this.clearBtn.onclick = this.onClearButtonClick.bind(this);
          }

          disconnectedCallback(){
              this.requestBtn.onclick = undefined;
          }

      }


      customElements.define('x-request', XMLHttpRequestExample);

      export {XMLHttpRequestExample};