const textAreaInput = document.querySelector('#textAreaInput');
const mostrar_consola = document.querySelector('#mostrar_consola');
const log = document.querySelector('#log');
const comprobar = document.querySelector('#comprobar');

mostrar_consola.addEventListener('click', () => {
    log.classList.toggle('hideBox');
    textAreaInput.classList.toggle('reduce50');
});

comprobar.addEventListener('click', () => {
    log.innerHTML = " ";
    const cadena = {'cadena': textAreaInput.innerText};
    const jcadena = JSON.stringify(cadena)
    var url = '/';

    fetch(url, {
        method: 'POST',
        body: jcadena,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => resp.json()).then(data => {
        for (var i in data['mensajes']) {
            var error = data['mensajes'][i];
            const label = document.createElement('label');
            label.classList.add('textLog');
            label.innerText = error;
            if (error.charAt(0) == 'E') {
                label.innerHTML += ' 💀'

                label.classList.add('error')
            } else {
                label.innerHTML += ' 👍'

            }
            log.append(label);

        }
    })
})
