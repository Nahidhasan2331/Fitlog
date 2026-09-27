"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock3, Flame, Star, X } from "lucide-react";

import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

interface PlanWorkoutCardProps {
  workout: Workout;
  type: "plan" | "saved";
}

const PlanWorkoutCard = ({ workout, type }: PlanWorkoutCardProps) => {
  const { removeFromPlan, removeFromSaved } = useFitLog();

  const handleRemove = () => {
    if (type === "plan") {
      removeFromPlan(workout.id);
    } else {
      removeFromSaved(workout.id);
    }
  };

  const handleMarkDone = () => {
    removeFromPlan(workout.id);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#252932] bg-[#151820] p-3 sm:flex-row sm:items-center sm:justify-between">
      {/* LEFT SIDE */}
      <div className="flex min-w-0 items-center gap-4">
        {/* Image */}
        <div className="relative h-[70px] w-[105px] shrink-0 overflow-hidden rounded-lg">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Workout Information */}
        <div className="min-w-0">
          <h3 className="text-[15px] font-bold uppercase text-white">
            {workout.name}
          </h3>

          <p className="mt-1 text-[11px] text-[#8D9199]">{workout.equipment}</p>

          {/* Stats */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-[#A0A3AA]">
            <span className="flex items-center gap-1">
              <Clock3 size={11} className="text-[#CCFF00]" />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Flame size={11} className="text-[#CCFF00]" />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <Star size={11} className="text-[#CCFF00]" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex shrink-0 flex-wrap items-center gap-3">
        {/* View Details */}
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-[#353A44] px-3 py-2 text-[10px] text-[#D5D7DB] transition hover:bg-[#20242B] sm:px-4 sm:text-[11px]"
        >
          View Details
        </Link>

        {/* Mark Done - only Today's Plan */}
        {type === "plan" && (
          <button
            type="button"
            onClick={handleMarkDone}
            className="inline-flex items-center gap-2 rounded-full bg-[#CCFF00] px-3 py-2 text-[10px] font-semibold text-black transition hover:bg-[#B8E600] sm:px-4 sm:text-[11px]"
          >
            <Check size={13} strokeWidth={2} />
            Mark as Done
          </button>
        )}

        {/* Remove */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center text-[#777B84] transition hover:text-white"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;
