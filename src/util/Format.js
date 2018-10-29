class Format{


    // Métodos os estaticos não é necessário declarar a classe;

    static getCamelCase(text){
        
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text} = "id"></div>`

        //Utilizando o data-set, Converte em camel case retirando o '-' e colcando a letra a seguir Maiuscula.

        return Object.keys(div.firstChild.dataset)[0]  // Retornando um elemento por vez;

    }

}