import { FormEvent, useState, ReactNode, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';

interface FormularioTramiteProps {
  embedded?: boolean;
  initialTramite?: string;
  initialPrecio?: string;
  onSuccess?: () => void;
}

interface FormularioTramiteState {
  nombre: string;
  telefono: string;
  ciudad: string;
  tipoVehiculo: string;
  comentarios: string;
  tipoTramite: string;
  precio: string;
}

interface FieldError {
  [key: string]: string;
}

function safeString(value: string | null | undefined): string {
  try {
    return (value ?? '') as string;
  } catch {
    return '';
  }
}

export function FormularioTramite({ embedded = false, initialTramite = '', initialPrecio = '', onSuccess }: FormularioTramiteProps) {
  // Estado inicial más robusto
  const getInitialState = (): FormularioTramiteState => ({
    nombre: '',
    telefono: '',
    ciudad: '',
    tipoVehiculo: '',
    comentarios: '',
    tipoTramite: safeString(initialTramite),
    precio: safeString(initialPrecio)
  });

  const [formData, setFormData] = useState<FormularioTramiteState>(getInitialState);
  
  // Debug: monitorear cambios en formData
  useEffect(() => {
    console.log('Estado del formulario actualizado:', formData);
  }, [formData]);
  
  // Manejo de errores: error global Y errores por campo
  const [formError, setFormError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof FormularioTramiteState, value: string | null | undefined) => {
    try {
      const safeValue = value !== null && value !== undefined ? String(value) : '';
      setFormData(prev => {
        // Asegurar que prev existe y es un objeto
        if (!prev || typeof prev !== 'object') {
          console.error('Estado anterior inválido:', prev);
          return {
            nombre: '',
            telefono: '',
            ciudad: '',
            tipoVehiculo: '',
            comentarios: '',
            tipoTramite: safeString(initialTramite),
            precio: safeString(initialPrecio),
            [field]: safeValue
          };
        }

        // Crear nuevo estado preservando todos los valores anteriores
        const newState = { ...prev, [field]: safeValue };
        return newState;
      });

      // Limpiar error del campo cuando el usuario empieza a escribir
      if (fieldErrors[field]) {
        setFieldErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    } catch (error) {
      console.error('Error al cambiar campo:', error, { field, value });
    }
  };

  const handleSelectChange = (field: keyof FormularioTramiteState) => (value: string | undefined) => {
    try {
      const safeValue = value !== undefined ? String(value) : '';
      console.log(`Cambiando ${field} a:`, safeValue);
      handleChange(field, safeValue);
    } catch (error) {
      console.error('Error en handleSelectChange:', error);
    }
  };

  const validateField = (field: string, value: string): string => {
    try {
      switch (field) {
        case 'nombre':
          if (!value.trim()) return 'Por favor ingrese su nombre completo.';
          if (value.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres.';
          return '';
        case 'telefono':
          if (!value.trim()) return 'Por favor ingrese su teléfono.';
          if (!/^[0-9+\-\s()]{7,}$/.test(value.trim())) return 'Ingrese un teléfono válido.';
          return '';
        case 'ciudad':
          if (!value.trim()) return 'Por favor ingrese su ciudad.';
          if (value.trim().length < 2) return 'La ciudad debe tener al menos 2 caracteres.';
          return '';
        case 'tipoVehiculo':
          if (!value) return 'Por favor seleccione el tipo de vehículo.';
          return '';
        default:
          return '';
      }
    } catch (error) {
      console.error('Error en validación:', error);
      return '';
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setFormError('');
      setFieldErrors({});

      // Validar cada campo
      const errors: FieldError = {};
      const fieldsToValidate: (keyof FormularioTramiteState)[] = [
        'nombre',
        'telefono',
        'ciudad',
        'tipoVehiculo'
      ];

      let hasErrors = false;
      for (const field of fieldsToValidate) {
        const error = validateField(field, formData[field]);
        if (error) {
          errors[field] = error;
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setFieldErrors(errors);
        setFormError('Por favor corrija los errores marcados abajo.');
        setIsSubmitting(false);
        return;
      }

      // Si pasó todas las validaciones, enviar
      console.log('Solicitud enviada:', formData);
      setFormError('');
      alert('Solicitud enviada exitosamente. Nos contactaremos pronto.');
      
      // No limpiar el formulario - mantener los datos para que el usuario pueda verificarlos
      onSuccess?.();
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setFormError('Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (fieldName: string) => {
    const error = fieldErrors[fieldName];
    if (!error) return null;
    
    return (
      <p className="text-xs text-red-600 mt-1 font-medium">⚠️ {error}</p>
    );
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error global (no invasivo) */}
      {formError && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-amber-800 text-sm">
            {formError}
          </AlertDescription>
        </Alert>
      )}

      {/* Campo: Nombre completo */}
      <div className="space-y-2">
        <Label htmlFor="nombre" className={fieldErrors.nombre ? 'text-red-600' : ''}>
          Nombre completo
        </Label>
        <Input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => handleChange('nombre', e.target.value)}
          className={fieldErrors.nombre ? 'border-red-300 focus:border-red-500' : ''}
          placeholder="Ej: Juan Pérez"
          disabled={isSubmitting}
        />
        {renderFieldError('nombre')}
      </div>

      {/* Campos: Teléfono y Ciudad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="telefono" className={fieldErrors.telefono ? 'text-red-600' : ''}>
            Teléfono
          </Label>
          <Input
            id="telefono"
            type="tel"
            value={formData.telefono}
            onChange={(e) => handleChange('telefono', e.target.value)}
            className={fieldErrors.telefono ? 'border-red-300 focus:border-red-500' : ''}
            placeholder="Ej: +57 300 1234567"
            disabled={isSubmitting}
          />
          {renderFieldError('telefono')}
        </div>
        <div className="space-y-2">
          <Label htmlFor="ciudad" className={fieldErrors.ciudad ? 'text-red-600' : ''}>
            Ciudad
          </Label>
          <Input
            id="ciudad"
            value={formData.ciudad}
            onChange={(e) => handleChange('ciudad', e.target.value)}
            className={fieldErrors.ciudad ? 'border-red-300 focus:border-red-500' : ''}
            placeholder="Ej: Medellín"
            disabled={isSubmitting}
          />
          {renderFieldError('ciudad')}
        </div>
      </div>

      {/* Campo: Tipo de vehículo */}
      <div className="space-y-2">
        <Label htmlFor="tipoVehiculo" className={fieldErrors.tipoVehiculo ? 'text-red-600' : ''}>
          Tipo de vehículo
        </Label>
        <Select 
          key={`tipoVehiculo-${formData.tipoVehiculo}`}
          value={formData.tipoVehiculo || ''} 
          onValueChange={handleSelectChange('tipoVehiculo')}
          disabled={isSubmitting}
        >
          <SelectTrigger className={fieldErrors.tipoVehiculo ? 'border-red-300' : ''}>
            <SelectValue placeholder="Seleccione tipo de vehículo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="moto">🏍️ Moto</SelectItem>
            <SelectItem value="carro">🚗 Carro</SelectItem>
            <SelectItem value="camioneta">🚙 Camioneta</SelectItem>
          </SelectContent>
        </Select>
        {renderFieldError('tipoVehiculo')}
      </div>

      {/* Campo: Comentarios */}
      <div className="space-y-2">
        <Label htmlFor="comentarios">Comentarios (Opcional)</Label>
        <Textarea
          id="comentarios"
          value={formData.comentarios}
          onChange={(e) => handleChange('comentarios', e.target.value)}
          placeholder="Agrega detalles adicionales sobre tu trámite..."
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* Resumen: Trámite y Precio */}
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div>
          <p className="text-sm text-slate-500">Trámite seleccionado</p>
          <p className="font-semibold text-slate-900">{formData.tipoTramite || '—'}</p>
        </div>
        <div>
          <p className="text-sm text-slate-500">Precio cotizado</p>
          <p className="font-semibold text-slate-900">{formData.precio || '—'}</p>
        </div>
      </div>

      {/* Campos ocultos */}
      <input type="hidden" name="tipoTramite" value={formData.tipoTramite} />
      <input type="hidden" name="precio" value={formData.precio} />

      {/* Botón de envío */}
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
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
