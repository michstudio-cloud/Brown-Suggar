import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, ArrowUpRight, Wine, Users } from 'lucide-react';
import { useBooking } from '../contexts/BookingContext';
import { Button } from '../components/ui/Button';
import { getIconForFeature } from '../utils/icons';

export const Home: React.FC = () => {
  const { tours } = useBooking(); // Use tours from context
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTours = tours.filter(tour => 
    tour.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tour.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/60 z-10"></div>
        
        <img 
          src="https://cdn.sanity.io/images/xhhnkk4g/production/624f4ae3feeaf14ed45d083062a8a1af4c475727-2132x1200.webp" 
          alt="Puerto Vallarta Marina" 
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse-slow" 
          style={{animationDuration: '20s'}}
        />
        
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <div className="mb-4 inline-flex items-center gap-2 border border-brand-gold/50 rounded-full px-4 py-1 bg-black/50 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase">Brown Sugar Tours PV</span>
          </div>

          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white uppercase leading-[0.9] tracking-tighter mb-4">
            Descubre <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-gold to-brand-goldDim">Puerto Vallarta</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-xl font-light tracking-wide mb-8">
            Experiencias exclusivas. Servicio VIP. Los mejores destinos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
             <Button variant="primary" size="lg" fullWidth onClick={() => document.getElementById('tours')?.scrollIntoView({behavior: 'smooth'})}>
                Explorar Tours
             </Button>
          </div>
        </div>

        {/* Floating Search */}
        <div className="absolute bottom-10 left-0 w-full z-30 px-4">
          <div className="max-w-4xl mx-auto bg-brand-charcoal/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl shadow-black/50">
            <Search className="text-brand-gold ml-2" />
            <input 
              type="text" 
              placeholder="Busca tu experiencia (Yelapa, Ballenas, Fiesta...)"
              className="bg-transparent border-none text-white w-full focus:outline-none placeholder-gray-500 text-lg font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Featured Tours - Flyer Style */}
      <section className="py-24 container mx-auto px-4" id="tours">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-brand-gold font-bold tracking-widest text-sm uppercase mb-2 block">Nuestra Colección</span>
            <h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-none">
              Elige tu <br/> <span className="text-outline">Destino</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-right hidden md:block">
            Seleccionamos cuidadosamente cada experiencia para garantizar calidad, seguridad y diversión al estilo Brown Sugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="group relative bg-brand-charcoal rounded-3xl overflow-hidden border border-white/5 hover:border-brand-gold/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,193,7,0.1)] flex flex-col h-full">
              
              {/* Image Section (Top 60%) */}
              <div className="relative h-[400px] overflow-hidden">
                <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                   <span className="text-brand-gold text-xs font-bold uppercase tracking-wider">{tour.category}</span>
                </div>
                
                <img 
                  src={tour.images[0]} 
                  alt={tour.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Overlay gradient at bottom of image to blend with card body */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-charcoal to-transparent"></div>
              </div>

              {/* Card Body (Bottom) */}
              <div className="p-6 relative -mt-12 flex flex-col flex-1">
                <h3 className="font-display text-4xl text-white uppercase leading-[0.9] mb-3 group-hover:text-brand-gold transition-colors">
                  {tour.title.split(' ')[0]} <br/>
                  <span className="text-2xl text-gray-300 group-hover:text-white transition-colors">
                    {tour.title.split(' ').slice(1).join(' ')}
                  </span>
                </h3>

                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} className="text-brand-gold" />
                    <span className="font-medium">{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin size={16} className="text-brand-gold" />
                    <span className="font-medium truncate">{tour.location.split(' ')[0]}...</span>
                  </div>
                </div>

                {/* Icons Grid based on Flyer */}
                <div className="grid grid-cols-2 gap-y-2 gap-x-1 mb-6">
                  {tour.includes.slice(0, 4).map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      {getIconForFeature(inc, "w-3.5 h-3.5 text-brand-gold shrink-0")}
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-gray-500 text-xs uppercase tracking-wider">Por persona</span>
                     <span className="text-3xl font-display text-brand-gold">${tour.priceAdult.toLocaleString()}</span>
                   </div>
                   <Link to={`/tours/${tour.id}`}>
                     <button className="bg-white text-black rounded-full p-3 hover:bg-brand-gold transition-colors">
                       <ArrowUpRight size={24} />
                     </button>
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "Why Us" Section */}
      <section className="py-20 bg-brand-charcoal relative overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-brand-gold/30 rounded-2xl rotate-3"></div>
                <img src="https://visitapuertovallarta.com.mx/uploads/254/clubes-nocturnos-en-puerto-vallarta-movil.jpg" alt="Party" className="rounded-2xl shadow-2xl relative z-10 grayscale-[50%] contrast-125 w-full object-cover h-[500px]" />
                <div className="absolute -bottom-6 -right-6 bg-brand-gold text-black p-6 rounded-xl font-bold font-display text-2xl z-20 shadow-lg rotate-[-5deg]">
                  VIBRA <br/> VIP
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-5xl md:text-6xl text-white mb-6 uppercase">
                Experiencias <span className="text-brand-gold">Inolvidables</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                No vendemos solo tours, creamos momentos. Desde la fiesta más exclusiva en la bahía hasta la tranquilidad de una playa escondida.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-lg text-brand-gold border border-white/10">
                    <Wine size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl uppercase mb-1">Barra Libre Premium</h3>
                    <p className="text-gray-500 text-sm">Bebidas nacionales e importadas incluidas en la mayoría de nuestros tours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white/5 p-3 rounded-lg text-brand-gold border border-white/10">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl uppercase mb-1">Guías Expertos</h3>
                    <p className="text-gray-500 text-sm">Staff bilingüe enfocado 100% en tu diversión y seguridad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};