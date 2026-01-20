import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reservation, ReservationStatus } from '../types';
import { MOCK_RESERVATIONS } from '../constants';

interface BookingContextType {
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children?: ReactNode }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Load mock data on init
    setReservations(MOCK_RESERVATIONS);
  }, []);

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [reservation, ...prev]);
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
  };

  const loginAdmin = (password: string) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  return (
    <BookingContext.Provider value={{ 
      reservations, 
      addReservation, 
      updateReservationStatus, 
      isAdmin, 
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};