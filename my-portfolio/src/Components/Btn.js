import Link from "next/link";

export default function Btn() {
  return (
    <ul className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6 px-4">
      <Link
        href="/references/colleagues"
        className="w-full sm:w-auto border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded text-center"
      >
        Work Colleague
      </Link>
      <Link
        href="/references/coursemates"
        className="w-full sm:w-auto border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded text-center"
      >
        Coursemate
      </Link>
      <Link
        href="/references/fandf"
        className="w-full sm:w-auto border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded text-center"
      >
        Family & Friend
      </Link>
      <Link
        href="/references/business"
        className="w-full sm:w-auto border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded text-center"
      >
        Business/Other
      </Link>
    </ul>
  );
}
