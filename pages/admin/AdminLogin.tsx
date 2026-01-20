import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { Button } from '../../components/ui/Button';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useBooking();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const success = await loginAdmin(password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <div className="w-16 h-16 bg-brand-sand rounded-full flex items-center justify-center mx-auto mb-6 text-brand-gold">
          <Lock size={32} />
        </div>
        <h2 className="font-serif text-2xl font-bold mb-2">Acceso Administrativo</h2>
        <p className="text-gray-500 mb-6">Ingresa tu credencial segura para gestionar reservas.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Contraseña de Administrador"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${error ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-brand-gold'}`}
          />
          {error && <p className="text-red-500 text-sm">Credenciales incorrectas</p>}
          
          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Verificando...
              </span>
            ) : (
              'Entrar al Panel'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};