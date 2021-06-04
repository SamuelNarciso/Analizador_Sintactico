let code = [];
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
    code = []

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
                    label.innerHTML += " 😈";
                }
                log.append(label);
            }
        })
        .then(() => {
            if (bien) {
                let url;
                const aux = textAreaInput.innerText.split("\n");
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
                                if (data.operacion.output != null) {
                                    const respuesta =
                                        data.operacion.output_array;
                                    respuesta.push(opc[0]);
                                    respuesta.push("=");
                                    code.push({asigna: respuesta});
                                }
                                if (element) {
                                    string_suma = IsStringOperation(element);
                                    if (string_suma != false) {
                                        string_suma.push(opc[0]);
                                        string_suma.push("=");
                                        code.push({asigna: string_suma});
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
                                    code.push(resultado);
                                }


                            })
                            .then(() => {
                                const resultado = IsVar(element, {
                                    expresion: /float/,
                                    tipo: "float",
                                    valor: 0.0,
                                });
                                if (resultado != false) {
                                    code.push(resultado);
                                }

                            })
                            .then(() => {
                                const resultado = IsVar(element, {
                                    expresion: /String/,
                                    tipo: "String",
                                    valor: "",
                                });
                                if (resultado != false) {
                                    code.push(resultado);
                                }

                            })

                            .then(() => {
                                if ((resultado = IsWrite(element))) {
                                    const auxcadena = element.split(
                                        "Write("
                                    );
                                    const mensaje = auxcadena[1].substring(
                                        0,
                                        auxcadena[1].length - 1
                                    );

                                    code.push({imprime: mensaje});
                                }
                            })
                            .then(() => {
                                if (aux[aux.length - 1] === element) {

                                    insertar_codigoP(JSON.stringify({codigoP: code}))
                                    console.log(
                                        JSON.stringify({codigoP: code})
                                    );
                                }
                            });
                    }
                });
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
