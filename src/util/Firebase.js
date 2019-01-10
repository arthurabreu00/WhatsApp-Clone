// Classe de exportação e configuração do firebase
const firebase = require('firebase');
require('firebase/firestore')

export class Firebase {
    constructor(){
        this._config =  {
            apiKey: "AIzaSyAX_X4rajAoFXhYbRXWaDPQ6VdKxKKS2r0",
            authDomain: "whatsapp-clone-acfaa.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-acfaa.firebaseio.com",
            projectId: "whatsapp-clone-acfaa",
            storageBucket: "gs://whatsapp-clone-acfaa.appspot.com",
            messagingSenderId: "275534463411"
        }
        this.init();
    }

    init(){
          // Inicializando o Firebase
        if(!window.initializeFirebase){
            // Verificando se ja foi iniciado. Para evitar erros e sobre-cargas
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots : true
            })

            window.initializeFirebase = true;
        }
          
    }

    // Método estatico, de acesso facil ao banco de dados e suas funcionalidades
    static db(){
        
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }   

    // Parte da autentificação do usuario
    initAuth(){
        return new Promise((s,f)=>{
            // Escolhando um provedor de usuario, no caso o google/gmail.
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result =>{
                    // Obtendo token de acesso e outras informações necessárias.
                    let token = result.credential.accessToken;
                    let user = result.user;

                    s({user,token});
                })
                .catch(err =>{
                f(err);
            })

        });
    }

}
  
