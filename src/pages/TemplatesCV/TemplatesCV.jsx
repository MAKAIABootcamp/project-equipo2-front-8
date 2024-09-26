import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import TemplateSlide from '../../components/Template/Template';

//Imagenes
import Step1Image from "../../assets/Capa 2.svg";
import Step2Image from "../../assets/Descargar 1.svg";
import Step3Image from "../../assets/Group 8.svg";

import Plantilla1 from "../../assets/CV1.webp";
import Plantilla2 from "../../assets/CV2.webp";
import Plantilla3 from "../../assets/CV3.webp";
import Plantilla4 from "../../assets/CV4.webp";
import Plantilla5 from "../../assets/CV5.webp";
import Plantilla6 from "../../assets/CV6.webp";
import Plantilla7 from "../../assets/CV7.webp";
import Plantilla8 from "../../assets/CV8.webp";
import Plantilla9 from "../../assets/CV9.webp";
import Plantilla10 from "../../assets/CV10.webp";
import Plantilla11 from "../../assets/CV11.webp";
import Plantilla12 from "../../assets/CV12.webp";


const Templates = () => {
  const plantillas = [
    { image: Plantilla1, downloadLink: "/Templates/CV1.docx" },
    { image: Plantilla2, downloadLink: "/Templates/CV2.docx" },
    { image: Plantilla3, downloadLink: "/Templates/CV3.docx" },
    { image: Plantilla4, downloadLink: "/Templates/CV4.docx" },
    { image: Plantilla5, downloadLink: "/Templates/CV5.docx" },
    { image: Plantilla6, downloadLink: "/Templates/CV6.docx" },
    { image: Plantilla7, downloadLink: "/Templates/CV7.docx" },
    { image: Plantilla8, downloadLink: "/Templates/CV8.docx" },
    { image: Plantilla9, downloadLink: "/Templates/CV9.docx" },
    { image: Plantilla10, downloadLink: "/Templates/CV10.docx" },
    { image: Plantilla11, downloadLink: "/Templates/CV11.docx" },
    { image: Plantilla12, downloadLink: "/Templates/CV12.docx" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <div className="bg-white py-12 px-4 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Explora las plantillas que tenemos disponibles para ti
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
                alt="Muñeca"
                className="relative w-[150px] h-[150px] z-10 transform transition-transform duration-300 hover:scale-110 hover:translate-y-1"
              />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 z-20">
              Paso 1
            </h3>
            <p className="text-gray-600 text-center z-20">
              Revisa las diferentes opciones que se acomoden a tus gustos.
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
                alt="Paso 2"
                className="relative w-40 h-40 z-10 mb-3 transform transition-transform duration-300 hover:scale-110 hover:translate-y-1"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Paso 2</h3>
            <p className="text-gray-600 text-center">
              Una vez seleccionada la plantilla, descárgala en formato Word.
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
            <h3 className="text-xl font-semibold text-gray-900">Paso 3</h3>
            <p className="text-gray-600 text-center">
              Edita la hoja de vida que acabas de descargar con tu información.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 px-4 lg:px-8">
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          slidesPerGroup={3}
          autoplay={{ delay: 3000 }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            renderBullet: (index, className) => {
              return `<span class="${className} bg-color-5 "></span>`;
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="relative w-full h-auto pb-16"
          breakpoints={{
            0: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
            640: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            768: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
          }}
        >
          {plantillas.map((plantilla, index) => (
            <SwiperSlide key={index}>
              <TemplateSlide
                image={plantilla.image}
                downloadLink={plantilla.downloadLink}
              />
            </SwiperSlide>
          ))}

          <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 text-color-5 z-10" />
          <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 text-color-5 z-10" />

          <div className="swiper-pagination !absolute !bottom-[-0px] !left-1/2 !transform !-translate-x-1/2 z-20"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default Templates;
