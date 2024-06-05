// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
// TODO: Documentación
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD440iPsB0Vs2ItfnXtg0IHW4UUdcucrOk",
    authDomain: "registrosuelddoss.firebaseapp.com",
    projectId: "registrosuelddoss",
    storageBucket: "registrosuelddoss.appspot.com",
    messagingSenderId: "446638772806",
    appId: "1:446638772806:web:b404c1216ec21060973047"
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//Función de firestore que permite retornar la base de datos para su utilización
const db = getFirestore(app)

//función para guardar los datos en firestore
export const save = (empleado) => {
    //addDoc es la función de firestore que permite añadir un nuevo documento
    //collection es la función de firestore que permite traer la colección de la db
    addDoc(collection(db, 'Empleados'), empleado)
}

//función que permite obtener la colección 
export const getData = (data) => {
    //onSnapshot permite retornar la colleción y asignarla a la variable data 
    onSnapshot(collection(db, 'Empleados'), data)
}

//función remove, permite eliminar un registro según su id
export const remove = (id) => {
    //deleteDoc es una función de firestore que permite quitar un documento de la colección
    //doc es una función de firestore que permite buscar un documento por su id
    deleteDoc(doc(db, 'Empleados', id))
}

//función getDocument nos permite obtener un documento según su id 
//getDoc permite traer un documento según si id y acceder a sus valores
export const getDocumento = (id) => getDoc(doc(db, 'Empleados', id))

//función update permite editar un documento
export const update = (id,emp) =>{
    //updateDoc es una funcioón de firestore que permite modificar un documento
    updateDoc(doc(db,'Empleados',id),emp)
}