import { FileText, RefreshCw, CheckCircle, ClipboardList, UserCheck, Car } from 'lucide-react';

const services = [
  {
    icon: RefreshCw,
    title: 'Traspaso de vehículos',
    description: 'Gestionamos el cambio de propietario de tu moto o carro de forma rápida y segura.',
  },
  {
    icon: FileText,
    title: 'SOAT',
    description: 'Tramitamos tu Seguro Obligatorio de Accidentes de Tránsito sin que salgas de casa.',
  },
  {
    icon: CheckCircle,
    title: 'Revisión técnico-mecánica',
    description: 'Agendamos y gestionamos tu cita para la revisión técnico-mecánica.',
  },
  {
    icon: ClipboardList,
    title: 'Matrícula',
    description: 'Realizamos todo el proceso de matriculación de vehículos nuevos y usados.',
  },
  {
    icon: UserCheck,
    title: 'Cambio de propiedad',
    description: 'Asesoría completa y gestión del cambio de propietario ante las autoridades.',
  },
  {
    icon: Car,
    title: 'Otros trámites',
    description: 'Consulta por cualquier otro trámite vehicular que necesites realizar.',
  },
];

export function Services() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="servicios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-blue-950 mb-4">
            Nuestros servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ofrecemos una amplia gama de trámites vehiculares para motos y carros particulares en toda Colombia
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-300 group"
              >
                <div className="bg-blue-200 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-blue-700 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-blue-950 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <button className="text-blue-700 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2 group/btn">
                  Ver más información
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
