"use client";
import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservationAction } from "../_lib/actions";

function DeleteReservation({ bookingId }: { bookingId: string }) {
  // We can define server actions right in the component and use them both in the client and server components. For it to wor we need to use the "use server" directive

  // function deleteReservation(id){
  //   "use server"
  //   removeReservation(id)
  // }
  return (
    <button
      onClick={() => deleteReservationAction(bookingId)}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">Delete</span>
    </button>
  );
}

export default DeleteReservation;
