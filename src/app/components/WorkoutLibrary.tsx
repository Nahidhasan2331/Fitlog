"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) {
    return (
      <section id="library" className="mx-4 py-10 sm:mx-6 lg:mx-24">
        <p className="text-center text-sm text-[#8D8E94]">
          Loading workouts...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="library" className="mx-4 py-10 sm:mx-6 lg:mx-24">
        <p className="text-center text-sm text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section id="library" className="mx-4 py-10 sm:mx-6 lg:mx-24">
      {/* Section Heading */}
      <div>
        <h2 className="text-3xl font-black uppercase text-white md:text-4xl">
          The Library
        </h2>

        <p className="mt-1 text-[12px] text-[#8D8E94]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Workout Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default WorkoutLibrary;
