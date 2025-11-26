import { Carousel } from "react-bootstrap";
import testimonio1 from "../../../../assets/Recursos/Imagenes/FTX_13.jpg";
import testimonio2 from "../../../../assets/Recursos/Imagenes/Imagen2.png";
import testimonio3 from "../../../../assets/Recursos/Imagenes/testimonioLea.jpeg";

export default function Testimonios() {
  return (
    <section id="testimonios">
      <div className="container text-center">
        <h2>Testimonios</h2>
      </div>

      <Carousel interval={4000} indicators={false} controls={false}>
        <Carousel.Item>
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-md-5 text-center">
                <img src={testimonio1} alt="Cliente 1" className="autor-imagen mx-auto d-block" />
              </div>
              <div className="col-md-7">
                <h5 className="testimonio-h5">
                  Desde que empecé con <i>Santi</i>, mi energía ha aumentado y he
                  visto resultados increíbles.
                </h5>
                <span>Maxi</span>
                <br />
                <span>Miembro Premium</span>
              </div>
            </div>
          </div>
        </Carousel.Item>

                <Carousel.Item>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 text-center">
                <img src={testimonio2} alt="Cliente 2" className="autor-imagen mx-auto d-block" />
              </div>
              <div className="col-md-7">
                <h5 className="testimonio-h5">
                  La flexibilidad de horarios fue clave para mí. Puedo entrenar
                  sin estrés y las rutinas son geniales.
                </h5>
                <span>Agustina</span>
                <br />
                <span>Miembro Premium</span>
              </div>
            </div>
          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5 text-center">
                <img src={testimonio3} alt="Cliente 3" className="autor-imagen mx-auto d-block" />
              </div>
              <div className="col-md-7">
                <h5 className="testimonio-h5">
                  Para mí es importante entrenar con mi entrenador. Conozco su
                  profesionalidad y logros.
                </h5>
                <span>Leandro</span>
                <br />
                <span>Miembro Premium</span>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}
