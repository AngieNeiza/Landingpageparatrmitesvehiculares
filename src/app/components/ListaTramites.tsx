import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export interface Tramite {
  id: string;
  nombre: string;
  descripcion: string;
  precioRango: string;
}

export const tramites: Tramite[] = [
  {
    id: 'traspaso',
    nombre: 'Traspaso de vehículos',
    descripcion: 'Cambio de propietario del vehículo',
    precioRango: '$150.000 - $300.000'
  },
  {
    id: 'soat',
    nombre: 'SOAT',
    descripcion: 'Seguro obligatorio de accidentes de tránsito',
    precioRango: '$200.000 - $400.000'
  },
  {
    id: 'revision',
    nombre: 'Revisión técnico-mecánica',
    descripcion: 'Inspección técnica del vehículo',
    precioRango: '$180.000 - $250.000'
  },
  {
    id: 'matricula',
    nombre: 'Matrícula',
    descripcion: 'Registro y renovación de matrícula vehicular',
    precioRango: '$120.000 - $200.000'
  },
  {
    id: 'cambio-propiedad',
    nombre: 'Cambio de propiedad',
    descripcion: 'Tramite de cambio de propiedad vehicular',
    precioRango: '$100.000 - $180.000'
  },
  {
    id: 'otro',
    nombre: 'Otros trámites',
    descripcion: 'Otros trámites vehiculares',
    precioRango: 'Según el trámite'
  }
];

interface ListaTramitesProps {
  onSelectTramite?: (tramite: Tramite) => void;
}

export function ListaTramites({ onSelectTramite }: ListaTramitesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tramites.map((tramite) => (
        <Card key={tramite.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{tramite.nombre}</CardTitle>
            <CardDescription>{tramite.descripcion}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {tramite.precioRango}
            </div>
            {onSelectTramite && (
              <button
                onClick={() => onSelectTramite(tramite)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Seleccionar
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}