"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  resetRange: () => void;
};

export const ReservationContext = createContext<ReservationContextType>({
  range: { from: undefined, to: undefined },
  setRange: () => {},
  resetRange: () => {},
});

const initialState = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: ReactNode }) {
  const [range, setRange] = useState<DateRange | undefined>(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error("UseReservation must be used with ReservationContext");
  return context;
}

export { ReservationProvider, useReservation };
