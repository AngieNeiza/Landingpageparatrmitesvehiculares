import { ClipboardCheck, Send, Settings, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: ClipboardCheck,
    title: 'Solicita el trámite',
    description: 'Completa el formulario o contáctanos por WhatsApp para indicarnos qué trámite necesitas.',
  },
  {
    number: '02',
    icon: Send,
    title: 'Envío del formulario',
    description: 'Completa el formulario con tus datos para iniciar el trámite',
  },
  {
    number: '03',
    icon: Settings,
    title: 'Nosotros lo gestionamos',
    description: 'Nuestro equipo se encarga de todo el proceso ante las entidades correspondientes.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Recibe tu trámite listo',
    description: 'Te notificamos cuando esté completo y te lo entregamos en la modalidad que prefieras.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white" id="como-funciona">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-primary mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Proceso simple y transparente en 4 pasos
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-accent transform -translate-y-1/2 z-0"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200 hover:border-secondary transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="bg-gradient-to-br from-primary to-secondary w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                          <Icon className="w-9 h-9 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-accent text-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                          <span className="text-sm">{step.number}</span>
                        </div>
                      </div>

                      <h3 className="text-xl text-primary mb-3">
                        {step.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-8 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
