import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-[#292D35] bg-[#000000]">
      <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-start px-8 md:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="FitLog Logo"
              width={28}
              height={28}
              priority
              className="object-contain"
            />

            <span className="text-[16px] font-black tracking-[1px] text-white">
              FITLOG
            </span>
          </Link>
        </div>

        <div className="flex flex-col gap-3 md:items-end px-8 md:px-10 lg:px-20">
          <p className="text-[10px] text-[#5F636B]">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
