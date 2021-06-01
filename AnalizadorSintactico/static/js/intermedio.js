let code = [];
function CodigoP(texto) {
    code = [];
    let aux = texto.split("\n");
    aux.forEach((e) => {
        if (e) {
            IsVar(e, {
                expresion: /int/,
                tipo: "int",
                valor: 0,
            });
            IsVar(e, {
                expresion: /String/,
                tipo: "String",
                valor: "",
            });
            IsVar(e, {
                expresion: /float/,
                tipo: "float",
                valor: 0.0,
            });
            IsWrite(e);
            IsOperation(e);
        }
    });
    console.log("CodigoP");
    console.log(JSON.stringify({codigoP: code}));
}

function IsOperation(e) {
    const pattern = /[+,-,*,/,]/;
    const pattern2 = /[=]/;
    const validation = e.match(pattern);
    if (validation !== null) {
        resolver(e);
    } else if (e.match(pattern2)) {
        const auxcadena = e.split("=");
        auxcadena.push("=");
        const auxasigna = {
            asigna: auxcadena,
        };
        code.push(auxasigna);
    }
}
function IsVar(e, parametros) {
    const pattern = parametros.expresion;
    const validation = e.match(pattern);
    if (validation !== null) {
        limpio = e.replace(/\s/g, "").split(parametros.tipo);
        let nombre = "";
        limpio.forEach((element) => {
            if (element != " ") {
                nombre = element;
            }
        });

        if (validation !== null) {
            const auxobj = {
                declara: {
                    nombre: nombre,
                    tipo: parametros.tipo,
                    valor: parametros.valor,
                },
            };
            code.push(auxobj);
        }
    }
    return false;
}
function resolver(x) {
    var url = "http://localhost:3000/" + x;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("Respuesta");
            console.log(data);
        });
}

function IsWrite(e) {
    const pattern = /Write/;
    if (e.match(pattern) != null) {
        const auxcadena = e.split("Write(");
        const mensaje = auxcadena[1].substring(0, auxcadena[1].length - 1);
        const auxmenseje = {
            imprime: mensaje,
        };
        code.push(auxmenseje);
    }
}
