import PropTypes from 'prop-types';

const ModalTemplates = ({image, onClose }) => {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10"
        onClick={onClose}
      >
        <div
          className="bg-white p-4 rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto relative"
          onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
        >
          <img
            src={image}
            alt="Imagen seleccionada"
            className="w-auto h-auto max-h-[80vh] object-contain"
          />
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
      </div>
    );
  };
  
  ModalTemplates.propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  export default ModalTemplates;