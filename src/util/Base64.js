export class Base64{

    static getMimeType(urlBase64){

        let regex = /^data:(.+);base64,(.*)$/;
        let result = urlBase64.match(regex);
        return result[1];
    }

    static toFile(urlBase64){

        let type = Base64.getMimeType(urlBase64)
        let ext =  type.split('/')[1];
        let fileName = 'file'+Date.now()+ext;

        return fetch(urlBase64)
                .then(res => res.arrayBuffer())
                .then(buffer => new File([buffer],fileName,{type}))
    }

}