import { useState } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { FaWindowClose } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
    <div>
      <SlArrowLeft onClick={() => navigate('/tips')} className="h-8 text-color-1 ml-6 mt-3 cursor-pointer" />
      <section className='flex flex-col items-center p-4 pb-8 text-color-3 md:flex-col md:items-center md:p-0'>
        <h1 className='font-montserrat font-bold text-4xl py-3'>{tip.categoria}</h1>
        <p className='font-dosis py-3'>Recuerda que estas habilidades son diversas, así que ten en cuenta lo siguiente:</p>
      </section>
      <section className='bg-gradient-to-r from-color-2 to-color-1'>
        <div className='md:p-20 p-10'>
          <section className='bg-white flex flex-col rounded-t-2xl items-center justify-around md:flex-row md:justify-around md:items-center'>
            <div className='md:py-20 py-5 md:px-0 px-6 basis-1/3 text-color-3'>
              <h2 className='font-montserrat font-bold md:text-4xl text-2xl pb-6'>{tip.titulo}</h2>
              <p className='font-dosis md:text-3xl text-xl'>{tip.descripcion}</p>
            </div>
            <div >
              <img className="p-4" src={tip.img} alt="" />
            </div>
          </section>
          <section className='bg-white rounded-b-2xl font-dosis py-20'>
            <div className="flex flex-wrap justify-around gap-16">
              {tip.subtips.map((subtip) => (
                <div key={subtip.subtitulo} className='flex flex-col items-center max-w-64 '>
                  <button
                    className='bg-color-1 hover:bg-color-5 py-2 px-14 text-color-3 hover:text-color-2 rounded-lg cursor-pointer'
                    onClick={() => handleOpenModal(subtip.subtitulo)} // Abrir el modal al hacer clic en el botón
                  >
                    {subtip.subtitulo}
                  </button>
                  <img className='mt-8 w-4/5' src={subtip.images} alt={subtip.subtitulo} />

                  {/* Modal solo visible si el modal abierto corresponde al subtitulo */}
                  {openModal === subtip.subtitulo && (
                    <div className="modal fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                      <div className="bg-[#E0D9EC] p-8 rounded-lg max-w-lg relative">
                        <FaWindowClose
                          className="text-color-5 cursor-pointer absolute top-4 right-4"
                          onClick={handleCloseModal} // Cerrar el modal al hacer clic en el icono
                        />
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
