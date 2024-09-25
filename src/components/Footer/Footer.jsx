import React from 'react';
import logoCorreo from '../../assets/3d mail.svg'; 
import logoImage from '../../assets/SKILLMATE-21.png'
import logoFacebook from '../../assets/Facebook.svg';
import logoInstagram from '../../assets/Instagram.svg';
import logoWhatsapp from '../../assets/Whatsapp.svg';

const Footer = () => {
  return (
    <div className="bg-color-1 py-12 text-center">

      <h2 className="font-montserrat text-white text-3xl font-bold mb-12">Información adicional</h2>
      
      {/* Contenedor de los iconos y textos */}
      <div className="flex justify-center space-x-80">
        
        {/* Sección Acerca de nosotros */}
        <div className="flex flex-col items-center ">
        <span className="font-dosis font-semibold text-white mb-8">Acerca de nosotros</span>
          <img src={logoImage} alt="Acerca de nosotros" className="h-16 mb-4" />
        </div>
        
        {/* Sección Contáctanos */}
        <div className="flex flex-col items-center">
        <span className="font-dosis font-semibold text-white mb-8">Contáctanos</span>
          <img src={logoCorreo} alt="Contáctanos" className="h-16 mb-4 relative" />
        </div>
        
        {/* Sección Nuestras redes */}
        <div className="flex flex-col items-center">
        <span className="font-dosis font-semibold text-white mb-8">Nuestras redes</span>
          <div className="flex space-x-4 mb-4">
            <img src={logoFacebook} alt="Facebook" className="h-12" />
            <img src={logoWhatsapp} alt="Whatsapp" className="h-12" />
            <img src={logoInstagram} alt="Instagram" className="h-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
