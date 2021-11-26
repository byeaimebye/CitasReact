import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function Formulario({crearCita}) {

    //Crear state de citas

    const [cita, actualizarCita] = useState({
        mascota:'',
        propietario: '',
        fecha:'',
        hora:'',
        sintomas:'',
    });

    const [ error, actualizarError ] = useState(false);
    //Funcion que se ejecuta cuando el usuario ecribe un input

    const actualizarState= e =>{
     actualizarCita({
         ...cita, 
         [e.target.name] : e.target.value
     })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //cuandoEl usuartio presiona agregar cita

    const submitCita = (e)=>{
        e.preventDefault();

        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' ||
         hora.trim() === '' || sintomas.trim() === ''){
             actualizarError(true);
             return;
        }
        
        //eliminar mensaje previo
        actualizarError(false)

        //asignar id
        cita.id = uuidv4()

        //crear cita
        crearCita(cita)

        //Reiniciar el form

        actualizarCita({
            mascota:'',
            propietario: '',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }



    return (
        <div>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error"> Todos los campos son obligatorios </p>  : null}

            <form 
            onSubmit={submitCita}
            >
                <label htmlFor="">Nombre Mascota</label>
                <input 
                type="text"
                name= "mascota"
                className= "u-full-width"
                placeholder= "Nombre Mascota" 
                onChange={actualizarState}
                value={mascota}
                />
                <label htmlFor="">Nombre Dueño</label>
                <input 
                type="text"
                name= "propietario"
                className= "u-full-width"
                placeholder= "Nombre Dueño Mascota" 
                onChange={actualizarState}
                value={propietario}
                />
                <label htmlFor="">Fecha</label>
                <input 
                type="date"
                name= "fecha"
                className= "u-full-width"
                onChange={actualizarState}
                value={fecha}
                />
                <label htmlFor="">Hora</label>
                <input 
                type="time"
                name= "hora"
                className= "u-full-width"
                onChange={actualizarState}
                value={hora}
                />
                <label htmlFor="">Sintomas</label>
               <textarea
                name="sintomas"
                className="u-full-width"
                onChange={actualizarState}
                value={sintomas}>
                </textarea>
               <button
               type= "submit"
               className="u-full-width button-primary"
               >Agregar Cita</button>
            </form>
        </div>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario
