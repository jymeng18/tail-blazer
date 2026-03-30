import './App.css'
import { Navbar } from './components'
import HomePage from './pages/HomePage'
import ReportPage from './pages/ReportPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/report' element={<ReportPage />}/>          
      </Routes>
    </BrowserRouter>
  )
}

export default App
