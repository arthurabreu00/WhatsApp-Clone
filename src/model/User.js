import {Firebase} from './../util/Firebase';
import { Model } from './model';
import { promises } from 'fs';


export class User extends Model{
    // Está classe extende de model, que este de classEvent, ou seja, ela é uma classe neta.
    constructor(id){
        super();
        this._data = {}; 

        if(id){ 
            this.getById(id)
        }; // Se foi passado um email...
    }


    // Get e set pegando as informações de maneira correta.
    get name(){ return this._data.name;}
    set name(value){this._data.name = value;}

    get email(){ return this._data.email}
    set email(value){this._data.email = value;}

    get photo(){ return this._data.photo}
    set photo(value){this._data.photo = value;}

    // Fornecendo o ID, para a aplicação
    getById(id){
        return new Promise((s,f) =>{
            User.findByEmail(id).get().then(doc =>{

                this.fromJSON(doc.data());

                s(doc);

            }).catch(err =>{
                f(err); // Em caso de erro, como erros de conexão por exemplo.
            });
        });
    }// Fim do método getById();

    // Salvando a sessão
    save(){
        return User.findByEmail(this.email).set(this.toJSON());
    }// Fim do método Save();

    static getRef(){
        return Firebase.db().collection('/users');
    } // Ordenando-o no firebase, de maneitra correta.

    static getContactsRef(id){
        return User.getRef().doc(id).collection('contacts');
    }

    // Procurando o email, entre os cadastrados.
    static findByEmail(email){
        return User.getRef().doc(email);
    }// Fim do método findByEmail();

    // Método para adiconar contatos ao usuario
    addContact(contact){
        // Adicionando mais um nó (coleção), no banco de dados para os contatos do usuario.
        return User.getContactsRef().doc(btoa(contact.email)).set(contact.toJSON());
    } // Fim do método addContact();

    getContacts(){
        // Método para retornar a lita de amigos de um úsuario.
        return new Promise((s,f)=>{
            User.getContactsRef(this.email).onSnapshot(docs =>{

                let contacts = [];
                
                docs.forEach(doc =>{

                    let data = doc.data();
                    data.id = doc.id;
                    contacts.push(data);

                });

                this.trigger('contactschange',docs);

                s(contacts);

            });

            f('Erro no getContacts()');

        });
    }
}