"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const nationalityValue = formData.get("nationality") as string;

  const [nationality, countryFlag] = nationalityValue.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID as string))
    throw new Error("Please enter valid national ID");

  const updatedData = { nationalID, nationality, countryFlag };
  const { data, error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
  return data;
}

export async function updateBooking(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(formData.get("bookingId"));

  const bookings = await getBookings(session.user.guestId);

  const bookingIds = bookings.map((booking) => booking.id);
  if (!bookingIds.includes(String(bookingId)))
    throw new Error("You can not update this reservation");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("Observations")?.slice(0, 1000),
  };

  //const {data, error}= await supabase
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

type BookingData = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};

export async function createBooking(
  bookingData: BookingData,
  formData: FormData
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged ind");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numNights: Number(formData.get("numNights")),
    observations: formData.get("observations")?.slice(0, 500),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/thankyou");

  return data; // returning not necessary
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function deleteReservationAction(bookingId: string) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  // protect against deleting other users' bookings

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You can not delete this reservation");

  // deleting from db

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
  // actually we don't need data neither in (data, error} = await supabase nor in return
}
