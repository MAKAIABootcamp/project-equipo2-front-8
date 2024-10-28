import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import tecnica from "../../assets/tecnica.jpg";
import { fetchFeedback, fetchChat } from "../../redux/InterviewSimulator/InterviewSimulatorSlice";
import { FaStar, FaRegStar } from "react-icons/fa";
import imagen from "../../assets/retroa-3.png";
import { SlArrowLeft } from "react-icons/sl";

const Retroalimentacion = () => {
    const { intentoId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const feedbacks = useSelector((state) => state.interview.feedbacks);
    const chatHistory = useSelector(
        (state) => state.interview.messages?.chatHistory
    );

    const [showCards, setShowCards] = useState([false, false, false]);
    const [showFullText, setShowFullText] = useState([]);
    const [hoveredParam, setHoveredParam] = useState(null); // Estado para el tooltip

    useEffect(() => {
        if (intentoId) {
            dispatch(fetchFeedback(intentoId));
            dispatch(fetchChat(intentoId));
        }
    }, [intentoId, dispatch]);

    const activateSlideEffect = () => {
        setShowCards([false, false, false]);
        const timeouts = [
            setTimeout(() => setShowCards([true, false, false]), 300),
            setTimeout(() => setShowCards([true, true, false]), 600),
            setTimeout(() => setShowCards([true, true, true]), 900),
        ];

        return () => timeouts.forEach(clearTimeout);
    };

    useEffect(() => {
        activateSlideEffect();
    }, []);

    const renderStars = (score) => {
        const totalStars = 5;
        const filledStars = Math.ceil(score / 2);

        return (
            <>
                {[...Array(totalStars)].map((_, index) =>
                    index < filledStars ? (
                        <FaStar key={index} className="text-yellow-500" />
                    ) : (
                        <FaRegStar key={index} className="text-gray-700" />
                    )
                )}
            </>
        );
    };

    const toggleFullText = (index) => {
        setShowFullText((prev) => {
            const newShowFullText = [...prev];
            newShowFullText[index] = !newShowFullText[index];
            return newShowFullText;
        });
    };

    const paramDescription = {
        claridad: "Evalúa qué tan comprensible es tu respuesta.",
        formalidad: "Mide el tono y el nivel de profesionalismo en tu respuesta.",
        relevancia: "Evalúa si tu respuesta está alineada con la pregunta planteada."
    };

    return (
        <div className="relative mb-10">
            <section className="flex md:flex-row flex-col items-center justify-evenly">
                <SlArrowLeft
                    onClick={() => navigate("/practica")}
                    className="h-8 text-color-1 md:ml-3 md:mt-4 mt-3 ml-2 cursor-pointer md:text-5xl text-2xl mb-0"/>
                <img className="md:w-1/6 w-1/3" src={imagen} alt="" />
                <h1 className="font-montserrat font-bold text-center md:text-4xl text-2xl py-10 w-4/5">
                    Evaluamos la claridad, relevancia y formalidad de tus preguntas
                </h1>
            </section>
            <section className="py-4">
                <p className="font-dosis md:text-3xl text-xl text-center">Desliza para ver el feedback de cada pregunta</p>
            </section>
            <section className="relative">
                <img
                    src={tecnica}
                    alt="Fondo"
                    className="w-full h-screen object-cover"
                />

                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => {
                            return `<span class="${className} bg-white"></span>`;
                        },
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    modules={[Navigation, Pagination]}
                    className="absolute inset-0"
                    onSlideChange={activateSlideEffect}
                >
                    {chatHistory?.map((chat, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col justify-center items-center h-full text-white bg-gray-900 bg-opacity-75 font-dosis py-6">
                                <div className="md:p-4 p-2 bg-color-2 bg-opacity-35 rounded-lg mb-6 ">
                                    <h2 className="md:text-3xl text-xl text-center md:font-bold font-medium ">{chat.question}</h2>
                                </div>

                                {feedbacks?.feedback?.[index] && (
                                    <>
                                        <div className="item flex md:flex-row flex-col justify-center md:gap-6 gap-3">
                                            {["claridad", "formalidad", "relevancia"].map(
                                                (param, idx) => (
                                                    <div
                                                        key={param}
                                                        className={`relative md:p-4 p-2 bg-color-2 bg-opacity-35 rounded-lg text-center transition-all duration-500 transform ${showCards[idx]
                                                            ? "translate-x-0 opacity-100"
                                                            : "translate-x-10 opacity-0"
                                                            }`}
                                                        onMouseEnter={() => setHoveredParam(param)}
                                                        onMouseLeave={() => setHoveredParam(null)}
                                                    >
                                                        <h3 className="md:font-semibold font-normal md:text-lg capitalize">
                                                            {param}
                                                        </h3>
                                                        <div className="flex justify-center">
                                                            {renderStars(feedbacks.feedback[index][param])}
                                                        </div>

                                                        {hoveredParam === param && (
                                                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 p-2 text-sm text-white bg-gray-800 rounded opacity-90 transition-opacity duration-300">
                                                                {paramDescription[param]}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="md:mt-8 mt-5 transition-transform duration-300 hover:scale-105">
                                            <p className="text-center max-w-3xl md:p-4 p-2 bg-color-2 bg-opacity-35 rounded-lg ">
                                                {showFullText[index]
                                                    ? feedbacks.feedback[index].sugerencias
                                                    : `${feedbacks.feedback[index].sugerencias.slice(0, 100)}...`}
                                                <button
                                                    className="text-color-5 underline "
                                                    onClick={() => toggleFullText(index)}
                                                >
                                                    {showFullText[index] ? "Ver menos" : "Ver más"}
                                                </button>
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-button-next text-color-2 hover:text-color-1" />
                    <div className="swiper-button-prev text-color-2 hover:text-color-1" />
                </Swiper>
            </section>
        </div>
    );
};

export default Retroalimentacion;
