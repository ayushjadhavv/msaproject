import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CarPage from './pages/aircraftage'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jet/:brandId" element={<CarPage />} />
      </Routes>
    </BrowserRouter>
  )
}

