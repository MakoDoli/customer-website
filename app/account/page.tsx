import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Guest area",
};

export default function Page() {
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, guest
    </h2>
  );
}
