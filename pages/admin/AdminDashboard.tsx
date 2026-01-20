import React, { useState, useMemo } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { ReservationStatus } from '../../types';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, XCircle, Clock, MessageSquare, LogOut, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { reservations, updateReservationStatus, logoutAdmin } = useBooking();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const handleLogout = () => {
    logoutAdmin();
    navigate('/');
  };

  const filteredReservations = useMemo(() => {
    if (filterStatus === 'ALL') return reservations;
    return reservations.filter(r => r.status === filterStatus);
  }, [reservations, filterStatus]);

  // Stats Logic
  const totalRevenue = reservations.reduce((acc, curr) => acc + (curr.status !== ReservationStatus.CANCELLED ? curr.totalPrice : 0), 0);
  const totalBookings = reservations.filter(r => r.status !== ReservationStatus.CANCELLED).length;
  
  const chartData = useMemo(() => {
    // Group revenue by date (simplified)
    const map = new Map<string, number>();
    reservations.forEach(r => {
      if (r.status !== ReservationStatus.CANCELLED) {
        const val = map.get(r.date) || 0;
        map.set(r.date, val + r.totalPrice);
      }
    });
    return Array.from(map.entries()).map(([date, revenue]) => ({ date, revenue })).sort((a,b) => a.date.localeCompare(b.date));
  }, [reservations]);

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.CONFIRMED: return 'bg-green-100 text-green-800';
      case ReservationStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case ReservationStatus.CANCELLED: return 'bg-red-100 text-red-800';
      case ReservationStatus.COMPLETED: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100';
    }
  };

  const sendConfirmationWhatsApp = (res: any) => {
    const message = `
Hola ${res.customerName}, confirmamos tu reserva ✅
Tour: ${res.tourName}
Fecha: ${res.date} a las ${res.time}
Total: $${res.totalPrice.toLocaleString()}
Ubicación de salida: Terminal Marítima.
¡Te esperamos!
    `.trim();
    window.open(`https://wa.me/${res.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="bg-brand-dark text-white p-4 sticky top-0 z-30 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="font-serif text-xl font-bold text-brand-gold">Suggar Brown Admin</h1>
          <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-500 text-gray-300 hover:text-white">
            <LogOut size={16} className="mr-2" /> Salir
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-8 space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Ingresos Totales</p>
              <h3 className="text-3xl font-bold text-brand-dark">${totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Reservas Activas</p>
              <h3 className="text-3xl font-bold text-brand-dark">{totalBookings}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <CheckCircle size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pendientes</p>
              <h3 className="text-3xl font-bold text-brand-dark">{reservations.filter(r => r.status === ReservationStatus.PENDING).length}</h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
              <Clock size={24} />
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-brand-gold" /> Tendencia de Ingresos
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Ingresos']}
                />
                <Bar dataKey="revenue" fill="#C6A87C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-lg">Últimas Reservas</h3>
            <div className="flex gap-2">
              {['ALL', ReservationStatus.PENDING, ReservationStatus.CONFIRMED].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filterStatus === st ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {st === 'ALL' ? 'Todos' : st}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">ID / Cliente</th>
                  <th className="px-6 py-4 font-medium">Tour</th>
                  <th className="px-6 py-4 font-medium">Fecha</th>
                  <th className="px-6 py-4 font-medium">Personas</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4 font-medium">Estado</th>
                  <th className="px-6 py-4 font-medium text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-brand-dark">{res.customerName}</div>
                      <div className="text-xs text-gray-400">{res.id}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{res.tourName}</td>
                    <td className="px-6 py-4 text-gray-700">
                      <div>{res.date}</div>
                      <div className="text-xs text-gray-400">{res.time}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {res.adults} Ad, {res.children} Ni
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700">
                      ${res.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(res.status)}`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => sendConfirmationWhatsApp(res)}
                        className="text-green-600 hover:bg-green-50 p-2 rounded-full transition-colors"
                        title="Enviar WhatsApp"
                      >
                        <MessageSquare size={18} />
                      </button>
                      
                      {res.status === ReservationStatus.PENDING && (
                        <>
                          <button 
                            onClick={() => updateReservationStatus(res.id, ReservationStatus.CONFIRMED)}
                            className="text-brand-blue hover:bg-blue-50 p-2 rounded-full transition-colors"
                            title="Confirmar"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => updateReservationStatus(res.id, ReservationStatus.CANCELLED)}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                            title="Cancelar"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredReservations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                      No hay reservas encontradas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
