const fs= require("fs");
const http=require("http");
const url = require("url");
const path= require("path");

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
    console.log(request.url);
    let percorsoFile="."+request.url;
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
    
    if (percorsoFile=="/recuperaDati") {
        console.log("sono dentro!");
        let messaggio = "";
        let invia=false;
        const query=oggettoUrl.query;
        const nome=oggettoUrl.query.nome;
        const cognome=oggettoUrl.query.cognome;
        const sesso=oggettoUrl.query.scelta;
        const nascita=oggettoUrl.query.data_nascita;
        const eta=oggettoUrl.query.eta;
        const info=oggettoUrl.query.info;
        const regex = /^[a-zA-Z\s]+$/;//variabile di contorollo sui cui utilizzo una regular expression

         let error=``;
         if (!nome || !regex.test(nome)) {
            invia=true;
            error+=`
            <label for="nome" class="error">Nome:</label><br>
            <input type="text" id="nome" name="inserisci un nome"><br>
            `
         }

         if (!cognome || !regex.test(cognome)) {
            invia=true;
            error+=`
            <label for="cognome" class="error">Cognome:</label><br>
            <input type="text" id="cognome" name="inserisci un cognome"><br>
            `
         }

         if (!sesso) {
            invia=true;
            error+=`
            <input type="radio" id="scelta" name="scelta" value="Uomo">
            <label for="Uomo" class="error">Uomo</label><br>
            <input type="radio" id="scelta" name="scelta" value="Donna">
            <label for="Donna" class="error">Donna</label><br>
            <input type="radio" id="scelta" name="scelta" value="non binario">
            <label for="non_binario" class="error">Non binario</label><br>
            `
        }
    
        if (!nascita) {
            invia=true;
            error+=`
            <label for="data_nascita" class="error">data di nascita:</label><br>
            <input type="date" id="data_nascita" name="data_nascita"><br>
            `
        }
    
        if (!eta) {
            invia=true;
            error+=`
            <label for="eta" class="error">Età</label><br>
            <input type="number" id="eta" name="eta"><br>
            `
        } else if (isNaN(eta) || parseInt(eta) <= 0) {
            invia=true;
            error+=`
            <label for="eta" class="error">Età</label><br>
            <input type="number" id="eta" name="eta"><br>
            `  
        }

        messaggio=`<!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/Style.css">
            <title>form completo in node</title>
        </head>
        <body>
            <form action="recuperaDati" method="get">
               
                ${error}

                <input type="submit">
        
            </form>
        </body>
        </html> `

        if (invia==true) {
            response.writeHead(200,{'Content-Type': 'text/html'});
            console.log("funziona!");
            response.write(messaggio);
            response.end();
        }
        else{
            response.writeHead(200,{'Content-Type': 'text/plain'});
            response.write("form compilato correttamente");
            response.end();
        }

            
    }

    fs.readFile(percorsoFile,function(error,data){
        if (error) {
            response.writeHead(404);
        }else{
            response.writeHead(200,{"content-Type":estensioneFile});
            response.write(data,"utf8");
        }
        response.end(); 
    });

}

const server=http.createServer(requestHandler);
server.listen(3000);