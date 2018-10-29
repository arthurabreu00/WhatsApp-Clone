class WhatsAppController{

    constructor(){

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


}