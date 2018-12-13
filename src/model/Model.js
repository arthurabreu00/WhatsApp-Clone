import { ClassEvent } from "../util/ClassEvent";

// Classe intermediaria, para manipulação de eventos do USER.
export class Model extends ClassEvent{
    constructor(){
        super();
        this._data = {};
    }

   

    fromJSON(json){
        this._data = Object.assign(this._data, json);
        this.trigger('datachange',this.toJSON());
    }

     // Coversão de JSON's.

    toJSON(){
        return this._data;
    }

}