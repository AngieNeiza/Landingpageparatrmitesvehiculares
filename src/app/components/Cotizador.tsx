import { useEffect, useRef, useState } from 'react';
import { ListaTramites, Tramite } from './ListaTramites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { FormularioTramite } from './FormularioTramite';

export function Cotizador() {
  const [selectedTramite, setSelectedTramite] = useState<Tramite | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const handleSelectTramite = (tramite: Tramite) => {
    setSelectedTramite(tramite);
    setShowForm(false);
    setSubmitted(false);
  };

  const handleSolicitar = () => {
    if (!selectedTramite) return;
    setShowForm(true);
  };

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showForm]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Cotizador de Trámites Vehiculares</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Selecciona el trámite que necesitas y solicita directamente desde la misma página sin recargas.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">Trámites disponibles</h2>
              <p className="text-sm text-slate-500">Haz clic en "Seleccionar" para ver la cotización y continuar.</p>
            </div>
            <ListaTramites onSelectTramite={handleSelectTramite} />
          </div>

          <div className="space-y-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle>Resumen de cotización</CardTitle>
                <CardDescription>
                  Revisa tu selección y solicita el trámite sin cambiar de página.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTramite ? (
                  <div className="space-y-5">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">Trámite</div>
                      <div className="text-xl font-semibold text-slate-900">{selectedTramite.nombre}</div>
                      <p className="text-sm text-slate-600 mt-2">{selectedTramite.descripcion}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-sm text-slate-500">Precio estimado</span>
                        <span className="text-2xl font-bold text-blue-600">{selectedTramite.precioRango}</span>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 p-5 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-slate-700">Posibles extras</span>
                        <span className="text-xs text-slate-500">Opcional</span>
                      </div>
                      <ul className="space-y-2 text-sm text-slate-600">
                        <li>Gestión exprés para atención más rápida.</li>
                        <li>Asesoría en documentación adicional.</li>
                        <li>Cotización final según ciudad y tipo de vehículo.</li>
                      </ul>
                    </div>

                    <Button onClick={handleSolicitar} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Solicitar este trámite
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-slate-600">Selecciona un trámite para ver la cotización y enviar tu solicitud desde el mismo panel.</p>
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-100 p-6 text-slate-500">
                      No has seleccionado ningún trámite aún.
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {showForm && selectedTramite && (
              <div ref={formRef} className="space-y-4">
                <FormularioTramite
                  embedded={true}
                  initialTramite={selectedTramite.nombre}
                  initialPrecio={selectedTramite.precioRango}
                  onSuccess={() => setSubmitted(true)}
                />
                {submitted && (
                  <Card className="border border-green-200 bg-green-50 text-green-900 p-5">
                    <div className="text-lg font-semibold">¡Solicitud enviada!</div>
                    <p className="text-sm text-slate-700 mt-2">Gracias por tu solicitud. Nos contactaremos contigo pronto.</p>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
