const {request, response} = require("express");
const express = require("express");
const app = express();
let code = [];
app.use(express.json());
app.get("/:path?", (req, res) => {
    const resolverPostfija = require("./postfija");
    let operacion = req.params.path;
    let opc = "";
    for (let i in operacion) {
        if (operacion.charAt(i) === "_") {
            opc += "/";
        } else {
            opc += operacion.charAt(i);
        }
    }
    console.log(opc);
    const data = resolverPostfija(opc);
    res.json({operacion: data});
});

app.post("/codigo", (request, response) => {
    code = [];
    const note = request.body;
    Promesas(note.cadena, note.variables);
    optmizar(code);
    response.json({codigoP: code});
});
//Funciones Para transformar a codigo es lo q estaba en el archivo intermedio.js
function IsOperation(e) {
    const pattern = /[+,-,*,/,=]/;
    const validation = e.match(pattern);
    if (validation !== null) {
        return true;
    }
    return false;
}
function IsOperationString(element) {
    let aux = element.split("=");
    if (aux.length === 2) {
        num_sumas = aux[1].match(/[+]/gi).length;
        let sin_sumas = aux[1].split("+");
        for (let i = 0; i < num_sumas; i++) {
            sin_sumas.push("+");
        }
        return sin_sumas;
    }
    return false;
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
                nombre: nombre,
                tipo: parametros.tipo,
                valor: parametros.valor,
            };
            return auxobj;
        }
    }
    return false;
}
function IsWrite(e) {
    const pattern = /Write/;
    if (e.match(pattern) != null) {
        return true;
    }
    return false;
}
function IsWhile(elemento) {
    const patter = /while/;
    return elemento.match(patter) != null;
}
function SonDeclaraciones(element) {
    let resultado = IsVar(element, {
        expresion: /int/,
        tipo: "int",
        valor: 0,
    });
    if (resultado != false) {
        code.push({declara: resultado});
        return true;
    } else {
        resultado = IsVar(element, {
            expresion: /float/,
            tipo: "float",
            valor: 0.0,
        });
        if (resultado != false) {
            code.push({declara: resultado});
            return true;
        } else {
            resultado = IsVar(element, {
                expresion: /String/,
                tipo: "String",
                valor: "",
            });
            if (resultado != false) {
                code.push({declara: resultado});
                return true;
            }
        }
    }

    return false;
}
function QuiereImprimir(element) {
    if ((resultado = IsWrite(element))) {
        const auxcadena = element.split("Write(");
        const mensaje = auxcadena[1].substring(0, auxcadena[1].length - 1);

        code.push({imprime: mensaje});
        return true;
    }
    return false;
}
function EsUnWhile(element) {
    if (IsWhile(element)) {
        const condicion = element.split(" ");
        code.push({mientras: condicion[1]});
        return true;
    }
    return false;
}
function EsUnaLLave(element) {
    if (element === "{") {
        code.push({inicio: "inicio"});
        return true;
    } else if (element === "}") {
        code.push({fin: "fin"});
        return true;
    }

    return false;
}
//Este es el metodo que convierte a codigo p
function Promesas(texto, vars) {
    const aux = texto;
    let while_encontrado = false;
    aux.forEach((element) => {
        if (element) {
            if (IsOperation(element)) {
                if (while_encontrado === false) {
                    let opc = ["", ""];
                    opc = element.split("=");

                    const resolverPostfija = require("./postfija");
                    const aux_operation = element.split("=");
                    const data = resolverPostfija(aux_operation[1], vars);
                    if (data.outputArray != null && opc[0] != "") {
                        let oper = data.outputArray;
                        if (oper.length === 0) {
                            let pila = IsOperationString(element);
                            //Separar por el = y ver si es una suma de string
                            code.push({asigna: pila});
                        } else {
                            if (data.resultado !== null) {
                                oper = [aux_operation[0], data.resultado, "="];
                            } else if (
                                oper.length === 1 &&
                                data.resultado == null
                            ) {
                                oper = [aux_operation[0], aux_operation[1], "="];
                            }

                            code.push({asigna: oper});
                        }
                    }

                } else {
                    opc = element.split("=");

                    const resolverPostfijaWhile = require('./while');
                    const r = resolverPostfijaWhile(element);
                    if (r.output_array != null && opc[0] != "") {
                        let oper = r.output_array;
                        if (oper.length === 0) {
                            //Separar por el = y ver si es una suma de string
                        } else {
                            code.push({asigna: oper});
                        }
                    }

                }
            } else if (SonDeclaraciones(element)) {
                console.log("Declaracion");
            } else if (QuiereImprimir(element)) {
                console.log("Imprimir");
            } else if (EsUnWhile(element)) {
                while_encontrado = true;
                console.log("While");
            } else if (EsUnaLLave(element)) {
                console.log("Llave");
                if (element === "}") {
                    while_encontrado = false;
                }
            }
        }
    });
}
const optmizar = (codep) => {
    //eliminar variables que nunca se usan
    codep.forEach((codigo) => {
        console.log(codigo);
    });
};
app.listen(3000, () => console.log("Server running on port 3000"));
