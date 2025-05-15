"use client";

import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../_lib/actions";

export type BookingsType<BookingT> = BookingT[] | [];

type BookingType<T = Record<string, unknown>> = {
  id: number;
} & T;
export default function ReservationList({
  bookings,
}: {
  bookings: BookingsType<BookingType>;
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
      {optimisticBookings.map((booking: BookingType) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}
