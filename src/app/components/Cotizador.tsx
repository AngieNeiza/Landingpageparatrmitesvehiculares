import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListaTramites, Tramite } from './ListaTramites';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function Cotizador() {
  const [selectedTramites, setSelectedTramites] = useState<Tramite[]>([]);
  const navigate = useNavigate();

  const handleSelectTramite = (tramite: Tramite) => {
    if (!selectedTramites.find(t => t.id === tramite.id)) {
      setSelectedTramites(prev => [...prev, tramite]);
    }
  };

  const handleRemoveTramite = (tramiteId: string) => {
    setSelectedTramites(prev => prev.filter(t => t.id !== tramiteId));
  };

  const calculateTotal = () => {
    // For simplicity, just sum the minimum prices
    return selectedTramites.reduce((total, tramite) => {
      const minPrice = parseInt(tramite.precioRango.split(' - ')[0].replace(/[$.]/g, ''));
      return total + minPrice;
    }, 0);
  };

  const handleSolicitar = () => {
    navigate('/solicitar-tramite');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Cotizador de Trámites Vehiculares</h1>
          <p className="text-lg text-gray-600">
            Selecciona los trámites que necesitas y obtén una cotización aproximada
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de trámites disponibles */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Trámites disponibles</h2>
            <ListaTramites onSelectTramite={handleSelectTramite} />
          </div>

          {/* Carrito de selección */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Trámites seleccionados</CardTitle>
                <CardDescription>
                  {selectedTramites.length === 0
                    ? 'No has seleccionado ningún trámite'
                    : `${selectedTramites.length} trámite(s) seleccionado(s)`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedTramites.length > 0 && (
                  <div className="space-y-4">
                    {selectedTramites.map((tramite) => (
                      <div key={tramite.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium">{tramite.nombre}</h3>
                          <p className="text-sm text-gray-600">{tramite.precioRango}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveTramite(tramite.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total estimado:</span>
                        <span className="text-blue-600">
                          ${calculateTotal().toLocaleString('es-CO')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        * Los precios son aproximados y pueden variar según la ciudad y condiciones específicas
                      </p>
                    </div>

                    <Button
                      onClick={handleSolicitar}
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-950"
                    >
                      Solicitar estos trámites
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}