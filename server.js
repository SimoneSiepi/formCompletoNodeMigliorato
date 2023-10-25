const fs= require("fs");
const http=require("http");
const url = require("url");
const path= require("path");

function validazioneForm(query, errors) {
    const nome = query.nome;
    const cognome = query.cognome;
    const sesso = query.scelta;
    const nascita = query.data_nascita;
    const eta = query.eta;

    if (!nome) {
        errors.push("Il campo Nome e' obbligatorio.");
    }

    if (!cognome) {
        errors.push("Il campo cognome e' obbligatorio.");
    }

    if (!sesso) {
        errors.push("Il campo sesso e' obbligatorio.");
    }

    if (!nascita) {
        errors.push("Il campo data di nascita e' obbligatorio.");
    }

    if (!eta) {
        errors.push("Il campo eta' e' obbligatorio.");
    } else if (isNaN(eta) || parseInt(eta) <= 0) {
        errors.push('Il campo Eta deve essere un numero positivo.');
    }
}


/* function requestHandler(request,response){
    let oggettoUrl=url.parse(request.url, "true");
    console.log("href"+oggettoUrl.href);//fa visuliazzare il nome completo
    const path=oggettoUrl.pathname;//serve per ottenere il nome completo della pagina richiesta
    console.log("pathname:"+path);
    switch (path) {
        case "/":
            fs.readFile("index.html",function(error,data){
                if (error) {
                    response.writeHead(404);
                    response.end("pagina non trovta");
                }else{
                  response.writeHead(200,{"content-Type":"text/html"});
                  response.write(data,"utf8");
                  response.end();
                }
                
            });
            
            break;
            case "/css/Style.css":
                fs.readFile("css/Style.css",function(error,data){
                    if (error) {
                        response.writeHead(404);
                    }else{
                        response.writeHead(200,{"content-Type":"text/css"});
                        response.write(data,"utf8");
                    }
                    response.end();
                });
                break;

        case "/html/recuperaDati.html":
            const query=oggettoUrl.query;
            const nome=oggettoUrl.query.nome;
            const cognome=oggettoUrl.query.cognome;
            const sesso=oggettoUrl.query.scelta;
            const nascita=oggettoUrl.query.data_nascita;
            const eta=oggettoUrl.query.eta;
            const info=oggettoUrl.query.info;

            const errors = [];
            //validazione del form
            validazioneForm(query,errors);
            if (errors.length>0) {
                response.writeHead(400,{"content-Type":"text/plain"});
                response.write("il form non e' stato compilato correttamente"+" "+errors.join('<br>')+"\n");
                response.end();
            }
            else{
                console.log(nome+"\n"+cognome+"\n"+sesso+"\n"+nascita+"\n"+eta+"\n"+info+"\n");
            }

            break;

        default:
            response.writeHead(404, { "content-Type": "text/plain" });
            response.end("nessuna pagina trovata");
            break;
    }
}

 */

function requestHandler(request,response){
    let percorsoFile="."+req.url;
    if (percorsoFile==="./") {
        percorsoFile="./index.html";
    }
    const extname=path.extname(percorsoFile);
    console.log(extname);
    let estensioneFile
    switch(extname){
        case ".html":
            estensioneFile="text/html";
            break;

        case ".css":
            estensioneFile="text/css";
            break;

        case ".js":
            estensioneFile="text/javascript";
    }
}

const server=http.createServer(requestHandler);
server.listen(3000);