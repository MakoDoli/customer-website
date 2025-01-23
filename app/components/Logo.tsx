import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-4 items-center z-10">
      {/* <Image src="/logo.png" alt="logo" width={64} height={64} /> */}
      {/*when image is imported, can use other attributes */}
      <Image src={logo} alt="logo" width={64} height={64} quality={50} />
      <span className="text-xl font-semibold text-primary-100">
        The Luxury Cabins
      </span>
    </Link>
  );
}
