import { useState, useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchTips } from "../../redux/tips/tipsSlice";

const TipsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id desde la URL
  const dispatch = useDispatch();
  const { tips, status, error } = useSelector((state) => state.tips);

  const [openModal, setOpenModal] = useState(null); // Estado para manejar los modales

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTips());
    }
  }, [status, dispatch]);

  // Encontrar el tip correspondiente por id
  const tip = tips.find((tip) => tip.id === id);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!tip) {
    return <div>No se encontró el tip.</div>;
  }

  // Funciones para manejar el modal
  const handleOpenModal = (subtitulo) => {
    setOpenModal(subtitulo); // Abrir el modal del subtítulo correspondiente
  };

  const handleCloseModal = () => {
    setOpenModal(null); // Cerrar el modal
  };

  return (
    <div className="overflow-x-hidden">
      <SlArrowLeft
        onClick={() => navigate("/tips")}
        className="h-8 text-color-1 md:ml-3 md:mt-4 mt-3 ml-2 cursor-pointer md:text-5xl text-2xl mb-10"
      />
      <section className="flex flex-col items-center px-4 md:pb-8 text-color-3 md:flex-col md:items-center md:p-0">
        <h1 className="font-montserrat font-bold text-4xl py-3">
          {tip.categoria}
        </h1>
        <p className="font-dosis py-3">
          Recuerda que estas habilidades son diversas, así que ten en cuenta lo
          siguiente:
        </p>
      </section>

      <section className="bg-gradient-to-r from-color-2 to-[#B699FF]">
        <div className="md:p-20 p-10">
          {/* Ajuste para pantallas medianas con flex-col en tablets y flex-row en pantallas grandes */}
          <section className="bg-white flex flex-col md:flex-col lg:flex-row rounded-t-2xl items-center justify-center lg:justify-around lg:items-center">
            <div className="md:py-10 py-5 md:px-0 px-6 text-center lg:text-left lg:basis-1/3 text-color-3">
              <h2 className="font-montserrat font-bold md:text-3xl text-2xl pb-6">
                {tip.titulo}
              </h2>
              <p className="font-dosis md:text-xl text-lg md:leading-snug lg:leading-normal">
                {tip.descripcion}
              </p>
            </div>
            <div className="flex justify-center items-center md:mt-6 lg:mt-0">
              {/* La imagen se ajusta para que no sea demasiado grande y mantenga sus proporciones */}
              <img
                className="p-4 max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain"
                src={tip.img}
                alt=""
              />
            </div>
          </section>

          <section className="bg-white rounded-b-2xl font-dosis py-20">
            <div className="flex flex-wrap justify-around gap-8 md:gap-16">
              {tip.subtips.map((subtip) => (
                <div
                  key={subtip.subtitulo}
                  className="flex flex-col items-center max-w-xs md:max-w-sm"
                >
                  <Link
                    className=" hover:bg-[#EBE2FF] hover:rounded-t-lg py-2 px-4 md:px-14 text-color-3 hover:text-color-3 cursor-pointer border-b-2 border-color-1 hover:border-color-5"
                    onClick={() => handleOpenModal(subtip.subtitulo)}
                  >
                    {subtip.subtitulo}
                  </Link>
                  <img
                    className="mt-8 w-4/5 max-w-[300px] h-auto object-contain cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    src={subtip.images}
                    alt={subtip.subtitulo}
                    onClick={() => handleOpenModal(subtip.subtitulo)}
                  />

                  {/* Modal solo visible si el modal abierto corresponde al subtitulo */}
                  {openModal === subtip.subtitulo && (
                    <div className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                      <div className="bg-[#E0D9EC] p-8 rounded-lg max-w-lg relative">
                        <FaWindowClose
                          className="text-color-5 cursor-pointer absolute top-4 right-4"
                          onClick={handleCloseModal}
                        />
                        <h3 className="text-lg font-bold pb-2">
                          {subtip.subtitulo}
                        </h3>
                        <p>{subtip.parrafo}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default TipsDetails;
