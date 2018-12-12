export class ClassEvent{

    // Criando eventos, diferentes, casos de estudo.
    
    constructor(){
        this._events = {};

    }

    on(eventName,fn){

        if(!this._events[eventName]) this._events[eventName] = new Array();
        this._events[eventName].push(fn); // Adicionando eventos, ao meu array de eventos.
    } // Fim do método on()

    trigger(){
        
        let args = [...arguments]; // Spread, transformando elemetos/coleções em array.
        let eventName = args.shift(); // remove o primeiro elemento de um array.

        args.push(new Event(eventName));

        // Verificando se já foi criado meu array.
        if(this._events[eventName] instanceof Array){
            this._events[eventName].forEach(fn => {

                fn.apply(null, args) // Executa um código, como parametro.

            });
        }

    }// Fim do método trigger().
        

    
}