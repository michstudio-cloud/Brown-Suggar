import React from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { BookingProvider, useBooking } from './contexts/BookingContext';
import { Home } from './pages/Home';
import { TourDetails } from './pages/TourDetails';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ChatAssistant } from './components/ChatAssistant';
import { Anchor, Instagram, Facebook, MessageCircle } from 'lucide-react';

const ProtectedRoute = ({ children }: { children?: React.ReactElement }) => {
  const { isAdmin } = useBooking();
  if (!isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  return children || null;
};

const Navigation = () => {
  const isPublic = !window.location.hash.includes('dashboard');
  
  if (!isPublic) return null;

  return (
    <nav className="fixed top-0 w-full z-40 px-6 py-4 transition-all duration-300 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display font-bold text-2xl tracking-tighter text-white">BROWN</span>
          <span className="font-display font-bold text-2xl tracking-tighter text-brand-gold">SUGGAR</span>
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gray-400">Tours PV</span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link to="/" className="text-sm font-bold uppercase tracking-wider text-white hover:text-brand-gold transition-colors hidden md:block">Inicio</Link>
          <a href="#tours" className="text-sm font-bold uppercase tracking-wider text-white hover:text-brand-gold transition-colors hidden md:block">Experiencias</a>
          <Link to="/admin" className="text-xs border border-brand-gold text-brand-gold px-4 py-2 rounded-full hover:bg-brand-gold hover:text-black transition-all font-bold">
            ACCESO ADMIN
          </Link>
        </div>
      </div>
    </nav>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="bg-brand-dark min-h-screen text-white selection:bg-brand-gold selection:text-black">
      <Navigation />
      {children}
      <ChatAssistant />
      <footer className="bg-black py-16 border-t border-white/10 relative overflow-hidden">
        {/* Background texture/glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <div className="mb-8">
            <h2 className="font-display text-4xl text-white">BROWN <span className="text-brand-gold">SUGGAR</span></h2>
            <p className="text-xs tracking-[0.3em] text-gray-500 mt-1">PUERTO VALLARTA</p>
          </div>
          
          <div className="flex gap-6 mb-10">
            <a href="#" className="p-3 rounded-full bg-brand-charcoal hover:bg-brand-gold hover:text-black transition-all"><Instagram size={20} /></a>
            <a href="#" className="p-3 rounded-full bg-brand-charcoal hover:bg-brand-gold hover:text-black transition-all"><Facebook size={20} /></a>
            <a href="#" className="p-3 rounded-full bg-brand-charcoal hover:bg-brand-gold hover:text-black transition-all"><MessageCircle size={20} /></a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400 w-full max-w-2xl border-t border-white/10 pt-8">
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-bold uppercase mb-2">Contacto</h4>
              <p>322 264 3164</p>
              <p>Terminal Marítima Portuaria API</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-bold uppercase mb-2">Legal</h4>
              <p>Términos y Condiciones</p>
              <p>Política de Privacidad</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-white font-bold uppercase mb-2">Horario</h4>
              <p>Lun - Dom</p>
              <p>8:00 AM - 10:00 PM</p>
            </div>
          </div>
          <p className="mt-12 text-xs text-gray-600">© 2024 Suggar Brown Tours. Design inspired by urban aesthetics.</p>
        </div>
      </footer>
    </div>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/tours/:id" element={<Layout><TourDetails /></Layout>} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <BookingProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </BookingProvider>
  );
}

export default App;