import {Firebase} from './../util/Firebase';
import { Model } from './model';


export class User extends Model{
    // Está classe extende de model, que este de classEvent, ou seja, ela é uma classe neta.
    constructor(id){
        super();
        this._data = {};

        if(id) this.getById(id); // Se foi passado um email...
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

    // Procurando o email, entre os cadastrados.
    static findByEmail(email){
        return User.getRef().doc(email);
    }// Fim do método findByEmail();

}