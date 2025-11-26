import videotrainer from '../../../../assets/Recursos/Videos/competenciaNeuquen.mp4';


function TuTrainner() {
    return (


<section id="entrenador" className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-4 mb-md-0">
                        <h2>Conoce a Tu Entrenador</h2>
                        <p><strong>Santiago</strong> - Apasionado por el fitness y dedicado a transformar vidas. Con más
                            de 7 años de experiencia, he ayudado a cientos de personas a alcanzar sus metas de salud y
                            rendimiento.</p>
                        <p>Mi filosofía se basa en el <strong> entrenamiento funcional y la conexión mente-cuerpo</strong>. Creo
                            firmemente que con la guía adecuada y la motivación correcta, todos podemos superar nuestros
                            límites y descubrir de qué estamos hechos.</p>
                        <h5>Logros Destacados:</h5>
                        <ul>
                            <li><i className="fas fa-trophy  me-2"></i> Certificación NSCA – Personal Trainer</li>
                            <li><i className="fas fa-trophy  me-2"></i> Especialista en entrenamiento de fuerza y
                                recomposición corporal
                            </li>
                            <li><i className="fas fa-trophy  me-2"></i> Ex Atleta Competitivo en Powerlifting</li>
                        </ul>
                    </div>
                    <div className="col-md-6 video-container">
                        <video className='video-landing' autoPlay muted loop playsInline>
                            <source src={videotrainer} type="video/mp4"/>
                            Tu navegador no soporta la etiqueta de video.
                        </video>
                    </div>
                </div>
            </div>
        </section>
        );
}
export default TuTrainner;