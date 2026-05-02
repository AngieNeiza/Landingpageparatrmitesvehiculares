import { FormularioTramite } from './FormularioTramite';
import { FormularioErrorBoundary } from './FormularioErrorBoundary';

export function ContactForm() {
  return (
    <section className="py-16 md:py-24 bg-white" id="contacto">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-blue-950 mb-4">
              Solicita tu trámite ahora
            </h2>
            <p className="text-lg text-gray-600">
              Completa el formulario y nos comunicaremos contigo en menos de 24 horas
            </p>
          </div>

          {/* Error boundary para proteger el formulario */}
          <FormularioErrorBoundary>
            <FormularioTramite embedded={true} />
          </FormularioErrorBoundary>

          <div className="mt-8 text-center text-gray-600">
            <p>O contáctanos directamente:</p>
            <div className="flex flex-col gap-4 justify-center mt-4">
              <a href="https://wa.me/573132871452" target="_blank" className="text-secondary hover:text-primary transition-colors">
                WhatsApp: +57 313 287 1452
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
