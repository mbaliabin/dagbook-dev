import { Routes, Route } from "react-router-dom"
import HomePage from "@/pages/HomePage"
//import TrainingPage from "@/pages/TrainingPage" //
import ProfilePage from "@/pages/ProfilePage"
import CalendarPage from "@/pages/CalendarPage"
import FasxLogin from "@/pages/FasxLogin";
import FasxRegister from "@/pages/FasxRegister";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FasxLogin />} />
	  {/* <Route path="/training" element={<TrainingPage />} />*/}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/login" element={<FasxLogin />} />
      <Route path="/register" element={<FasxRegister />} />
    </Routes>
  )
}

