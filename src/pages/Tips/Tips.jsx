import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTips } from "../../redux/tips/tipsSlice";
import interview from "../../assets/Job-interview.svg";

const Tips = () => {
  const dispatch = useDispatch();
  const { tips, status, error } = useSelector((state) => state.tips);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

    const categories = [
        "Habilidades blandas",
        "Habilidades de comunicación",
        "Habilidades técnicas",
        "Autoconocimiento"
    ];

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
      setSearchQuery(searchTerm); // Ejecuta la búsqueda actualizando searchQuery
    };

    const filteredTips = tips.filter((tip) => {
      const matchesCategory = activeCategory ? tip.categoria === activeCategory : true;
      const matchesSearchTerm =
        tip.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.categoria.toLowerCase().includes(searchQuery.toLowerCase());
  
      return matchesCategory && matchesSearchTerm;
    });

    // const filteredTips = activeCategory 
    //     ? tips.filter((tip) => tip.categoria === activeCategory)
    //     :tips;
    

    useEffect(() => {
      if (status === "idle") {
        dispatch(fetchTips());
      }
    }, [status, dispatch]);
  
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (status === "failed") {
      return <div>Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow p-6 sm:p-10 text-center">
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 font-montserrat">
                Tips para mejorar tus entrevistas
              </h1>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Comunicación en equipo ..."
                  className="border border-color-1 rounded-lg p-2 w-full sm:w-96 mb-4 font-montserrat"
                  value={searchTerm}
                  onChange={handleSearchChange} // Actualiza el estado del término de búsqueda
                />
                <button
                  onClick={handleSearchClick} // Ejecuta la búsqueda al hacer clic
                  className="bg-color-1 text-color-3 px-6 py-2 rounded-lg hover:bg-color-5 hover:text-color-2 font-montserrat"
                >
                  Buscar
                </button>
              </div>
            </header>

            <main>
              <section aria-labelledby="categories-heading" className="mt-10 text-center">
                <h2 id="categories-heading" className="text-2xl sm:text-3xl font-bold text-color-3 mb-6 sm:mb-12 font-montserrat">
                  Explora las diferentes categorías <br /> que tenemos para ti.
                </h2>
                <ul className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-16 mb-12 sm:mb-24">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className={`px-4 py-2 rounded-lg
                          ${activeCategory === category ? 'bg-color-1 text-color-3' : 'border border-color-1 text-color-3'}
                          hover:bg-color-5 hover:text-color-2 font-dosis`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="tips-heading" className="mt-12 px-4 sm:px-10">
                <h2 id="tips-heading" className="sr-only">Tips de entrevistas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTips.map((tip, index) => (
                    <div key={index} className="bg-[#E0D9EC] shadow-lg rounded-lg p-6 text-left flex">
                      <img
                        src={tip.img || "https://via.placeholder.com/50"}
                        alt={`Tip ${index + 1}`}
                        className="w-16 h-16 mr-4"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-color-3 mb-2 font-montserrat">{tip.titulo}</h3>
                        <p className="text-color-3 font-dosis">{tip.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

                {/* <section aria-labelledby="tips-heading" className="mt-12 px-4 sm:px-10">
                    <h2 id="tips-heading" className="sr-only">Tips de entrevistas</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </section> */}

                <section aria-labelledby="simulator-heading" className="mt-16 bg-white shadow p-6 sm:p-16">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <img src={interview} alt="Simulador" className="w-16 h-16" />
                            <div className="ml-4">
                                <h2 className="text-2xl font-semibold text-color-3 font-montserrat">Simulador de entrevistas</h2>
                                <p className="text-color-3 font-dosis">Convierte en práctica tus habilidades</p>
                            </div>
                        </div>
                        <button className="bg-color-1 border rounded-md p-2 font-montserrat font-medium w-full sm:w-auto">
                            <a href="#">Ir al simulador de entrevistas</a>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Tips;
