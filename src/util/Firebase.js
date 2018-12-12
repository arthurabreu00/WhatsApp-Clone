// Classe de exportação e comfiguração do firebase
const firebase = require('firebase');
require('firebase/firestore')

export class Firebase {
    constructor(){
        this._config =  {
            apiKey: "AIzaSyAX_X4rajAoFXhYbRXWaDPQ6VdKxKKS2r0",
            authDomain: "whatsapp-clone-acfaa.firebaseapp.com",
            databaseURL: "https://whatsapp-clone-acfaa.firebaseio.com",
            projectId: "whatsapp-clone-acfaa",
            storageBucket: "whatsapp-clone-acfaa.appspot.com",
            messagingSenderId: "275534463411"
        }
        this.init();
    }

    init(){
          // Inicializando o Firebase
        if(!this.initializeApp){
            // Verificando se ja foi iniciado. Para evitar erros e sobre-cargas
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots : true
            })

            this.initializeApp = true;
        }
          
    }

    static db(){
        return firebase.firestore();
    }

    static hd(){
        return firebase.storage();
    }

    initAuth(){
        return new Promise((s,f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(result =>{
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
  
