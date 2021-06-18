const propagacionConstantes = (inputArr, tabla_variables = {}) => {
    inputArr.forEach((operando, i) => {
      if (
        tabla_variables[operando] &&
        tabla_variables[operando].type !== 'String'
      ) {
        inputArr[i] = tabla_variables[operando].value.toString();
      }
    });
    return inputArr;
  };
const resolverPostfija = (inputUser = '', variables = false) => {
    const outputArray = [];
    const operadores = {
      ')': { valor: null, simbolo: ')' },
      '(': { valor: null, simbolo: '(' },
      '^': { valor: 3, funcion: (a, b) => (a * 1) ** (b * 1), simbolo: '^' },
      '/': { valor: 2, funcion: (a, b) => (1 * a) / (b * 1), simbolo: '/' },
      '*': { valor: 2, funcion: (a, b) => 1 * a * (b * 1), simbolo: '*' },
      '-': { valor: 1, funcion: (a, b) => 1 * a - b * 1, simbolo: '-' },
      '+': { valor: 1, funcion: (a, b) => 1 * a + b * 1, simbolo: '+' },
      '=': { valor: 0.5, simbolo: '=' },
    };
    const alfabeto = {
      a: true, b: true, c: true,
      d: true, e: true, f: true,
      g: true, h: true, i: true,
      j: true, k: true, l: true,
      m: true, n: true, ñ: true,
      o: true, p: true, q: true,
      r: true, s: true, t: true,
      u: true, v: true, w: true,
      x: true, y: true, z: true,
      '.': true,
    };
  
    const isaLetter = (letra = '') => alfabeto[letra.toLowerCase()];
  
    // Metodos para revisar caracter por carac
    const isCorrectChar = (c) => operadores[c] || !isNaN(c) || isaLetter(c);
  
    const isCorrectInput = (input = '') => {
      for (const char in input) {
        if (!isCorrectChar(input[char])) return false;
      }
      return true;
    };
  
    const inputToArray = (input = '', tabla_variables) => {
      let inputTemporal = [];
      let cifra = '';
      let operador = '';
      const caracteresArr = input.split('');
      while (caracteresArr.length > 0) {
        if (!isNaN(caracteresArr[0]) || isaLetter(caracteresArr[0])) {
          cifra += caracteresArr.shift();
          continue;
        }
        operador = caracteresArr.shift();
        inputTemporal.push(cifra, operador);
        cifra = '';
        operador = '';
      }
      inputTemporal.push(cifra, operador);
      inputTemporal = inputTemporal.filter((i) => i !== '');
      if(tabla_variables) return propagacionConstantes(inputTemporal, tabla_variables);
        return inputTemporal      
    };
  
    const vaciarPila = (pila = [], operacion = []) => {
      while (pila.length > 0) {
        const antiguoValorPila = pila.shift();
        operacion.push(antiguoValorPila);
        outputArray.push(antiguoValorPila.simbolo);
      }
    };
    const precedencia = (simboloRevisar, pila, operacion) => {
      if (pila.length === 0) {
        pila.unshift(simboloRevisar);
        return null;
      }
      if (simboloRevisar.valor == pila[0].valor) {
        const antiguoValorPila = pila.shift();
        operacion.push(antiguoValorPila);
        outputArray.push(antiguoValorPila.simbolo);
        pila.unshift(simboloRevisar);
      } else if (simboloRevisar.valor > pila[0].valor) {
        pila.unshift(simboloRevisar);
      } else if (simboloRevisar.valor < pila[0].valor) {
        vaciarPila(pila);
        pila.unshift(simboloRevisar);
      }
      return null;
    };
    const llenarPilas = (input) => {
      const pila = [];
      const operacion = [];
      for (const char in input) {
        const operador = operadores[input[char]];
        if (!operador) {
          operacion.push(input[char]);
          outputArray.push(input[char]);
          continue;
        }
        operador.valor
          ? precedencia(operador, pila, operacion)
          : operador.simbolo == ')'
          ? vaciarPila(pila, operacion)
          : null;
      }
      vaciarPila(pila, operacion);
      return operacion;
    };
  
    const resolverOperacion = (operacion) => {
      const arrTmp = [];
      while (operacion.length > 0) {
        let resultado = '';
        while (!isNaN(operacion[0])) arrTmp.unshift(operacion.shift());
        arrTmp.unshift(operacion.shift());
        try {
          resultado = arrTmp[0].funcion(arrTmp[2], arrTmp[1]);
        } catch (err) {
          return null;
        }
  
        for (let i = 0; i < 3; i++) {
          arrTmp.shift();
        }
        arrTmp.unshift(resultado);
      }
      return arrTmp[0] * 1;
    };
  
    inputUser = inputUser.trim();
    if (!isCorrectInput(inputUser)) {
      return {
        inputUser,
        outputString: outputArray.toString(),
        outputArray,
        resultado: null,
      };
    }
  
    const inputArray = inputToArray(inputUser, variables);
    const operacion = llenarPilas(inputArray);
    const resultado = resolverOperacion(operacion);
  
    return {
      inputUser,
      outputString: outputArray.toString(),
      outputArray,
      resultado,
    };
  };
  
  module.exports = resolverPostfija;
  