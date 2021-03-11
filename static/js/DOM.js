const logBox = document.querySelector('#log');

const colocarEnHTML = (caja, texto, clases) => {
	const label = document.createElement('label');
	label.innerText = texto;
	clases.forEach((clase) => label.classList.add(clase));
	caja.append(label);
};


formularioInput.addEventListener('submit', (e) => {
	e.preventDefault();
	const textoEntradaCompleto = e.target[0].value;
	let entradaSeparada = textoEntradaCompleto.split('\n');
	logBox.innerHTML = `<legend>Log</legend>`
	entradaSeparada = entradaSeparada.filter((value, index, array) => (value!=''))

	entradaSeparada.forEach((entrada, index) => {
		const errorToken = terminaPuntoComa(entrada);
		if (errorToken) {
            colocarEnHTML(logBox, `${errorToken} en la linea ${(index + 1)}`, ['textLog', 'error']);
		}
	});
});
