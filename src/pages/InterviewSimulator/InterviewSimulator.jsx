import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Entrevistador from "../../assets/9768312.webp";
import imgModal from "../../assets/felicidades.svg";

const preguntas = [
  "¿Puedes contarnos un poco sobre ti?",
  "¿Por qué quieres trabajar en esta empresa?",
  "¿Cuál es tu mayor fortaleza?",
  "¿Dónde te ves en 5 años?",
];

const feedbackRecomendaciones = [
  "Ser más específico en tus respuestas.",
  "Evitar respuestas demasiado cortas o largas.",
  "Mantener un lenguaje corporal positivo.",
  "Hacer más preguntas sobre la empresa al final de la entrevista.",
];

const InterviewSimulator = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    { type: "bot", message: preguntas[0] },
  ]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      timerId.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }

    return () => clearInterval(timerId.current);
  }, [timeLeft, timerActive]);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: timerActive
      ? Yup.object({
          message: Yup.string().required("Este campo es obligatorio"),
          // .matches(
          //   /^[a-zA-Z\s]+$/,
          //   "Por favor ingresa solo letras y espacios"
          // )
          // .min(10, "La respuesta debe tener al menos 10 caracteres")
          // .test(
          //   "words-count",
          //   "La respuesta debe tener al menos 3 palabras",
          //   (value) => value && value.trim().split(/\s+/).length >= 3
          // ),
        })
      : null,
    validateOnBlur: timerActive,
    validateOnChange: timerActive,
    onSubmit: (values, { resetForm }) => {
      if (!timerActive) {
        Swal.fire({
          icon: "warning",
          title: "¡Atención!",
          text: "Debes iniciar la entrevista antes de responder.",
          confirmButtonColor: "#6366F1",
        });
        return;
      }

      setChatHistory([
        ...chatHistory,
        { type: "user", message: values.message },
      ]);

      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex < preguntas.length) {
        setTimeout(() => {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { type: "bot", message: preguntas[nextQuestionIndex] },
          ]);
          setCurrentQuestionIndex(nextQuestionIndex);
          setTimeLeft(60);
        }, 1000);
      } else {
        setTimeout(() => {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            {
              type: "bot",
              message: "¡Gracias por participar en la entrevista!",
            },
          ]);
          setShowModal(true);
          setTimerActive(false);
          setCurrentQuestionIndex(nextQuestionIndex);
        }, 1000);
      }

      resetForm();
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Bienvenido al simulador de entrevistas
      </h1>
      <button
        className="mb-4 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
        onClick={() => setTimerActive(true)}
      >
        Iniciar Entrevista
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-purple-300 rounded-full flex items-center justify-center">
              <img
                src={Entrevistador}
                alt="Entrevista"
                className="rounded-full"
              />
            </div>
            <p className="mt-4 text-xl bg-purple-500 text-white px-4 py-2 rounded-lg animate-pulse">
              {`Tiempo restante: ${Math.floor(timeLeft / 60)}:${
                timeLeft % 60 < 10 ? "0" : ""
              }${timeLeft % 60}`}
            </p>
          </div>
          <div className="bg-purple-200 p-4 rounded-lg">
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.type === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`${
                      chat.type === "bot"
                        ? "bg-purple-300 text-black"
                        : "bg-purple-500 text-white"
                    } p-2 rounded-lg my-2 max-w-xs`}
                  >
                    {chat.message}
                  </div>
                </div>
              ))}
            </div>

            {currentQuestionIndex < preguntas.length && (
              <form onSubmit={formik.handleSubmit} className="mt-4">
                <div className="flex items-center">
                  <input
                    id="message"
                    name="message"
                    type="text"
                    placeholder="Escribe tu respuesta..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className="w-full p-2 rounded-l-lg border-2 border-purple-300"
                  />
                  <button
                    type="submit"
                    className="bg-purple-500 text-white p-2 rounded-r-lg hover:bg-purple-600 transition"
                  >
                    ➤
                  </button>
                </div>
                {formik.touched.message && formik.errors.message ? (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.message}
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          <div className="flex items-center bg-gradient-to-r from-purple-200 to-purple-300 text-black font-semibold px-4 py-2 rounded-full mr-2">
            Tu Progreso en la Entrevista
          </div>
          <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full shadow-md border-4 border-purple-200">
            <svg
              viewBox="0 0 36 36"
              className="w-full h-full transform -rotate-60"
            >
              <path
                className="text-purple-200 stroke-current"
                strokeWidth="4"
                fill="none"
                d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-600 stroke-current"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${
                  (currentQuestionIndex / preguntas.length) * 100
                }, 100`}
                fill="none"
                d="M18 2.0845 
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-purple-700">
              {Math.round((currentQuestionIndex / preguntas.length) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
            {/* Botón de cerrar */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => {
                setShowModal(false);
                window.location.reload();
              }}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              ¡Felicitaciones! Haz terminado tu entrevista.
            </h2>
            <img
              src={imgModal}
              alt="Celebración"
              className="w-full max-h-16 object-contain mb-4"
            />
            <div className="text-center mb-4">
              <p className="text-xl font-semibold">Calificación</p>
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>
              <div className="mt-2">
                {feedbackRecomendaciones.map((recomendacion, index) => (
                  <p key={index} className="mt-1">
                    • {recomendacion}
                  </p>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 transition"
                onClick={() => {
                  setShowModal(false);
                  window.location.reload();
                }}
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulator;
