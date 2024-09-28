import React from 'react'
import skillmatePhoto from "../../assets/skillmatePhoto1.jpg"

const TipsDetails = () => {
  return (
    <div>
      <section className='flex flex-col items-center py-6'>
        <h1 className='font-montserrat font-bold text-4xl py-3'>Habilidades de comunicación</h1>
        <p className='font-dosis py-3'>Recuerda que estas habilidades son diversas, así que ten en cuenta lo siguiente</p>
      </section>
      <section className='bg-gradient-to-r from-color-2 to-color-1'>
        <div className='p-20'>
          <section className='bg-white flex flex-row rounded-t-2xl items-center justify-evenly'>
            <div className='py-20 basis-1/3'>
              <h2 className='font-montserrat font-bold text-3xl pb-6'>El poder de las recomendaciones: ¿Cómo pedir referencias laborales?</h2>
              <p className='font-dosis text-2xl'>Las referencias laborales son un factor crucial que puede inclinar la balanza a tu favor cuando estás buscando empleo. Los reclutadores valoran mucho la opinión de antiguos empleadores o colegas que puedan dar fe de tu desempeño profesional. Aquí te mostramos cómo pedir referencias de manera efectiva.</p>
            </div>
            <div >
              <img src={skillmatePhoto} alt="" />
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