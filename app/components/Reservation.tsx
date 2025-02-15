import DateSelector from "@/app/components/DateSelector";
import ReservationForm from "@/app/components/ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { CabinInfoType } from "../cabins/[cabinId]/page";

type ParamsType = {
  cabin: CabinInfoType;
};

export default async function Reservation({ cabin }: ParamsType) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-5 border border-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
