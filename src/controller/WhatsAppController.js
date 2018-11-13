import {Format} from './../util/Format';
import {CameraController} from './CameraController';
import {MicrophoneController} from './MicrophoneController';
import {DocumentPreviewController} from './DocumentPreviewController';

// Oxeford - dobri next

export class WhatsAppController {

    constructor() {

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    loadElements() {

        // Método que Seleciona todos os ID'S contido no HTML
        //ForEach que seleciona todos os elementos.

        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {

            this.el[Format.getCamelCase(element.id)] = element; // Convesão dos elementos para CamelCase

        })

    } // Fechando o método loadElements()

    elementsPrototype() {
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


        Element.prototype.on = function (events, fn) {

            events.split(' ').forEach(event => {

                this.addEventListener(event, fn);

            })

            return this;
        } // Adicionando mutiplos eventos para o elemento.

        Element.prototype.css = function (styles) {

            for (let name in styles) {

                this.style[name] = styles[name];

            }

            return this;

        } // Facilitando a troca de estilo CSS, pelo JS. 
        // É possivel passar um JSON com todos os parametros a serem mudados.

        Element.prototype.addClass = function (name) {
            this.classList.add(name);
            return this;
        } // Facilitando a adição de classes via JS.

        Element.prototype.removeClass = function (name) {
            this.classList.remove(name);
            return this;
        } // Facilitando a remoção de classes via JS.


        Element.prototype.toggleClass = function (name) {
            this.classList.toggle(name);
            return this;
        } // Facilitando a remoção/adição de classes via JS.

        Element.prototype.hasClass = function (name) {
            return this.classList.contains(name);

        } // Facilitando a remoção/adição de classes via JS.

        HTMLFormElement.prototype.getForm = function(){

            return new FormData(this);

        } // Facilitando a busca de formularios, via FormData.

        HTMLFormElement.prototype.toJSON = function(){

            let json = {};

            this.getForm().formData((value,key)=>{

                json[key] = value;

            });

            return JSON

        } // Facilitando a organização dos dados do formulario via JSON.



    } // Fechando o método elementsPrototype()


    initEvents() {

    // Método de inicialização de todos os eventos.

        /* INICIO -- MÉTODOS RELACIONADOS A EDIÇÃO DE INFORMAÇÕES DO PERFIL DO ÚSUARIO */

            this.el.myPhoto.on('click', ()=>{

                this.closeAllLeftPanels();
                this.el.panelEditProfile.show('open');

                setTimeout(()=>{
                    this.el.panelEditProfile.addClass('open');
                },300);  // Intervalo para garantir animação.

            }); // Ao clicar na foto dispara este evento, para editar informações sobre o perfil do úsuario.
        
            this.el.btnClosePanelEditProfile.on('click', ()=>{

                this.el.panelEditProfile.removeClass('open');

            }); // Fechar formulario de edição do perfil.


        
            this.el.photoContainerEditProfile.on('click',()=>{

                this.el.inputProfilePhoto.click(); 

                // Forçando o click. para o input type file, para inserção da foto;

            }); // Click para troca da foto.

            this.el.inputNamePanelEditProfile.on('keypress',e =>{

                if(e.key === 'Enter'){
                    e.preventDefault();
                    this.el.btnSavePanelEditProfile.click();

                } // Se for Enter salvar, o botão em vez de quebrar a linha.

            }) // Método para Verificando as teclas inseridas, no formulário de edição do perfil.

            this.el.btnSavePanelEditProfile.on('click',()=>{

                console.log(this.el.inputNamePanelEditProfile.innerHTML)

            })

         /* FIM -- MÉTODOS RELACIONADOS A EDIÇÃO DE INFORMAÇÕES DO PERFIL DO ÚSUARIO */

         /* INICIO -- MÉTODOS RELACIONADOS A INSERÇÃO DE NOVOS CONTATOS */

            this.el.btnNewContact.on('click', ()=>{

                this.closeAllLeftPanels();
                this.el.panelAddContact.show('open');

                setTimeout(() => {
                    this.el.panelAddContact.addClass('open');
                }, 300); // Intervalo para garantir animação.


            }); // Ao clicar no botão de novo contato dispara este evento, para adiconar novos contatos.

            this.el.btnClosePanelAddContact.on('click', ()=>{

                this.el.panelAddContact.removeClass('open');

            }); // Fechar formulario de adição de contatos.

            this.el.formPanelAddContact.on('submit',e=>{

                e.preventDefault();

                let formData = new FormData(this.el.formPanelAddContact);

            });

        /* FIM -- MÉTODOS RELACIONADOS A INSERÇÃO DE NOVOS CONTATOS */

        /* INICIO -- MÉTODOS RELACIONADOS AO CLIPE*/
            
            this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item =>{

                item.on('click',()=>{
                    this.el.home.hide();

                    this.el.main.css({
                        display:'flex'
                    });

                }); // Troca de tela ao cliclar na convesa.

            }); // Elemento para trocar da tela inicial, para a tela da conversa.

            this.el.btnAttach.on('click', e =>{

                e.stopPropagation(); // Fim do efeito cascata.
                this.el.menuAttach.addClass('open');
                document.addEventListener('click',this.closeMenuAttach.bind(this)); // .bind(), Escopo a sua escolha.

            }); // Clicando no clip e suas opções de menu, para contato,arquivos,audio,imagens,etc.

            this.el.btnAttachPhoto.on('click',() =>{

                this.el.inputPhoto.click();
            }); // Dentro do clip, botão para adicionar fotos a conversa.

            this.el.inputPhoto.on('change', e=>{

                console.log(this.el.inputPhoto.files);

                [...this.el.inputPhoto.files].forEach(file=>{
                    console.log(file);
                })

            }); // Observando mudanças e arquivos enviados via botão foto.

            
            this.el.btnAttachCamera.on('click',() =>{

                this.closeAllMainPanel(); // Fechando todos os paineis anteriores, possibiltando o prox comando.
                this.el.panelCamera.addClass('open'); // Abrindo a classe, (aparecer);
                this.el.panelCamera.css({
                    'height': 'calc(100% - 120px)'
                });

                this._camera = new CameraController(this.el.videoCamera); // Passando o atributo necessário.


            }); // Dentro do clip, botão para acionar cameras e tirar fotos e enviar diretamente a conversa.


            this.el.btnClosePanelCamera.on('click',()=>{

                this.closeAllMainPanel(); // Fechando os paneis sobre salentes.
                this.el.panelMessagesContainer.show(); // Tela de conversa
                this._camera.stop(); // Parando a gravação do vídeo.

            }) // Fechando o painel da câmera. Voltando a tela de convesa;

            this.el.btnTakePicture.on('click',()=>{
                
                let dataUrl = this._camera.takePicture(); // Obtendo o Basex64 da foto.
                
                this.el.pictureCamera.src = dataUrl; // Mudando o atributo, para a foto tirada.
                this.el.pictureCamera.show(); // Mostrando a foto recebida;
                this.el.videoCamera.hide(); // Escodendo o vídeo, permitindo aparecer a foto.
                this.el.btnReshootPanelCamera.show(); // Botão para tirar a foto novamente.
                this.el.containerTakePicture.hide(); // Escodendo o botão de tirar a foto, para evitar bugs.
                this.el.containerSendPicture.show(); // Botão para enviar a foto a conversa.

            }); // Botão dentro da painel da câmera, para tirar a foto.

            this.el.btnReshootPanelCamera.on('click',()=>{

                this.el.pictureCamera.hide(); // Mostrando a foto recebida;
                this.el.videoCamera.show(); // Escodendo o vídeo, permitindo aparecer a foto.
                this.el.bntReshootPanelCamera.hide(); // Botão para tirar a foto novamente.
                this.el.containerTakePicture.show(); // Escodendo o botão de tirar a foto, para evitar bugs.
                this.el.containerSendPicture.hide(); // Botão para enviar a foto a conversa.

            })

            this.el.containerSendPicture.on('click',()=>{
                console.log('Enviando a foto...', this.el.pictureCamera.src );
            })


            this.el.btnAttachDocument.on('click',() =>{
                this.closeAllMainPanel();
                this.el.panelDocumentPreview.addClass('open');
                this.el.panelDocumentPreview.css({
                    'height': 'calc(100% - 120px)'
                }); // Corrigindo posição.

                this.el.inputDocument.click(); // Abrir aba de envio de documentos.

            }); // Dentro do clip, botão para adicionar documentos(PDF,DOC,...) a conversa.

            this.el.inputDocument.on('change', () => {
                
                // If verificando se algum documento/imagem foi selecionado de fato.

                if (this.el.inputDocument.files.length) {

                    this.el.panelDocumentPreview.css({
                        'height': 'calc(100% - 120px)'
                    });
                    let file = this.el.inputDocument.files[0]; // Seleciona apenas um documento.

                    this._documentPreviewController = new DocumentPreviewController(file); // Instanciando classe de visualização de documentos.

                    // O método getPreviewData da classe DocumentPreviewController retorna uma promessa.

                    this._documentPreviewController.getPreviewData().then(result =>{
                        // Caso de sucesso.

                        this.el.panelDocumentPreview.css({
                            'height': 'calc(100%-120px)'
                        });

                        this.el.imgPanelDocumentPreview.src = result.src;
                        this.el.infoPanelDocumentPreview.innerHTML = result.info;
                        this.el.imagePanelDocumentPreview.show();
                        this.el.filenamePanelDocumentPreview.hide();

                    }).catch(err =>{
                        // Caso seja um arquivo não-pré definido

                        this.el.panelDocumentPreview.css({
                            'height': 'calc(100%-120px)'
                        });

                        switch (file.type) {
                            case 'application/msword':
                            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                                break;

                            case 'application/zip':
                            case 'application/x-zip-compressed':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-zip';

                            break;
                            
                            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            case 'application/vnd.ms-excel':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';

                            break;

                            case 'application/vnd.ms-powerpoint':
                            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';

                            default:
                                this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                                break;
                        }
                        console.log(file)
                        this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                        this.el.imagePanelDocumentPreview.hide();
                        this.el.filePanelDocumentPreview.show();
                        
                        // Caso de erro.
                        // console.error(err); 
                    });

                }

            }); // Envio da foto e apareciçam da mesma ao usuario.


            this.el.btnClosePanelDocumentPreview.on('click',()=>{
                this.closeAllMainPanel();
                this.el.panelMessagesContainer.show();
            });  // Fechando o painel de documentos. Voltando a tela de convesa;

            this.el.btnSendDocument.on('click',()=>{

                console.log('Enviando documento...');

            }); // Enviando o documento dentro da convesa. 


            this.el.btnAttachContact.on('click',() =>{

                this.el.modalContacts.show(); // Abrindo o modal, para escolher os contatos.

            }); // Dentro do clip, botão para adicionar contatos a conversa.

            this.el.btnCloseModalContacts.on('click',()=>{
                this.el.modalContacts.hide();
            }); // Fechando o modal de escolha de contatos.


        /* FIM -- MÉTODOS RELACIONADOS AO CLIPE */

        /* INICIO -- MÉTODOS RELACIONADOS AO MICROFONE */

            this.el.btnSendMicrophone.on('click',()=>{

                this.el.recordMicrophone.show(); // Abrindo interface de gravação de audio.
                this.el.btnSendMicrophone.hide(); // Escodendo o proprio microfone, para evitar conflitos de interface.

                this.startRecordMicrophoneTime();
                this._microphoneController = new MicrophoneController();
            }); // Barra de mensagens ao clicar no microfone.

            this.el.btnCancelMicrophone.on('click',()=>{

                // Botão vermelho.

                this.closeRecordMicrophone(); // Voltando a interface padrão, NÃO ENVIOU AUDIO.
                
                
            })// Interface de gravação de audio botão cancelar.


            this.el.btnFinishMicrophone.on('click',()=>{

                // Botão verde.

                this.closeRecordMicrophone(); // Voltando a interface padrão, após envio do audio.

            }); // Interface de gravação de audio botão enviar/confirmar.

        /* FIM -- MÉTODOS RELACIONADOS AO MICROFONE */
            
        /* INICIO -- MÉTODOS RELACIONADOS AO CAMPO DE MENSAGEM/TEXTO */

            this.el.inputText.on('keypress',e=>{
               
                if(e.key === 'Enter' && !e.crtlKey){
                    this.el.btnSend.click();
                    e.preventDefault();
                }

            }); // Verificando se apertou enter e forçando o click para envio da mensagem.

            this.el.inputText.on('keyup',()=>{

                if(!this.el.inputText.innerHTML.length){
                    this.el.inputPlaceholder.show();
                    this.el.btnSend.hide();
                    this.el.btnSendMicrophone.show();
                    

                    // Bloco de texto vazio;
                    // Troca de botão enviar para microfone e esconder placeholder.
 
                }else{
                    this.el.inputPlaceholder.hide();
                    this.el.btnSend.show();
                    this.el.btnSendMicrophone.hide();


                    // Bloco de texto com algo;
                    // Troca de botão microfone para enviar e esconder placeholder.
                }

            }); // Interface de texto/envio de mensagens.

            this.el.btnSend.on('click',()=>{

                let txt = this.el.inputText.innerHTML;
                console.log(txt);
                this.el.inputText.innerHTML = "";
                this.el.inputPlaceholder.show();
                    
            }) // Botão de envio de mensagem.



        /* FIM -- MÉTODOS RELACIONADOS AO CAMPO DE MENSAGEM/TEXTO */

        /* INICIO -- MÉTODOS RELACIONADOS AO CAMPO DE EMOJIS */
            
            this.el.btnEmojis.on('click',()=>{

                this.el.panelEmojis.toggleClass('open'); // Abrindo e fechando a aba de emojis

            }); // Aba de emojis.


            this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji =>{

                emoji.on('click',()=>{
                    console.log(emoji.dataset.unicode);

                    let img = this.el.imgEmojiDefault.cloneNode();
                    
                    img.style.cssText = emoji.style.cssText;
                    img.dataset.unicode = emoji.dataset.unicode;    
                    img.alt = emoji.dataset.unicode; 

                    emoji.classList.forEach(name =>{

                        img.classList.add(name);

                    });

                    let cursor = window.getSelection();

                    if(!cursor.focusNode || cursor.focusNode.id != 'input-text'){

                        this.el.inputText.focus();
                        cursor = window.getSelection();
                    }

                    let range = document.createRange();
                    range = cursor.getRangeAt(0);
                    range.deleteContents();
                    
                    let frag = document.createDocumentFragment();
                    frag.appendChild(img);

                    range.insertNode(frag);

                    range.setStartAfter(img);

                    this.el.inputText.dispatchEvent(new Event('keyup'));

                }); 

            }) // Selecionando todos os emojis e Observando os emojis, se vão ser clicados.
        
        /* FIM -- MÉTODOS RELACIONADOS AO CAMPO DE MENSAGEM/TEXTO */   

    } // Fechando o método initEvents()

    startRecordMicrophoneTime(){

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(()=>{

            let duration = Date.now() - start

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime(duration);

        },100);
    }

    closeRecordMicrophone(){
        
        this._microphoneController.stop();
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show(); 
        clearInterval(this._recordMicrophoneInterval);
        
    }

    closeAllMainPanel(){

        // Este método fecha todas as telas da parte central,
        // É importante, o mesmo ser o primeiro a ser chamado.

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');
  
    } // Fechando o método closeAllMainPanel()q


    closeAllLeftPanels() {
        // Método para fechar todas as telas a direita, evitando sobrecarregamento e bugs.

        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();

    } // Fechando o método initEvents()

    closeMenuAttach(){

           // Método para fechar o menu anexar/clip.

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');
        
        
    }// Método(função) para o fechamento do menu 'clip'.


} // Fechando a classe WhatsAppController();