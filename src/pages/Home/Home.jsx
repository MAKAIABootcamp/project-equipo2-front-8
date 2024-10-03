import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarrusel } from '../../redux/Home/carruselSlice';
import { fetchBeneficios } from '../../redux/Home/beneficiosSlice';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import userIconWoman from '../../assets/UserWoman.png';
import userIconMan from '../../assets/UserMan.png';
import practicaIcon from '../../assets/Job-interview.svg';  
import tipsIcon from '../../assets/Solution.svg';
import plantillasIcon from '../../assets/CV.svg';

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
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconWoman} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">Emily ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">El simulador de entrevistas me permitió corregir mis errores antes de la cita ❤️</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconMan} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">John ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">Los tips de SKILLMATE me ayudaron a mejorar mis respuestas 😍</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconWoman} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">Ana ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">Las plantillas de SKILLMATE son perfectas para preparar mi CV 👍</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="testimonio p-4 bg-white border rounded-lg shadow-md flex flex-col justify-center items-start space-y-2">
          <div className="flex items-center space-x-4">
            <img src={userIconMan} alt="Ícono persona" className="w-8 h-8" />
            <p className="font-bold font-montserrat">Carlos ⭐⭐⭐⭐⭐</p>
          </div>
          <p className="mt-2 font-dosis text-xl">Me siento más preparado para enfrentar entrevistas laborales 😁</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { carrusel, status: carruselStatus, error: carruselError } = useSelector((state) => state.carrusel);
  const { beneficios, status: beneficiosStatus, error: beneficiosError } = useSelector((state) => state.beneficios);


  useEffect(() => {
    if (carruselStatus === 'idle') {
      dispatch(fetchCarrusel());
    }
    if (beneficiosStatus === 'idle') {
      dispatch(fetchBeneficios());
    }
  }, [dispatch, carruselStatus, beneficiosStatus]);


  if (carruselStatus === 'loading' || beneficiosStatus === 'loading') {
    return <div>Cargando...</div>;
  }

  if (carruselError || beneficiosError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <div>
      <section className="hero text-center py-6 sm:py-12">
        <h1 className="text-2xl sm:text-4xl font-bold font-montserrat">
          Prepárate para tus entrevistas laborales con SKILLMATE
        </h1>
        <p className="text-base sm:text-xl mt-2 sm:mt-4 font-dosis">
          Mejora tus habilidades para destacar en el mundo laboral
        </p>
        <button
          className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-color-1 text-white font-dosis font-semibold rounded hover:bg-color-5 transition duration-300"
          onClick={() => navigate('/practica')}
        >
          Explorar
        </button>
      </section>


<section className="carrusel my-8 sm:my-12">
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
    navigation={false} 
    modules={[Autoplay, Pagination, Navigation]} 
    className="w-full h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-center"
  >
    {carrusel.map((item, index) => (
      <SwiperSlide key={index} onClick={() => {
          if (index === 0) {
              navigate('/practica');
          } else if (index === 1) {
              navigate('/tips');
          } else if (index === 2) {
              navigate('/plantillas');
          }
      }} className="flex justify-center items-center cursor-pointer">
        <img
          src={item.URL}
          alt={`Carrusel ${index + 1}`}
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </SwiperSlide>
    ))}
    
    <div className="swiper-button-next text-color-5" />
    <div className="swiper-button-prev text-color-5" />
  </Swiper>
</section>




<section className="beneficios text-center my-24 max-w-screen-xl mx-auto">
  <h2 className="text-3xl font-montserrat font-bold mb-20">Beneficios</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {beneficios.map((beneficio, index) => (
      <div key={index} className="card bg-[#DED7EC] p-6 border rounded-lg cursor-pointer hover:shadow-lg transition duration-300 flex flex-col items-start justify-between h-full" onClick={() => {
          if (index === 0) {
              navigate('/practica');
          } else if (index === 1) {
              navigate('/tips');
          } else if (index === 2) {
              navigate('/plantillas');
          }
      }}>
        <img src={beneficio.URL} alt={beneficio.title} className="mx-auto mb-4" />
        <div className="flex items-center space-x-4 mt-auto">
          <img src={index === 0 ? practicaIcon : index === 1 ? tipsIcon : plantillasIcon} alt={`Ícono ${beneficio.title}`} className="w-12 h-12" />
          <div className="text-left">
            {index === 0 && (
              <>
                <p className="font-dosis text-gray-600">Práctica como en la vida real</p>
                <p className="text-lg font-montserrat font-medium">Simulación de entrevistas</p>
              </>
            )}
            {index === 1 && (
              <>
                <p className="font-dosis text-gray-600">Habilidades para mejorar</p>
                <p className="text-lg font-montserrat font-medium">Tips</p>
              </>
            )}
            {index === 2 && (
              <>
                <p className="font-dosis text-gray-600">Plantillas descargables</p>
                <p className="text-lg font-montserrat font-medium">Hojas de vida</p>
              </>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


<section className="testimonios mt-12 sm:mt-72 lg:flex lg:items-start lg:justify-between lg:space-x-8 mb-20 sm:mb-40">
        <h2 className="text-2xl sm:text-3xl font-bold font-montserrat mb-6 lg:mb-0 text-center sm:text-left lg:w-1/3 lg:ml-12 xl:ml-40">
          Testimonios
        </h2>
        <div className="lg:w-2/4 lg:mr-10" style={{ position: 'relative', top: '-20px' }}>
          <TestimoniosCarrusel />
        </div>
</section>
    </div>
  );
};

export default Home;
