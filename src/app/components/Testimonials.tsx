import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Rodríguez',
    city: 'Bogotá',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    rating: 5,
    text: 'Excelente servicio. Me ahorraron horas de trámites y el proceso fue muy rápido. Totalmente recomendado para quien no tenga tiempo de hacer filas.',
  },
  {
    name: 'María González',
    city: 'Medellín',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
    rating: 5,
    text: 'Súper confiables y profesionales. Me asesoraron en todo momento y resolvieron todas mis dudas. El traspaso de mi moto fue rapidísimo.',
  },
  {
    name: 'Andrés Martínez',
    city: 'Cali',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
    rating: 5,
    text: 'La mejor experiencia tramitando documentos. Todo online, sin complicaciones. Definitivamente volveré a usar sus servicios.',
  },
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gray-50" id="testimonios">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl text-primary mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Miles de clientes satisfechos confían en nosotros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.city}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
