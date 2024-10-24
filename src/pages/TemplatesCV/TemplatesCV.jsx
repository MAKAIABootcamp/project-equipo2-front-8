import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  EffectCoverflow,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTemplates } from "../../redux/templates/templatesSlice";
import Modal from '../../components/ModalTemplates/ModalTemplates';

//Imagenes
import Step1Image from "../../assets/Capa 2.svg";
import Step2Image from "../../assets/Descargar 1.svg";
import Step3Image from "../../assets/Group 8.svg";

const Templates = () => {
  const dispatch = useDispatch();
  const { templates, status, error } = useSelector((state) => state.templates);

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="bg-white py-12 px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8 font-montserrat">
          Explora las plantillas que tenemos disponibles para ti.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 w-full px-8 py-6 relative">
          {/* Paso 1 */}
          <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center">
              <div
                className="absolute w-[150px] h-[150px] bg-purple-200 rounded-full z-0"
                style={{ top: "0", left: "0" }}
              />
              <img
                src={Step1Image}
                alt="Paso 3"
                className="relative w-40 h-40 z-10 mb-3 transform transition-transform duration-300 hover:scale-110 hover:translate-y-1"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold font-montserrat text-gray-900 z-20">
              Paso 1
            </h3>
            <p className="text-gray-600 text-center z-20 font-dosis">
            Descubre las plantillas que se ajusten a tu estilo y necesidades.
            </p>
          </div>

          {/* Linea */}
          <svg
            className="hidden md:block absolute left-[40%] top-[120px]"
            width="400"
            height="200"
          >
            <path
              d="M0,0 L350,0"
              stroke="#A78BFA"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M350,0 L350,100"
              stroke="#A78BFA"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <polygon points="345,95 350,100 355,95" fill="#A78BFA" />
          </svg>

          {/* Paso 2 */}
          <div className="flex flex-col items-center md:col-start-2 md:row-start-2">
            <div className="relative flex justify-center items-center">
              <div
                className="absolute w-[150px] h-[150px] bg-purple-200 rounded-full z-0"
                style={{ top: "0", left: "0" }}
              />
              <img
                src={Step2Image}
                alt="Paso 3"
                className="relative w-40 h-40 z-10 mb-3 transform transition-transform duration-300 hover:scale-110 hover:translate-y-1"
              />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-gray-900">
              Paso 2
            </h3>
            <p className="text-gray-600 text-center font-dosis">
            ¡Encontraste la ideal! Descárgala fácilmente en formato Word.
            </p>
          </div>

          {/* Linea */}
          <svg
            className="hidden md:block absolute z-10 left-[20%] top-[400px]"
            width="400"
            height="200"
            overflow="visible"
          >
            <path
              d="M350,0 L0,0"
              stroke="#A78BFA"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <path
              d="M0,0 L0,100"
              stroke="#A78BFA"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
            />
            <polygon points="-5,100 0,105 5,100" fill="#A78BFA" />
          </svg>

          {/* Paso 3 */}
          <div className="flex flex-col items-center md:col-start-1 md:row-start-3">
            <div className="relative flex justify-center items-center">
              <div
                className="absolute w-[150px] h-[150px] bg-purple-200 rounded-full z-0"
                style={{ top: "0", left: "0" }}
              />
              <img
                src={Step3Image}
                alt="Paso 3"
                className="relative w-40 h-40 z-10 mb-3 transform transition-transform duration-300 hover:scale-110 hover:translate-y-1"
              />
            </div>
            <h3 className="text-xl font-semibold font-montserrat text-gray-900">
              Paso 3
            </h3>
            <p className="text-gray-600 text-center font-dosis">
            Llénala con tus datos y prepárate para destacar con tu nueva hoja de vida.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 px-4 lg:px-8">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 15,
          depth: 200,
          modifier: 1.5,
          slideShadows: false,
        }}
        autoplay={{ delay: 3000 }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          renderBullet: (index, className) =>
            `<span class="${className} bg-color-5"></span>`,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay,]}
        className="relative w-full h-auto pb-16"
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {templates.map((template, index) => (
          <SwiperSlide key={index} className="max-w-xs">
            <button
              onClick={() => openModal(template.imageURL)}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-lg"
            >
              <img
                src={template.imageURL}
                alt={template.Nombre}
                className="w-full max-w-[400px] sm:max-w-[300px] lg:max-w-[400px] h-auto object-contain mb-4 rounded-md"
              />
              <a
                href={template.downloadURL}
                download
                className="px-6 py-2 rounded-lg mt-4 mb-4 border border-color-1 text-color-3 hover:bg-[#ece1ff] hover:text-color-3 transition font-dosis"
              >
                Descargar
              </a>
            </button>
          </SwiperSlide>
        ))}

        {/* Paginación y Botones de Navegación */}
        <div className="swiper-pagination !absolute !bottom-[-5px] !left-1/2 !transform !-translate-x-1/2 z-20"></div>
      </Swiper>

      {selectedImage && (
        <Modal  
          image={selectedImage} 
          onClose={closeModal} 
        />
      )}
    </div>
    </div>
  );
};

export default Templates;
