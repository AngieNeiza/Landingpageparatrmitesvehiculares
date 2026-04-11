import { Clock, HeadphonesIcon, Shield, MapPin } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Ahorro de tiempo',
    description: 'Evita filas y desplazamientos. Nosotros nos encargamos de todo mientras tú sigues con tu vida.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Asesoría personalizada',
    description: 'Te acompañamos en cada paso con un equipo experto disponible para resolver tus dudas.',
  },
  {
    icon: Shield,
    title: 'Proceso 100% confiable',
    description: 'Trabajamos con total transparencia y cumpliendo todas las normativas legales vigentes.',
  },
  {
    icon: MapPin,
    title: 'Atención en toda Colombia',
    description: 'Gestionamos trámites en cualquier ciudad del país, sin importar dónde te encuentres.',
  },
];

export function Benefits() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Ventajas que hacen la diferencia en la gestión de tus trámites vehiculares
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-blue-950" />
                </div>
                <h3 className="text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="text-blue-200 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
