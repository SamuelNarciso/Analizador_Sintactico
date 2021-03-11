

class Nodo {
	raiz = null;
	constructor(key) {
		this.llave = key;
		this.padre = null;
		this.izquierdo = null;
		this.derecho = null;
		this.valor = null;
		this.tipo = null;
	}

	insertar(key, valor, tipo) {
		let nodoNuevo = new Nodo(key);
		nodoNuevo.valor = valor;
		nodoNuevo.tipo = tipo;
		if (this.raiz === null) {
			this.raiz = nodoNuevo;
		} else {
			let nodoTemporal = this.raiz;
			while (nodoTemporal != null) {
				nodoNuevo.padre = nodoTemporal;
				if (nodoNuevo.llave >= nodoTemporal.llave) {
					nodoTemporal = nodoTemporal.derecho;
				} else {
					nodoTemporal = nodoTemporal.izquierdo;
				}
			}
			if (nodoNuevo.llave < nodoNuevo.padre.llave) {
				nodoNuevo.padre.izquierdo = nodoNuevo;
			} else {
				nodoNuevo.padre.derecho = nodoNuevo;
			}
		}
	}
}

stringToNumero = (cadena) => {
	if (isNaN(cadena)) {
		return cadena;
	} else {
		const numero = cadena * 1;
		return numero;
	}
};

const buscarValor = (lista, tipo, arregloFecha) => {
	const valor = stringToNumero(arregloFecha[0]);
	if (lista.includes(valor)) {
		colocarEnHTML(logBox, `Es correcto el ${tipo}`, ['textLog']);
	} else {
		colocarEnHTML(logBox, `Es incorrecto el ${tipo}`, ['textLog', 'error']);
	}
	arregloFecha.shift();
};

function recorridoInOrder(hoja, arreglo) {
	if (hoja != null) {
		recorridoInOrder(hoja.izquierdo, arreglo);
		buscarValor(hoja.valor, hoja.tipo, arreglo);
		recorridoInOrder(hoja.derecho, arreglo);
	}
}


const crearArboles = () => {
   
	const arbol = new Nodo();
	arbol.insertar(5, 'Anios', 'Año');
	arbol.insertar(2, 'Token', 'Token');
	arbol.insertar(1, 'Dias', 'Dia');
	arbol.insertar(3, 'Meses', 'Mes');
	arbol.insertar(4, 'Token', 'Token');
	recorridoInOrder(arbol.raiz, arregloTokenizado);


};