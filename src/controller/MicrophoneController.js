import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{
    constructor(){

        super();

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{

            this._stream = stream;

            let audio = new Audio();

            audio.src = URL.createObjectURL(stream); // Criação da URL para ser executado pelo play. 
            //Atráves de uma tag <audio> a será direcionando com o atributo src.

            audio.play(); // O método play funciona executando uma URL. Este método toca de fato o audio.

            this.trigger('play',audio, this._stream,);

        }).catch(err=>{
            console.error(err);
        });

    }

    stop(){

        // Este método interrompe a gravação do audio.
        
        this._stream.getTracks().forEach(track =>{
            track.stop();  
        });

    } // Fechando o método stop();
}