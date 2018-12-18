import { Model } from "./model";
import { Firebase } from "../util/Firebase";

export class Chat extends Model{
    constructor(){
        super();
    }

    // Get and setters dos atributos necessarios, como usuarios e e os horarios.

    get users(){return this._data_users;}
    set users(value){this._data_users = value;}

    get timeStamp(){return this._data_timeStamp;}
    set timeStamp(value){this._data_timeStamp = value;}

    static getRef(){
        // Pegando a refêrencia do firebase e acessando a coleção dos chats.
        return Firebase.db().collection('/chats');
    } // Fim do método getRef();

    static createIfNotExists(meEmail,contactEmail){
        return new Promise((s,f)=>{

            Chat.find(meEmail,contactEmail).then(chats =>{

                // Propriedadade do firebase.
                if(chats.empty){
                    // É preciso criar a conversa;
                    Chat.create(meEmail,contactEmail).then(chat =>{
                        s(chat);
                    }).catch(e =>{
                        f(e);
                    }); // Fim da promessa, vinda do create();
                }else{
                    // Entrando na conversa.
                    chats.forEach(chat =>{
                        s(chat);
                    }) // Fim do forEach;
                }

            }).catch(err=>{
                f(err);
            });// Fim da promessa, vinda do find();

        });// Fim da promessa;
    } // Fim do método createIfNotExists();

    static find(meEmail,contactEmail){
        // Método que procura se existe uma conversa existente.
        return Chat.getRef('/chats')
            .where(btoa(meEmail),'==',true)
            .where(btoa(contactEmail),'==',true)
            .get();
    } // Fim do método find();

    static create(meEmail,contactEmail){
        // Método que cria conversas(chats);
        return new Promise((s,f)=>{

            let users = {};

            // Sim, agora, existe uma
            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;
            
            Chat.getRef().add({
                users,
                timeStamp: new Date()
            }).then(doc =>{
                Chat.getRef().doc(doc.id).get().then(chat =>{
                    s(chat);
                }).catch(err =>{
                    f(err);
                }); // getRef.doc()
            }).catch(err =>{
                f(err);
            }); // Fim da promessa, vinda do getRef.add();

        }); // Fim da promessa;
    } // Fim do método create();

}