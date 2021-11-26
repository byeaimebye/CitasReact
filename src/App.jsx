import React,{useState, useEffect} from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
import './index.css'

function App() {

  //cita en locaStorage
  let citasIniciales= JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales=[];
  }

  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //use Effect para realizar cietas op cuando el state cambia

  useEffect( () =>{
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, [citas, citasIniciales]);

  // funcion que toma citas actuales y agrega la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  //Funcion que elimina una cita por su id

  const eliminarCita= id =>{
  const nuevasCitas= citas.filter(cita=> cita.id !== id)
  guardarCitas(nuevasCitas)
  }

  //mensaje condicional
  const titulo =  citas.length === 0 ? 'No hay citas' : "Agenda actualizada";

  return (
    <div className="App">
     <h1>Administrador de Pacientes</h1>
   
    <div className="container">
      <div className="row">
        <div className="one-half column">
         <Formulario 
         crearCita={crearCita}/>
        </div>
        <div className="one-half column">
         <h2>{titulo}</h2>
         {citas.map(cita=>(
           <Cita
           key={cita.id}
           cita={cita}
           eliminarCita={eliminarCita}
           />
         ))}
        </div>
      </div>
    </div>
        
    </div>
  );
}

export default App;
