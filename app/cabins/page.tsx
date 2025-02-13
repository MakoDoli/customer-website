import { Metadata } from "next";
import React, { Suspense } from "react";

import CabinList from "../components/CabinList";
import Spinner from "../components/Spinner";
import FIlter from "../components/FIlter";

export const metadata: Metadata = {
  title: "Cabins",
};
//  FOR CACHED ROUTE (NOT DATA)
// revalidate on every fetch
//export const revalidate = 0;
//  NO POINT OF REVALIDATE BECAUSE PAGE IS DYNAMIC BECAUSE OF SEARCHPARAMS

//revalidate every hour
//export const revalidate = 3600;

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const filter = searchParams.capacity ?? "all";
  console.log(filter);

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

      <FIlter />

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
