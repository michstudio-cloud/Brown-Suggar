import React from 'react';
import { 
  Utensils, Wine, Waves, Mountain, Music, Ship, Users, 
  Ticket, Armchair, Palmtree, Star, CheckCircle, Crown, Fish, 
  Sparkles, Footprints, Anchor
} from 'lucide-react';

export const getIconForFeature = (text: string, className: string = "w-4 h-4") => {
  const lower = text.toLowerCase();
  
  // Food & Drink
  if (lower.includes('desayuno') || lower.includes('comida') || lower.includes('buffet') || lower.includes('cena') || lower.includes('baguette') || lower.includes('alimentos')) 
    return <Utensils className={className} />;
  if (lower.includes('barra libre') || lower.includes('alcohol') || lower.includes('bebidas') || lower.includes('tragos') || lower.includes('nacional')) 
    return <Wine className={className} />;
    
  // Water Activities
  if (lower.includes('snorkel') || lower.includes('buceo') || lower.includes('vida marina') || lower.includes('peces')) 
    return <Fish className={className} />;
  if (lower.includes('kayak') || lower.includes('paddle') || lower.includes('nado') || lower.includes('acuatic')) 
    return <Waves className={className} />;
  if (lower.includes('catamarán') || lower.includes('barco') || lower.includes('yate') || lower.includes('navega') || lower.includes('marítima')) 
    return <Ship className={className} />;
  if (lower.includes('avistamiento') || lower.includes('ballenas')) 
    return <Anchor className={className} />;
    
  // Land/Nature
  if (lower.includes('cascada') || lower.includes('montaña') || lower.includes('selva')) 
    return <Mountain className={className} />;
  if (lower.includes('caminata') || lower.includes('senderismo') || lower.includes('explora')) 
    return <Footprints className={className} />;
  if (lower.includes('playa') || lower.includes('arena') || lower.includes('sol') || lower.includes('isla') || lower.includes('nopalera')) 
    return <Palmtree className={className} />;
    
  // Entertainment & Vibe
  if (lower.includes('show') || lower.includes('fiesta') || lower.includes('música') || lower.includes('entretenimiento') || lower.includes('dj') || lower.includes('rakata')) 
    return <Music className={className} />;
  if (lower.includes('vip') || lower.includes('exclusivo') || lower.includes('lujo')) 
    return <Crown className={className} />;
  if (lower.includes('show') || lower.includes('espectáculo'))
    return <Sparkles className={className} />;

  // Service
  if (lower.includes('guía') || lower.includes('biólogo') || lower.includes('staff') || lower.includes('tripulación') || lower.includes('host')) 
    return <Users className={className} />;
  if (lower.includes('entrada') || lower.includes('acceso') || lower.includes('ticket')) 
    return <Ticket className={className} />;
  if (lower.includes('mesa') || lower.includes('sala') || lower.includes('reservada')) 
    return <Armchair className={className} />;

  // Default
  return <CheckCircle className={className} />;
};