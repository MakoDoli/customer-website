"use client";
import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const status = useFormStatus();
  return (
    <button
      className="bg-accent-500 flex justify-center items-center w-48 text-primary-800 h-14 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={status.pending}
    >
      {status.pending ? <SpinnerMini /> : children}
    </button>
  );
}
