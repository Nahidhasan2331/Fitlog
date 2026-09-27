"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { useFitLog } from "@/context/FitLogContext";
import PlanWorkoutCard from "../components/PlanWorkoutCard";

type TabType = "plan" | "saved";

type SortType = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const { plan, saved } = useFitLog();

  const [activeTab, setActiveTab] = useState<TabType>("plan");

  const [sortBy, setSortBy] = useState<SortType>("duration");

  // ---------------------------
  // TODAY'S PLAN TOTALS
  // ---------------------------

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  // ---------------------------
  // SELECT CURRENT TAB
  // ---------------------------

  const selectedWorkouts = activeTab === "plan" ? plan : saved;

  // ---------------------------
  // SORT WORKOUTS
  // ---------------------------

  const sortedWorkouts = useMemo(() => {
    const workouts = [...selectedWorkouts];

    workouts.sort((a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

    return workouts;
  }, [selectedWorkouts, sortBy]);

  return (
    <main className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6">
      {/* =========================
          PAGE HEADING
      ========================== */}

      <div>
        <h1 className="text-[30px] font-bold uppercase leading-none text-white">
          My Plan
        </h1>

        <p className="mt-3 text-[12px] text-[#858991]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* =========================
          SUMMARY / METRICS
      ========================== */}

      <div className="mt-7 grid grid-cols-1 overflow-hidden rounded-xl border border-[#282C34] bg-[#151820] sm:grid-cols-3">
        <Metric label="Exercises" value={plan.length} accent />

        <Metric label="Minutes" value={totalMinutes} />

        <Metric label="Calories" value={totalCalories} last />
      </div>

      {/* =========================
          TABS + SORT
      ========================== */}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="inline-flex w-fit rounded-lg border border-[#292D35] bg-[#111318] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-md px-5 py-2 text-[11px] transition ${
              activeTab === "plan"
                ? "bg-[#20242C] text-white"
                : "text-[#777B84]"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-md px-5 py-2 text-[11px] transition ${
              activeTab === "saved"
                ? "bg-[#20242C] text-white"
                : "text-[#777B84]"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-[#737780]">Sort By</span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="rounded-lg border border-[#292D35] bg-[#111318] px-3 py-2 text-[11px] text-[#D4D6DA] outline-none"
          >
            <option value="duration">Duration</option>

            <option value="calories">Calories</option>

            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* =========================
          WORKOUT LIST
      ========================== */}

      <div className="mt-6">
        {sortedWorkouts.length > 0 ? (
          <div className="space-y-4">
            {sortedWorkouts.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                type={activeTab}
              />
            ))}
          </div>
        ) : (
          /* =====================
             EMPTY STATE
          ====================== */

          <div className="flex min-h-[290px] flex-col items-center justify-center rounded-xl border border-dashed border-[#292D35] text-center">
            <h2 className="text-[18px] font-bold uppercase text-white">
              Nothing Here Yet
            </h2>

            <p className="mt-2 text-[11px] text-[#777B84]">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-5 rounded-full bg-[#CCFF00] px-6 py-2 text-[11px] font-semibold text-black transition hover:bg-[#B8E600]"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

// =============================
// METRIC COMPONENT
// =============================

function Metric({
  label,
  value,
  accent = false,
  last = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`px-6 py-5 sm:px-7 ${
        !last ? "border-b border-[#282C34] sm:border-b-0 sm:border-r" : ""
      }`}
    >
      <p className="text-[10px] text-[#737780]">{label}</p>

      <p
        className={`mt-1 text-[28px] font-bold leading-none ${
          accent ? "text-[#CCFF00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
