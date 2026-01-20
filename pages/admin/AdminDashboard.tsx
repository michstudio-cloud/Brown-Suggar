import React, { useState, useMemo } from 'react';
import { useBooking } from '../../contexts/BookingContext';
import { ReservationStatus, Tour, TourCategory } from '../../types';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, CheckCircle, XCircle, Clock, MessageSquare, LogOut, 
  TrendingUp, DollarSign, LayoutGrid, Plus, Trash2, Edit, Save, 
  ShoppingBag, X, Image as ImageIcon
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Tab = 'dashboard' | 'tours' | 'pos';

// --- Sub-components for better organization ---

const StatCard = ({ title, value, icon: Icon, colorClass, textClass }: any) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold text-brand-dark">{value}</h3>
    </div>
    <div className={`p-3 rounded-full ${colorClass} ${textClass}`}>
      <Icon size={24} />
    </div>
  </div>
);

const TourForm = ({ initialData, onSave, onCancel }: { initialData?: Tour, onSave: (t: Tour) => void, onCancel: () => void }) => {
  const [formData, setFormData] = useState<Partial<Tour>>(initialData || {
    title: '', description: '', shortDescription: '', priceAdult: 0, priceChild: 0,
    duration: '', location: '', category: TourCategory.NATURE, includes: [], departureTimes: [], images: []
  });

  const handleChange = (f: keyof Tour, v: any) => setFormData(prev => ({ ...prev, [f]: v }));
  
  // Helpers for Arrays
  const addArrayItem = (field: 'includes' | 'departureTimes' | 'images', value: string) => {
    if (!value) return;
    setFormData(prev => ({ ...prev, [field]: [...(prev[field] || []), value] }));
  };
  const removeArrayItem = (field: 'includes' | 'departureTimes' | 'images', idx: number) => {
    setFormData(prev => ({ ...prev, [field]: (prev[field] || []).filter((_, i) => i !== idx) }));
  };

  const [tempInclude, setTempInclude] = useState('');
  const [tempTime, setTempTime] = useState('');
  const [tempImage, setTempImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.priceAdult) return alert('Completa los campos obligatorios');
    onSave({
      ...formData,
      id: formData.id || `TOUR-${Date.now()}`, // Generate ID if new
    } as Tour);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold font-serif text-brand-dark">{initialData ? 'Editar Tour' : 'Nuevo Tour'}</h2>
          <button onClick={onCancel}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Título</label>
              <input className="w-full border p-2 rounded" value={formData.title} onChange={e => handleChange('title', e.target.value)} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Categoría</label>
              <select className="w-full border p-2 rounded" value={formData.category} onChange={e => handleChange('category', e.target.value)}>
                {Object.values(TourCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
               <label className="text-sm font-bold text-gray-700">Descripción Corta (Card)</label>
               <input className="w-full border p-2 rounded" value={formData.shortDescription} onChange={e => handleChange('shortDescription', e.target.value)} />
            </div>
            <div className="space-y-2 md:col-span-2">
               <label className="text-sm font-bold text-gray-700">Descripción Completa</label>
               <textarea className="w-full border p-2 rounded h-24" value={formData.description} onChange={e => handleChange('description', e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Precio Adulto</label>
              <input type="number" className="w-full border p-2 rounded" value={formData.priceAdult} onChange={e => handleChange('priceAdult', Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Precio Niño</label>
              <input type="number" className="w-full border p-2 rounded" value={formData.priceChild} onChange={e => handleChange('priceChild', Number(e.target.value))} />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Duración</label>
              <input className="w-full border p-2 rounded" value={formData.duration} onChange={e => handleChange('duration', e.target.value)} placeholder="Ej: 5 Horas" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Ubicación</label>
              <input className="w-full border p-2 rounded" value={formData.location} onChange={e => handleChange('location', e.target.value)} />
            </div>
          </div>

          {/* Dynamic Lists */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Includes */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-sm font-bold block mb-2">Lo que incluye</label>
              <div className="flex gap-2 mb-2">
                <input className="flex-1 border p-1 rounded text-sm" value={tempInclude} onChange={e => setTempInclude(e.target.value)} placeholder="Ej: Bebidas" />
                <button type="button" onClick={() => { addArrayItem('includes', tempInclude); setTempInclude(''); }} className="bg-brand-dark text-white p-1 rounded"><Plus size={16} /></button>
              </div>
              <ul className="text-xs space-y-1">
                {formData.includes?.map((item, i) => (
                   <li key={i} className="flex justify-between bg-white p-1 px-2 rounded border">{item} <button type="button" onClick={() => removeArrayItem('includes', i)} className="text-red-500"><X size={12}/></button></li>
                ))}
              </ul>
            </div>

            {/* Times */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-sm font-bold block mb-2">Horarios</label>
              <div className="flex gap-2 mb-2">
                <input type="time" className="flex-1 border p-1 rounded text-sm" value={tempTime} onChange={e => setTempTime(e.target.value)} />
                <button type="button" onClick={() => { addArrayItem('departureTimes', tempTime); setTempTime(''); }} className="bg-brand-dark text-white p-1 rounded"><Plus size={16} /></button>
              </div>
               <ul className="text-xs space-y-1">
                {formData.departureTimes?.map((item, i) => (
                   <li key={i} className="flex justify-between bg-white p-1 px-2 rounded border">{item} <button type="button" onClick={() => removeArrayItem('departureTimes', i)} className="text-red-500"><X size={12}/></button></li>
                ))}
              </ul>
            </div>

            {/* Images */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <label className="text-sm font-bold block mb-2">Fotos (URL)</label>
              <div className="flex gap-2 mb-2">
                <input className="flex-1 border p-1 rounded text-sm" value={tempImage} onChange={e => setTempImage(e.target.value)} placeholder="https://..." />
                <button type="button" onClick={() => { addArrayItem('images', tempImage); setTempImage(''); }} className="bg-brand-dark text-white p-1 rounded"><Plus size={16} /></button>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {formData.images?.map((img, i) => (
                   <div key={i} className="relative aspect-square">
                     <img src={img} alt="" className="w-full h-full object-cover rounded" />
                     <button type="button" onClick={() => removeArrayItem('images', i)} className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl"><X size={10}/></button>
                   </div>
                ))}
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
            <Button type="submit">Guardar Tour</Button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- MAIN DASHBOARD COMPONENT ---

export const AdminDashboard: React.FC = () => {
  const { 
    reservations, updateReservationStatus, logoutAdmin,
    tours, addTour, updateTour, deleteTour, addReservation 
  } = useBooking();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Tour Management State
  const [isEditingTour, setIsEditingTour] = useState(false);
  const [currentTour, setCurrentTour] = useState<Tour | undefined>(undefined);

  // POS State
  const [posTourId, setPosTourId] = useState('');
  const [posDate, setPosDate] = useState('');
  const [posTime, setPosTime] = useState('');
  const [posAdults, setPosAdults] = useState(1);
  const [posChildren, setPosChildren] = useState(0);
  const [posName, setPosName] = useState('');

  const handleLogout = () => { logoutAdmin(); navigate('/'); };

  // --- STATS LOGIC ---
  const filteredReservations = useMemo(() => {
    if (filterStatus === 'ALL') return reservations;
    return reservations.filter(r => r.status === filterStatus);
  }, [reservations, filterStatus]);

  const totalRevenue = reservations.reduce((acc, curr) => acc + (curr.status !== ReservationStatus.CANCELLED ? curr.totalPrice : 0), 0);
  const totalBookings = reservations.filter(r => r.status !== ReservationStatus.CANCELLED).length;
  const chartData = useMemo(() => {
    const map = new Map<string, number>();
    reservations.forEach(r => {
      if (r.status !== ReservationStatus.CANCELLED) {
        map.set(r.date, (map.get(r.date) || 0) + r.totalPrice);
      }
    });
    return Array.from(map.entries()).map(([date, revenue]) => ({ date, revenue })).sort((a,b) => a.date.localeCompare(b.date));
  }, [reservations]);

  // --- ACTIONS ---
  const handleSaveTour = (tour: Tour) => {
    if (currentTour) {
      updateTour(tour.id, tour);
    } else {
      addTour(tour);
    }
    setIsEditingTour(false);
    setCurrentTour(undefined);
  };

  const handlePOSSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tour = tours.find(t => t.id === posTourId);
    if (!tour) return;

    const total = (posAdults * tour.priceAdult) + (posChildren * tour.priceChild);
    const id = `POS-${Date.now().toString().slice(-6)}`;

    addReservation({
      id,
      tourId: tour.id,
      tourName: tour.title,
      date: posDate,
      time: posTime,
      adults: posAdults,
      children: posChildren,
      totalPrice: total,
      customerName: posName || 'Cliente Mostrador',
      customerPhone: 'N/A',
      status: ReservationStatus.CONFIRMED, // Direct sales are confirmed
      createdAt: new Date().toISOString()
    });

    alert('Venta registrada con éxito');
    setPosName(''); setPosAdults(1); setPosChildren(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-brand-dark text-white fixed h-full z-20 flex flex-col transition-all">
         <div className="p-6 font-display font-bold text-2xl text-brand-gold tracking-tighter hidden lg:block">
           SUGGAR<span className="text-white">ADMIN</span>
         </div>
         <div className="p-4 lg:hidden flex justify-center">
            <span className="text-brand-gold font-bold text-xl">SB</span>
         </div>
         
         <nav className="flex-1 mt-6 space-y-2 px-2">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-gold text-black font-bold' : 'text-gray-400 hover:bg-white/10'}`}>
               <LayoutGrid size={20} /> <span className="hidden lg:block">Dashboard</span>
            </button>
            <button onClick={() => setActiveTab('tours')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'tours' ? 'bg-brand-gold text-black font-bold' : 'text-gray-400 hover:bg-white/10'}`}>
               <ImageIcon size={20} /> <span className="hidden lg:block">Mis Tours</span>
            </button>
            <button onClick={() => setActiveTab('pos')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === 'pos' ? 'bg-brand-gold text-black font-bold' : 'text-gray-400 hover:bg-white/10'}`}>
               <ShoppingBag size={20} /> <span className="hidden lg:block">Punto de Venta</span>
            </button>
         </nav>

         <div className="p-4">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 text-gray-400 hover:text-white transition-colors p-2">
               <LogOut size={20} /> <span className="hidden lg:block">Cerrar Sesión</span>
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-4 lg:p-8 overflow-y-auto">
        
        {/* DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold font-serif text-gray-800">Resumen General</h1>
               <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Ingresos Totales" value={`$${totalRevenue.toLocaleString()}`} icon={DollarSign} colorClass="bg-green-100" textClass="text-green-600" />
                <StatCard title="Reservas Activas" value={totalBookings} icon={CheckCircle} colorClass="bg-blue-100" textClass="text-blue-600" />
                <StatCard title="Pendientes" value={reservations.filter(r => r.status === ReservationStatus.PENDING).length} icon={Clock} colorClass="bg-yellow-100" textClass="text-yellow-600" />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TrendingUp size={20} className="text-brand-gold" /> Tendencia de Ingresos
                  </h3>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="#C6A87C" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity List */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                   <h3 className="font-bold text-lg mb-4">Últimas Reservas</h3>
                   <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                      {reservations.slice(0, 5).map(r => (
                        <div key={r.id} className="flex justify-between items-center text-sm border-b pb-2">
                           <div>
                              <p className="font-bold text-gray-800">{r.customerName}</p>
                              <p className="text-xs text-gray-500">{r.tourName}</p>
                           </div>
                           <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${r.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                             {r.status}
                           </span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Full Table */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-4 border-b flex justify-between items-center">
                 <h3 className="font-bold">Todas las Reservas</h3>
                 <select className="text-sm border rounded p-1" onChange={(e) => setFilterStatus(e.target.value)}>
                    <option value="ALL">Todas</option>
                    <option value={ReservationStatus.PENDING}>Pendientes</option>
                    <option value={ReservationStatus.CONFIRMED}>Confirmadas</option>
                 </select>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                   <thead className="bg-gray-50 text-gray-500 uppercase">
                     <tr>
                       <th className="px-4 py-3">Cliente</th>
                       <th className="px-4 py-3">Tour</th>
                       <th className="px-4 py-3">Fecha</th>
                       <th className="px-4 py-3">Total</th>
                       <th className="px-4 py-3">Status</th>
                       <th className="px-4 py-3 text-right">Acción</th>
                     </tr>
                   </thead>
                   <tbody>
                      {filteredReservations.map(res => (
                        <tr key={res.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{res.customerName}</td>
                          <td className="px-4 py-3 text-gray-500">{res.tourName}</td>
                          <td className="px-4 py-3">{res.date} <span className="text-xs text-gray-400 block">{res.time}</span></td>
                          <td className="px-4 py-3 font-bold">${res.totalPrice.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${res.status === ReservationStatus.CONFIRMED ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>{res.status}</span>
                          </td>
                          <td className="px-4 py-3 text-right flex justify-end gap-2">
                             {res.status === ReservationStatus.PENDING && (
                               <>
                                 <button onClick={() => updateReservationStatus(res.id, ReservationStatus.CONFIRMED)} className="text-green-600 hover:bg-green-50 p-1 rounded"><CheckCircle size={16}/></button>
                                 <button onClick={() => updateReservationStatus(res.id, ReservationStatus.CANCELLED)} className="text-red-500 hover:bg-red-50 p-1 rounded"><XCircle size={16}/></button>
                               </>
                             )}
                          </td>
                        </tr>
                      ))}
                   </tbody>
                 </table>
               </div>
             </div>
          </div>
        )}

        {/* TOURS MANAGEMENT VIEW */}
        {activeTab === 'tours' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold font-serif text-gray-800">Inventario de Tours</h1>
               <Button onClick={() => { setCurrentTour(undefined); setIsEditingTour(true); }}><Plus size={18} className="mr-2"/> Nuevo Tour</Button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map(tour => (
                  <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col group">
                    <div className="relative h-48">
                      <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button onClick={() => { setCurrentTour(tour); setIsEditingTour(true); }} className="bg-white p-2 rounded-full shadow hover:bg-brand-gold"><Edit size={16}/></button>
                         <button onClick={() => { if(confirm('¿Eliminar tour?')) deleteTour(tour.id); }} className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white"><Trash2 size={16}/></button>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                       <h3 className="font-bold text-lg leading-tight mb-2">{tour.title}</h3>
                       <p className="text-xs text-gray-500 mb-4 line-clamp-2">{tour.shortDescription}</p>
                       <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                          <span className="font-bold text-xl">${tour.priceAdult}</span>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">{tour.category}</span>
                       </div>
                    </div>
                  </div>
                ))}
             </div>

             {isEditingTour && (
               <TourForm 
                 initialData={currentTour} 
                 onSave={handleSaveTour} 
                 onCancel={() => setIsEditingTour(false)} 
               />
             )}
          </div>
        )}

        {/* POS (POINT OF SALE) VIEW */}
        {activeTab === 'pos' && (
          <div className="max-w-4xl mx-auto animate-in fade-in">
             <h1 className="text-2xl font-bold font-serif text-gray-800 mb-6">Terminal de Venta Manual</h1>
             
             <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <form onSubmit={handlePOSSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-bold text-sm text-gray-700">Seleccionar Tour</label>
                        <select 
                          required
                          className="w-full border p-3 rounded-lg bg-gray-50 focus:ring-2 focus:ring-brand-gold outline-none"
                          value={posTourId}
                          onChange={e => {
                             setPosTourId(e.target.value);
                             // Auto select first time
                             const t = tours.find(x => x.id === e.target.value);
                             if (t && t.departureTimes.length > 0) setPosTime(t.departureTimes[0]);
                          }}
                        >
                          <option value="">-- Selecciona --</option>
                          {tours.map(t => <option key={t.id} value={t.id}>{t.title} (${t.priceAdult})</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="font-bold text-sm text-gray-700">Nombre del Cliente</label>
                        <input 
                          required
                          className="w-full border p-3 rounded-lg bg-gray-50"
                          placeholder="Ej: Cliente Mostrador"
                          value={posName}
                          onChange={e => setPosName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                         <label className="font-bold text-sm text-gray-700">Fecha</label>
                         <input type="date" required className="w-full border p-3 rounded-lg" value={posDate} onChange={e => setPosDate(e.target.value)} />
                      </div>

                      <div className="space-y-2">
                         <label className="font-bold text-sm text-gray-700">Horario</label>
                         <select className="w-full border p-3 rounded-lg" value={posTime} onChange={e => setPosTime(e.target.value)} required>
                           <option value="">-- Hora --</option>
                           {tours.find(t => t.id === posTourId)?.departureTimes.map(time => (
                             <option key={time} value={time}>{time}</option>
                           ))}
                         </select>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                          <label className="font-bold text-sm text-gray-700">Adultos</label>
                          <input type="number" min="1" className="w-full border p-3 rounded-lg" value={posAdults} onChange={e => setPosAdults(Number(e.target.value))} />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="font-bold text-sm text-gray-700">Niños</label>
                          <input type="number" min="0" className="w-full border p-3 rounded-lg" value={posChildren} onChange={e => setPosChildren(Number(e.target.value))} />
                        </div>
                      </div>
                   </div>

                   {/* Live Calculation */}
                   <div className="bg-brand-dark text-white p-6 rounded-xl flex justify-between items-center mt-6">
                      <div>
                        <p className="text-gray-400 text-sm uppercase tracking-wider">Total a Cobrar</p>
                        <div className="text-3xl font-display font-bold text-brand-gold">
                           ${(posTourId ? ((tours.find(t => t.id === posTourId)?.priceAdult || 0) * posAdults) + ((tours.find(t => t.id === posTourId)?.priceChild || 0) * posChildren) : 0).toLocaleString()}
                        </div>
                      </div>
                      <Button type="submit" size="lg" className="px-8">Confirmar Venta</Button>
                   </div>
                </form>
             </div>
          </div>
        )}

      </main>
    </div>
  );
};