import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Reservation, ReservationStatus, Tour } from '../types';
import { MOCK_RESERVATIONS, TOURS as INITIAL_TOURS } from '../constants';

interface BookingContextType {
  // Tour Management
  tours: Tour[];
  addTour: (tour: Tour) => void;
  updateTour: (id: string, updatedTour: Partial<Tour>) => void;
  deleteTour: (id: string) => void;
  
  // Reservation Management
  reservations: Reservation[];
  addReservation: (reservation: Reservation) => void;
  updateReservationStatus: (id: string, status: ReservationStatus) => void;
  
  // Auth
  isAdmin: boolean;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children?: ReactNode }) => {
  // Initialize State from LocalStorage or Fallback to Constants
  const [tours, setTours] = useState<Tour[]>(() => {
    const saved = localStorage.getItem('sb_tours');
    return saved ? JSON.parse(saved) : INITIAL_TOURS;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('sb_reservations');
    return saved ? JSON.parse(saved) : MOCK_RESERVATIONS;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('sb_admin_session') === 'true';
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('sb_tours', JSON.stringify(tours));
  }, [tours]);

  useEffect(() => {
    localStorage.setItem('sb_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('sb_admin_session', String(isAdmin));
  }, [isAdmin]);

  // --- Tour Actions ---
  const addTour = (tour: Tour) => {
    setTours(prev => [...prev, tour]);
  };

  const updateTour = (id: string, updatedTour: Partial<Tour>) => {
    setTours(prev => prev.map(t => t.id === id ? { ...t, ...updatedTour } : t));
  };

  const deleteTour = (id: string) => {
    setTours(prev => prev.filter(t => t.id !== id));
  };

  // --- Reservation Actions ---
  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [reservation, ...prev]);
  };

  const updateReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
  };

  // --- Auth Actions ---
  const loginAdmin = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ password })
      });
      
      if (response.ok) {
        setIsAdmin(true);
        return true;
      }
    } catch (error) {
      console.warn("API Auth failed, falling back to local check (only for dev)");
    }

    // @ts-ignore
    if (import.meta.env.DEV) {
       // @ts-ignore
       const localPass = import.meta.env.VITE_ADMIN_PASSWORD;
       if (localPass && password === localPass) {
         setIsAdmin(true);
         return true;
       }
    }

    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  return (
    <BookingContext.Provider value={{ 
      tours,
      addTour,
      updateTour,
      deleteTour,
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