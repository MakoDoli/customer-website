import ReservationCard from "@/app/components/ReservationCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};
type BookingsType<BookingT> = BookingT[] | [];

type BookingType<T = Record<string, unknown>> = {
  id: number;
} & T;
export default function Page() {
  // CHANGE
  const bookings: BookingsType<BookingType> = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <ReservationCard booking={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
