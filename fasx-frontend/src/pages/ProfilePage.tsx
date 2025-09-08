import React, { useState } from 'react'
import { Plus, LogOut, Calendar, ChevronDown } from 'lucide-react'
import dayjs from 'dayjs'
import { DateRange } from 'react-date-range'
import { ru } from 'date-fns/locale'

import RecentWorkouts from '../components/RecentWorkouts'
import AddWorkoutModal from '../components/AddWorkoutModal'
import { Workout } from '../components/RecentWorkouts'

interface Props {
  workouts: Workout[]
  name: string
  loadingProfile: boolean
  loadingWorkouts: boolean
  onAddWorkout: (w: Workout) => void
  onDeleteWorkout: (id: string) => void
  fetchWorkouts: () => void
}

export default function ProfilePageMobile({
  workouts,
  name,
  loadingProfile,
  loadingWorkouts,
  onAddWorkout,
  onDeleteWorkout,
  fetchWorkouts
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDateRangePicker, setShowDateRangePicker] = useState(false)
  const [dateRange, setDateRange] = useState<{ startDate: Date; endDate: Date }>({
    startDate: dayjs().startOf('isoWeek').toDate(),
    endDate: dayjs().endOf('isoWeek').toDate()
  })

  const applyDateRange = () => {
    setShowDateRangePicker(false)
  }

  // Фильтрация по выбранному периоду
  const filteredWorkouts = workouts.filter(w => {
    const workoutDate = dayjs(w.date)
    const start = dayjs(dateRange.startDate).startOf('day')
    const end = dayjs(dateRange.endDate).endOf('day')
    return workoutDate.isBetween(start, end, null, '[]')
  })

  // Статистика
  const totalDuration = filteredWorkouts.reduce((sum, w) => sum + w.duration, 0)
  const totalDistance = filteredWorkouts.reduce((sum, w) => sum + (w.distance || 0), 0)
  const hours = Math.floor(totalDuration / 60)
  const minutes = totalDuration % 60
  const totalTimeStr = `${hours}:${minutes.toString().padStart(2, '0')}`

  const intensiveSessions = filteredWorkouts.filter(w => {
    const zones = [
      w.zone1Min || 0,
      w.zone2Min || 0,
      w.zone3Min || 0,
      w.zone4Min || 0,
      w.zone5Min || 0
    ]
    const maxZone = zones.indexOf(Math.max(...zones)) + 1
    return [3, 4, 5].includes(maxZone)
  }).length

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">{loadingProfile ? 'Загрузка...' : name}</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" /> Добавить
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              window.location.href = '/'
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded flex items-center"
          >
            <LogOut className="w-4 h-4 mr-1" /> Выйти
          </button>
        </div>
      </div>

      {/* Период */}
      <div className="mb-4">
        <button
          onClick={() => setShowDateRangePicker(prev => !prev)}
          className="flex items-center justify-between w-full px-3 py-2 bg-[#1f1f22] rounded text-sm text-gray-300 hover:bg-[#2a2a2d]"
        >
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {`${dayjs(dateRange.startDate).format('DD MMM')} — ${dayjs(dateRange.endDate).format('DD MMM')}`}
          </div>
          <ChevronDown className="w-4 h-4" />
        </button>

        {showDateRangePicker && (
          <div className="mt-2 bg-[#1a1a1d] rounded p-2 shadow-lg z-50">
            <DateRange
              onChange={item =>
                setDateRange({
                  startDate: item.selection.startDate,
                  endDate: item.selection.endDate
                })
              }
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={[{
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                key: 'selection'
              }]}
              direction="horizontal"
              rangeColors={['#3b82f6']}
              locale={ru}
              weekStartsOn={1}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                onClick={() => setShowDateRangePicker(false)}
                className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700 text-gray-300"
              >
                Отмена
              </button>
              <button
                onClick={applyDateRange}
                className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Применить
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Статистика горизонтально */}
      <div className="flex overflow-x-auto space-x-4 mb-4">
        <div className="flex-shrink-0 bg-[#1a1a1d] p-3 rounded-xl min-w-[120px] text-center">
          <p className="text-sm text-gray-400">Total Training</p>
          <h2 className="text-lg font-semibold">{totalTimeStr}</h2>
          <p className="text-xs text-gray-500">{filteredWorkouts.length} Sessions</p>
        </div>
        <div className="flex-shrink-0 bg-[#1a1a1d] p-3 rounded-xl min-w-[120px] text-center">
          <p className="text-sm text-gray-400">Distance</p>
          <h2 className="text-lg font-semibold">{totalDistance.toFixed(1)} km</h2>
        </div>
        <div className="flex-shrink-0 bg-[#1a1a1d] p-3 rounded-xl min-w-[120px] text-center">
          <p className="text-sm text-gray-400">Intensive</p>
          <h2 className="text-lg font-semibold">{intensiveSessions}</h2>
        </div>
      </div>

      {/* Список тренировок */}
      <div>
        {loadingWorkouts ? (
          <p className="text-gray-400">Загрузка тренировок...</p>
        ) : (
          <RecentWorkouts
            workouts={filteredWorkouts}
            onDeleteWorkout={onDeleteWorkout}
            onUpdateWorkout={fetchWorkouts}
          />
        )}
      </div>

      {/* Модалка добавления тренировки */}
      <AddWorkoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddWorkout={onAddWorkout}
      />
    </div>
  )
}

