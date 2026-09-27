"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";

import { toast } from "react-toastify";

import { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const { plan, addToPlan, saveWorkout, isInPlan, isSaved } = useFitLog();

  // Check if workout is already added/saved
  const planned = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  // Add workout to today's plan
  const handleAddToPlan = () => {
    if (planned) {
      toast.info("Workout is already in today's plan.");
      return;
    }

    if (plan.length >= 5) {
      toast.error("Today's plan can contain a maximum of 5 workouts.");
      return;
    }

    addToPlan(workout);

    toast.success(`${workout.name} added to today's plan.`);
  };

  // Save workout for later
  const handleSaveWorkout = () => {
    if (saved) {
      toast.info("Workout is already saved.");
      return;
    }

    saveWorkout(workout);

    toast.success(`${workout.name} saved for later.`);
  };

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      {/* Add to Today's Plan */}
      <button
        type="button"
        onClick={handleAddToPlan}
        disabled={planned}
        className="inline-flex h-[46px] items-center justify-center gap-3 rounded-[10px] bg-[#CCFF00] px-6 text-[15px] font-medium text-black transition hover:bg-[#B8E600] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {planned ? (
          <Check size={17} strokeWidth={2} />
        ) : (
          <CalendarPlus size={17} strokeWidth={2} />
        )}

        {planned ? "Added to plan" : "Add to today's plan"}
      </button>

      {/* Save for Later */}
      <button
        type="button"
        onClick={handleSaveWorkout}
        disabled={saved}
        className="inline-flex h-[46px] items-center justify-center gap-3 rounded-[10px] border border-[#3A3E47] bg-transparent px-6 text-[15px] font-light text-[#D8D9DD] transition hover:bg-[#151820] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saved ? (
          <Check size={17} strokeWidth={2} />
        ) : (
          <Bookmark size={17} strokeWidth={1.8} />
        )}

        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;
