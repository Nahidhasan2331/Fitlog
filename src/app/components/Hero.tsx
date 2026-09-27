import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="m-6 rounded-xl border border-[#34373D] bg-[#111318] md:m-6 lg:m-24">
      <div className="grid min-h-[380px] grid-cols-1 items-center px-8 py-12 md:px-12 md:grid-cols-2 lg:px-16">
        {/* Left */}
        <div>
          <p className="mb-6 text-[11px] font-bold uppercase tracking-wide text-[#CCFF00]">
            Workout Library
          </p>

          <h1 className="max-w-[580px] text-[48px] font-black uppercase leading-[0.95] text-white md:text-[54px]">
            Train With Intent. Log
            <br />
            Every Set.
          </h1>

          <p className="mt-5 max-w-[500px] text-[14px] leading-6 text-[#8D8E94]">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="mt-7 inline-flex items-center gap-3 rounded-[5px] bg-[#CCFF00] px-6 py-3 text-[12px] font-bold uppercase text-black"
          >
            Browse Workouts
          </Link>
        </div>

        {/* Right */}
        <div className="flex justify-center md:justify-end md:pr-4 lg:pr-16">
          <Image
            src="/banner.png"
            alt="Workout illustration"
            width={300}
            height={300}
            priority
            className="h-auto w-[220px] md:w-[240px] lg:w-[300px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
