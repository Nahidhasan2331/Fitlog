export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#2B2F36] border-t-[#CCFF00]" />

        <p className="text-[12px] font-medium uppercase tracking-[2px] text-[#8D9199]">
          Loading workouts...
        </p>
      </div>
    </main>
  );
}
