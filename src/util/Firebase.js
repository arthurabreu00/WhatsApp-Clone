// Classe de exportação e configuração do firebase
const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyAX_X4rajAoFXhYbRXWaDPQ6VdKxKKS2r0",
            authDomain: "whatsapp-clone-acfaa.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-acfaa.firebaseio.com",
            projectId: "whatsapp-clone-acfaa",
            storageBucket: "whatsapp-clone-acfaa.appspot.com",
            messagingSenderId: "275534463411"
        };

        this.init();

    }

    init() {

        // veririfcando se o Firebase já está inicializado para evitar que se tente
        // inicializar duas vezes. Colocamos na var window para que seja global
        // e, assim, poder ser acessada e ter o mesmo valor em outras chamadas
        if (!window._initializedFirebase) {

            firebase.initializeApp(this._config);

            // como o Firebase ficará em constante uso, precisamos ativar essa opção
            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            window._initializedFirebase = true;

        }

    }

    // Acionando o banco de dados, firestore.
    static db() {

        return firebase.firestore();

    }

    // Acionando módulo de armazanamento de arquivos.
    static hd() {

        return firebase.storage();

    }

    initAuth() {

        return new Promise((s, f) => {

            // Adicionar a um provedor de acesso, no caso será o Google.
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });

            }).catch(err => {
                f(err);
            });

        });

    }

}