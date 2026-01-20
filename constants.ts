import { Tour, TourCategory, Reservation, ReservationStatus } from './types';

export const TOURS: Tour[] = [
  {
    id: 'yelapa-majahuitas',
    title: 'Yelapa & Majahuitas',
    shortDescription: 'Explora lo mejor de Puerto Vallarta: Snorkel, Playa y Cascada.',
    description: 'Navega hacia el sur de la bahía para descubrir dos de los pueblos más pintorescos. Disfruta de snorkeling, kayak, paddleboard y una caminata a la cascada en Yelapa. Incluye show a bordo y barra libre.',
    priceAdult: 1100,
    priceChild: 600,
    duration: '7 horas',
    location: 'Terminal Marítima Portuaria API',
    category: TourCategory.NATURE,
    images: [
      'https://cdn.sanity.io/images/xhhnkk4g/production/e958716ceb396424a577a7824d795e53346dc3bb-2132x1200.webp',
      'https://visitapuertovallarta.com.mx/uploads/123/malecon-de-puerto-vallarta-movil.jpg'
    ],
    includes: ['Desayuno Continental', 'Comida Buffet', 'Barra Libre Nacional', 'Snorkel, Kayak & Paddleboard', 'Caminata a Cascada', 'Show a bordo'],
    departureTimes: ['09:00 AM', '10:00 AM']
  },
  {
    id: 'islas-marietas',
    title: 'Islas Marietas',
    shortDescription: 'Santuario de aves, Playa Nopalera y vida marina.',
    description: 'Explora las famosas islas volcánicas. Observa el pájaro bobo de patas azules y disfruta de aguas cristalinas ideales para kayak y paddle board. Incluye visita a Playa Nopalera.',
    priceAdult: 1400,
    priceChild: 700,
    duration: '6 horas',
    location: 'Terminal Marítima',
    category: TourCategory.ADVENTURE,
    images: [
      'https://cdn.sanity.io/images/xhhnkk4g/production/bf66daa2c33e22f2461e4dbcb82bef937d3e371d-2132x1200.webp',
      'https://visitapuertovallarta.com.mx/uploads/1812/Marina-Vallarta.png'
    ],
    includes: ['Desayuno Continental', 'Comida', 'Barra Libre', 'Snorkel, Kayak & Paddleboard', 'Playa Nopalera', 'Entretenimiento'],
    departureTimes: ['09:00 AM']
  },
  {
    id: 'arcos-animas',
    title: 'Arcos, Ánimas & Quimixto',
    shortDescription: 'Snorkel en Los Arcos, Cascada y Playa.',
    description: 'Una combinación perfecta de aventura submarina en el parque nacional Los Arcos, relax en playa Las Ánimas y exploración de cascada en Quimixto.',
    priceAdult: 1100,
    priceChild: 550,
    duration: '8 horas',
    location: 'Muelle de los Muertos / Terminal',
    category: TourCategory.RELAX,
    images: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/7b/f4/78/vistas-espectaculares.jpg',
      'https://visitapuertovallarta.com.mx/uploads/1814/Zona-Romantica.jpg'
    ],
    includes: ['Desayuno / Comida', 'Barra Libre', 'Equipo de Snorkel', 'Kayak', 'Cascada Quimixto', '2:30hrs en la playa'],
    departureTimes: ['10:00 AM']
  },
  {
    id: 'whales',
    title: 'Avistamiento de Ballenas',
    shortDescription: 'Encuentro majestuoso en Catamarán (Dic 8 - Mar 15).',
    description: 'Sé testigo de la migración de las ballenas jorobadas. Una experiencia educativa y emocionante guiada por biólogos marinos. Temporada oficial: 8 de Diciembre al 15 de Marzo.',
    priceAdult: 1300,
    priceChild: 650,
    duration: '3-4 horas',
    location: 'Puerto Mágico',
    category: TourCategory.NATURE,
    images: [
      'https://cdn.sanity.io/images/xhhnkk4g/production/2c8db2f71066ceeef9c0e9a7d7302d55e0ea2b0f-1080x1630.webp',
      'https://cdn.sanity.io/images/xhhnkk4g/production/90178198b7183cd47c6da068bc47d444abfefad2-2132x1200.webp'
    ],
    includes: ['Catamarán', 'Desayuno o Comida (Baguette)', 'Barra libre (con/sin alcohol)', 'Guía / Biólogo'],
    departureTimes: ['09:00 AM', '01:00 PM']
  },
  {
    id: 'nightlife-vip',
    title: 'Barra Libre Nightlife',
    shortDescription: 'Rakata, La Vaquita, La Santa, Mandala, After Sunset.',
    description: 'La mejor fiesta de Puerto Vallarta. Acceso a los mejores clubes según el día: Lunes/Mier/Vier (Rakata), Mar/Dom (La Vaquita), Viernes (La Santa), Jue/Sab (Mandala).',
    priceAdult: 1800,
    priceChild: 0,
    duration: '5 horas',
    location: 'Zona Romántica / Malecón',
    category: TourCategory.PARTY,
    images: [
      'https://visitapuertovallarta.com.mx/uploads/254/clubes-nocturnos-en-puerto-vallarta-movil.jpg',
      'https://visitapuertovallarta.com.mx/uploads/1814/Zona-Romantica.jpg'
    ],
    includes: ['Entradas VIP', 'Barra libre', 'Mesas reservadas', 'Host personal'],
    departureTimes: ['10:00 PM']
  }
];

export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-001',
    tourId: 'yelapa-majahuitas',
    tourName: 'Yelapa & Majahuitas',
    date: '2023-10-25',
    time: '09:00 AM',
    adults: 2,
    children: 1,
    totalPrice: 2800,
    customerName: 'Juan Pérez',
    customerPhone: '555-123-4567',
    status: ReservationStatus.CONFIRMED,
    createdAt: '2023-10-20T10:00:00Z'
  }
];