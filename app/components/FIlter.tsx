"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";

export default function FIlter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="flex justify-end mb-8">
      <div className="border border-primary-800 flex">
        <Button
          filter="all"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          All Guests
        </Button>
        <Button
          filter="small"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          1&mdash;3 guests
        </Button>
        <Button
          filter="medium"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          4&mdash;7 guests
        </Button>
        <Button
          filter="large"
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          8&mdash;12 guests
        </Button>
      </div>
    </div>
  );
}

type ButtonProps = {
  filter: string;
  activeFilter: string;
  handleFilter: (filter: string) => void;
  children: ReactNode;
};
function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter && "bg-primary-700"}`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
