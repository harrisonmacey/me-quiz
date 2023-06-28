import Link from "next/link";
import Timer from "./Timer";

export default function QuizNav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <Link href="/" className="flex items-center">
          <span className="self-center text-base font-semibold whitespace-nowrap dark:text-white">
            Back to Home
          </span>
        </Link>
        <Timer></Timer>
      </div>
    </nav>
  );
}
