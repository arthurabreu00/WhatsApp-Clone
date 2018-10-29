class WhatsAppController{

    constructor(){

        this.elementsPrototype();
        this.loadElements();
    }

    loadElements(){

    // Método que Seleciona todos os ID'S contido no HTML

        this.el = {

        }

        //ForEach que seleciona todos os elementos.
        document.querySelectorAll('[id]').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element; // Convesão dos elementos para CamelCase

        })

    } // Fechando o método loadElements()

    elementsPrototype(){
        // O prototype é uma parte mais profunda do JS.
        // Este método é utilzado para a maninupulação do mesmo.

        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this; // Retorna ele mesmo, para infileramento de funções
        } // Esconder elemento.

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        } // Mostrar elemento.

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        } // Mostrar/Esconder elemento.

        
        Element.prototype.on = function (events,fn) {
            
            events.split(' ').forEach(event =>{

                this.addEventListener(event, fn);

            })

            return this;
        } // Adicionando mutiplos eventos para o elemento.

        Element.prototype.css = function(styles){

            for(let name in styles){

                this.style[name] = styles[name];

            }

            return this;

        } // Facilitando a troca de estilo CSS, pelo JS. 
          // É possivel passar um JSON com todos os parametros a serem mudados.

        Element.prototype.addClass = function(name){
            this.classList.add(name);
            return this;
        } // Facilitando a adição de classes via JS.

        Element.prototype.removeClass = function(name){
            this.classList.remove(name);
            return this;
        } // Facilitando a remoção de classes via JS.

        
        Element.prototype.toggle = function(name){
            this.classList.toggle(name);
            return this;
        } // Facilitando a remoção/adição de classes via JS.

        Element.prototype.hasClass = function(name){
            return this.classList.contains(name);
            
        } // Facilitando a remoção/adição de classes via JS.

    } // Fechando o método elementsPrototype()

} // Fechando a classe WhatsAppController();