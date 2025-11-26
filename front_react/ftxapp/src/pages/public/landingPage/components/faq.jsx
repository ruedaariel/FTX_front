import { Accordion } from 'react-bootstrap';

export default function FAQ() {
  return (
    <section id="faq" className="py-5">
      <div className="container container-faq">
        <h2 className="text-center mb-5">Preguntas Frecuentes</h2>
        <Accordion className='accordion-faq' defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header >¿Necesito experiencia previa?</Accordion.Header>
            <Accordion.Body>
              <i>
                No, las rutinas se adaptan a todos los niveles, desde principiantes hasta avanzados. Tu plan inicial se
                basará en tu condición física actual.
              </i>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header >¿Qué equipamiento necesito?</Accordion.Header>
            <Accordion.Body>
              Depende de tu plan y preferencias. Se puede diseñar rutinas para hacer en casa con mínimo equipamiento o
              para aprovechar al máximo un gimnasio completo.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header >¿Cómo funciona la suscripción?</Accordion.Header>
            <Accordion.Body>
              Elige un plan (Básico, Pro o Premium). El pago, para clientes Pro o Premium, es mensual y puedes cancelar
              en cualquier momento desde tu perfil. El plan Básico es gratuito.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header >¿Puedo cambiar de plan?</Accordion.Header>
            <Accordion.Body>
              Sí, puedes cambiar tu plan de suscripción (subir o bajar de nivel) fácilmente desde la configuración de tu
              cuenta. Los cambios se aplicarán en el siguiente ciclo de facturación.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
}
