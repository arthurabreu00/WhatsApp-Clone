import { type } from "os";

export class Format{


    // Métodos os estaticos não é necessário declarar a classe;

    static getCamelCase(text){
        
        let div = document.createElement('div');

        div.innerHTML = `<div data-${text} = "id"></div>`

        //Utilizando o data-set, Converte em camel case retirando o '-' e colcando a letra a seguir Maiuscula.

        return Object.keys(div.firstChild.dataset)[0]  // Retornando um elemento por vez;
        
    }


    static toTime(duration){
        
        let seconds = parseInt((duration/ 1000) % 60).toString().padStart(2,'0');
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0){
            return hours + ':' + minutes.toString().padStart(2,'0') + ':' + seconds;
        }else{
            return minutes + ':' + seconds;
        }
    }

    static timeStampToTime(timeStamp){
        return (timeStamp && typeof timeStamp.toDate === 'function') ? Format.dateToTime(timeStamp.toDate()) : '';
    }

    static dateToTime(date,locale = 'pt-BR'){
        return date.toLocaleTimeString(locale,{
            hour : '2-digit',
            minute: '2-digit'
        });
    }

}