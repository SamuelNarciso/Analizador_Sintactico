function IsOperation(e) {
    const pattern = /[+,-,*,/,=]/;
    const validation = e.match(pattern);
    if (validation !== null) {
        return true;
    }
    return false;
}
function IsStringOperation(e) {
    if (e) {
        const pattern = /[=]/
        if (e.match(pattern) != null) {
            const aux = e.split('=')
            let sumas = 0
            for (let i in aux[1]) {
                if (aux[1].charAt(i) == '+') {
                    sumas++;
                }
            }
            operacion = aux[1].split('+')
            for (let i = 0; i < sumas; i++) {
                operacion.push('+')
            }
            return operacion

        }
        return false

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
