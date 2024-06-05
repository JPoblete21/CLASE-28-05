const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    document.getElementById('run').readOnly = false
    document.getElementById('btnSave').value = 'Guardar'
}

const verificar = (id) => {
    // getElementById(id) obtiene el elemento html por su id
    const input = document.getElementById(id)
    const div = document.getElementById('e-' + id)
    // removemos el estilo invalid
    input.classList.remove('is-invalid')
    
    // verificamos si valor del input es vacío
    if (input.value.trim() == '') {
        // classList permite añadir o quitar clases a un elemento HTML (add para añadir y remove para quitar)
        input.classList.add('is-invalid') // is-invalid es clase de bootstrap que deja en rojo el input
        // innerHTML permite agregar elementos html desde js
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    } else {
        input.classList.add('is-valid') // is-valid es claase bootstrap que deja el input en verde
        div.innerHTML = ''
        
        if (id == 'run') {
            if (!validaRun(input.value.trim())) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        
        if (id == 'email') {
            if (!validarEmail(input.value)) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El email no tiene el formato correcto</span>'
            }
        }
        
        if (id == 'fecha_ingreso' || id == 'fecha_salida') {
            const now = new Date()
            const selectedDate = new Date(input.value)
            
            if (selectedDate > now) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No se puede seleccionar una fecha futura</span>'
            }
        }
        
        // validación sueldo
        if (id == 'sueldo') {
            if (input.value < 500000) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">No pagamos menos de $500.000</span>'
            }
        }
        
        if (id == 'fono') {
            if (input.value.length != 9) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">Debe tener 9 dígitos</span>'
            }
        }
    }
}

const soloNumeros = (e) => {
    if (e.keyCode >= 48 && e.keyCode <= 57)
        return true // true permitira ver la tecla en el input
    return false // false no deja ver la tecla
}

const validarEmail = (email) => {
    // expresión regular del formato email
    const formato = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/
    // vertifica si el email enviado no tiene el formato correcto
    if (!formato.test(email))
        return false // si retorna falso no es válido
    return true
}

const calcularFecha = (fecha) => {
    const hoy = new Date()
    fecha = new Date(fecha)
    const resta = hoy - fecha
    const dia = resta / (1000 * 60 * 60 * 24)
    return dia.toFixed(0)
}
