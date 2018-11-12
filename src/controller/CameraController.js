export class CameraController{
    constructor(videoEl){

        this._videoEl = videoEl;

        // Permissão da camera/video, pegando a mídia fornecida pelo usuario.

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{

            this._stream = stream;

            this._videoEl.src = URL.createObjectURL(stream); // Criação da URL para ser executado pelo play
            this._videoEl.play(); // O método play funciona executando uma URL.
            console.log(this._videoEl)

        }).catch(err=>{
            console.error(err);
        });

    } // Fechando o método construtor;

    stop(){

        // Este método interrompe a gravação do vídeo.
        
        this._stream.getTracks().forEach(track =>{
            track.stop();  
        });

    } // Fechando o método stop();

    takePicture(mimeType = 'image/png'){

        // Trabalhando com canvas "Imagens dinamicas, via HTML + JS"

        let canvas = document.createElement('canvas'); // Criando elemento

        canvas.setAttribute('height',this._videoEl.videoHeight); // Setando altura.
        canvas.setAttribute('width',this._videoEl.videoWidth); // Setando Largura.

        let context = canvas.getContext('2d'); 
        // O canvas pode trabalhar, tanto com imagens 2D ou 3D,/no caso como trata-se de uma fotagrafia, utilizaremos a perspectiva 2D.


        context.drawImage(this._videoEl,0,0,canvas.width,canvas.height);
        // Desenhando imagem, conforme o contexto. 
        // 1º Parametro: Elemento, 2º Parametro: Posição inicial X, 3º Parametro: Posição inicial y, 
        // 4º Pârametro: Objetivo X, 5º Pârametro: Objetivo y

        return canvas.toDataURL(mimeType); // Retornando um base x64, passando o tipo da imagem.
    }
}