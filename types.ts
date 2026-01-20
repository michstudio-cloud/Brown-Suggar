export enum TourCategory {
  NATURE = 'Naturaleza',
  PARTY = 'Fiesta',
  RELAX = 'Relax',
  ADVENTURE = 'Aventura'
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  priceAdult: number;
  priceChild: number;
  duration: string;
  location: string;
  images: string[];
  category: TourCategory;
  includes: string[];
  departureTimes: string[];
}

export enum ReservationStatus {
  PENDING = 'Pendiente',
  CONFIRMED = 'Confirmado',
  CANCELLED = 'Cancelado',
  COMPLETED = 'Finalizado'
}

export interface Reservation {
  id: string;
  tourId: string;
  tourName: string;
  date: string; // ISO string YYYY-MM-DD
  time: string;
  adults: number;
  children: number;
  totalPrice: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  comments?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface DateStat {
  date: string;
  revenue: number;
  bookings: number;
}