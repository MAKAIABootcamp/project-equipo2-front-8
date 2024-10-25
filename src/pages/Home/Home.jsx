import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarrusel } from "../../redux/Home/carruselSlice";
import { fetchBeneficios } from "../../redux/Home/beneficiosSlice";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Pagination, Autoplay, Thumbs } from "swiper/modules";
import userIconWoman from "../../assets/UserWoman.png";
import userIconMan from "../../assets/UserMan.png";
import practicaIcon from "../../assets/Job-interview.svg";
import tipsIcon from "../../assets/Solution.svg";
import plantillasIcon from "../../assets/CV.svg";

const TestimoniosCarrusel = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 2, spaceBetween: 20 },
      }}
      autoplay={{ delay: 5000 }}
      pagination={false}
      navigation={false}
      modules={[Pagination, Autoplay]}
      className="w-full"
    >
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2 ">
          <div className="flex items-center space-x-4">
            <img src={userIconWoman} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">Emily ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">
            El simulador de entrevistas me permitió corregir mis errores antes
            de la cita ❤️
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconMan} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">John ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">
            Los tips de SKILLMATE me ayudaron a mejorar mis respuestas 😍
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconWoman} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">Ana ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl min-h-[86px]">
            Las plantillas de SKILLMATE son perfectas para preparar mi CV 👍
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconMan} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">Carlos ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">
            Me siento más preparado para enfrentar entrevistas laborales 😁
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

const Home = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    carrusel,
    status: carruselStatus,
    error: carruselError,
  } = useSelector((state) => state.carrusel);
  const {
    beneficios,
    status: beneficiosStatus,
    error: beneficiosError,
  } = useSelector((state) => state.beneficios);

  useEffect(() => {
    if (carruselStatus === "idle") {
      dispatch(fetchCarrusel());
    }
    if (beneficiosStatus === "idle") {
      dispatch(fetchBeneficios());
    }
  }, [dispatch, carruselStatus, beneficiosStatus]);

  if (carruselStatus === "loading" || beneficiosStatus === "loading") {
    return <div>Cargando...</div>;
  }

  if (carruselError || beneficiosError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <div>
      <section className="carrusel my-0 sm:my-0 relative">
        {/* Título sobre el carrusel */}
        <div className="absolute top-24 sm:top-28 md:top-40 lg:top-48 xl:top-52 w-full flex justify-center items-center z-10 px-2 sm:px-4">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold bg-white/15 bg-opacity-75 py-1 sm:py-2 md:py-3 lg:py-4 px-3 sm:px-4 md:px-6 rounded-md text-center">
            ¡Prepárate para tus entrevistas laborales con SKILLMATE!
          </h1>
        </div>

        {/* Nuevo texto debajo del título */}
        <div className="absolute top-48 sm:top-52 md:top-72 lg:top-80 xl:top-96 w-full flex justify-center items-center z-10 px-2 sm:px-4">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl bg-white/15 bg-opacity-75 py-1 sm:py-2 px-2 sm:px-3 md:px-4 rounded-md text-center">
            Mejora tus habilidades para destacar en el mundo laboral.
          </h2>
        </div>

        {/* Carrusel principal */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} bg-white"></span>`;
            },
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Autoplay, Pagination, Thumbs]}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center relative"
        >
          {carrusel.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center cursor-pointer relative"
            >
              {/* Superposición oscura */}
              <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

              {/* Imagen del carrusel */}
              <img
                src={item.URL}
                alt={`Carrusel ${index + 1}`}
                className="w-full h-full object-cover z-0"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carrusel de miniaturas */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs]}
          className="w-full h-[80px] sm:h-[100px] mt-4"
        >
          {carrusel.map((item, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <img
                src={item.URL}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="beneficios text-center my-36 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-montserrat font-bold mb-20 text-gray-800 animate-pulse">
          Nuestros servicios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, index) => (
            <div
            key={index}
            className={`card bg-white from-[#DED7EC] via-[#f1ecfa] to-[#EAE4F2] p-6 border border-gray-200 rounded-lg cursor-pointer transform hover:scale-105 hover:rotate-1 hover:shadow-2xl shadow-md shadow-gray-200 hover:shadow-purple-400/50 transition-all duration-500 flex flex-col items-start justify-between h-full ${
              index === 2 ? "sm:col-span-2 md:col-span-2 lg:col-span-1 tablet:p-4 tablet:py-5 tablet:text-sm" : ""
            }`}
            onClick={() => {
              if (index === 0) {
                navigate("/practica");
              } else if (index === 1) {
                navigate("/tips");
              } else if (index === 2) {
                navigate("/plantillas");
              }
            }}
            >
              <img
                src={beneficio.URL}
                alt={beneficio.title}
                className="mx-auto mb-4 transition-all duration-300"
              />
              <div className="flex items-center space-x-4 mt-auto">
                <img
                  src={
                    index === 0
                      ? practicaIcon
                      : index === 1
                      ? tipsIcon
                      : plantillasIcon
                  }
                  alt={`Ícono ${beneficio.title}`}
                  className="w-12 h-12 transition-transform duration-300 hover:rotate-6 hover:scale-125"
                />
                <div className="text-left">
                  {index === 0 && (
                    <>
                      <p className="font-dosis text-gray-500 animate-fadeIn">
                        Práctica como en la vida real
                      </p>
                      <p className="text-lg font-montserrat font-medium text-gray-800 hover:text-purple-600 transition-colors duration-300">
                        Simulación de entrevistas
                      </p>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <p className="font-dosis text-gray-500 animate-fadeIn">
                        Habilidades para mejorar
                      </p>
                      <p className="text-lg font-montserrat font-medium text-gray-800 hover:text-purple-600 transition-colors duration-300">
                        Tips
                      </p>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <p className="font-dosis text-gray-500 animate-fadeIn">
                        Plantillas descargables
                      </p>
                      <p className="text-lg font-montserrat font-medium text-gray-800 hover:text-purple-600 transition-colors duration-300">
                        Hojas de vida
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonios mt-12 sm:mt-48 lg:flex lg:items-start lg:justify-between lg:space-x-8 mb-20 sm:mb-40 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold font-montserrat mb-6 lg:mb-0 text-center sm:text-left lg:w-1/3 lg:ml-12 xl:ml-32">
          Testimonios
        </h2>
        <div
          className="lg:w-2/4 lg:mr-10"
          style={{ position: "relative", top: "-20px" }}
        >
          <TestimoniosCarrusel />
        </div>
      </section>
    </div>
  );
};

export default Home;
