const textAreaInput = document.querySelector('#textAreaInput');
const mostrar_consola = document.querySelector('#mostrar_consola');
const log = document.querySelector('#log');
const comprobar = document.querySelector('#comprobar');
const identador = document.querySelector('.identador');

mostrar_consola.addEventListener('click', () => {
    log.classList.toggle('hideBox');
    // textAreaInput.classList.toggle('reduce50');
});

comprobar.addEventListener('click', () => {
    // log.innerHTML = " ";
    // const cadena = {'cadena': textAreaInput.innerText};
    // const jcadena = JSON.stringify(cadena)
    // var url = '/';

    // fetch(url, {
    //     method: 'POST',
    //     body: jcadena,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(resp => resp.json()).then(data => {
    //     for (var i in data['mensajes']) {
    //         var error = data['mensajes'][i];
    //         const label = document.createElement('label');
    //         label.classList.add('textLog');
    //         label.innerText = error;
    //         if (error.charAt(0) == 'E') {
    //             label.classList.add('error')
    //         }
    //         log.append(label);

    //     }
    // })
})



const identacion = (childs) => {

    const linesIdentador = (cantidad) => {
        // console.log(cantidad);
        identador.innerHTML = '';
        for (let i = 1; i <= cantidad+1; i++) {
            if (i < 10) {
                identador.append('0' + i);
            } else {
                identador.append(i);

            }


        }

    }

    childs.forEach(child => {
        if (child.classList) {
            child.classList.add('lineBoxShape');
            linesIdentador(childs.length);
        }
    });

}

textAreaInput.addEventListener('keydown', (e) => {
    // console.log(e);
    if (e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Delete' ) {
        identacion(textAreaInput.childNodes)
    }
})