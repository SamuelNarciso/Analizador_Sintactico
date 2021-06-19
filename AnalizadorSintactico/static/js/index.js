let code = [];
let traduccion = [];
let diccionario;
const textAreaInput = document.querySelector("#textAreaInput");
const mostrar_consola = document.querySelector("#mostrar_consola");
const consola_codigoP = document.querySelector("#consola_codigoP");
const log = document.querySelector("#log");
const area_codido_p = document.querySelector("#area_codido_p");

const comprobar = document.querySelector("#comprobar");
let bien;
mostrar_consola.addEventListener("click", () => {
    consola_codigoP.classList.toggle("hideBox");
    // log.classList.toggle("hideBox");
    // area_codido_p.classList.toggle("hideBox");
    textAreaInput.classList.toggle("reduce50");
});

const insertar_codigoP = (codigo) => {
    let codigo_obj = JSON.parse(codigo);
    let codigo_temporal = "";
    // console.log(codigo_obj.codigoP)
    codigo_obj.codigoP.forEach((objeto) => {
        const label = document.createElement("label");
        label.classList.add("texto");

        for (const clave in objeto) {
            //console.log(clave, ": ", objeto[clave]);
            if (Array.isArray(objeto[clave])) {
                objeto[clave].forEach((element) => {
                    codigo_temporal += " " + element;
                });
            } else {
                if (typeof objeto[clave] === "object") {
                    for (const key in objeto[clave]) {
                        const nuevoObjeto = objeto[clave];
                        codigo_temporal += " " + key;
                        codigo_temporal += " " + nuevoObjeto[key];
                    }
                }
                if (typeof objeto[clave] === "string") {
                    codigo_temporal += objeto[clave];
                }
            }
            label.textContent = clave + ": " + codigo_temporal;
            codigo_temporal = "";
        }
        area_codido_p.append(label);
    });
};

comprobar.addEventListener("click", () => {
    (log.innerHTML = " "), (area_codido_p.innerHTML = "");
    const cadena = {cadena: textAreaInput.innerText};
    const jcadena = JSON.stringify(cadena);
    var url = "/";
    code = [];
    traduccion = [];
    diccionario = null;
    // insertar_codigoP(JSON.stringify(  )) //FUNCION PARA COLOCAR EL CODIGO P, DEBES ENVIAR COMO PARAMETRO TU JSON

    fetch(url, {
        method: "POST",
        body: jcadena,
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((resp) => resp.json())
        .then((data) => {
            bien = true;

            diccionario = data['variables']
            for (var i in data["mensajes"]) {
                var error = data["mensajes"][i];

                const label = document.createElement("label");
                label.classList.add("textLog");
                label.innerText = error;
                if (error.charAt(0) == "E") {
                    label.innerHTML += " 💀";
                    bien = false;
                    label.classList.add("error");
                } else {
                    label.innerHTML += "";
                }
                log.append(label);
            }
        })
        .then(() => {
            if (bien) {
                let texto = [];
                const aux = textAreaInput.innerText.split("\n");
                let i = 0;
                while (i < aux.length) {
                    iswhile = IsWhile(aux[i]);
                    if (iswhile === true) {
                        //Aqui es donde esta lo del while en una sola linea
                        resultado = Search(i, aux);
                        resultado.cadena.forEach((simbolo) =>
                            texto.push(simbolo)
                        );
                        i = resultado.aumento;
                    } else {
                        //Aqui solo insertamos los elementos a la pila
                        texto.push(aux[i]);
                        i++;
                    }
                }
                return texto;
            }
        })
        .then((texto) => {
            if (bien) {

                const cadena = {cadena: texto, variables: diccionario};
                const jcadena = JSON.stringify(cadena);

                fetch('http://localhost:3000/codigo', {
                    method: "POST",
                    body: jcadena,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then((resp) => resp.json())
                    .then(respuesta => {
                        insertar_codigoP(
                            JSON.stringify(
                                respuesta))
                        console.log(respuesta)
                    })
                //Promesas(texto);
            }
        });
});

const identacion = (childs) => {
    childs.forEach((child) => {
        if (child.classList) {
            child.classList.add("lineBoxShape");
        }
    });
};

textAreaInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === "Backspace" || e.key === "Delete") {
        identacion(textAreaInput.childNodes);
    }
});

function Search(count, matrix) {
    aux = "";
    pila = [];
    let valor = 0;

    for (let i = count; i < matrix.length; i++) {
        aux += matrix[i] + ";";
        if (matrix[i] === "}") {
            valor = i;
            break;
        }
    }

    valor++;
    pila = AcomodarWhile(aux);
    return {cadena: pila, aumento: valor};
}
function AcomodarWhile(texto) {
    let aux = texto.split(";");
    let resultado = [];
    aux.forEach((e) => {
        if (e) {
            if (IsWhile(e)) {
                let tabla = e.split("while(");
                let t2 = tabla[1].split("){");
                resultado.push("while " + t2[0]);
                resultado.push("{");
            } else {
                resultado.push(e);
            }
        }
    });
    return resultado;
}
function IsWhile(elemento) {
    const patter = /while/;
    return elemento.match(patter) != null;
}
function Promesas(texto) {
    let url;
    const aux = texto;
    aux.forEach((element) => {

        if (element) {
            resultado = IsOperation(element);
            let opc = ["", ""];
            if (resultado) {
                opc = element.split("=");
            }
            let operacion = "";
            for (let i in opc[1]) {
                if (opc[1].charAt(i) === "/") {
                    operacion += "_";
                } else {
                    operacion += opc[1].charAt(i);
                }
            }

            url = "http://localhost:3000/" + operacion;
            fetch(url)
                .then((x) => x.json())
                .then((data) => {
                    if (data.operacion.output_array != null && opc[0] != "") {
                        let oper = data.operacion.output_array;
                        if (oper.length === 0) {
                            let pila = IsOperationString(element);
                            pila.push(opc[0]);
                            pila.push("=");

                            //Separar por el = y ver si es una suma de string
                            code.push({
                                original: element,
                                traduccion: {
                                    asigna: pila,
                                },
                            });
                        } else {
                            oper.push(opc[0]);
                            oper.push("=");

                            code.push({
                                original: element,
                                traduccion: {asigna: oper},
                            });
                        }
                    }
                })

                .then(() => {
                    const resultado = IsVar(element, {
                        expresion: /int/,
                        tipo: "int",
                        valor: 0,
                    });
                    if (resultado != false) {
                        code.push({
                            original: element,
                            traduccion: resultado,
                        });
                    }
                })
                .then(() => {
                    const resultado = IsVar(element, {
                        expresion: /float/,
                        tipo: "float",
                        valor: 0.0,
                    });
                    if (resultado != false) {
                        code.push({
                            original: element,
                            traduccion: resultado,
                        });
                    }
                })
                .then(() => {
                    const resultado = IsVar(element, {
                        expresion: /String/,
                        tipo: "String",
                        valor: "",
                    });
                    if (resultado != false) {
                        code.push({
                            original: element,
                            traduccion: resultado,
                        });
                    }
                })

                .then(() => {
                    if ((resultado = IsWrite(element))) {
                        const auxcadena = element.split("Write(");
                        const mensaje = auxcadena[1].substring(
                            0,
                            auxcadena[1].length - 1
                        );

                        code.push({
                            original: element,
                            traduccion: {imprime: mensaje},
                        });
                    }
                })
                .then(() => {
                    if (IsWhile(element)) {
                        const condicion = element.split(" ");
                        code.push({
                            original: element,
                            traduccion: {mientras: condicion[1]}
                        });
                    }
                }).then(() => {
                    if (element === '{') {
                        code.push({
                            original: element,
                            traduccion: {inicio: 'inicio'}
                        })
                    }
                }).then(() => {
                    if (element === '}') {
                        code.push({
                            original: element,
                            traduccion: {fin: 'fin'}
                        })
                    }
                })

                .then(() => {
                    if (aux[aux.length - 1] === element) {
                        for (let i = 0; i < texto.length; i++) {
                            for (let j = 0; j < code.length; j++) {
                                if (code[j].original == texto[i]) {
                                    traduccion.push(code[j].traduccion)
                                    break;
                                }
                            }
                        }

                        console.log(JSON.stringify({codigoP: traduccion}));
                        insertar_codigoP(
                            JSON.stringify({codigoP: traduccion})
                        );
                    }
                });
        }
    });
}

