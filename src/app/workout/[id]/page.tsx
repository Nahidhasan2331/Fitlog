import Image from "next/image";
import { notFound } from "next/navigation";

import { Workout } from "@/types/workout";
import WorkoutActions from "@/app/components/WorkoutActions";

interface WorkoutDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

// Fetch single workout
async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${id}`,
    );

    if (!response.ok) {
      return null;
    }

    const data: Workout = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch workout:", error);
    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="mx-4 py-10 sm:mx-6 lg:mx-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* LEFT SIDE - WORKOUT IMAGE */}
        <div className="relative min-h-[420px] overflow-hidden rounded-xl sm:min-h-[520px] lg:min-h-[680px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* RIGHT SIDE - WORKOUT DETAILS */}
        <div className="w-full">
          {/* Workout Name */}
          <h1 className="text-[38px] font-bold uppercase leading-none text-white md:text-[42px]">
            {workout.name}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[600px] text-[16px] font-light leading-[1.55] text-[#9A9DA5]">
            {workout.description}
          </p>

          {/* Muscle Groups */}
          <div className="mt-5 flex flex-wrap gap-3">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="rounded-full bg-[#CCFF00] px-4 py-1 text-[12px] font-medium text-black"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Information */}
          <div className="mt-7 overflow-hidden rounded-[14px] border border-[#292D35] bg-[#151820]">
            <DetailRow label="Equipment" value={workout.equipment} />

            <DetailRow label="Difficulty" value={workout.difficulty} />

            <DetailRow label="Sets" value={workout.sets} />

            <DetailRow label="Reps" value={workout.reps} />

            <DetailRow label="Duration" value={`${workout.duration} min`} />

            <DetailRow
              label="Calories"
              value={`${workout.caloriesBurned} kcal`}
            />

            <DetailRow label="Rating" value={workout.rating} last />
          </div>

          {/* Instructions */}
          <div className="mt-8">
            <h2 className="text-[18px] font-bold uppercase text-white">
              Instructions
            </h2>

            <ol className="mt-5 space-y-4">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-[15px] font-light leading-6 text-[#B0B2B8]"
                >
                  <span className="w-4 shrink-0 text-[#92959C]">
                    {index + 1}.
                  </span>

                  <span>{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Add to Plan / Save Buttons */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </main>
  );
}

// Detail table row
function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string | number;
  last?: boolean;
}) {
  return (
    <div
      className={`flex min-h-[50px] items-center justify-between px-6 py-3 ${
        !last ? "border-b border-[#252932]" : ""
      }`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#9296A1]">
        {label}
      </span>

      <span className="text-[14px] font-light text-[#E3E4E7]">{value}</span>
    </div>
  );
}
