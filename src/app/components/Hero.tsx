import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-yellow-400 text-blue-950 px-4 py-2 rounded-full inline-block">
                ✓ Servicio confiable y seguro
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Gestiona tus trámites vehiculares <span className="text-yellow-400">fácil y rápido</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-200 leading-relaxed">
              Realizamos todos tus trámites de motos y carros particulares en Colombia.
              Sin filas, sin complicaciones, con la mejor asesoría profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-950 px-8 py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Solicitar trámite
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg border-2 border-white/30 transition-all duration-300">
                Cotizar ahora
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl">500+</div>
                <div className="text-blue-300 text-sm">Trámites realizados</div>
              </div>
              <div>
                <div className="text-3xl">98%</div>
                <div className="text-blue-300 text-sm">Clientes satisfechos</div>
              </div>
              <div>
                <div className="text-3xl">24h</div>
                <div className="text-blue-300 text-sm">Tiempo de respuesta</div>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-transparent rounded-3xl transform rotate-6"></div>
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
              alt="Vehículos en Colombia"
              className="rounded-3xl shadow-2xl relative z-10 w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
