const fs= require("fs");
const http=require("http");
const url = require("url");
const path= require("path");


function controlloText(testo, pattern) {
    let controllo=false;
    if (!pattern.test(testo) || !testo) {
        controllo=true;
    }
    return controllo;
}

function checkedRadio(radio,error) {
    if (radio=="Uomo") {
        error+=
        `<input type="radio" id="scelta" name="scelta" value="Uomo" checked>
        <label for="Uomo">Uomo</label><br>
        <input type="radio" id="scelta" name="scelta" value="Donna">
        <label for="Donna">Donna</label><br>
        <input type="radio" id="scelta" name="scelta" value="non binario">
        <label for="non_binario">Non binario</label><br>`;
    }
    else if (radio=="Donna") {
        error+=
        `<input type="radio" id="scelta" name="scelta" value="Uomo">
        <label for="Uomo">Uomo</label><br>
        <input type="radio" id="scelta" name="scelta" value="Donna" checked>
        <label for="Donna">Donna</label><br>
        <input type="radio" id="scelta" name="scelta" value="non binario">
        <label for="non_binario">Non binario</label><br>`;
    }
    else{
        error+=
        `<input type="radio" id="scelta" name="scelta" value="Uomo">
        <label for="Uomo">Uomo</label><br>
        <input type="radio" id="scelta" name="scelta" value="Donna">
        <label for="Donna">Donna</label><br>
        <input type="radio" id="scelta" name="scelta" value="non binario" checked>
        <label for="non_binario">Non binario</label><br>`;
    }
    return error;
}

function requestHandler(request,response){

    let oggettoUrl=url.parse(request.url,"true");
    let percorsoFile="."+oggettoUrl.pathname;
    console.log(percorsoFile);
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
            break;
        
        case ".jpg":
            estensioneFile="image/jpg";
            break;

        case ".img":
            estensioneFile="image/img";
            break;
    }
    
    if (percorsoFile=="./recuperaDati") {
        let messaggio = "";
        let invia=false;
        const query=oggettoUrl.query;
        const nome=oggettoUrl.query.nome;
        const cognome=oggettoUrl.query.cognome;
        const sesso=oggettoUrl.query.scelta;
        const nascita=oggettoUrl.query.data_nascita;
        const eta=oggettoUrl.query.eta;
        const email=oggettoUrl.query.email;
        const checkbox=oggettoUrl.query.cibo;
        //const info=oggettoUrl.query.info;
        const regexTesto = /^[a-zA-Z\s]+$/;//variabile di contorollo sui cui utilizzo una regular expression
        const regexEta=/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const regexNumber= /^[0-9]+$/;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


         let error=``;
         if (controlloText(nome,regexTesto)) {
            invia=true;
            error+=`
            <label for="nome" >Nome:</label><br>
            <input class="error" type="text" id="nome" name="nome"  value="inserisci nome"><br>
            `;
         }
         else{
            error+=`
            <label for="nome" >Nome:</label><br>
            <input type="text" id="nome" name="nome"  value="${nome}"><br>
            `;
         }

         if (controlloText(cognome ,regexTesto)) {
            invia=true;
            error+=`
            <label for="cognome" >Cognome:</label><br>
            <input class="error" type="text" id="cognome" name="cognome" value="inserisci cognome"><br>
            `;
         }
         else{
            error+=`
            <label for="cognome" >Cognome:</label><br>
            <input type="text" id="cognome" name="cognome" value="${cognome}"><br>
            `;
         }

         if (!sesso) {
            invia=true;
            error+=`
            <input type="radio" id="scelta" name="scelta" value="Uomo">
            <label class="errorLabels" for="Uomo" >Uomo</label><br>
            <input type="radio" id="scelta" name="scelta" value="Donna">
            <label class="errorLabels" for="Donna" >Donna</label><br>
            <input type="radio" id="scelta" name="scelta" value="non binario">
            <label class="errorLabels" for="non_binario" >Non binario</label><br>
            `;
        }
        else{
            error=checkedRadio(sesso,error);//funzione che ritorna gli input radio con uno dei radio button checked
        }
    
        if (!regexEta.test(nascita) || !nascita) {
            invia=true;
            error+=`
            <label for="data_nascita" >data di nascita:</label><br>
            <input class="error" type="text" id="data_nascita" name="data_nascita" value="inserisci data di nascita"><br>
            `;
        }
        else{
            error+=`
            <label for="data_nascita" >data di nascita:</label><br>
            <input type="text" id="data_nascita" name="data_nascita" value="${nascita}"><br>
            `;
        }
    
        if (controlloText(eta,regexNumber)) {
            invia=true;
            error+=`
            <label for="eta" >Età</label><br>
            <input class="error" type="text" id="eta" name="eta" value="inserisci una eta valida"><br>
            `;
        }
        else{
            error+=`
            <label for="eta" >Età</label><br>
            <input type="text" id="eta" name="eta" value="${eta}"><br>
            `;
        }

        if (!regexEmail.test(email) || !email) {
            invia=true;
            error+=`<label for="email">Email</label><br>
            <input class="error" type="text" id="email" name="email" value="email non valida"><br>`;
        }
        else{
            error+=
            `<label for="email">Email</label><br>
             <input type="text" id="email" name="email" value="${email}"><br>`;
        }

         if (!checkbox) {
            invia=true;
            error+=`<p>Cibo Preferito</p><br>
            <input type="checkbox" name="cibo" id="cibo1" value="pizza">
            <label for="cibo1" class="errorLabels">Pizza</label><br>
            <input type="checkbox" name="cibo" id="cibo2" value="pasta">
            <label for="cibo2" class="errorLabels">Pasta</label><br>
            <input type="checkbox" name="cibo" id="cibo3" value="risotto">
            <label for="cibo3" class="errorLabels">Risotto</label><br>`;
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
        </html> `;

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
            response.write("pagina non trovata");
        }else{
            response.writeHead(200,{"content-Type":estensioneFile});
            response.write(data,"utf8");
        }
        response.end(); 
    });

}

const server=http.createServer(requestHandler);
server.listen(3000);