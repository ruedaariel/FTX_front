import Carousel from 'react-bootstrap/Carousel';

// Asegúrate de que las imágenes estén en la carpeta `src` para poder importarlas
// Por ejemplo, en `src/assets/`
import imagen1 from '../../../../assets/Recursos/Imagenes/FTX_4.jpg';
import imagen2 from '../../../../assets/Recursos/Imagenes/FTX_5.jpg';
import imagen3 from '../../../../assets/Recursos/Imagenes/FTX_6.jpg';
import imagen4 from '../../../../assets/Recursos/Imagenes/FTX_7.jpg';


function PpalCarousel() { // Cambié el nombre para evitar conflicto con el import
  return (
    <section id="inicio" className="carousel-section">
      <Carousel interval={4000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen3}
            alt="Transforma tu Cuerpo y Mente"
          />
          <Carousel.Caption>
            <h4>Transforma tu Cuerpo y Mente</h4>
            <p>Únete a nuestra comunidad y alcanza tus metas de fitness.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen1}
            alt="Entrenamiento Personalizado"
          />
          <Carousel.Caption>
            <h4>Entrenamiento Personalizado</h4>
            <p>Planes adaptados a tus necesidades y horarios.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen2}
            alt="Resultados Reales"
          />
          <Carousel.Caption>
            <h4>Resultados Reales</h4>
            <p>Comienza hoy tu camino hacia una vida más saludable.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={imagen4}
            alt="Resultados Reales"
          />
          <Carousel.Caption>
            <h4>Resultados Reales</h4>
            <p>Comienza hoy tu camino hacia una vida más saludable.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default PpalCarousel;
