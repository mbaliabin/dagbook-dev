import React from "react"
import { Timer, MapPin, Zap, Target, Plus, LogOut } from "lucide-react"

export default function MobileProfilePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-4 flex flex-col gap-4">
      {/* Шапка профиля */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-base font-semibold">Имя Фамилия</h2>
            <p className="text-xs text-gray-400">Спортсмен</p>
          </div>
        </div>
        <button className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222]">
          <LogOut className="w-4 h-4" />
          Выйти
        </button>
      </div>

      {/* Кнопка добавления */}
      <button className="w-full py-2 flex items-center justify-center gap-2 bg-[#1a1a1a] rounded-xl text-sm hover:bg-[#222]">
        <Plus className="w-4 h-4" />
        Добавить тренировку
      </button>

      {/* Статистика */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <Timer className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">12 ч</span>
          <span className="text-xs text-gray-500">Время</span>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">95 км</span>
          <span className="text-xs text-gray-500">Дистанция</span>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <Zap className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">8</span>
          <span className="text-xs text-gray-500">Сессий</span>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col items-center">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-sm mt-1">5</span>
          <span className="text-xs text-gray-500">Интенсивные</span>
        </div>
      </div>

      {/* Последние тренировки */}
      <div className="bg-[#1a1a1a] rounded-xl p-3 flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Недавние тренировки</h3>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span>Бег</span>
            <span className="text-gray-400">45 мин</span>
          </div>
          <div className="flex justify-between">
            <span>Велосипед</span>
            <span className="text-gray-400">1 ч 20 мин</span>
          </div>
          <div className="flex justify-between">
            <span>Силовая</span>
            <span className="text-gray-400">55 мин</span>
          </div>
        </div>
      </div>
    </div>
  )
}



