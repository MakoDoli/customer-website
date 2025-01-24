import { Metadata } from "next";
import React from "react";
import CabinCard from "../components/CabinCard";
export const metadata: Metadata = {
  title: "Cabins",
};

type CabinsType<CabinT> = CabinT[];

type CabinType<T = Record<string, unknown>> = {
  id: number;
  name: string;
} & T;

export default function Page() {
  // CHANGE
  const cabins: CabinsType<CabinType> = [
    { id: 1, name: "Cabin 1" },
    { id: 2, name: "Cabin 2", regularPrice: 200 },
  ];

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}
