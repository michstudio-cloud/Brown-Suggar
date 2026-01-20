import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Users, CheckCircle, Calendar, MessageCircle, AlertCircle, Info } from 'lucide-react';
import { TOURS } from '../constants';
import { Button } from '../components/ui/Button';
import { useBooking } from '../contexts/BookingContext';
import { ReservationStatus } from '../types';

export const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addReservation } = useBooking();
  const tour = TOURS.find(t => t.id === id);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tour) return <div>Tour no encontrado</div>;

  const totalPrice = (adults * tour.priceAdult) + (children * tour.priceChild);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const reservationId = `RES-${Date.now().toString().slice(-6)}`;
    
    addReservation({
      id: reservationId,
      tourId: tour.id,
      tourName: tour.title,
      date,
      time,
      adults,
      children,
      totalPrice,
      customerName: name,
      customerPhone: phone,
      comments,
      status: ReservationStatus.PENDING,
      createdAt: new Date().toISOString()
    });

    const message = `*NUEVA RESERVA SUGGAR BROWN* 🧢\n\n🆔 ID: ${reservationId}\n🌴 Tour: *${tour.title}*\n📅 Fecha: ${date}\n⏰ Hora: ${time}\n👥 Pax: ${adults} Ad, ${children} Niños\n💰 Total: $${totalPrice.toLocaleString('es-MX')}\n\n👤 Cliente: ${name}\n📱 Nota: ${comments || 'Sin comentarios'}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-dark pb-20">
      {/* Immersive Header */}
      <div className="relative h-[60vh] lg:h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark/20 to-brand-dark z-10"></div>
        <img 
          src={tour.images[currentImage]} 
          alt={tour.title} 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-24 left-6 z-20">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white hover:text-brand-gold transition-colors font-bold uppercase tracking-wider text-sm bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft size={16} /> Regresar
          </button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12">
           <div className="container mx-auto">
             <div className="bg-brand-gold text-black inline-block px-3 py-1 font-bold uppercase text-xs tracking-widest mb-4">
               {tour.category}
             </div>
             <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-4 max-w-4xl">
               {tour.title}
             </h1>
             <div className="flex flex-wrap gap-6 text-gray-300 text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="text-brand-gold" size={20} /> {tour.duration}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-brand-gold" size={20} /> {tour.location}
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Details Column */}
        <div className="lg:col-span-2 space-y-12">
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-gray-300 leading-relaxed font-light">{tour.description}</p>
          </div>

          <div>
            <h3 className="font-display text-3xl text-white uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-gold block"></span>
              Lo que incluye
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tour.includes.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-brand-charcoal p-4 rounded-xl border border-white/5 hover:border-brand-gold/30 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors">
                    <CheckCircle size={20} />
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-charcoal border border-brand-gold/20 p-6 rounded-2xl flex gap-4 items-start">
             <Info className="text-brand-gold shrink-0 mt-1" />
             <div>
               <h4 className="text-white font-bold uppercase mb-1">Información Importante</h4>
               <p className="text-gray-400 text-sm">
                 Llegar 30 minutos antes de la hora de salida para el registro.
                 {tour.title.includes('Ballenas') && ' Garantía de avistamiento: si no vemos ballenas, te reagendamos gratis.'}
               </p>
             </div>
          </div>
          
          {/* Gallery Thumbs */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {tour.images.map((img, idx) => (
              <button key={idx} onClick={() => setCurrentImage(idx)} className={`min-w-[150px] h-[100px] rounded-lg overflow-hidden border-2 ${currentImage === idx ? 'border-brand-gold' : 'border-transparent opacity-50 hover:opacity-100'} transition-all`}>
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-brand-charcoal border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-end justify-between mb-8 pb-8 border-b border-white/10">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Precio Online</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display text-white">${tour.priceAdult.toLocaleString()}</span>
                  <span className="text-brand-gold font-bold">MXN</span>
                </div>
              </div>
              {tour.priceChild > 0 && (
                <div className="text-right">
                  <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Menores</p>
                  <p className="text-xl font-display text-gray-300">${tour.priceChild.toLocaleString()}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                 <div className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                    <Calendar className="text-brand-gold" size={20} />
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-transparent text-white w-full outline-none text-sm font-medium"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-2">
                    {tour.departureTimes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${time === t ? 'bg-brand-gold text-black border-brand-gold' : 'bg-black/40 text-gray-400 border-white/10 hover:border-brand-gold'}`}
                      >
                        {t}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
                  <span className="text-gray-300 text-sm">Adultos</span>
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">-</button>
                    <span className="text-white font-bold w-4 text-center">{adults}</span>
                    <button type="button" onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">+</button>
                  </div>
                </div>
                {tour.priceChild > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 text-sm">Niños (2-11)</span>
                    <div className="flex items-center gap-4">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">-</button>
                      <span className="text-white font-bold w-4 text-center">{children}</span>
                      <button type="button" onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center">+</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Tu Nombre Completo" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-gold outline-none transition-colors"
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp de Contacto" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-brand-gold outline-none transition-colors"
                />
              </div>

              <div className="pt-4 flex justify-between items-center font-display text-2xl text-white">
                <span>Total</span>
                <span>${totalPrice.toLocaleString()} <small className="text-sm text-gray-500 font-sans">MXN</small></span>
              </div>

              <Button 
                type="submit" 
                fullWidth 
                size="lg" 
                disabled={isSubmitting || !time}
                className="w-full"
              >
                {isSubmitting ? 'Procesando...' : 'Solicitar Reserva'}
              </Button>
              <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
                Sin cargo inmediato. Confirmación vía WhatsApp.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};