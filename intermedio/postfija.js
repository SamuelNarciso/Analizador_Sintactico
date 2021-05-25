module.exports =   resolverPostfija = (linea = '') => {
    let operacion = []
    let pila = []
    let output = ''
    const operadores = {
        ')': { valor: null, simbolo: ')' },
        '(': { valor: null, simbolo: '(' },
        '^': { valor: 3, funcion: (a, b) => (Math.pow(a, b)), simbolo: '^' },
        '/': { valor: 2, funcion: (a, b) => (a / b), simbolo: '/' },
        '': { valor: 2, funcion: (a, b) => (a * b), simbolo: '' },
        '-': { valor: 1, funcion: (a, b) => (a - b), simbolo: '-' },
        '+': { valor: 1, funcion: (a, b) => (a + b), simbolo: '+' },
    }

    //Metodos para revisar caracter por carac
    const revisar_caracter = (c) => (operadores[c] || !isNaN(c)) ? true : false
    const revisar_linea = (linea = '') => {
        for (const caracter in linea) {
            if (!revisar_caracter(linea[caracter])) return false
        }
        return true;
    }
    const armar_input = (linea = "") => {
        let input_temporal = [];
        let linea_arr = linea.split('')
        let cifra = '', operador = ''
        while (linea_arr.length > 0) {
            if (!isNaN(linea_arr[0])) {
                cifra += linea_arr[0]
            } else {
                operador = linea_arr[0]
                input_temporal.push((cifra * 1), operador)
                cifra = '', operador = ''
            }
            linea_arr.shift()
        }
        input_temporal.push((cifra * 1), operador)
        input_temporal = input_temporal.filter((i) => i != '')
        return input_temporal
    }
    const vaciar_pila = () => {
        while (pila.length > 0) {
            const antigu_valor_pila = pila.shift()
            operacion.push(antigu_valor_pila)
            output += antigu_valor_pila.simbolo
        }
    }
    const precedencia = (simbolo_revisar, ultimo_simbolo_pila) => {
        if (pila.length == 0) { pila.unshift(simbolo_revisar); return null }
        if (simbolo_revisar.valor == ultimo_simbolo_pila.valor) {
            const antiguo_valor_pila = pila.shift()
            operacion.push(antiguo_valor_pila)
            output += antiguo_valor_pila.simbolo
            pila.unshift(simbolo_revisar)
        } else if (simbolo_revisar.valor > ultimo_simbolo_pila.valor) {
            pila.unshift(simbolo_revisar)
        } else if (simbolo_revisar.valor < ultimo_simbolo_pila.valor) {
            vaciar_pila()
            pila.unshift(simbolo_revisar)
        }    }
    const llenar_pilas = (linea) => {
        // console.log('Input: ', linea)
        for (let i = 0; i < linea.length; i++) {
            const element = linea[i], operador = operadores[element];
            if (operador) {
                (operador.valor) ? precedencia(operador, pila[0])
                    : (operador.simbolo == ')') ? vaciar_pila() : null
            } else {
                operacion.push(element * 1)
                output = output + element * 1
            }        }
        vaciar_pila()
    }
    const resolver_operacion = () => {
        let arrTmp = []
        while (operacion.length > 0) {
            while (!isNaN(operacion[0])) { arrTmp.unshift(operacion.shift())}
            arrTmp.unshift(operacion.shift())
            let resultado = ''
            try {
                resultado = arrTmp[0].funcion((arrTmp[2]), (arrTmp[1]))
            } catch (error) {
                return null
            }
            for (let i = 0; i < 3; i++) { arrTmp.shift() }
            arrTmp.unshift(resultado)
        }
        return (arrTmp.length == 1) ? (arrTmp[0].toString() * 1) : null
    }
   if (!revisar_linea(linea)) return { error: true, input: linea, output: output, resultado: null }
    const input = armar_input(linea);
    llenar_pilas(input)
    const resultado = resolver_operacion()
    return {
        error: (resultado != null) ? false : true,
        input: linea,
        output,
        resultado,
    }
}
