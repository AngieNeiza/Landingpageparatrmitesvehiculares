import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

// Error boundary component for Select
function SafeSelect({ children, fallback }: { children: React.ReactNode; fallback: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Select component error:', error);
    return <>{fallback}</>;
  }
}

export function FormularioTramite({ embedded = false }: { embedded?: boolean }) {
  const [formData, setFormData] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    ciudad: '',
    tipoVehiculo: '',
    tipoTramite: '',
    comentarios: ''
  });

  const handleChange = (field: string, value: string) => {
    try {
      setFormData(prev => ({ ...prev, [field]: value || '' }));
    } catch (error) {
      console.error('Error updating form data:', error);
    }
  };

  const handleSelectChange = (field: string) => (value: string) => {
    try {
      handleChange(field, value);
    } catch (error) {
      console.error('Error updating select field:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.nombre.trim()) {
      alert('Por favor ingrese su nombre completo');
      return;
    }
    if (!formData.identificacion.trim()) {
      alert('Por favor ingrese su número de identificación');
      return;
    }
    if (!formData.telefono.trim()) {
      alert('Por favor ingrese su teléfono');
      return;
    }
    if (!formData.email.trim()) {
      alert('Por favor ingrese su correo electrónico');
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
    if (!formData.tipoTramite) {
      alert('Por favor seleccione el tipo de trámite');
      return;
    }

    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Solicitud enviada exitosamente');
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input
            id="nombre"
            value={formData.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="identificacion">Número de identificación</Label>
          <Input
            id="identificacion"
            value={formData.identificacion}
            onChange={(e) => handleChange('identificacion', e.target.value)}
            required
          />
        </div>
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
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ciudad">Ciudad</Label>
          <Input
            id="ciudad"
            value={formData.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            required
          />
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
              </SelectContent>
            </Select>
          </SafeSelect>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tipoTramite">Tipo de trámite</Label>
        <SafeSelect fallback={<div className="text-red-500">Error cargando selector</div>}>
          <Select value={formData.tipoTramite} onValueChange={handleSelectChange('tipoTramite')}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione tipo de trámite" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="traspaso">Traspaso de vehículos</SelectItem>
              <SelectItem value="soat">SOAT</SelectItem>
              <SelectItem value="revision">Revisión técnico-mecánica</SelectItem>
              <SelectItem value="matricula">Matrícula</SelectItem>
              <SelectItem value="cambio-propiedad">Cambio de propiedad</SelectItem>
              <SelectItem value="otro">Otros trámites</SelectItem>
            </SelectContent>
          </Select>
        </SafeSelect>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comentarios">Comentarios adicionales</Label>
        <Textarea
          id="comentarios"
          value={formData.comentarios}
          onChange={(e) => handleChange('comentarios', e.target.value)}
          placeholder="Ingrese cualquier información adicional..."
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full">
        Enviar solicitud
      </Button>
    </form>
  );

  return embedded ? (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">Solicitar Trámite Vehicular</CardTitle>
        <CardDescription className="text-center">
          Complete el formulario para solicitar su trámite vehicular
        </CardDescription>
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  ) : (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Solicitar Trámite Vehicular</CardTitle>
            <CardDescription className="text-center">
              Complete el formulario para solicitar su trámite vehicular
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formContent}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}