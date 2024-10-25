import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";
import { setSelectedCategory } from "../../redux/InterviewSimulator/InterviewSimulatorSlice";
import backgroundImage from "../../assets/pexels-thirdman-5256825.jpg";
import psicolaboral from "../../assets/psicolaboral.png";
import tecnica from "../../assets/tecnica.png";
import laboral from "../../assets/laboral.png";
import chulo from "../../assets/Chulo.png";

const WelcomeSimulator = () => {
  const dispatch = useDispatch();

  const handleCategoryClick = (categoria) => {
    dispatch(setSelectedCategory(categoria));
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#EBE2FF] ">
      <div
        className="relative w-full h-[500px] sm:h-[700px] bg-cover bg-no-repeat bg-center flex flex-col justify-center items-center sm:items-start"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="p-4 bg-white/20 backdrop-blur-md rounded-lg text-center sm:text-left sm:ml-6 md:ml-12 lg:ml-16 xl:ml-20 mt-8 sm:mt-32 md:mt-32 max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-full">
          <h1 className="text-white text-xl sm:text-2xl md:text-4xl font-bold font-montserrat">
            ¡Bienvenido al simulador de entrevistas!
          </h1>
        </div>

        <div className="mt-4 sm:mt-6 md:mt-8 max-w-xs sm:max-w-md md:max-w-lg text-center sm:text-left sm:ml-6 md:ml-12 lg:ml-16 xl:ml-20">
          <p className="text-white text-base sm:text-lg md:text-2xl font-dosis">
            Nuestro objetivo es ofrecerte una experiencia interactiva que te
            permita practicar respuestas y mejorar tus habilidades de
            comunicación de manera rápida y efectiva.
          </p>
        </div>
      </div>
      <h2 className="text-center text-2xl font-bold font-montserrat text-black my-28">
        Selecciona una categoría para iniciar con tu entrevista
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 md:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={psicolaboral} alt="Psico Laboral" className="h-8 mr-2" />
            <h3 className="text-xl font-semibold font-montserrat">
              Psico Laboral
            </h3>
          </div>
          <Player
            autoplay
            loop
            src="https://lottie.host/54565224-78c2-42d4-ac25-3fe430533c8b/skPUqaudBr.json"
            style={{ width: "260px", height: "260px" }}
            className="mb-4 mt-4"
          />
          <p className="mb-8 font-dosis font-medium text-lg">
          Evaluaremos tus habilidades interpersonales en diversas situaciones.
          </p>
          <h3 className="text-xl font-semibold font-montserrat mb-8">
            Aspectos a evaluar:
          </h3>
          <ul className="text-left text-gray-700 pr-2 space-y-8 font-dosis text-lg">
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Manejo del estrés:
                </span>
                Queremos saber cómo enfrentas situaciones estresantes.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Motivaciones personales:
                </span>
                Conocer tus intereses nos ayuda a entenderte mejor.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Contribución al equipo:
                </span>
                Buscamos saber cómo puedes sumar al grupo.
              </div>
            </li>
          </ul>
          <Link
            to="/interview"
            onClick={() => handleCategoryClick("Psico laboral")}
            className="mt-8 font-dosis font-semibold text-lg inline-block border border-color-1 text-color-3 py-2 px-4 rounded-md hover:bg-[#EBE2FF] hover:text-black transition duration-300"
          >
            Comenzar entrevista
          </Link>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={tecnica} alt="Técnica" className="h-8 mr-2" />
            <h3 className="text-xl font-semibold font-montserrat">Técnica</h3>
          </div>
          <Player
            autoplay
            loop
            src="https://lottie.host/bfc3a375-4c09-4aab-a205-75cbdcde9880/yVuIPqlojq.json"
            style={{ width: "260px", height: "260px" }}
            className="mb-4 mt-4"
          />
          <p className="mb-8 font-dosis font-medium text-lg">
            Analizaremos tus conocimientos específicos en el área.
          </p>
          <h3 className="text-xl font-semibold font-montserrat mb-8">
            Aspectos a evaluar:
          </h3>
          <ul className="text-left  pr-2 space-y-8 font-dosis text-lg">
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Competencia técnica:
                </span>
                Verificaremos tus habilidades en áreas clave.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Resolución de problemas:
                </span>
                Te presentaremos casos prácticos para evaluar tu enfoque.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                Aplicar conocimientos:
                </span>
                Queremos saber cómo aplicarías tus conocimientos al mundo real.
              </div>
            </li>
          </ul>
          <Link
            to="/interview"
            onClick={() => handleCategoryClick("Conocimiento técnico")}
            className="mt-8 font-dosis font-semibold  text-lg inline-block border border-color-1 text-color-3 py-2 px-4 rounded-md hover:bg-[#EBE2FF] hover:text-black transition duration-300"
          >
            Comenzar entrevista
          </Link>
        </div>
        <div
    className="bg-white shadow-lg rounded-lg p-6 text-center sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-center mb-4">
            <img src={laboral} alt="Experiencia Laboral" className="h-8 mr-2" />
            <h3 className="text-xl font-semibold font-montserrat">
              Experiencia Laboral
            </h3>
          </div>
          <Player
            autoplay
            loop
            src="https://lottie.host/e946e0ee-ff39-44b3-a6f2-1674e270e550/h5lZJmoJqc.json"
            style={{ width: "260px", height: "260px" }}
            className="mb-4 mt-4"
          />
          <p className="mb-8 font-dosis font-medium text-lg">
            Revisaremos tus proyectos personales y experiencia práctica.
          </p>
          <h3 className="text-xl font-semibold font-montserrat mb-8">
            Aspectos a evaluar:
          </h3>
          <ul className="text-left text-gray-700 pr-2 space-y-8 font-dosis text-lg">
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Responsabilidades:
                </span>
                Hablaremos sobre tus roles anteriores y lo que aprendiste.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Motivaciones personales:
                </span>
                Conocer tus intereses nos ayuda a entenderte mejor.
              </div>
            </li>
            <li className="flex items-start">
              <img
                src={chulo}
                alt="Checkmark"
                className="h-6 md:h-8 w-6 md:w-8 mr-2"
              />
              <div>
                <span className="block text-base md:text-lg font-montserrat font-medium">
                  Preparación para desafíos:
                </span>
                Evaluaremos cómo tu experiencia te ha preparado para este reto.
              </div>
            </li>
          </ul>
          <Link
            to="/interview"
            onClick={() => handleCategoryClick("Experiencia laboral")}
            className="mt-8 font-dosis font-semibold  text-base md:text-lg inline-block border border-color-1 text-color-3 py-2 px-4 rounded-md hover:bg-[#EBE2FF] hover:text-black transition duration-300"
          >
            Comenzar entrevista
          </Link>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xl md:text-2xl font-montserrat font-bold my-16 md:my-28">
          ¡Empieza ahora y da el primer paso hacia el éxito en tu carrera
          profesional!
        </p>
      </div>
    </div>
  );
};

export default WelcomeSimulator;
