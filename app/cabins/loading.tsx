import Spinner from "@/app/components/Spinner";

export default function Loading() {
  return (
    <div className="grid justify-center">
      <Spinner />
      <p className="text-primary-200 text-lg "> Loading cabins data...</p>
    </div>
  );
}
