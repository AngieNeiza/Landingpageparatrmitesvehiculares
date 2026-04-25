import { FormEvent, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface FormularioTramiteProps {
  embedded?: boolean;
  initialTramite?: string;
  initialPrecio?: string;
  onSuccess?: () => void;
}

function SafeSelect({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Select component error:', error);
    return <>{fallback}</>;
  }
}

export function FormularioTramite({ embedded = false, initialTramite = '', initialPrecio = '', onSuccess }: FormularioTramiteProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    tipoVehiculo: '',
    comentarios: '',
    tipoTramite: initialTramite,
    precio: initialPrecio
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value || '' }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    handleChange(field, value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nombre.trim()) {
      alert('Por favor ingrese su nombre completo');
      return;
    }
    if (!formData.telefono.trim()) {
      alert('Por favor ingrese su teléfono');
      return;
    }
    if (!formData.ciudad.trim()) {
      alert('Por favor ingrese su ciudad');
      return;
    }
    if (!formData.tipoVehiculo) {
      alert('Por favor seleccione el tipo de vehículo');
      return;
    }

    console.log('Solicitud enviada:', formData);
    alert('Solicitud enviada exitosamente. Nos contactaremos pronto.');
    onSuccess?.();
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre completo</Label>
        <Input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            value={formData.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoVehiculo">Tipo de vehículo</Label>
        <SafeSelect fallback={<div className="text-red-500">Error cargando selector</div>}>
          <Select value={formData.tipoVehiculo} onValueChange={handleSelectChange('tipoVehiculo')}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione tipo de vehículo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moto">Moto</SelectItem>
              <SelectItem value="carro">Carro</SelectItem>
              <SelectItem value="camioneta">Camioneta</SelectItem>
            </SelectContent>
          </Select>
        </SafeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comentarios">Comentarios</Label>
        <Textarea
          id="comentarios"
          value={formData.comentarios}
          onChange={(e) => handleChange('comentarios', e.target.value)}
          placeholder="Agrega detalles adicionales sobre tu trámite"
          rows={4}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div>
          <p className="text-sm text-slate-500">Trámite seleccionado</p>
          <p className="font-semibold text-slate-900">{formData.tipoTramite || 'No definido'}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Precio cotizado</p>
          <p className="font-semibold text-slate-900">{formData.precio || 'No definido'}</p>
        </div>
      </div>

      <input type="hidden" name="tipoTramite" value={formData.tipoTramite} />
      <input type="hidden" name="precio" value={formData.precio} />

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
        Enviar solicitud
      </Button>
    </form>
  );

  return embedded ? (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Solicitar Trámite</CardTitle>
        <CardDescription className="text-center">
          Completa el formulario. El trámite y el precio están cargados automáticamente.
        </CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
    </Card>
  ) : (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Solicitar Trámite Vehicular</CardTitle>
            <CardDescription className="text-center">
              Completa el formulario para solicitar tu trámite.
            </CardDescription>
          </CardHeader>
          <CardContent>{formContent}</CardContent>
        </Card>
      </div>
    </div>
  );
}
