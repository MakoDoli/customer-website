import React from "react";

import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
//import { unstable_noStore } from "next/cache";
export type CabinsType<CabinT> = CabinT[];

export type CabinType<T = Record<string, unknown>> = {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
} & T;

export default async function CabinList() {
  // FOR CACHED DATA (NOT ROUTE)
  //unstable_noStore();

  const cabins: CabinsType<CabinType> = await getCabins();

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin: CabinType) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
