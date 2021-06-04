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
        num_sumas = aux[1].match(/[+]/gi).length
        console.log('Sumas ' + num_sumas)
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
                declara: {
                    nombre: nombre,
                    tipo: parametros.tipo,
                    valor: parametros.valor,
                },
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
