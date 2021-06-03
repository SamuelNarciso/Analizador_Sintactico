let code = [];
const textAreaInput = document.querySelector("#textAreaInput");
const mostrar_consola = document.querySelector("#mostrar_consola");
const log = document.querySelector("#log");
const comprobar = document.querySelector("#comprobar");
let bien;
mostrar_consola.addEventListener("click", () => {
    log.classList.toggle("hideBox");
    textAreaInput.classList.toggle("reduce50");
});

comprobar.addEventListener("click", () => {
    log.innerHTML = " ";
    const cadena = {cadena: textAreaInput.innerText};
    const jcadena = JSON.stringify(cadena);
    var url = "/";

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
                    label.innerHTML += " 👍";
                }
                log.append(label);
            }
        })
        .then((d) => {
            if (bien) {
                let url;
                const aux = textAreaInput.innerText.split('\n');
                aux.forEach((element) => {
                    resultado = IsOperation(element);
                    let opc = ["", ""];
                    if (resultado) {
                        opc = element.split("=");
                    }
                    let operacion = ""
                    for (let i in opc[1]) {
                        if (opc[1].charAt(i) === '/') {
                            operacion += '_'
                        } else {
                            operacion += opc[1].charAt(i)
                        }
                    }
                    url = "http://localhost:3000/" + operacion;
                    fetch(url)
                        .then((x) => x.json())
                        .then((data) => {
                            if (data.operacion.output != false) {
                                const respuesta = data.operacion.output_array;
                                respuesta.push(opc[0]);
                                respuesta.push("=");
                                code.push({asigna: respuesta});
                                return true;
                            }
                            if (element) {
                                string_suma = IsStringOperation(element)
                                if (string_suma != false) {
                                    string_suma.push(opc[0])
                                    string_suma.push('=')
                                    code.push({asigna: string_suma})
                                }
                            }

                            return false;
                        })
                        .then((r) => {
                            if (r === false) {
                                const resultado = IsVar(element, {
                                    expresion: /int/,
                                    tipo: "int",
                                    valor: 0,
                                });
                                if (resultado != false) {
                                    code.push(resultado);
                                    return true;
                                }
                                return false;
                            }
                            return true;
                        })
                        .then((r) => {
                            if (r === false) {
                                const resultado = IsVar(element, {
                                    expresion: /float/,
                                    tipo: "float",
                                    valor: 0.0,
                                });
                                if (resultado != false) {
                                    code.push(resultado);
                                    return true;
                                }
                                return false;
                            }
                            return true;
                        })
                        .then((r) => {
                            if (r === false) {
                                const resultado = IsVar(element, {
                                    expresion: /String/,
                                    tipo: "String",
                                    valor: "",
                                });
                                if (resultado != false) {
                                    code.push(resultado);
                                    return true;
                                }
                                return false;
                            }
                            return true;
                        })

                        .then((r) => {
                            if (r === false) {
                                if ((resultado = IsWrite(element))) {
                                    const auxcadena = element.split("Write(");
                                    const mensaje = auxcadena[1].substring(
                                        0,
                                        auxcadena[1].length - 1
                                    );

                                    code.push({imprime: mensaje});
                                    return true;
                                }
                            }
                            return true;
                        })
                        .then((r) => {
                            if (aux[aux.length - 1] === element) {

                                console.log(JSON.stringify({codigoP: code}))
                            }

                        });
                });
            }
        });
});
