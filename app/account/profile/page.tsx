import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import SelectCountry from "@/app/components/SelectCountry";
import UpdateProfileForm from "@/app/components/UpdateProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth();
  if (!session) {
    // Handle the case when session is null
    return <div>Session not found. Please log in.</div>;
  }
  const guest = await getGuest(session.user.email!);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          defaultCountry={guest.nationality}
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          name="nationality"
          id="nationality"
        />
      </UpdateProfileForm>
    </div>
  );
}
