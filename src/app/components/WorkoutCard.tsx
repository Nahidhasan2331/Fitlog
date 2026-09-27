import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group overflow-hidden rounded-lg border border-[#24272D] bg-[#111318] transition hover:border-[#3A3E45]"
    >
      <div className="relative h-[190px] w-full overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#CCFF00] px-2 py-1 text-[9px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-[16px] font-black uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-1 text-[11px] text-[#777A80]">{workout.equipment}</p>

        <div className="my-4 h-px bg-[#24272D]" />

        <div className="flex items-center gap-5 text-[10px] text-[#8D8E94]">
          <span>◷ {workout.duration} min</span>

          <span>◆ {workout.caloriesBurned} kcal</span>

          <span>☆ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
