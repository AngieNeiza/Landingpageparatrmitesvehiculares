import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { FormularioTramite } from './components/FormularioTramite';
import { Cotizador } from './components/Cotizador';

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solicitar-tramite" element={<FormularioTramite />} />
        <Route path="/cotizar" element={<Cotizador />} />
      </Routes>
    </Router>
  );
}