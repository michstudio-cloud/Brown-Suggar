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
      'https://picsum.photos/seed/yelapa1/800/1000',
      'https://picsum.photos/seed/yelapa2/800/600'
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
      'https://picsum.photos/seed/marietas1/800/1000',
      'https://picsum.photos/seed/marietas2/800/600'
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
      'https://picsum.photos/seed/animas1/800/1000',
      'https://picsum.photos/seed/animas2/800/600'
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
      'https://picsum.photos/seed/whale1/800/1000',
      'https://picsum.photos/seed/whale2/800/600'
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
      'https://picsum.photos/seed/party1/800/1000',
      'https://picsum.photos/seed/party2/800/600'
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