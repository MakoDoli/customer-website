"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { CabinType } from "./CabinList";

function isAlreadyBooked(
  range: { from: Date; to: Date },
  datesArr: (string | number | Date)[]
) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date: string | number | Date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

type Props = {
  cabin: CabinType;
  settings: {
    maxBookingLength: number;
    minBookingLength: number;
  };
  bookedDates: (string | number | Date)[];
};

function DateSelector({ settings, cabin, bookedDates }: Props) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();

  const { regularPrice, discount } = cabin;

  const isBooked =
    range?.from && range?.to
      ? isAlreadyBooked({ from: range.from, to: range.to }, bookedDates)
      : false;

  const displayRange = !isBooked ? range : undefined;

  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = numNights * (regularPrice - discount);

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col col-span-3 justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        classNames={{
          today: `border border-accent-700`,
        }}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        onSelect={setRange}
        selected={displayRange}
        startMonth={new Date()}
        endMonth={new Date(2030, 5)}
        captionLayout="dropdown"
        numberOfMonths={2}
        // disabled={{ before: new Date() }}
        disabled={(currentDate) =>
          isPast(currentDate) ||
          bookedDates.some((date) => isSameDay(date, currentDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
