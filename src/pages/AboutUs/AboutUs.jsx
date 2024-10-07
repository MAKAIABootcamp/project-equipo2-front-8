import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import avatarABout from "../../assets/mujer-joven.png";

const AboutUs = () => {

  const swiperRef = useRef(null); // Crea una referencia al Swiper

  const handleMouseEnter = () => {
    swiperRef.current.autoplay.stop(); // Detiene el autoplay al pasar el mouse
  };

  const handleMouseLeave = () => {
    swiperRef.current.autoplay.start(); // Reinicia el autoplay al quitar el mouse
  };

  const developers = [
    {
      name: "Nombre 1",
      description: "Desarrolladora Frontend con experiencia en React.",
      image: avatarABout,
    },
    {
      name: "Nombre 2",
      description: "Especialista en CSS y diseño responsive.",
      image: avatarABout,
    },
    {
      name: "Nombre 3",
      description: "Apasionada por la accesibilidad web.",
      image: avatarABout,
    },
    {
      name: "Nombre 4",
      description: "Enfocada en mejorar la productividad del equipo.",
      image: avatarABout,
    },
  ];

  return (
    <div className="bg-color-2">
      {/* Header */}
      <header className="text-center py-6 bg-color-2">
        <h1 className="text-4xl font-bold text-color-5">Acerca de nosotros</h1>
        <p className="text-lg text-color-1 mt-2">
          Conoce al equipo de SkillMate
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* Proyecto */}
        <article className="max-w-4xl mx-auto p-6 my-6 bg-color-2 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-color-5">Nuestro Proyecto</h2>
          <p className="text-color-3 mt-4">
            SkillMate ayuda a jóvenes y adultos en Colombia a mejorar sus
            habilidades laborales y prepararse para entrevistas.
          </p>
        </article>

        {/* Equipo */}
        <section className="max-w-4xl mx-auto p-6 my-6 bg-color-2 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-color-5 text-center">
            Nuestro equipo
          </h2>
          <p className="text-color-3 mt-4 text-center">
            Somos un grupo apasionado por el diseño y la tecnología.
          </p>

          <Swiper
            ref={swiperRef} // Asocia el swiper a la referencia
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) => {
                return `<span class="${className} bg-color-1"></span>`;
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="w-full h-[300px] mt-6"
          >
            {developers.map((developer, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <div
                  className="bg-color-2 shadow-lg rounded-lg p-4 w-60 h-60 flex flex-col items-center transition-transform duration-300 hover:scale-105"
                  onMouseEnter={handleMouseEnter} // Detiene el autoplay al pasar el mouse
                  onMouseLeave={handleMouseLeave} // Reinicia el autoplay al quitar el mouse
                >
                  <img
                    src={developer.image}
                    alt={`Desarrolladora ${index + 1}`}
                    className="w-20 h-20 mb-4 rounded-full"
                  />
                  <h3 className="text-lg font-semibold text-color-5">
                    {developer.name}
                  </h3>
                  <p className="text-color-3 mt-2 text-center text-sm">
                    {developer.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next text-color-5 hover:text-color-4" />
            <div className="swiper-button-prev text-color-5 hover:text-color-4" />
          </Swiper>
        </section>

        {/* Valores */}
        <article className="max-w-4xl mx-auto p-6 my-6 bg-color-2 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-color-5">Nuestros valores</h2>
          <p className="text-color-3 mt-4">
            Nos guiamos por la colaboración, la creatividad y la inclusión.
          </p>
        </article>
      </main>
    </div>
  );
};

export default AboutUs;
