import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, CheckCircle, Clock, Users, FileText, Shield, Car } from 'lucide-react';

// Datos de servicios
const serviceData = {
  'traspaso-vehiculos': {
    title: 'Traspaso de Vehículos',
    icon: Car,
    banner: '/images/traspaso-banner.jpg', // Placeholder
    description: 'Gestionamos el cambio de propietario de tu moto o carro de forma rápida y segura.',
    incluye: ['Verificación de documentos', 'Tramitación ante autoridades', 'Entrega de placas y documentos'],
    paraQuien: 'Propietarios de vehículos que desean transferir la propiedad a otro titular.',
    beneficios: ['Proceso 100% digital', 'Sin filas ni esperas', 'Asesoría personalizada'],
    tiempoEstimado: '3-5 días hábiles',
    requisitos: ['Documento de identidad del vendedor y comprador', 'SOAT vigente', 'Certificado de revisión técnico-mecánica', 'Factura de venta'],
    pasos: [
      'Recopilación de documentos requeridos',
      'Verificación de información',
      'Tramitación ante la autoridad competente',
      'Entrega de documentos finales'
    ],
    recomendaciones: 'Asegúrate de tener todos los documentos originales. El proceso requiere presencia física solo para la firma final.'
  },
  'soat': {
    title: 'SOAT',
    icon: Shield,
    banner: '/images/soat-banner.jpg',
    description: 'Tramitamos tu Seguro Obligatorio de Accidentes de Tránsito sin que salgas de casa.',
    incluye: ['Cotización personalizada', 'Pago seguro en línea', 'Entrega digital del certificado'],
    paraQuien: 'Todos los propietarios de vehículos automotores en Colombia.',
    beneficios: ['Cobertura nacional', 'Atención médica inmediata', 'Protección legal'],
    tiempoEstimado: '1-2 días hábiles',
    requisitos: ['Documento de identidad', 'Tarjeta de propiedad', 'Datos del vehículo'],
    pasos: [
      'Cotización según características del vehículo',
      'Selección de cobertura',
      'Pago en línea',
      'Recepción del certificado digital'
    ],
    recomendaciones: 'Renueva tu SOAT antes de la fecha de vencimiento para evitar multas.'
  },
  'revision-tecnico-mecanica': {
    title: 'Revisión Técnico-Mecánica',
    icon: CheckCircle,
    banner: '/images/revision-banner.jpg',
    description: 'Agendamos y gestionamos tu cita para la revisión técnico-mecánica.',
    incluye: ['Agendamiento de cita', 'Inspección completa del vehículo', 'Certificado de aprobación'],
    paraQuien: 'Vehículos particulares y de servicio público según normatividad.',
    beneficios: ['Centro de diagnóstico autorizado', 'Resultados inmediatos', 'Soporte técnico'],
    tiempoEstimado: '2-4 horas',
    requisitos: ['Documento de identidad', 'SOAT vigente', 'Vehículo en buen estado'],
    pasos: [
      'Agendamiento de cita en CDA cercano',
      'Llegada al centro con vehículo',
      'Inspección técnica completa',
      'Recepción del certificado'
    ],
    recomendaciones: 'Lleva tu vehículo con el tanque de combustible al 1/4 y todos los accesorios originales.'
  },
  'matricula': {
    title: 'Matrícula',
    icon: FileText,
    banner: '/images/matricula-banner.jpg',
    description: 'Realizamos todo el proceso de matriculación de vehículos nuevos y usados.',
    incluye: ['Registro del vehículo', 'Expedición de placas', 'Tarjeta de propiedad'],
    paraQuien: 'Propietarios de vehículos nuevos o usados que requieren matriculación.',
    beneficios: ['Proceso simplificado', 'Entrega a domicilio', 'Seguimiento en línea'],
    tiempoEstimado: '5-7 días hábiles',
    requisitos: ['Factura de compra', 'SOAT', 'Revisión técnico-mecánica', 'RUAF'],
    pasos: [
      'Verificación de documentos',
      'Registro en base de datos nacional',
      'Expedición de placas y tarjeta',
      'Entrega de documentos'
    ],
    recomendaciones: 'Para vehículos usados, asegúrate de tener el certificado de tradición.'
  },
  'cambio-propiedad': {
    title: 'Cambio de Propiedad',
    icon: Users,
    banner: '/images/cambio-propiedad-banner.jpg',
    description: 'Asesoría completa y gestión del cambio de propietario ante las autoridades.',
    incluye: ['Verificación jurídica', 'Tramitación administrativa', 'Actualización de registros'],
    paraQuien: 'Compradores y vendedores de vehículos usados.',
    beneficios: ['Protección legal', 'Proceso transparente', 'Asesoría especializada'],
    tiempoEstimado: '3-5 días hábiles',
    requisitos: ['Documento de comprador y vendedor', 'Factura de venta', 'Certificado de libertad de gravámenes'],
    pasos: [
      'Revisión de documentos',
      'Firma de contrato de compraventa',
      'Tramitación ante autoridad de tránsito',
      'Registro del cambio'
    ],
    recomendaciones: 'Realiza el proceso con un abogado o notario para mayor seguridad.'
  },
  'otros': {
    title: 'Otros Trámites',
    icon: FileText,
    banner: '/images/otros-banner.jpg',
    description: 'Consulta por cualquier otro trámite vehicular que necesites realizar.',
    incluye: ['Asesoría personalizada', 'Gestión integral', 'Seguimiento del proceso'],
    paraQuien: 'Todos los propietarios de vehículos.',
    beneficios: ['Solución integral', 'Experiencia especializada', 'Atención personalizada'],
    tiempoEstimado: 'Según el trámite',
    requisitos: ['Varían según el trámite específico'],
    pasos: [
      'Consulta inicial',
      'Definición del trámite requerido',
      'Recopilación de documentos',
      'Gestión y seguimiento'
    ],
    recomendaciones: 'Describe detalladamente tu necesidad para recibir la mejor asesoría.'
  }
};

export function ServicioDetalle() {
  const { servicio } = useParams<{ servicio: string }>();
  const [showForm, setShowForm] = useState(false);
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

  const service = servicio ? serviceData[servicio as keyof typeof serviceData] : null;

  useEffect(() => {
    if (service) {
      setFormData(prev => ({ ...prev, tipoTramite: servicio }));
    }
  }, [service, servicio]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Servicio no encontrado</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: string) => (value: string) => {
    handleChange(field, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validations
    if (!formData.nombre.trim() || !formData.identificacion.trim() || !formData.telefono.trim() || !formData.email.trim() || !formData.ciudad.trim() || !formData.tipoVehiculo) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Solicitud enviada exitosamente');
  };

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-blue-100 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <Icon className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
          </div>
          <p className="text-xl text-blue-100 max-w-2xl">{service.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <Card>
              <CardHeader>
                <CardTitle>¿Qué incluye este servicio?</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.incluye.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Para quién aplica */}
            <Card>
              <CardHeader>
                <CardTitle>¿Para quién aplica?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.paraQuien}</p>
              </CardContent>
            </Card>

            {/* Beneficios */}
            <Card>
              <CardHeader>
                <CardTitle>Beneficios</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.beneficios.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tiempo estimado */}
            <Card>
              <CardHeader>
                <CardTitle>Tiempo estimado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>{service.tiempoEstimado}</span>
                </div>
              </CardContent>
            </Card>

            {/* Requisitos */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.requisitos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pasos del proceso */}
            <Card>
              <CardHeader>
                <CardTitle>Pasos del proceso</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {service.pasos.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Recomendaciones */}
            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{service.recomendaciones}</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Button onClick={scrollToForm} className="w-full mb-4">
                  Solicitar este servicio
                </Button>
                <p className="text-sm text-gray-600 text-center">
                  Completa el formulario abajo para iniciar tu trámite
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulario */}
        {showForm && (
          <div id="formulario" className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Solicitar {service.title}</CardTitle>
                <CardDescription className="text-center">
                  Complete el formulario para solicitar su trámite vehicular
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                      <Select value={formData.tipoVehiculo} onValueChange={handleSelectChange('tipoVehiculo')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de vehículo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moto">Moto</SelectItem>
                          <SelectItem value="carro">Carro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipoTramite">Tipo de trámite</Label>
                    <Select value={formData.tipoTramite} onValueChange={handleSelectChange('tipoTramite')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione tipo de trámite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traspaso-vehiculos">Traspaso de vehículos</SelectItem>
                        <SelectItem value="soat">SOAT</SelectItem>
                        <SelectItem value="revision-tecnico-mecanica">Revisión técnico-mecánica</SelectItem>
                        <SelectItem value="matricula">Matrícula</SelectItem>
                        <SelectItem value="cambio-propiedad">Cambio de propiedad</SelectItem>
                        <SelectItem value="otros">Otros trámites</SelectItem>
                      </SelectContent>
                    </Select>
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}