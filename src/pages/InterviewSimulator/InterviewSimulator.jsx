import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useEffect, useRef, useState, useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Player } from "@lottiefiles/react-lottie-player";
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchQuestions,
  nextQuestion,
  setTimeLeft,
  setTimerActive,
  addChatMessage,
  setShowModal,
  setHasStarted,
  resetInterview,
  resetInterviewState,
  createChatHistory,
  updateChatHistory,
} from "../../redux/InterviewSimulator/InterviewSimulatorSlice";
import { useNavigate } from "react-router-dom";
import InterviewProgress from "../../components/InterviewProgress/InterviewProgress";
import Timer from "../../components/Timer/Timer";
import ChatHistory from "./../../components/ChatHistory/ChatHistory";


const InterviewSimulator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerId = useRef(null);

  const [isTyping, setIsTyping] = useState(false);
  const {
    selectedCategory,
    questions,
    currentQuestionIndex,
    chatHistory,
    timeLeft,
    timerActive,
    showModal,
    hasStarted,
    messages
  } = useSelector((state) => state.interview);

  const [showRetryModal, setShowRetryModal] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchQuestions(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  // Temporizador
  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      timerId.current = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerId.current);
      setShowRetryModal(true);
    }
    return () => clearInterval(timerId.current);
  }, [timeLeft, timerActive, dispatch]);

  const handleBackToCategories = () => {
    dispatch(resetInterview());
    navigate("/practica");
  };


  const handleFeedback = (id) => {
    console.log("intentoId", id);
    navigate(`/retroalimentacion/${id}`);
  };



  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: timerActive
      ? Yup.object({
        message: Yup.string().required("Este campo es obligatorio"),
        
      })
      : null,
    validateOnBlur: timerActive,
    validateOnChange: timerActive,
    onSubmit: (values, { resetForm }) => {
      dispatch(addChatMessage({ type: "user", message: values.message }));

      const nextQuestionIndex = currentQuestionIndex + 1;

      if (Number(nextQuestionIndex) === 1) {
        dispatch(
          createChatHistory({
            question: questions[currentQuestionIndex].pregunta,
            category: questions[currentQuestionIndex].categoria,
            response: values.message,
          })
        );
      }
      if (Number(nextQuestionIndex) > 1) {
        dispatch(
          updateChatHistory({
            idIntento: messages?.id || "",
            question: questions[currentQuestionIndex].pregunta,
            category: questions[currentQuestionIndex].categoria,
            response: values.message,
          })
        );
      }

      if (nextQuestionIndex < questions.length) {
        setAnsweredQuestions((prevCount) => prevCount + 1);
        dispatch(nextQuestion());
        dispatch(setTimeLeft(120));

        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);
          dispatch(
            addChatMessage({
              type: "bot",
              message: questions[nextQuestionIndex].pregunta,
            })
          );
        }, 3000);

      } else {
        setAnsweredQuestions((prevCount) => prevCount + 1);
        dispatch(setShowModal(true));
        dispatch(setTimerActive(false));
      }

      resetForm();
    },
  });

  const startInterview = async () => {
    let loadedQuestions = questions;

    if (loadedQuestions.length === 0) {
      const response = dispatch(fetchQuestions(selectedCategory));

      if (response && response.payload && response.payload.length > 0) {
        loadedQuestions = response.payload;
      } else {
        alert("No hay preguntas disponibles para esta entrevista.");
        return;
      }
    }

    dispatch(setHasStarted(true));
    dispatch(setTimerActive(true));

    dispatch(
      addChatMessage({ type: "bot", message: loadedQuestions[0].pregunta })
    );
  };

  const feedbacks = useSelector((state) => state.interview.feedbacks);

  // Calcular la calificación general
  const totalFeedbackScore = useMemo(() => {
    if (!feedbacks || !feedbacks.feedback || feedbacks.feedback.length === 0) {
      return null; // Devuelve null mientras se cargan los datos
    }
  
    let totalQuestionScore = 0;
  
    feedbacks.feedback.forEach((fb, index) => {
      const claridad = parseFloat(fb.claridad) || 0;
      const formalidad = parseFloat(fb.formalidad) || 0;
      const relevancia = parseFloat(fb.relevancia) || 0;
  
      const totalScoreForQuestion = claridad + formalidad + relevancia;
  
      totalQuestionScore += totalScoreForQuestion;
    });
  
    const averageTotalScore = totalQuestionScore / feedbacks.feedback.length;
  
    return (averageTotalScore / 30) * 5; 
  }, [feedbacks]);
  
  // Nuevo estado para controlar si está calculando
  const [isCalculating, setIsCalculating] = useState(true);
  
  useEffect(() => {
    if (totalFeedbackScore !== null) {
      const timeout = setTimeout(() => setIsCalculating(false), 1500); 
      return () => clearTimeout(timeout); 
    }
  }, [totalFeedbackScore]);
  
  // Función para redondear el puntaje y convertirlo en estrellas
  const calculateStarsFromScore = (score) => {
    const stars = Math.round(score);
    return Math.max(1, Math.min(stars, 5));
  };
  

  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center">
        {/* Puedes usar una animación CSS con Tailwind */}
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  };
  
  const renderStars = (score) => {
    if (isCalculating || score === null) {
      return <LoadingSpinner />;
    }
  
    const totalStars = calculateStarsFromScore(score);
    const emptyStars = 5 - totalStars;
  
    return (
      <div className="flex items-center">
        {Array(totalStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100 p-4">
      <div className="absolute top-20 left-0">
        <SlArrowLeft
          onClick={() => {
            dispatch(resetInterview());
            navigate("/practica");
          }}
          className="h-8 text-color-1 md:ml-3 md:mt-4 mt-3 ml-2 cursor-pointer md:text-5xl text-2xl"
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12 lg:p-16 max-w-4xl w-full mx-auto">
        {/* H1 dentro del contenedor */}
        {selectedCategory && (
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-12">
            {selectedCategory}
          </h1>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-purple-300 rounded-full flex items-center justify-center">
              <Player
                autoplay
                loop
                src="https://lottie.host/afd8fdfd-8370-44aa-bd62-7be2f8909e42/tUDF2f2WZz.json"
                style={{ height: "200px", width: "200px" }}
              />
            </div>

            {hasStarted && (
              <button
                className="px-4 sm:px-6 py-2 rounded-lg mt-8 sm:mt-16 mb-4 border border-color-1 text-color-3 hover:bg-[#ece1ff] hover:text-color-3 transition font-dosis"
                onClick={handleBackToCategories}
              >
                Cambiar entrevista
              </button>
            )}

            {hasStarted && <Timer timeLeft={timeLeft} />}
          </div>

          {/* Columna derecha */}
          <div className="bg-purple-200 p-4 rounded-lg">
            {/* Historial del chat */}
            <ChatHistory
              chatHistory={chatHistory}
              hasStarted={hasStarted}
              startInterview={startInterview}
              isTyping={isTyping}
            />

            {/* Formulario para respuestas */}
            {hasStarted && currentQuestionIndex < questions.length && (
              <form onSubmit={formik.handleSubmit} className="mt-4">
                <div className="flex flex-col sm:flex-row items-center">
                  <input
                    id="message"
                    name="message"
                    type="text"
                    placeholder="Escribe tu respuesta..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                    className="w-full sm:flex-1 p-2 rounded-l-lg border-2 border-purple-300"
                  />
                  <button
                    type="submit"
                    className="bg-purple-500 text-white w-full sm:w-auto p-2 sm:px-4 rounded-r-lg hover:bg-purple-600 transition mt-2 sm:mt-0"
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
          <div className="mt-8">
            <InterviewProgress
              answeredQuestions={answeredQuestions}
              questionsLength={questions.length}
            />
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
                dispatch(resetInterviewState());
                dispatch(fetchQuestions(selectedCategory));
                setAnsweredQuestions(0);
                setShowModal(false);
                navigate("/practica");
              }}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">
              ¡Felicitaciones! Haz terminado tu entrevista.
            </h2>
            <Player
            autoplay
            loop
            src="https://lottie.host/712034bd-e590-41cf-b6c6-0d7623614106/ykFpBHKz4O.json"
            style={{ width: "100px", height: "100px" }}
            className="mb-4 mt-4"
          />
            <div className="text-center mb-4">
              <p className="text-xl font-semibold">Calificación</p>
              <section className="flex justify-center mb-10">
                <h2 className="text-2xl flex items-center">
                  {renderStars(totalFeedbackScore)}
                </h2>
              </section>
            </div>
            <div className="text-center">
              <button
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 border border-color-1 text-color-3 font-dosis rounded hover:bg-[#ece1ff] transition duration-300"
                onClick={() => {
                  dispatch(resetInterviewState());
                  dispatch(fetchQuestions(selectedCategory));
                  setAnsweredQuestions(0);
                  setShowModal(false);
                }}
              >
                Reintentar
              </button>
              <button 
              className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 border border-color-1 text-color-3 font-dosis rounded hover:bg-[#ece1ff] transition duration-300"
              onClick={() => handleFeedback(messages.id)}>
                Ver resultados
              </button>
            </div>
          </div>
        </div>
      )}

      {showRetryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
            <h2 className="text-2xl font-bold mb-4 text-center">
              El tiempo para responder ha terminado.
            </h2>
            <div className="text-center mb-4">
              <p>
                ¿Deseas reintentar la pregunta o continuar con la siguiente?
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
                  onClick={() => {
                    setShowRetryModal(false);
                    dispatch(setTimeLeft(120));
                  }}
                >
                  Reintentar
                </button>
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  onClick={() => {
                    setShowRetryModal(false);
                    setAnsweredQuestions((prevCount) => prevCount + 1);
                    dispatch(nextQuestion());
                    dispatch(setTimeLeft(120));
                    dispatch(
                      addChatMessage({
                        type: "bot",
                        message: questions[currentQuestionIndex + 1].pregunta,
                      })
                    );
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewSimulator;