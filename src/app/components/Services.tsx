import { FileText, RefreshCw, CheckCircle, ClipboardList, UserCheck, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: RefreshCw,
    title: 'Traspaso de vehículos',
    slug: 'traspaso-vehiculos',
    description: 'Gestionamos el cambio de propietario de tu moto o carro de forma rápida y segura.',
  },
  {
    icon: FileText,
    title: 'SOAT',
    slug: 'soat',
    description: 'Tramitamos tu Seguro Obligatorio de Accidentes de Tránsito sin que salgas de casa.',
  },
  {
    icon: CheckCircle,
    title: 'Revisión técnico-mecánica',
    slug: 'revision-tecnico-mecanica',
    description: 'Agendamos y gestionamos tu cita para la revisión técnico-mecánica.',
  },
  {
    icon: ClipboardList,
    title: 'Matrícula',
    slug: 'matricula',
    description: 'Realizamos todo el proceso de matriculación de vehículos nuevos y usados.',
  },
  {
    icon: UserCheck,
    title: 'Cambio de propiedad',
    slug: 'cambio-propiedad',
    description: 'Asesoría completa y gestión del cambio de propietario ante las autoridades.',
  },
  {
    icon: Car,
    title: 'Otros trámites',
    slug: 'otros',
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
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-secondary group"
              >
                <div className="bg-secondary/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary transition-colors duration-300">
                  <Icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl text-blue-950 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link to={`/servicios/${service.slug}`} className="text-secondary hover:text-primary transition-colors duration-300 flex items-center gap-2 group/btn">
                  Ver más información
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
