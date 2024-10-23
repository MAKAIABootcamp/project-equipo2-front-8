import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination} from "swiper/modules";
import { useParams } from "react-router-dom";
import psicolaboral from "../../assets/psicolaboral.jpg";
import { fetchFeedback, fetchChat } from "../../redux/InterviewSimulator/InterviewSimulatorSlice"; 

const Retroalimentacion = () => {
    const { intentoId } = useParams();
    const dispatch = useDispatch();

    // Obtener datos del Redux state
    const feedbacks = useSelector((state) => state.interview.feedbacks);
    const chatHistory = useSelector((state) => state.interview.messages?.chatHistory);

    // Manejar el intentoId y cargar la data necesaria
    useEffect(() => {
        if (intentoId && !feedbacks?.feedback) { 
            dispatch(fetchFeedback(intentoId));
        }
        if (intentoId && !chatHistory) {
            dispatch(fetchChat(intentoId));
        }
    }, [intentoId, dispatch]);

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

                {/* Slider de Swiper con navegación y paginación */}
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation 
                    pagination={{ clickable: true }} 
                    modules={[Navigation, Pagination]} 
                    className="absolute inset-0" 
                >
                    {/* Mapear las preguntas y feedbacks */}
                    {chatHistory?.map((chat, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col justify-center items-center h-full text-white px-10 bg-gray-900 bg-opacity-75">
                                <h2 className="text-3xl font-bold mb-6">{chat.question}</h2>

                                {/* Mostrar el feedback relacionado con la pregunta */}
                                {feedbacks?.feedback?.[index] && (
                                    <>
                                        <p className="text-center max-w-3xl mb-10">
                                            {feedbacks.feedback[index].sugerencias}
                                        </p>
                                        <div className="flex justify-center space-x-8">
                                            <div className="p-4 bg-gray-900 bg-opacity-75 rounded-lg text-center">
                                                <h3 className="font-semibold text-lg">Claridad</h3>
                                                <p>{feedbacks.feedback[index].claridad}</p>
                                            </div>
                                            <div className="p-4 bg-gray-900 bg-opacity-75 rounded-lg text-center">
                                                <h3 className="font-semibold text-lg">Formalidad</h3>
                                                <p>{feedbacks.feedback[index].formalidad}</p>
                                            </div>
                                            <div className="p-4 bg-gray-900 bg-opacity-75 rounded-lg text-center">
                                                <h3 className="font-semibold text-lg">Relevancia</h3>
                                                <p>{feedbacks.feedback[index].relevancia}</p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </div>
    );
};

export default Retroalimentacion;
