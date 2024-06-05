// se importa la función para guardar los datos
import { getData, getDocumento, remove, save, update } from './firestore.js'

// id para guardar el id del documento
let id = 0

// addEventListener permite activar el elemento según un evento(click)
document.getElementById('btnSave').addEventListener('click', (event) => {
    event.preventDefault()
    
    // validamos que los campos no sean vacíos
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const vehiculo = {
            run: document.getElementById('run').value,
            nombre: document.getElementById('nombre').value,
            patente: document.getElementById('patente').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            fecha_ingreso: document.getElementById('fecha_ingreso').value,
            fecha_salida: document.getElementById('fecha_salida').value
        }
        
        if (id == 0) {
            // función que permite el guardado de datos
            save(vehiculo)
            Swal.fire('Guardado', '', 'success')
        } else {
            // permite editar los datos si el id es diferente de 0
            update(id, vehiculo)
        }
        
        id = 0
        limpiar()
    }
})

// DOMContentLoaded es un evento que se ejecuta cuando se recarga la página
window.addEventListener('DOMContentLoaded', () => {
    // getData función que trae la colección
    getData((datos) => {
        let tabla = ''
        // recorremos la colección y creamos el objeto vehiculo que trae cada documento
        datos.forEach((vehiculo) => {
            // vehiculo.data() trae los datos de cada documento
            const item = vehiculo.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nombre}</td>
                <td>${item.patente}</td>
                <td>${item.marca}</td>
                <td>${item.modelo}</td>
                <td>${item.fecha_ingreso}</td>
                <td>${item.fecha_salida}</td>
                <td nowrap>
                    <button class="btn btn-warning" id="${vehiculo.id}">Editar</button>
                    <button class="btn btn-danger" id="${vehiculo.id}">Eliminar</button>
                </td>
            </tr>`
        })
        
        document.getElementById('contenido').innerHTML = tabla
        
        // eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            // verificamos cual es el botón presionado
            btn.addEventListener('click', () => {
                // sweetalert que permite confirmación
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    // presiono el botón eliminar
                    if (result.isConfirmed) {
                        // función eliminar
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        
        // seleccionar
        document.querySelectorAll('.btn-warning').forEach(btn => {
            btn.addEventListener('click', async () => {
                // invocar función que permite buscar el documento por id
                const doc = await getDocumento(btn.id)
                // asignar los valores del documento
                const vehiculo = doc.data()

                document.getElementById('run').value = vehiculo.run
                document.getElementById('nombre').value = vehiculo.nombre
                document.getElementById('patente').value = vehiculo.patente
                document.getElementById('marca').value = vehiculo.marca
                document.getElementById('modelo').value = vehiculo.modelo
                document.getElementById('fecha_ingreso').value = vehiculo.fecha_ingreso
                document.getElementById('fecha_salida').value = vehiculo.fecha_salida

                // asignamos el id del documento a la variable
                id = doc.id
                
                // run solo lectura
                document.getElementById('run').readOnly = true
                // btn cambie el valor a editar
                document.getElementById('btnSave').value = 'Editar'
            })
        })

    })
})
