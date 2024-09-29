import skillmatePhoto from "../../assets/skillmatePhoto1.jpg"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTips } from "../../redux/tips/tipsSlice";

const TipsDetails = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const dispatch = useDispatch();
  const { tips, status, error } = useSelector((state) => state.tips);

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


  return (
    <div>
      <section className='flex flex-col items-center py-6'>
        <h1 className='font-montserrat font-bold text-4xl py-3'>{tip.categoria}</h1>
        <p className='font-dosis py-3'>Recuerda que estas habilidades son diversas, así que ten en cuenta lo siguiente</p>
      </section>
      <section className='bg-gradient-to-r from-color-2 to-color-1'>
        <div className='p-20'>
          <section className='bg-white flex flex-row rounded-t-2xl items-center justify-evenly'>
            <div className='py-20 basis-1/3'>
              <h2 className='font-montserrat font-bold text-3xl pb-6'>{tip.titulo}</h2>
              <p className='font-dosis text-2xl'>{tip.descripcion}</p>
            </div>
            <div >
              <img src={tip.img} alt="" />
            </div>
          </section>
          <section className='bg-white flex flex-wrap rounded-b-2xl justify-around gap-4 font-dosis pb-20 px-6'>
            <div className='flex flex-col items-center'>
              <button className='bg-color-1 py-2 px-14'>Elige bien a tus referencias</button>
              <img className='w-52 h-40' src={skillmatePhoto} alt="" />
            </div>
            <div className='flex flex-col items-center'>
              <button className='bg-color-1 py-2 px-14'>Pide referencias con antelación</button>
              <img className='w-52 h-40' src={skillmatePhoto} alt="" />
            </div>
            <div className='flex flex-col items-center'>
              <button className='bg-color-1 py-2 px-14'>Sé claro y agradecido</button>
              <img className='w-52 h-40' src={skillmatePhoto} alt="" />
            </div>
            <div className='flex flex-col items-center'>
              <button className='bg-color-1 py-2 px-14'>Mantén a tus referencias informadas</button>
              <img className='w-52 h-40' src={skillmatePhoto} alt="" />
            </div>
            <div className='flex flex-col items-center'>
              <button className='bg-color-1 py-2 px-14'>Pide retroalimentación</button>
              <img className='w-52 h-40' src={skillmatePhoto} alt="" />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default TipsDetails