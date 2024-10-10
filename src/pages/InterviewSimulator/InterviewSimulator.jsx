import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from "react-redux";
import imgModal from "../../assets/felicidades.svg";
import {
  setQuestions,
  nextQuestion,
  addChatMessage,
  setTimeLeft,
  setTimerActive,
  setShowModal,
  setHasStarted,
} from "../../redux/InterviewSimulator/InterviewSimulatorSlice";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../Firebase/firebaseConfig";

const feedbackRecomendaciones = [
  "Ser más específico en tus respuestas.",
  "Evitar respuestas demasiado cortas o largas.",
  "Mantener un lenguaje corporal positivo.",
  "Hacer más preguntas sobre la empresa al final de la entrevista.",
];

const InterviewSimulator = () => {
  const dispatch = useDispatch();
  const {
    selectedCategory,
    questions,
    currentQuestionIndex,
    chatHistory,
    timeLeft,
    timerActive,
    showModal,
    hasStarted,
  } = useSelector((state) => state.interview);

  const timerId = useRef(null);

  // Fetch questions from Firebase and filter by selected category
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(database, "preguntas"));

        const questionsData = querySnapshot.docs.map((doc) => doc.data());
        if (!selectedCategory) {
          console.log("No hay categoría seleccionada");
          return;
        }

        // Filtrar las preguntas por la categoría seleccionada
        const filteredQuestions = questionsData.filter(
          (question) => question.categoria === selectedCategory
        );

        dispatch(setQuestions(filteredQuestions));
      } catch (error) {
        console.error("Error al obtener preguntas:", error);
      }
    };

    fetchQuestions();
  }, [dispatch, selectedCategory]);

  // Temporizador
  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      timerId.current = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
    } else {
      clearInterval(timerId.current);
    }
    return () => clearInterval(timerId.current);
  }, [timeLeft, timerActive, dispatch]);

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

      dispatch(addChatMessage({ type: "user", message: values.message }));

      const nextQuestionIndex = currentQuestionIndex + 1;

      if (nextQuestionIndex < questions.length) {
        setTimeout(() => {
          dispatch(
            addChatMessage({
              type: "bot",
              message: questions[nextQuestionIndex].pregunta,
            })
          );
          dispatch(nextQuestion());
          dispatch(setTimeLeft(60));
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(
            addChatMessage({
              type: "bot",
              message: "¡Gracias por participar en la entrevista!",
            })
          );
          dispatch(setShowModal(true));
          dispatch(setTimerActive(false));
        }, 1000);
      }

      resetForm();
    },
  });

  const startInterview = () => {
    dispatch(setHasStarted(true));
    dispatch(setTimerActive(true));
    if (questions.length > 0) {
      dispatch(addChatMessage({ type: "bot", message: questions[0].pregunta }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-16 max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 bg-purple-300 rounded-full flex items-center justify-center">
              <Player
                autoplay
                loop
                src="https://lottie.host/afd8fdfd-8370-44aa-bd62-7be2f8909e42/tUDF2f2WZz.json"
                style={{ height: "300px", width: "300px" }}
              />
            </div>

            {hasStarted && (
              <button
                className="px-6 py-2 rounded-lg mt-16 mb-4 border border-color-1 text-color-3 hover:bg-[#ece1ff] hover:text-color-3 transition font-dosis"
                disabled={true}
              >
                Entrevista Iniciada
              </button>
            )}

            {hasStarted && (
              <div className="relative w-1/2 bg-purple-200 rounded-full h-8 mt-6">
                {/* Barra */}
                <div className="absolute bg-color-1 h-8 w-full rounded-full animate-pulse"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                  <p className="text-black text-sm font-dosis leading-none">
                    {`Tiempo restante: ${Math.floor(timeLeft / 60)}:${
                      timeLeft % 60 < 10 ? "0" : ""
                    }${timeLeft % 60}`}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-purple-200 p-4 rounded-lg">
            {/* Historial del chat */}
            <div className="h-64 overflow-y-auto p-4 space-y-4 bg-white rounded-lg shadow-inner">
              {!hasStarted ? (
                <>
                  <div className="flex justify-start">
                    <div className="bg-purple-300 text-black p-2 rounded-lg my-2 max-w-xs relative before:content-[''] before:absolute before:top-2 before:left-[-10px] before:w-0 before:h-0 before:border-r-8 before:border-r-purple-300 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent">
                      ¿Estás listo? presiona "Iniciar Entrevista" para comenzar.
                    </div>
                  </div>
                  {/* Mostrar el botón debajo del mensaje cuando la entrevista no ha comenzado */}
                  <div className="flex justify-center">
                    <button
                      onClick={startInterview}
                      className="px-6 py-2 rounded-lg mt-4 mb-4 border border-color-1 text-color-3 hover:bg-[#ece1ff] hover:text-color-3 transition font-dosis"
                      disabled={hasStarted}
                    >
                      Iniciar Entrevista
                    </button>
                  </div>
                </>
              ) : (
                chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      chat.type === "bot" ? "justify-start" : "justify-end"
                    } animate__animated animate__fadeInUp`}
                  >
                    <div
                      className={`relative p-2 rounded-lg my-2 max-w-xs shadow-md ${
                        chat.type === "bot"
                          ? "bg-purple-300 text-black before:content-[''] before:absolute before:top-2 before:left-[-10px] before:w-0 before:h-0 before:border-r-8 before:border-r-purple-300 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent"
                          : "bg-purple-500 text-white before:content-[''] before:absolute before:top-2 before:right-[-10px] before:w-0 before:h-0 before:border-l-8 before:border-l-purple-500 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent"
                      }`}
                    >
                      {chat.message}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Formulario para respuestas */}
            {hasStarted && currentQuestionIndex < questions.length && (
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

        {hasStarted && (
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
                    (currentQuestionIndex / questions.length) * 100
                  }, 100`}
                  fill="none"
                  d="M18 2.0845 
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-lg text-purple-700 font-bold">
                {Math.floor((currentQuestionIndex / questions.length) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
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
