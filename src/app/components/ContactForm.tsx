import { useState } from 'react';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tramite: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    alert('Solicitud enviada. Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', phone: '', tramite: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-2xl border-2 border-blue-200">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-blue-950 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-300"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-blue-950 mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-300"
                  placeholder="Ej: 300 123 4567"
                />
              </div>

              <div>
                <label htmlFor="tramite" className="block text-blue-950 mb-2">
                  Tipo de trámite *
                </label>
                <select
                  id="tramite"
                  name="tramite"
                  required
                  value={formData.tramite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-300 bg-white"
                >
                  <option value="">Selecciona un trámite</option>
                  <option value="traspaso">Traspaso de vehículo</option>
                  <option value="soat">SOAT</option>
                  <option value="tecnico-mecanica">Revisión técnico-mecánica</option>
                  <option value="matricula">Matrícula</option>
                  <option value="cambio-propiedad">Cambio de propiedad</option>
                  <option value="otro">Otro trámite</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-blue-950 mb-2">
                  Mensaje adicional (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-300 outline-none transition-all duration-300 resize-none"
                  placeholder="Cuéntanos más detalles sobre tu solicitud..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Enviar solicitud
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-gray-600">
            <p>O contáctanos directamente:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
              <a href="https://wa.me/573001234567" className="text-blue-700 hover:text-blue-800 transition-colors">
                WhatsApp: +57 300 123 4567
              </a>
              <span className="hidden sm:inline text-gray-300">|</span>
              <a href="mailto:info@tramitesvehiculos.co" className="text-blue-700 hover:text-blue-800 transition-colors">
                info@tramitesvehiculos.co
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
