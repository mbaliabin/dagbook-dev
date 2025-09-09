import React, { useEffect, useState, useCallback } from "react";
import {
  Timer,
  MapPin,
  Zap,
  Target,
  Plus,
  LogOut,
} from "lucide-react";
import dayjs from "dayjs";
import TrainingLoadChartMobile from "../components/TrainingLoadChartMobile";
import IntensityZonesMobile from "../components/IntensityZonesMobile";
import RecentWorkouts from "../components/RecentWorkouts";
import { getUserProfile } from "../api/getUserProfile";
import AddWorkoutModal from "../components/AddWorkoutModal";

interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  type: string;
  distance?: number | null;
  zone1Min?: number;
  zone2Min?: number;
  zone3Min?: number;
  zone4Min?: number;
  zone5Min?: number;
}

export default function ProfilePageMobile() {
  const [name, setName] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWorkouts = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Ошибка загрузки тренировок");
      const data: Workout[] = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setName(data.name || "Пользователь");
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
    fetchWorkouts();
  }, [fetchWorkouts]);

  const handleAddWorkout = (w: Workout) => setWorkouts(prev => [w, ...prev]);
  const handleDeleteWorkout = (id: string) => setWorkouts(prev => prev.filter(w => w.id !== id));
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const totalDistance = workouts.reduce((sum, w) => sum + (w.distance || 0), 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const totalTimeStr = `${hours}:${minutes.toString().padStart(2, "0")}`;

  const intensiveSessions = workouts.filter(w => {
    const zones = [
      w.zone1Min || 0,
      w.zone2Min || 0,
      w.zone3Min || 0,
      w.zone4Min || 0,
      w.zone5Min || 0,
    ];
    const maxZone = zones.indexOf(Math.max(...zones)) + 1;
    return [3, 4, 5].includes(maxZone);
  }).length;

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/profile.jpg"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-base font-semibold">{name || "Загрузка..."}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 px-3 py-1 rounded flex items-center text-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> Добавить
          </button>
          <button
            onClick={handleLogout}
            className="bg-blue-600 px-3 py-1 rounded flex items-center text-sm"
          >
            <LogOut className="w-4 h-4 mr-1" /> Выйти
          </button>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <Timer className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">{totalTimeStr}</span>
          <span className="text-xs text-gray-500">Время</span>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">{totalDistance.toFixed(1)} км</span>
          <span className="text-xs text-gray-500">Дистанция</span>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <Zap className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">{intensiveSessions}</span>
          <span className="text-xs text-gray-500">Интенсивные</span>
        </div>
      </div>

      {/* График нагрузки */}
      <TrainingLoadChartMobile workouts={workouts} />

      {/* Зоны интенсивности */}
      <IntensityZonesMobile workouts={workouts} />

      {/* Последние тренировки */}
      <RecentWorkouts
        workouts={workouts}
        onDeleteWorkout={handleDeleteWorkout}
        onUpdateWorkout={fetchWorkouts}
      />

      {/* Модалка */}
      <AddWorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWorkout={handleAddWorkout}
      />
    </div>
  );
}







