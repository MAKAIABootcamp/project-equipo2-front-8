import { useState } from "react"
import interview from "../../assets/Job-interview.svg"


const Tips = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [
        "Habilidades blandas",
        "Habilidades de comunicación",
        "Habilidades técnicas",
        "Autoconocimiento"
    ];

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    }
  return (
    <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-10 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-montserrat">Tips para mejorar tus entrevistas</h1>
            <div className="flex flex-col items-center">
                <input type="text" placeholder="Comunicación en equipo ..." className="border border-color-1 rounded-lg p-2 w-96 mb-2 font-montserrat" />
                <button className="ml-4 bg-color-1 text-color-3 px-6 py-2 rounded-lg hover:bg-color-5 font-montserrat">Buscar</button>
            </div>
        </header>

        <main>
            <section aria-labelledby="categiries-heading" className="mt-10 text-center">
                <h2 id="categories-heading" className="text-3xl font-bold text-color-3 mb-12 font-montserrat">Explora las diferentes categorias <br/> que tenemos para ti.</h2>
                <ul className="flex justify-center space-x-40 mb-24">
                    {categories.map((category) => (
                        <li key={category}>
                            <button 
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 rounded-lg
                                    ${activeCategory === category ? 'bg-color-1 text-color-3' : 'border border-color-1 text-color-3'}
                                    hover:bg-color-5 font-dosis`}
                            >{category}</button>
                        </li>
                    ))}
                </ul>
            </section>
            <section aria-labelledby="tips-heading" className="mt-12 px-10">
          <h2 id="tips-heading" className="sr-only">Tips de entrevistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Tip 1: Investigación previa",
                description: "Investiga la empresa y su cultura antes de la entrevista. Conocer sus valores y objetivos te ayudará a conectar mejor durante la conversación.",
              },
              {
                title: "Tip 2: Preparación de respuestas",
                description: "Prepara respuestas para preguntas comunes de entrevistas, como '¿Cuáles son tus fortalezas y debilidades?' o '¿Por qué quieres trabajar aquí?'.",
              },
              {
                title: "Tip 3: Vestimenta adecuada",
                description: "Viste de manera profesional y apropiada para la empresa. Una buena presentación puede causar una impresión positiva desde el principio.",
              },
              {
                title: "Tip 4: Escucha activa",
                description: "Escucha atentamente las preguntas del entrevistador y asegúrate de responder de manera clara y concisa.",
              },
              {
                title: "Tip 5: Preguntas al final",
                description: "Prepara algunas preguntas para hacerle al entrevistador al final de la entrevista. Esto demuestra tu interés en el puesto y la empresa.",
              },
              {
                title: "Tip 6: Seguimiento post-entrevista",
                description: "Envía un correo electrónico de agradecimiento después de la entrevista. Es una excelente manera de dejar una buena impresión y recordarles tu interés.",
              },
            ].map((tip, index) => (
              <div key={index} className="bg-[#E0D9EC] shadow-lg rounded-lg p-6 text-left flex">
                <img src="https://via.placeholder.com/50" alt={`Tip ${index + 1}`} className="w-16 h-16 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-color-3 mb-2 font-montserrat">{tip.title}</h3>
                  <p className="text-color-3 font-dosis">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section arial-labelledby="simulator-heading" className="mt-16 bg-white shadow p-16">
            {/* <h2 id="simulador-heading" className="text-xl font-bold text-color-3 text-center mb-6">Simulador de entrevistas</h2> */}
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img src={interview} alt="Simulador" className="w-16 h-16" />
                    <div className="ml-4">
                        <h2 className="text-2xl font-semibold text-color-3 font-montserrat">Simulador de entrevistas</h2>
                        <p className="text-color-3 font-dosis">Convierte en práctica tus habilidades</p>
                    </div>
                </div>
                <button className="bg-color-1 border rounded-md p-2 font-montserrat font-medium"><a href="#">Ir al simulador de entrevistas</a></button>
            </div>
        </section>
        </main>
    </div>
  )
}

export default Tips