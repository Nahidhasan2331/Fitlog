import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[13px] font-bold uppercase tracking-[3px] text-[#CCFF00]">
          Error 404
        </p>

        <h1 className="mt-4 text-[52px] font-bold uppercase leading-none text-white sm:text-[64px]">
          Workout Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-[430px] text-[14px] leading-6 text-[#858991]">
          The workout you&apos;re looking for doesn&apos;t exist or may have
          been removed.
        </p>

        <Link
          href="/#library"
          className="mt-7 inline-flex rounded-full bg-[#CCFF00] px-7 py-3 text-[12px] font-semibold uppercase text-black transition hover:bg-[#B8E600]"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}
