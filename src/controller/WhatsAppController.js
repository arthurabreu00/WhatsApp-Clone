import {Format} from './../util/Format';
import {CameraController} from './CameraController';
import {MicrophoneController} from './MicrophoneController';
import {DocumentPreviewController} from './DocumentPreviewController';
import {Firebase} from './../util/Firebase';
import {User} from './../model/User';
import {Chat} from './../model/Chat';



export class WhatsAppController {

    constructor() {

        this.elementsPrototype(); // Carregando os prototypes.
        this.loadElements(); // Carregando os elementos da tela
        this.initEvents(); // Inicializando as escutas e eventos
        this._firebase = new Firebase(); // Inicializando o banco de dados
        this.initAuth(); // Autentificação do usuario
    }

    initAuth() {

        this.el.appContent.hide(); // Não demonstra a aplicação, enquanto estiver logando

        // Parte de autentificação do usuario
        this._firebase.initAuth()
            .then((res) => {
                // Declarando um novo usuario, utilizando como chave o email.
                this._user = new User(res.user.email);

                this._user.on('datachange', data => {
                    document.querySelector('title').innerHTML = data.name + ' - WhatsApp Clone';

                    this.el.inputNamePanelEditProfile.innerHTML = data.name;

                    // Se existir uma foto no firebase...
                    if (data.photo) {
                        // Foto maior, dentro da parte pessoal.
                        let photo = this.el.imgPanelEditProfile;
                        photo.src = data.photo;
                        photo.show();
                        this.el.imgDefaultPanelEditProfile.hide();

                        // Foto em miniatura (Ao abrir a aplicação)
                        let photo2 = this.el.myPhoto.querySelector('img'); // Selecionando a imagem
                        photo2.src = data.photo; // Substituindo pela a imagem que veio do firebase
                        photo2.show(); // Mostrando a foto
                    }

                    this.initContacts(); // Carregando a lista de contatos

                }); // Fim da promessa, da inicialização da firebase (sucess).

                // Em caso de sucesso, levar para a aplicação os dados do firebase: nome,email e foto.
                this._user.name = res.user.displayName;
                this._user.email = res.user.email;
                this._user.photo = res.user.photoURL;

                // Após o usuario ser autentificado, mostrar a tela com seus dados.
                this._user.save().then(() => {
                    this.el.appContent.css({
                        display: 'flex'
                    });
                });

            })
            .catch(err => {
                console.error(err); //  Em caso de erro, demonstre...
            });
    } // Fechando o método initAuth()

    initContacts() {
        // Método para carregar a lista de contatos
        this._user.on('contactschange', docs => {

            this.el.contactsMessagesList.innerHTML = '';

            // Para cada contato faça...
            docs.forEach(doc => {

                let contact = doc.data();
                let div = document.createElement('div');

                div.className = 'contact-item';

                // HTML da parte de contatos.
                div.innerHTML = `
                <div class="dIyEr">
                <div class="_1WliW" style="height: 49px; width: 49px;">
                    <img src="#" class="Qgzj8 gqwaM photo" style="display:none;">
                    <div class="_3ZW2E">
                        <span data-icon="default-user" class="">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212 212" width="212" height="212">
                                <path fill="#DFE5E7" d="M106.251.5C164.653.5 212 47.846 212 106.25S164.653 212 106.25 212C47.846 212 .5 164.654.5 106.25S47.846.5 106.251.5z"></path>
                                <g fill="#FFF">
                                    <path d="M173.561 171.615a62.767 62.767 0 0 0-2.065-2.955 67.7 67.7 0 0 0-2.608-3.299 70.112 70.112 0 0 0-3.184-3.527 71.097 71.097 0 0 0-5.924-5.47 72.458 72.458 0 0 0-10.204-7.026 75.2 75.2 0 0 0-5.98-3.055c-.062-.028-.118-.059-.18-.087-9.792-4.44-22.106-7.529-37.416-7.529s-27.624 3.089-37.416 7.529c-.338.153-.653.318-.985.474a75.37 75.37 0 0 0-6.229 3.298 72.589 72.589 0 0 0-9.15 6.395 71.243 71.243 0 0 0-5.924 5.47 70.064 70.064 0 0 0-3.184 3.527 67.142 67.142 0 0 0-2.609 3.299 63.292 63.292 0 0 0-2.065 2.955 56.33 56.33 0 0 0-1.447 2.324c-.033.056-.073.119-.104.174a47.92 47.92 0 0 0-1.07 1.926c-.559 1.068-.818 1.678-.818 1.678v.398c18.285 17.927 43.322 28.985 70.945 28.985 27.678 0 52.761-11.103 71.055-29.095v-.289s-.619-1.45-1.992-3.778a58.346 58.346 0 0 0-1.446-2.322zM106.002 125.5c2.645 0 5.212-.253 7.68-.737a38.272 38.272 0 0 0 3.624-.896 37.124 37.124 0 0 0 5.12-1.958 36.307 36.307 0 0 0 6.15-3.67 35.923 35.923 0 0 0 9.489-10.48 36.558 36.558 0 0 0 2.422-4.84 37.051 37.051 0 0 0 1.716-5.25c.299-1.208.542-2.443.725-3.701.275-1.887.417-3.827.417-5.811s-.142-3.925-.417-5.811a38.734 38.734 0 0 0-1.215-5.494 36.68 36.68 0 0 0-3.648-8.298 35.923 35.923 0 0 0-9.489-10.48 36.347 36.347 0 0 0-6.15-3.67 37.124 37.124 0 0 0-5.12-1.958 37.67 37.67 0 0 0-3.624-.896 39.875 39.875 0 0 0-7.68-.737c-21.162 0-37.345 16.183-37.345 37.345 0 21.159 16.183 37.342 37.345 37.342z"></path>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            <div class="_3j7s9">
                <div class="_2FBdJ">
                    <div class="_25Ooe">
                        <span dir="auto" title="Nome do Contato" class="_1wjpf">${contact.name}</span>
                    </div>
                    <div class="_3Bxar">
                        <span class="_3T2VG">${contact.lastMessageTime}</span>
                    </div>
                </div>
                <div class="_1AwDx">
                    <div class="_itDl">
                        <span title="digitando…" class="vdXUe _1wjpf typing" style="display:none">digitando…</span>
    
                        <span class="_2_LEW last-message">
                            <div class="_1VfKB">
                                <span data-icon="status-dblcheck" class="">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18">
                                        <path fill="#263238" fill-opacity=".4" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"></path>
                                    </svg>
                                </span>
                            </div>
                            <span dir="ltr" class="_1wjpf _3NFp9">${contact.lastMessage}</span>
                            <div class="_3Bxar">
                                <span>
                                    <div class="_15G96">
                                        <span class="OUeyt messages-count-new" style="display:none;">1</span>
                                    </div>
                            </span></div>
                            </span>
                    </div>
                </div>
            </div>
            `;

                // Caso usuario tenha foto, o exibia.
                if (contact.photo) {
                    let img = div.querySelector('.photo'); // Selecionando a tag <img> da foto, dentro da div criada
                    img.src = contact.photo; // O elemento recebe a foto de fato.
                    img.show(); // Mostrando a imagem de fato.
                }

                // Quando clicarem na div de contato, faça...
                div.on('click',e =>{
                    
                    // Atualizando a tela principal de conversa, parte superior
                    this.el.activeName.innerHTML = contact.name;
                    this.el.activeStatus.innerHTML = contact.status;

                    if(contact.photo){
                        // If muito parecido com o acima.
                        let img = this.el.activePhoto;
                        img.src = contact.photo; 
                        img.show(); 
                    }

                    this.el.home.hide();
                    this.el.main.css({
                        display: 'flex'
                    });

                });

                this.el.contactsMessagesList.appendChild(div); // Jutando e mostrando as  divs criadas.
            });

        });

        // Chamando a classe que resgata todos os contatos.
        this._user.getContacts();
        
    } // Fechando o método initContacts()


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

        } // Verificando a existencia da classe via JS.

        HTMLFormElement.prototype.getForm = function () {

            return new FormData(this);

        } // Facilitando a busca de formularios, via FormData.

        HTMLFormElement.prototype.toJSON = function () {

            let json = {};

            this.getForm().formData((value, key) => {

                json[key] = value;

            });

            return JSON

        } // Facilitando a organização dos dados do formulario via JSON.



    } // Fechando o método elementsPrototype()


    initEvents() {

        // Método de inicialização de todos os eventos.

        /* INICIO -- MÉTODOS RELACIONADOS A EDIÇÃO DE INFORMAÇÕES DO PERFIL DO ÚSUARIO */

        this.el.myPhoto.on('click', () => {

            this.closeAllLeftPanels();
            this.el.panelEditProfile.show('open');

            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300); // Intervalo para garantir animação.

        }); // Ao clicar na foto dispara este evento, para editar informações sobre o perfil do úsuario.

        this.el.btnClosePanelEditProfile.on('click', () => {

            this.el.panelEditProfile.removeClass('open');

        }); // Fechar formulario de edição do perfil.



        this.el.photoContainerEditProfile.on('click', () => {

            this.el.inputProfilePhoto.click();

            // Forçando o click. para o input type file, para inserção da foto;

        }); // Click para troca da foto.

        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if (e.key === 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            } // Se for Enter salvar, o botão em vez de quebrar a linha.

        }) // Método para Verificando as teclas inseridas, no formulário de edição do perfil.

        this.el.btnSavePanelEditProfile.on('click', () => {

            this.el.btnSavePanelEditProfile.disabled = true;

            this._user.name = app.el.inputNamePanelEditProfile.innerHTML;
            
            this._user.save().then(() => {
                this.el.btnSavePanelEditProfile.disabled = false;
                this.el.btnClosePanelEditProfile.click();
            }).catch(err => {
                console.error(err);
            });

        })

        /* FIM -- MÉTODOS RELACIONADOS A EDIÇÃO DE INFORMAÇÕES DO PERFIL DO ÚSUARIO */

        /* INICIO -- MÉTODOS RELACIONADOS A INSERÇÃO DE NOVOS CONTATOS */

        this.el.btnNewContact.on('click', () => {

            this.closeAllLeftPanels();
            this.el.panelAddContact.show('open');

            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300); // Intervalo para garantir animação.


        }); // Ao clicar no botão de novo contato dispara este evento, para adiconar novos contatos.

        this.el.btnClosePanelAddContact.on('click', () => {

            this.el.panelAddContact.removeClass('open');

        }); // Fechar formulario de adição de contatos.

        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();

            let formData = new FormData(this.el.formPanelAddContact);

            let contact = new User(formData.get('email'));
            contact.on('datachange', data => {
                if (data.name) {

                Chat.createIfNotExists(this._user.email, contact.email).then(chat =>{
                    
                    // Amarrando o chat a algum contato, definindo Id's.
                    contact.chatId = chat.id;
                    this._user.chatId = chat.id;

                    contact.addContact(this._user);

                    //Promessa que adiciona o contato.
                    this._user.addContact(contact).then(()=> {
                        console.info('Contato foi adicionado')
                        this.el.btnClosePanelAddContact.click();
                    }).catch(err => {
                        console.error(err);
                    });
                });


                } else {
                    console.error('Usuario não foi encontrado')
                }
            })


        });

        /* FIM -- MÉTODOS RELACIONADOS A INSERÇÃO DE NOVOS CONTATOS */

        /* INICIO -- MÉTODOS RELACIONADOS AO CLIPE*/

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            item.on('click', () => {
                this.el.home.hide();

                this.el.main.css({
                    display: 'flex'
                });

            }); // Troca de tela ao cliclar na convesa.

        }); // Elemento para trocar da tela inicial, para a tela da conversa.

        this.el.btnAttach.on('click', e => {

            e.stopPropagation(); // Fim do efeito cascata.
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this)); // .bind(), Escopo a sua escolha.

        }); // Clicando no clip e suas opções de menu, para contato,arquivos,audio,imagens,etc.

        this.el.btnAttachPhoto.on('click', () => {

            this.el.inputPhoto.click();
        }); // Dentro do clip, botão para adicionar fotos a conversa.

        this.el.inputPhoto.on('change', e => {

            console.log(this.el.inputPhoto.files);

            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file);
            })

        }); // Observando mudanças e arquivos enviados via botão foto.


        this.el.btnAttachCamera.on('click', () => {

            this.closeAllMainPanel(); // Fechando todos os paineis anteriores, possibiltando o prox comando.
            this.el.panelCamera.addClass('open'); // Abrindo a classe, (aparecer);
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });

            this._camera = new CameraController(this.el.videoCamera); // Passando o atributo necessário.


        }); // Dentro do clip, botão para acionar cameras e tirar fotos e enviar diretamente a conversa.


        this.el.btnClosePanelCamera.on('click', () => {

            this.closeAllMainPanel(); // Fechando os paneis sobre salentes.
            this.el.panelMessagesContainer.show(); // Tela de conversa
            this._camera.stop(); // Parando a gravação do vídeo.

        }) // Fechando o painel da câmera. Voltando a tela de convesa;

        this.el.btnTakePicture.on('click', () => {

            let dataUrl = this._camera.takePicture(); // Obtendo o Basex64 da foto.

            this.el.pictureCamera.src = dataUrl; // Mudando o atributo, para a foto tirada.
            this.el.pictureCamera.show(); // Mostrando a foto recebida;
            this.el.videoCamera.hide(); // Escodendo o vídeo, permitindo aparecer a foto.
            this.el.btnReshootPanelCamera.show(); // Botão para tirar a foto novamente.
            this.el.containerTakePicture.hide(); // Escodendo o botão de tirar a foto, para evitar bugs.
            this.el.containerSendPicture.show(); // Botão para enviar a foto a conversa.

        }); // Botão dentro da painel da câmera, para tirar a foto.

        this.el.btnReshootPanelCamera.on('click', () => {

            this.el.pictureCamera.hide(); // Mostrando a foto recebida;
            this.el.videoCamera.show(); // Escodendo o vídeo, permitindo aparecer a foto.
            this.el.bntReshootPanelCamera.hide(); // Botão para tirar a foto novamente.
            this.el.containerTakePicture.show(); // Escodendo o botão de tirar a foto, para evitar bugs.
            this.el.containerSendPicture.hide(); // Botão para enviar a foto a conversa.

        })

        this.el.containerSendPicture.on('click', () => {
            console.log('Enviando a foto...', this.el.pictureCamera.src);
        })


        this.el.btnAttachDocument.on('click', () => {
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

                this._documentPreviewController.getPreviewData().then(result => {
                    // Caso de sucesso.

                    this.el.panelDocumentPreview.css({
                        'height': 'calc(100%-120px)'
                    });

                    this.el.imgPanelDocumentPreview.src = result.src;
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filenamePanelDocumentPreview.hide();

                }).catch(err => {
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


        this.el.btnClosePanelDocumentPreview.on('click', () => {
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        }); // Fechando o painel de documentos. Voltando a tela de convesa;

        this.el.btnSendDocument.on('click', () => {

            console.log('Enviando documento...');

        }); // Enviando o documento dentro da convesa. 


        this.el.btnAttachContact.on('click', () => {

            this.el.modalContacts.show(); // Abrindo o modal, para escolher os contatos.

        }); // Dentro do clip, botão para adicionar contatos a conversa.

        this.el.btnCloseModalContacts.on('click', () => {
            this.el.modalContacts.hide();
        }); // Fechando o modal de escolha de contatos.


        /* FIM -- MÉTODOS RELACIONADOS AO CLIPE */

        /* INICIO -- MÉTODOS RELACIONADOS AO MICROFONE */

        this.el.btnSendMicrophone.on('click', () => {

            this.el.recordMicrophone.show(); // Abrindo interface de gravação de audio.
            this.el.btnSendMicrophone.hide(); // Escodendo o proprio microfone, para evitar conflitos de interface.

            this._microphoneController = new MicrophoneController();

            this._microphoneController.on("ready", () => {
                this._microphoneController.startRecord();
            });

            this._microphoneController.on('recordtimer', (timer) => {
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(timer);
            });

        }); // Barra de mensagens ao clicar no microfone.

        this.el.btnCancelMicrophone.on('click', () => {

            // Botão vermelho.
            this._microphoneController.stopRecord(); // Parando a gravação
            this.closeRecordMicrophone(); // Voltando a interface padrão, NÃO ENVIOU AUDIO.


        }) // Interface de gravação de audio botão cancelar.


        this.el.btnFinishMicrophone.on('click', () => {

            // Botão verde.
            this._microphoneController.stopRecord(); // Parando a gravação
            this.closeRecordMicrophone(); // Voltando a interface padrão, após envio do audio.

        }); // Interface de gravação de audio botão enviar/confirmar.

        /* FIM -- MÉTODOS RELACIONADOS AO MICROFONE */

        /* INICIO -- MÉTODOS RELACIONADOS AO CAMPO DE MENSAGEM/TEXTO */

        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.crtlKey) {
                this.el.btnSend.click();
                e.preventDefault();
            }

        }); // Verificando se apertou enter e forçando o click para envio da mensagem.

        this.el.inputText.on('keyup', () => {

            if (!this.el.inputText.innerHTML.length) {
                this.el.inputPlaceholder.show();
                this.el.btnSend.hide();
                this.el.btnSendMicrophone.show();


                // Bloco de texto vazio;
                // Troca de botão enviar para microfone e esconder placeholder.

            } else {
                this.el.inputPlaceholder.hide();
                this.el.btnSend.show();
                this.el.btnSendMicrophone.hide();


                // Bloco de texto com algo;
                // Troca de botão microfone para enviar e esconder placeholder.
            }

        }); // Interface de texto/envio de mensagens.

        this.el.btnSend.on('click', () => {

            let txt = this.el.inputText.innerHTML;
            console.log(txt);
            this.el.inputText.innerHTML = "";
            this.el.inputPlaceholder.show();

        }) // Botão de envio de mensagem.



        /* FIM -- MÉTODOS RELACIONADOS AO CAMPO DE MENSAGEM/TEXTO */

        /* INICIO -- MÉTODOS RELACIONADOS AO CAMPO DE EMOJIS */

        this.el.btnEmojis.on('click', () => {

            this.el.panelEmojis.toggleClass('open'); // Abrindo e fechando a aba de emojis

        }); // Aba de emojis.


        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {
            // Selecionando todos os emojis
            emoji.on('click', () => {

                let img = this.el.imgEmojiDefault.cloneNode(); // Concatenando multiplos emojis

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {

                    img.classList.add(name);

                });

                let cursor = window.getSelection();

                if (!cursor.focusNode || cursor.focusNode.id != 'input-text') {

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



    closeRecordMicrophone() {

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

    }

    closeAllMainPanel() {

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

    closeMenuAttach() {

        // Método para fechar o menu anexar/clip.

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');


    } // Método(função) para o fechamento do menu 'clip'.


} // Fechando a classe WhatsAppController();