export class CameraController{
    constructor(videoEl){

        this._videoEl = videoEl;

        // Permissão da camera/video, pegando a mídia fornecida pelo usuario.

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{
            
            this._videoEl.src = URL.createObjectURL(stream); // Criação da URL para ser executado pelo play
            this._videoEl.play(); // O método play funciona executando uma URL.
            console.log(this._videoEl)
        }).catch(err=>{
            console.error(err);
        });

    } // Fechando o método construtor;
}