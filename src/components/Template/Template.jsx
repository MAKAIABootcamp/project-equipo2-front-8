import PropTypes from 'prop-types';

const Template = ({ image, downloadLink }) => (
    <div className="flex flex-col items-center">
      <img src={image} alt="Plantilla" className="w-48 h-48 object-contain" />
      <a
        href={downloadLink}
        download
        className="bg-purple-500 text-white py-2 px-6 rounded mt-6 text-center"
      >
        Descargar
      </a>
    </div>
  );

  Template.propTypes = {
    image: PropTypes.string.isRequired,
    downloadLink: PropTypes.string.isRequired,
  };
  
  export default Template;