const textAreaInput = document.querySelector('#textAreaInput');
const mostrar_consola = document.querySelector('#mostrar_consola');
const log = document.querySelector('#log');
const comprobar = document.querySelector('#comprobar');

mostrar_consola.addEventListener('click', () => {
    log.classList.toggle('hideBox');
    textAreaInput.classList.toggle('reduce50');
});

const colorear_palabraReservada = ( {cadena} )=>{
    console.log(cadena)
    cadena = cadena.replaceAll("int" ,'<span class="color_tipoDato">int</span>')
    cadena = cadena.replaceAll("String" ,'<span class="color_tipoDato">String</span>')
    cadena = cadena.replaceAll("float" ,'<span class="color_tipoDato">float</span>')
    cadena = cadena.replaceAll("\n" , "<br>")
    return cadena
}

comprobar.addEventListener('click', () => {
    log.innerHTML = " ";
    let cadena = {'cadena': textAreaInput.innerText};
    cadena = colorear_palabraReservada(cadena)
    textAreaInput.innerHTML = cadena
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
                label.classList.add('error')
            }
            log.append(label);
  
        }
    })
})
