module.exports = Traductor = (codigoP) => {
    let codigoC = "#include <stdio.h>\nint main (void){\n";
    codigoP.forEach((instruccion) => {
        if (instruccion.declara) {
            const var_aux =
                instruccion.declara.tipo +
                " " +
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
            codigoC += "printf(" + instruccion.imprime + "); \n";
        }
    });
    codigoC += "}";
    console.log(codigoC);
    const fs = require("fs");
    const archivo = "../resultado/programa.c";
    fs.writeFile(archivo, codigoC, (err) => {
        if (err) throw "Hubo un error al escribir el archivo";
        console.log("Se ha escrito el codigo en el archivo");
    });
};
