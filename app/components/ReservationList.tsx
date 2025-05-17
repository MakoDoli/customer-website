"use client";

import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

export type BookingsType<BookingT> = BookingT[] | [];

// type BookingType<T = Record<string, unknown>> = {
//   id: number;
// } & T;

type Booking = {
  id: string;
  startDate: string | Date;
  endDate: string | Date;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  created_at: string | Date;
  cabins: {
    name: string;
    image: string;
  };
};
export default function ReservationList({
  bookings,
}: {
  bookings: BookingsType<Booking>;
}) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentBookings, bookingId) => {
      return currentBookings.filter((booking) => booking.id !== bookingId);
    }
  );

  async function handleDelete(bookingId: string) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: Booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
