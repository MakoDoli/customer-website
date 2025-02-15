import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/app/components/Cabin";
import { CabinType } from "@/app/components/CabinList";
import Reservation from "@/app/components/Reservation";
import Spinner from "@/app/components/Spinner";

import { Suspense } from "react";

type ParamsType = {
  params: { cabinId: string };
};
export type CabinInfoType = CabinType & { description: string };

export async function generateMetadata({ params }: ParamsType) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins: CabinType[] = await getCabins();
  const ids = cabins.map((cabin) => {
    return { cabinId: String(cabin.id) };
  });
  return ids;
}

export default async function Page({ params }: ParamsType) {
  const cabin: CabinInfoType = await getCabin(params.cabinId);

  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <Cabin
          name={name}
          maxCapacity={maxCapacity}
          image={image}
          description={description}
        />
      </div>

      <div>
        <h2 className="text-5xl mb-10 text-accent-400 font-semibold text-center">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
