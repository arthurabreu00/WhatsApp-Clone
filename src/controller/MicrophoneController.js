import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent{
    constructor(){

        super();

        this._mimeType = "audio/webm";

        this._availabel = false;

        //  Parte que faz a captação da audio. (Ps: Captação != Gravação)
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{
            this._availabel = true;
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

        // Este método interrompe a REPRODUÇÃO do audio.
        this._availabel = false;

        this._stream.getTracks().forEach(track =>{
            track.stop();  
        });

    } // Fechando o método stop();


    isAvailabel(){
        return this._availabel;
    }

    startRecord(){
        // Esté método inicia GRAVAÇÃO da audio. (Ps: Captação != Gravação).

        if(this.isAvailabel()){

            this._mediaRecorder = new MediaRecorder(this._stream,{mimeType: this._mimeType});

            // A classe me retorna pedaços gravados ('chuncks').
            this._recordChuncks = [];

            this._mediaRecorder.addEventListener('dataavailable', e=>{

                // Se tiver algo gravado, junto aos elementos em um array (vetor).
                if(e.data.size > 0) this._recordChuncks.push(e.data)

            }); 

            this._mediaRecorder.addEventListener('stop',e =>{   

                // Ao parar o audio é necessário, gerar um arquivo de audio.

                // Para isso é necessário a manipulação de binarios. Para isso utilizaremos a classe Blob.
                
                let blob = new Blob(this._recordChuncks,{
                    type: this._mimeType
                })   // Transformando os arquivos em binarios. e passando meta-dados, para ser transformados em um arquivo.
             
                let filename = `rec${Date.now()}.webm` 
                // Definindo o nome do arquivo, conforme o momento de geração do arquivo e adiconando a extensão do msm.

                let file = new File([blob],filename,{

                    type:this._mimeType,
                    lastModified: Date.now()

                }); // File precisa de array de binarios, O nome do arquivo e os metaDados do mesmo.
                    // A classe file, transforma binarios em arquivos e a união dos demais, dados.

                console.log(file);  

                let reader = new FileReader();

                reader.onload = e =>{
                    let audio = new Audio(reader.result);
                    audio.play();
                }

                reader.readAsDataURL(file);

            });

            this._mediaRecorder.start();
        }

    }

    stopRecord(){
        // Esté método termina a GRAVAÇÃO da audio. (Ps: Captação != Gravação).

        if(this.isAvailabel()){

            this._mediaRecorder.stop(); // Parando de gravar.
            this.stop(); // Parando de reproduizir.
        }

    }

}