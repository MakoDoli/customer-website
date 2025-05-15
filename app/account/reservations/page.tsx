import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import ReservationList from "@/app/components/ReservationList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservations",
};
export type BookingsType<BookingT> = BookingT[] | [];

type BookingType<T = Record<string, unknown>> = {
  id: number;
} & T;
export default async function Page() {
  // CHANGE
  const session = await auth();
  const bookings: BookingsType<BookingType> = await getBookings(
    session?.user.guestId
  );

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
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
