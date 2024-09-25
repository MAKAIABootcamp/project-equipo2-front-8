import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importa imágenes
import registerImage from '../../assets/registerImage.svg';
import tipsImage from '../../assets/loginImage.svg';
import plantillasImage from '../../assets/loginImage.svg';

const Carrusel = () => {
  const navigate = useNavigate();

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-color-5"></span>`;
        },
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-full h-[400px]" 
    >
      <SwiperSlide onClick={() => navigate('/practica')}>
        <img src={registerImage} alt="Práctica de entrevista" className="w-full h-full object-contain" />
      </SwiperSlide>
      <SwiperSlide onClick={() => navigate('/tips')}>
        <img src={tipsImage} alt="Tips" className="w-full h-full object-contain" />
      </SwiperSlide>
      <SwiperSlide onClick={() => navigate('/plantillas')}>
        <img src={plantillasImage} alt="Plantillas descargables" className="w-full h-full object-contain" />
      </SwiperSlide>
      
      <div className="swiper-button-next text-color-5" />
      <div className="swiper-button-prev text-color-5" />
    </Swiper>
  );
};


const TestimoniosCarrusel = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      pagination={{
        clickable: true,
        renderBullet: (index, className) => {
          return `<span class="${className} bg-color-5 h-2 w-2 rounded-full"></span>`;
        },
      }}
      navigation={false}
      modules={[Pagination, Autoplay]}
      className="w-full"
    >
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md h-48 flex flex-col justify-center items-center">
          <p className="font-bold">Emily ⭐⭐⭐⭐⭐</p>
          <p className="mt-2">SKILLMATE me ayudó a entrar en el trabajo de mis sueños</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md h-48 flex flex-col justify-center items-center">
          <p className="font-bold">John ⭐⭐⭐⭐⭐</p>
          <p className="mt-2">Fui el mejor en mis entrevistas gracias a SKILLMATE</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md h-48 flex flex-col justify-center items-center">
          <p className="font-bold">Ana ⭐⭐⭐⭐⭐</p>
          <p className="mt-2">Las plantillas de SKILLMATE son perfectas para preparar mi CV</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md h-48 flex flex-col justify-center items-center">
          <p className="font-bold">Carlos ⭐⭐⭐⭐⭐</p>
          <p className="mt-2">Me siento más preparado para enfrentar entrevistas laborales</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero text-center py-12">
        <h1 className="text-4xl font-bold font-montserrat">Prepárate para tus entrevistas laborales con SKILLMATE</h1>
        <p className="text-xl mt-4 font-dosis">Mejora tus habilidades para destacar en el mundo laboral</p>
        <button 
          className="mt-6 px-6 py-2 bg-color-1 text-white font-dosis font-semibold rounded hover:bg-color-5 transition duration-300"
          onClick={() => navigate('/practica')}
        >
          Explorar
        </button>
      </section>

      {/* Carrusel Section */}
      <section className="carrusel my-12">
        <Carrusel />
      </section>

      {/* Beneficios Section */}
      <section className="beneficios text-center my-12">
        <h2 className="text-3xl font-montserrat font-bold mb-6">Beneficios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => navigate('/practica')} className="card p-6 border rounded-lg cursor-pointer hover:shadow-lg transition duration-300">
            <p className="text-xl font-montserrat font-medium">Simulación de entrevistas</p>
            <p className="mt-2 font-dosis text-gray-600">Práctica como en la vida real</p>
          </div>
          <div onClick={() => navigate('/tips')} className="card p-6 border rounded-lg cursor-pointer hover:shadow-lg transition duration-300">
            <p className="text-xl font-montserrat font-medium">Tips</p>
            <p className="mt-2 font-dosis text-gray-600">Habilidades para mejorar</p>
          </div>
          <div onClick={() => navigate('/plantillas')} className="card p-6 border rounded-lg cursor-pointer hover:shadow-lg transition duration-300">
            <p className="text-xl font-montserrat font-medium">Hojas de vida</p>
            <p className="mt-2 font-dosis text-gray-600">Plantillas descargables</p>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="testimonios my-12 flex items-center justify-between">
        <h2 className="text-3xl font-bold font-montserrat mb-6 ml-80">Testimonios</h2>
        <TestimoniosCarrusel />
      </section>
    </div>
  );
};

export default Home;
