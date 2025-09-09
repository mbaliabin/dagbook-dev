import React, { useEffect, useState, useCallback } from 'react'
import {
  Timer,
  MapPin,
  Zap,
  Target,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Card, CardContent } from '@/components/ui/card'
import AddWorkoutModal from '@/features/AddWorkoutModal'
import RecentWorkouts from '@/components/RecentWorkouts'
import IntensityZones from '@/components/IntensityZones'
import WeeklySessions from '@/components/WeeklySessions'
import ActivityTable from '@/components/ActivityTable'

const ProfilePage = () => {
  const navigate = useNavigate()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [stats, setStats] = useState<any[]>([])
  const [currentDate, setCurrentDate] = useState(dayjs())

  const fetchStats = useCallback(async () => {
    // пример заглушки
    setStats([
      { label: 'Время', value: '12 ч', icon: Timer },
      { label: 'Расстояние', value: '85 км', icon: MapPin },
      { label: 'Интенсивные', value: '5', icon: Zap },
      { label: 'Сессии', value: '8', icon: Target }
    ])
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white px-2 sm:px-4 py-6 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Профиль */}
          <div className="flex items-center space-x-3">
            <img
              src="/profile-pic.png"
              alt="Profile"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-700"
            />
            <div>
              <h1 className="text-lg sm:text-2xl font-bold">Мой профиль</h1>
              <p className="text-xs sm:text-sm text-gray-400">Добро пожаловать!</p>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-3 sm:px-4 py-1.5 bg-[#1c1c1e] rounded-xl shadow hover:bg-[#2a2a2d] transition"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
              <span className="text-xs sm:text-sm">Добавить тренировку</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              className="flex items-center px-3 sm:px-4 py-1.5 bg-red-600 rounded-xl shadow hover:bg-red-700 transition"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5" />
              <span className="text-xs sm:text-sm">Выйти</span>
            </button>
          </div>
        </div>

        {/* Выбор периода */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}
              className="p-1 hover:bg-[#1c1c1e] rounded-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <span className="text-sm sm:text-base font-semibold">
              {currentDate.format('MMMM YYYY')}
            </span>
            <button
              onClick={() => setCurrentDate(currentDate.add(1, 'month'))}
              className="p-1 hover:bg-[#1c1c1e] rounded-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="flex items-center px-2 sm:px-3 py-1 bg-[#1c1c1e] rounded-xl text-xs sm:text-sm hover:bg-[#2a2a2d] transition">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              Произвольный период
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
            </button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="bg-[#1c1c1e] rounded-2xl shadow-lg p-3 sm:p-6">
              <CardContent className="flex flex-col items-center">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#9ca3af]" />
                <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Графики + таблица */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IntensityZones />
          <WeeklySessions />
        </div>

        <ActivityTable />

        {/* Недавние тренировки */}
        <RecentWorkouts />

        {/* Модалка */}
        <AddWorkoutModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      </div>
    </div>
  )
}

export default ProfilePage

