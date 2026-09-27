"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

const Navbar = () => {
  const pathname = usePathname();

  const { plan, saved } = useFitLog();

  const planCount = plan.length;
  const savedCount = saved.length;

  return (
    <header className="w-full border-b border-[#34373D] bg-[#000000]">
      <nav className="flex h-[80px] w-full items-center justify-between px-4 sm:px-6 md:px-10 lg:px-24">
        <div className="flex shrink-0 items-center justify-start">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              priority
              className="h-[24px] w-[24px] object-contain sm:h-[28px] sm:w-[28px]"
            />

            <span className="text-[15px] font-black tracking-[1px] text-white sm:text-[16px]">
              FITLOG
            </span>
          </Link>
        </div>

        <div className="hidden items-center justify-center gap-3 md:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
              pathname === "/"
                ? "bg-[#1B290D] text-[#CCFF00]"
                : "text-[#8D8E94] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
              pathname === "/my-plan"
                ? "bg-[#1B290D] text-[#CCFF00]"
                : "text-[#8D8E94] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-3 sm:gap-5 lg:gap-7">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-white sm:gap-2 sm:text-[14px]"
          >
            <span>Plan</span>

            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#CCFF00] px-1 text-[10px] font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-[#8D8E94] sm:gap-2 sm:text-[14px]"
          >
            <span>Saved</span>

            <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full border border-[#45484F] px-1 text-[10px] text-[#A4A5AA]">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
