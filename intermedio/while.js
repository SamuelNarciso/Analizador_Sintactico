module.exports = resolverPostfijaWhile = (input = '') => {
    let output_array = []
    const operadores = {
        ')': {valor: null, simbolo: ')'},
        '(': {valor: null, simbolo: '('},
        '^': {valor: 3, funcion: (a, b) => (Math.pow((a * 1), (b * 1))), simbolo: '^'},
        '/': {valor: 2, funcion: (a, b) => ((1 * a) / (b * 1)), simbolo: '/'},
        '*': {valor: 2, funcion: (a, b) => ((1 * a) * (b * 1)), simbolo: '*'},
        '-': {valor: 1, funcion: (a, b) => ((1 * a) - (b * 1)), simbolo: '-'},
        '+': {valor: 1, funcion: (a, b) => ((1 * a) + (b * 1)), simbolo: '+'},
        '=': {valor: 0.5, simbolo: '='},
    }
    const alfabeto = {
        'a': true, 'b': true, 'c': true, 'd': true,
        'e': true, 'f': true, 'g': true, 'h': true,
        'i': true, 'j': true, 'k': true, 'l': true,
        'm': true, 'n': true, 'ñ': true, 'o': true,
        'p': true, 'q': true, 'r': true, 's': true,
        't': true, 'u': true, 'v': true, 'w': true,
        'x': true, 'y': true, 'z': true, '.': true
    }
    const isaLetter = (letra = '') => (alfabeto[letra.toLowerCase()] ? true : false)

    //Metodos para revisar caracter por carac
    const isCorrectChar = (c) => (operadores[c] || !isNaN(c) || isaLetter(c)) ? true : false

    const isCorrectInput = (input = '') => {
        for (const char in input) {
            if (!isCorrectChar(input[char])) return false
        }
        return true;
    }

    const inputToArray = (input = '') => {
        let input_temporal = [], cifra = '', operador = '', caracteres_arr = input.split('')
        while (caracteres_arr.length > 0) {
            if (!isNaN(caracteres_arr[0]) || isaLetter(caracteres_arr[0])) {
                cifra += caracteres_arr.shift()
                continue;
            }
            operador = caracteres_arr.shift()
            input_temporal.push(cifra, operador)
            cifra = '', operador = ''
        }
        input_temporal.push(cifra, operador)
        return input_temporal.filter((i) => i != '')
    }

    const vaciar_pila = (pila = [], operacion = []) => {
        while (pila.length > 0) {
            const antiguo_valor_pila = pila.shift()
            operacion.push(antiguo_valor_pila)
            output_array.push(antiguo_valor_pila.simbolo)
        }
    }
    const precedencia = (simbolo_revisar, pila, operacion) => {
        if (pila.length === 0) {pila.unshift(simbolo_revisar); return null}
        if (simbolo_revisar.valor == pila[0].valor) {
            const antiguo_valor_pila = pila.shift()
            operacion.push(antiguo_valor_pila)
            output_array.push(antiguo_valor_pila.simbolo)
            pila.unshift(simbolo_revisar)
        } else if (simbolo_revisar.valor > pila[0].valor) {
            pila.unshift(simbolo_revisar)
        } else if (simbolo_revisar.valor < pila[0].valor) {
            vaciar_pila(pila)
            pila.unshift(simbolo_revisar)
        }
    }
    const llenar_pilas = (input) => {
        let pila = [], operacion = []
        for (const char in input) {
            let operador = operadores[input[char]]
            if (!operador) {
                operacion.push(input[char]);
                output_array.push(input[char])
                continue;
            }
            (operador.valor) ? precedencia(operador, pila, operacion)
                : (operador.simbolo == ')') ? vaciar_pila(pila, operacion) : null
        }
        vaciar_pila(pila, operacion)
        return operacion
    }

    const resolver_operacion = (operacion) => {
        let arrTmp = []
        while (operacion.length > 0) {
            let resultado = ''
            while (!isNaN(operacion[0])) arrTmp.unshift(operacion.shift())
            arrTmp.unshift(operacion.shift())
            try {resultado = arrTmp[0].funcion((arrTmp[2]), (arrTmp[1]))}
            catch (err) {return null}

            for (let i = 0; i < 3; i++) {arrTmp.shift()}
            arrTmp.unshift(resultado)
        }
        return (arrTmp[0] * 1)
    }


    input = input.trim()
    if (!isCorrectInput(input)) return {input, 'output_string': output_array.toString(), output_array, 'resultado': null}
    // if (!isCorrectInput(input)) return null //TODO: Esta linea es solo para testear los resultados

    input_array = inputToArray(input);
    operacion = llenar_pilas(input_array)
    const resultado = resolver_operacion(operacion)
    return {input, 'output_string': output_array.toString(), output_array, resultado}
    // return resultado //TODO: Esta linea es solo para testear los resultados
}
