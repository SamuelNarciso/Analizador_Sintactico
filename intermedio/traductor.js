module.exports = Traductor = (codigoP) => {
    let codigoC = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="{{url_for('static' , filename='svg/favicon.svg')}}" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="{{url_for('static' , filename='scss/styles.css')}}" />
    <title>Analizador de sintaxis basica</title>
</head>

<body>
    <div class="contenedorPadre">
       

        <main>
            <div id="formularioInput" class="formulario">
                <div class="identador"></div>
                <div id='textAreaInput' class="cajaTexto" role="textbox" contenteditable> </div>

            </div>
        </main>
        <footer>
            <!-- <p class="author"></p> -->
            <p class="author">Lenguajes y automatas 2</p>
            <!-- <p class="author">Grupo 3</p> -->
        </footer>
    </div>
    <script>
    const textAreaInput = document.querySelector("#textAreaInput");

   `;
    codigoP.forEach((instruccion) => {
        if (instruccion.declara) {
            const var_aux =
                "let " +
                instruccion.declara.nombre +
                ";";
            codigoC += var_aux + "\n";
        }
        if (instruccion.asigna) {
            const asig_aux = instruccion.asigna + "; \n";
            codigoC += asig_aux;
        }
        if (instruccion.mientras) {
            const asig_while =
                "while (" + instruccion.mientras.replace("<>", "!=") + ")\n";
            codigoC += asig_while;
        }
        if (instruccion.inicio) {
            codigoC += "{\n";
        }
        if (instruccion.fin) {
            codigoC += "}\n";
        }
        if (instruccion.imprime) {
            codigoC += "textAreaInput.innerText +=" + instruccion.imprime + "\n";
        }
    });
    codigoC += '</script></body></html>'
    console.log(codigoC);
    const fs = require("fs");
    const archivo = "../AnalizadorSintactico/templates/resultado.html";
    fs.writeFile(archivo, codigoC, (err) => {
        if (err) throw "Hubo un error al escribir el archivo";
        console.log("Se ha escrito el codigo en el archivo");
    });
};
