import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../../assets/pexels-thirdman-5256825.jpg';
import ilustration from '../../assets/Práctica.svg';
import psicolaboral from '../../assets/psicolaboral.png';
import tecnica from '../../assets/tecnica.png';
import laboral from '../../assets/laboral.png';
import chulo from '../../assets/Chulo.png'

const WelcomeSimulator = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#EBE2FF]">
      {/* Banner de bienvenida */}
      <div
  className="relative w-full h-[700px] bg-cover bg-no-repeat bg-center flex flex-col justify-start items-start"
  style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Capa negra con opacidad solo para el fondo
    backgroundBlendMode: 'overlay', // Mezcla la capa de color con la imagen
  }}
>
  {/* Texto con fondo blur */}
  <div className="ml-6 md:ml-12 mt-32 md:mt-52 p-4 bg-white/20 backdrop-blur-md rounded-lg">
    <h1 className="text-white text-4xl font-bold font-montserrat">
      ¡Bienvenido al simulador de entrevistas!
    </h1>
  </div>

  {/* Descripción debajo del texto con blur */}
  <div className="ml-12 mt-8 max-w-lg">
    <p className="text-white text-2xl font-dosis">
      Nuestro objetivo es ofrecerte una experiencia interactiva a través de nuestra simulación para que practiques respuestas y mejores tus habilidades de comunicación.
    </p>
  </div>
</div>

{/* Sección de Categorías de entrevistas */}

  {/* Título */}
  <h2 className="text-center text-2xl font-bold font-montserrat text-black my-28">Selecciona una categoría para iniciar con tu entrevista</h2>

  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    
    {/* Tarjeta de la categoría "Psico Laboral" */}
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
    <div className="flex items-center justify-center mb-4">
    <img src={psicolaboral} alt="Psico Laboral" className="h-8 mr-2" />
    <h3 className="text-xl font-semibold font-montserrat">Psico Laboral</h3>
  </div>
  <img src={ilustration} alt="Prueba" className="mx-auto w-60 h-60 mb-8" />
      <p className="mb-8 font-dosis font-medium text-lg">Evaluaremos tus habilidades interpersonales y cómo te ajustas a nuestra cultura.</p>
      <h3 className="text-xl font-semibold font-montserrat mb-8">Aspectos a evaluar:</h3>
      <ul className="text-left text-gray-700 pr-2 space-y-8 font-dosis text-lg">
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Manejo del estrés:</span> 
      Queremos saber cómo enfrentas situaciones estresantes.
    </div>
  </li>
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Motivaciones personales:</span> 
      Conocer tus intereses nos ayuda a entenderte mejor.
    </div>
  </li>
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Contribución al equipo:</span> 
      Buscamos saber cómo puedes sumar al grupo.
    </div>
  </li>
</ul>

      <Link to="/interview" className="mt-8 font-dosis text-lg inline-block bg-color-2 text-color-3 py-2 px-4 rounded-md hover:bg-color-5 hover:text-white transition duration-300">
        Comenzar entrevista
      </Link>
    </div>

    {/* Tarjeta de la categoría "Técnica" */}
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
    <div className="flex items-center justify-center mb-4">
    <img src={tecnica} alt="Técnica" className="h-8 mr-2" />
    <h3 className="text-xl font-semibold font-montserrat">Técnica</h3>
  </div>
  <img src={ilustration} alt="Prueba" className="mx-auto w-60 h-60 mb-8" />
      <p className="mb-8 font-dosis font-medium text-lg">Analizaremos tus conocimientos específicos para el puesto.</p>
      <h3 className="text-xl font-semibold font-montserrat mb-8">Aspectos a evaluar:</h3>
      <ul className="text-left  pr-2 space-y-8 font-dosis text-lg">
      <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Competencia técnica:</span> 
      Verificaremos tus habilidades en áreas clave.
    </div>
  </li>
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Resolución de problemas:</span> 
      Te presentaremos casos prácticos para evaluar tu enfoque.
    </div>
  </li>
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Aplicación de conocimientos:</span> 
      Queremos conocer cómo aplicarías tus conocimientos en situaciones reales.
    </div>
  </li>
      </ul>
      <Link to="/interview" className="mt-8 font-dosis text-lg inline-block bg-color-2 text-color-3 py-2 px-4 rounded-md hover:bg-color-5 hover:text-white transition duration-300">
        Comenzar entrevista
      </Link>
    </div>

    {/* Tarjeta de la categoría "Experiencia Laboral" */}
    <div className="bg-white shadow-lg rounded-lg p-6 text-center">
    <div className="flex items-center justify-center mb-4">
    <img src={laboral} alt="Experiencia Laboral" className="h-8 mr-2" />
    <h3 className="text-xl font-semibold font-montserrat">Experiencia Laboral</h3>
  </div>
  <img src={ilustration} alt="Prueba" className="mx-auto w-60 h-60 mb-8" />
      <p className="mb-8 font-dosis font-medium text-lg">Revisaremos tus proyectos personales y experiencia práctica.</p>
      <h3 className="text-xl font-semibold font-montserrat mb-8">Aspectos a evaluar:</h3>
      <ul className="text-left text-gray-700 pr-2 space-y-8 font-dosis text-lg">
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Responsabilidades:</span> 
      Hablaremos sobre tus roles anteriores y lo que aprendiste.
    </div>
  </li>
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Motivaciones personales:</span> 
      Conocer tus intereses nos ayuda a entenderte mejor.
    </div>
  </li>
  <li className="flex items-start">
    <img src={chulo} alt="Checkmark" className="h-6 md:h-8 w-6 md:w-8 mr-2" />
    <div>
      <span className="block text-base md:text-lg font-montserrat font-medium">Preparación para desafíos futuros:</span> 
      Evaluaremos cómo tu experiencia te ha preparado para este nuevo puesto.
    </div>
  </li>
</ul>
      <Link to="/interview" className="mt-8 font-dosis text-base md:text-lg inline-block bg-color-2 text-color-3 py-2 px-4 rounded-md hover:bg-color-5 hover:text-white transition duration-300">
        Comenzar entrevista
      </Link>
    </div>
  </div>



      {/* Llamada a la acción */}
      <div className="mt-12 text-center">
        <p className="text-xl md:text-2xl font-montserrat font-bold my-16 md:my-28">¡Empieza ahora y da el primer paso hacia el éxito en tu carrera profesional!</p>
      </div>
    </div>
  );
};

export default WelcomeSimulator;
