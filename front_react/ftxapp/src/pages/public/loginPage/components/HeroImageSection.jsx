
import React from 'react';
import { motion } from 'framer-motion';
import './heroImageSection.css';
import Logo  from '../../../../components/componentsShare/logo/LogoContent';


const HeroImageSection = ({ image, logo }) => {
 return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="d-none d-lg-flex col-lg-6 position-relative overflow-hidden hero-image-section"
      aria-hidden={false}
    >
      <div className="hero-image-bg position-absolute inset-0 w-100 h-100">
        <img src={image} alt="FTX Training" className="w-100 h-100 object-cover" />
        <div className="hero-overlay position-absolute inset-0" />
      </div>

      {/* Logo overlay */}
      <div className="position-absolute top-3 start-3 z-10 logo-overlay">
        <Logo
          src={logo}
          brandName="FTX"
          to="/"
          size="lg"
          textClassName="text-white"
        />
      </div>

      {/* Motivational text overlay */}
      <div className="position-absolute bottom-4 start-3 end-3 z-10 text-white hero-text">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="h3 fw-bold mb-3">Transforma tu vida</h2>
          <p className="lead opacity-90 mb-0">
            Unite a nuestra comunidad y alcanzá tus metas de fitness con el mejor entrenamiento personalizado.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
export default HeroImageSection;
