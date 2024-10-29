import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import tecnica from "../../assets/tecnica.jpg";
import {
  fetchFeedback,
  fetchChat,
} from "../../redux/InterviewSimulator/InterviewSimulatorSlice";
import { FaStar, FaRegStar } from "react-icons/fa";
import imagen from "../../assets/assessment (1).png";
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
  const [hoveredParam, setHoveredParam] = useState(null);

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
    relevancia: "Evalúa si tu respuesta responde claramente a la pregunta.",
  };

  return (
    <div className="relative mt-4 md:mt-10">
      <section className="flex flex-col md:flex-row items-center justify-between relative px-4">
        {/* Flecha de regreso */}
        <SlArrowLeft
          onClick={() => navigate("/practica")}
          className="absolute left-4 top-4 lg:left-10 lg:top-12 h-8 text-color-1 cursor-pointer lg:text-5xl text-2xl z-10 mr-6"
        />

        <div className="flex flex-col items-center justify-center w-full md:flex-row md:justify-center md:ml-20">
          <img
            src={imagen}
            className="w-[50px] md:w-[70px] lg:w-[95px] mb-4 md:mb-0 md:mr-2 lg:mr-4"
            alt=""
          />
          <h1 className="font-montserrat font-bold text-center md:text-left lg:text-4xl md:text-3xl text-2xl w-4/5 lg:w-auto">
            Evaluamos la claridad, relevancia y formalidad de tus preguntas
          </h1>
        </div>
      </section>

      <section className="py-4 md:py-8">
        <p className="font-dosis text-center text-lg md:text-3xl">
          Desliza para ver el feedback de cada pregunta
        </p>
      </section>

      <section className="relative">
        <img
          src={tecnica}
          alt="Fondo"
          className="w-full h-screen object-cover"
        />

        <Swiper
          spaceBetween={20}
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
              <div className="flex flex-col justify-center items-center h-full text-white bg-gray-900 bg-opacity-75 font-dosis py-4 md:py-6">
                <div className="p-2 md:p-4 bg-slate-600 bg-opacity-25 rounded-lg border mb-4 md:mb-20">
                  <h2 className="text-center text-lg md:text-3xl font-medium md:font-bold">
                    {chat.question}
                  </h2>
                </div>

                {feedbacks?.feedback?.[index] && (
                  <>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-center">
                      {["claridad", "formalidad", "relevancia"].map(
                        (param, idx) => (
                          <div
                            key={param}
                            className={`relative p-2 md:p-4 bg-slate-600 bg-opacity-25 rounded-lg border mb-4 md:mb-10 text-center transition-all duration-500 transform ${
                              showCards[idx]
                                ? "translate-x-0 opacity-100"
                                : "translate-x-10 opacity-0"
                            }`}
                            onMouseEnter={() => setHoveredParam(param)}
                            onMouseLeave={() => setHoveredParam(null)}
                          >
                            <h3 className="font-normal md:font-semibold text-sm md:text-lg capitalize">
                              {param}
                            </h3>
                            <div className="flex justify-center">
                              {renderStars(feedbacks.feedback[index][param])}
                            </div>

                            {hoveredParam === param && (
                              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-36 md:w-48 p-2 text-xs md:text-sm text-white bg-gray-800 rounded opacity-90 transition-opacity duration-300">
                                {paramDescription[param]}
                              </div>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    <div className="mt-4 md:mt-5 transition-transform duration-300 hover:scale-105 max-w-xs md:max-w-3xl">
                      <p className="text-center p-2 md:p-4 bg-slate-600 bg-opacity-25 rounded-lg border overflow-y-auto max-h-40 md:max-h-full">
                        {showFullText[index]
                          ? feedbacks.feedback[index].sugerencias
                          : `${feedbacks.feedback[index].sugerencias.slice(
                              0,
                              80
                            )}...`}
                        <button
                          className="ml-1 text-color-2 font-bold underline"
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
