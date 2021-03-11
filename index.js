const formularioInput = document.querySelector('#formularioInput');
const tipoDato = ['int', 'string', 'float'];
const operadores = ['+', '-', '*', '/'];
const variablesDeclaradas = {};

const estaOperando = (cadena) => {
	let i = 0;
	let encontrado = false;
	while (tipoDato.length >= i && !encontrado) {
		const operador = operadores[i];
		if (cadena.includes(operador)) {
			encontrado = true;
			return [true , operador];
			// console.log('Tiene el operador ' + operador);
		}
		i++;
	}
	if(!encontrado){
		return[false,null]
	}
};

const estaDeclarando = (cadena) => {
	const tipo = cadena.split(' ');
	if (tipoDato.includes(tipo[0])) {
		return [true,tipo[0]];
	} else {
		return [false,null];
	}

};

terminaPuntoComa = (texto) => {
	if (texto[texto.length - 1] === ';') {
		let [errorDeclarando,ValorDeclarando]  = estaDeclarando(texto);
		let [errorOperando,ValorOperando]  = estaOperando(texto);

		if( errorDeclarando && errorOperando ){
			return 'No puedes declarar una variable y hacer una operacion aritmetica a la vez.'	
		}else{
			if(!errorDeclarando){
				// console.log('Procedemos a hacer una '+ValorOperando)
				colocarEnHTML(logBox, `Haremos la operacion ${ValorOperando}`, ['textLog',]);
			}else if(!errorOperando){
				colocarEnHTML(logBox, `Declaramos variable del tipo ${ValorDeclarando}`, ['textLog',]);
				// console.log('Procedemos a declarar una '+ValorDeclarando)

			}

		}
		return null;
	} else {
		return 'No se encontro el token ;';
	}
};

