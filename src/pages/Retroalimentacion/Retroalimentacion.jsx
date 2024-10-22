import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useParams } from "react-router-dom"; 
import psicolaboral from "../../assets/psicolaboral.jpg";
import { fetchIdIntento } from "../../redux/InterviewSimulator/InterviewSimulatorSlice"; 

const Retroalimentacion = () => {
    const { intentoId } = useParams();
    const [question, setQuestion] = useState("");
    const [suggestions, setSuggestions] = useState("");
    const [claridad, setClaridad] = useState("");
    const [formalidad, setFormalidad] = useState("");
    const [relevancia, setRelevancia] = useState("");
    const dispatch = useDispatch();

    // Obtener datos del Redux state
    const feedbacks = useSelector((state) => state.interview.feedbacks);
    const chatHistory = useSelector((state) => state.interview.messages?.chatHistory);

    // Manejar el intentoId y cargar la data necesaria
    useEffect(() => {
        if (intentoId) {
            dispatch(fetchIdIntento(intentoId));
        }
    }, [intentoId, dispatch]);

    // Manejar la actualización de chatHistory y feedbacks
    useEffect(() => {
        if (chatHistory && chatHistory.length > 0) {
            // Obtener la última pregunta de la colección de intentos
            setQuestion(chatHistory[chatHistory.length - 1].question);
        }

        if (feedbacks && feedbacks.feedback) {
            // Obtener el último feedback
            const latestFeedback = feedbacks.feedback[feedbacks.feedback.length - 1];
            setSuggestions(latestFeedback.sugerencias);
            setClaridad(latestFeedback.claridad);
            setFormalidad(latestFeedback.formalidad);
            setRelevancia(latestFeedback.relevancia);
        }
    }, [chatHistory, feedbacks]);

    return (
        <div className="relative">
            <section className="flex justify-center">
                <h1 className="font-montserrat font-bold text-4xl py-10">
                    Feedback de la entrevista que acabas de realizar
                </h1>
            </section>

            {/* Imagen de fondo */}
            <section className="relative">
                <img src={psicolaboral} alt="Fondo" className="w-full h-screen object-cover" />

                <Swiper spaceBetween={50} slidesPerView={1} className="absolute inset-0">
                    {/* Slide con la pregunta */}
                    <SwiperSlide>
                        <div className="flex flex-col justify-center items-center h-full text-white px-10 bg-black bg-opacity-50">
                            <h2 className="text-3xl font-bold mb-6">{question}</h2>
                            <p className="text-center max-w-3xl mb-10">{suggestions}</p>

                            {/* Contenedor de claridad, formalidad, relevancia */}
                            <div className="flex justify-center space-x-8">
                                <div className="p-4 bg-gray-900 bg-opacity-75 rounded-lg text-center">
                                    <h3 className="font-semibold text-lg">Claridad</h3>
                                    <p>{claridad}</p>
                                </div>
                                <div className="p-4 bg-gray-900 bg-opacity-75 rounded-lg text-center">
                                    <h3 className="font-semibold text-lg">Formalidad</h3>
                                    <p>{formalidad}</p>
                                </div>
                                <div className="p-4 bg-gray-900 bg-opacity-75 rounded-lg text-center">
                                    <h3 className="font-semibold text-lg">Relevancia</h3>
                                    <p>{relevancia}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </div>
    );
};

export default Retroalimentacion;
